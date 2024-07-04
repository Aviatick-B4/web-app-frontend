import React, { useState } from "react";

function FormPenumpang({ title, fields, formData, handleInputChange }) {
  const [errors, setErrors] = useState({});

  const formatDateValue = (value) => (value ? value.slice(0, 10) : "");

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }
    return age;
  };

  const getMinMaxDate = (ageGroup, fieldName) => {
    const today = new Date();
    let minDate = new Date(1900, 0, 1); // Default minDate
    let maxDate = today; // Default maxDate

    if (fieldName.includes("expiredDate")) {
      minDate = new Date(today.getTime() + 24 * 60 * 60 * 1000); // Set minDate to tomorrow for expiredDate
      maxDate = null;
    } else if (title === "Data Penumpang (Dewasa)") {
      maxDate = new Date(
        today.getFullYear() - 17,
        today.getMonth(),
        today.getDate()
      );
    } else if (title === "Data Penumpang (Anak)") {
      maxDate = new Date(
        today.getFullYear() - 2,
        today.getMonth(),
        today.getDate()
      );
      minDate = new Date(
        today.getFullYear() - 17,
        today.getMonth(),
        today.getDate()
      );
    } else if (title === "Data Penumpang (Bayi)") {
      minDate = new Date(
        today.getFullYear() - 2,
        today.getMonth(),
        today.getDate()
      );
    }

    return {
      min: minDate.toISOString().split("T")[0],
      max: maxDate ? maxDate.toISOString().split("T")[0] : undefined,
    };
  };

  const validateInput = (name, value, ageGroup) => {
    let error = "";
    if (name.includes("birthDate")) {
      const age = calculateAge(value);
      if (ageGroup === "ADULT" && age < 17) {
        error = "Usia dewasa harus lebih dari 17 tahun.";
      } else if (ageGroup === "CHILD" && (age < 2 || age > 17)) {
        error = "Usia anak harus antara 2 hingga 17 tahun.";
      } else if (ageGroup === "BABY" && age >= 2) {
        error = "Usia bayi harus kurang dari 2 tahun.";
      }
    } else if (
      name.includes("identityNumber") &&
      formData.identityType === "KTP"
    ) {
      if (value.length !== 16 || !/^\d+$/.test(value)) {
        error =
          "Nomor KTP tidak valid. Harus terdiri dari 16 angka dan hanya berisi angka.";
      }
    } else if (
      name.includes("identityNumber") &&
      formData.identityType === "Passport"
    ) {
      if (!/^[A-Za-z]/.test(value) || value.length !== 7) {
        error =
          "Nomor Paspor tidak valid. Harus terdiri terdiri dari 7 karakter, diawali dengan huruf A-Z";
      }
    } else if (
      name.includes("identityNumber") &&
      formData.identityType === "SIM"
    ) {
      if (value.length !== 16) {
        error = "Nomor SIM tidak valid. Harus terdiri dari 16 karakter.";
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleChange = (e, name, ageGroup) => {
    const { value } = e.target;
    validateInput(name, value, ageGroup);
    handleInputChange(e, name);
  };

  // Filter fields based on title
  const filteredFields = fields.filter((field) => {
    if (
      title === "Data Penumpang (Anak)" ||
      title === "Data Penumpang (Bayi)"
    ) {
      return ["title", "fullName", "birthDate", "nationality"].some((keyword) =>
        field.name.includes(keyword)
      );
    }
    return true;
  });

  // Filter options for title field based on title
  const filterTitleOptions = (options) => {
    if (
      title === "Data Penumpang (Anak)" ||
      title === "Data Penumpang (Bayi)"
    ) {
      return options.filter(
        (option) => option.value === "Mr." || option.value === "Ms."
      );
    }
    return options;
  };

  return (
    <div className="bg-white rounded-xl p-[32px] shadow-md">
      <p className="text-xl mb-[32px]">
        <strong>{title}</strong>
      </p>
      {filteredFields.map((field, index) => {
        const { min, max } =
          field.type === "date"
            ? getMinMaxDate(field.ageGroup, field.name)
            : {};
        return (
          <div key={index} className="text-gray mb-[12px]">
            <div className="flex flex-col gap-2">
              <p>{field.label}</p>
              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={formData[field.name.split("-")[0]] || ""}
                  onChange={(e) => handleChange(e, field.name, field.ageGroup)}
                  className={`border rounded-full w-full py-2 px-4 me-3 text-gray ${
                    errors[field.name] ? "border-red-500" : ""
                  }`}
                >
                  {field.options.map((option, idx) => (
                    <option key={idx} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : field.type === "radio" ? (
                <div className="flex gap-8 mb-4">
                  {filterTitleOptions(field.options).map((option) => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        name={field.name}
                        value={option.value}
                        checked={
                          formData[field.name.split("-")[0]] === option.value
                        }
                        onChange={(e) =>
                          handleChange(e, field.name, field.ageGroup)
                        }
                        className={`mr-2 ${
                          errors[field.name] ? "border-red-500" : ""
                        }`}
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={
                    field.type === "date"
                      ? formatDateValue(formData[field.name.split("-")[0]])
                      : formData[field.name.split("-")[0]]
                  }
                  onChange={(e) => handleChange(e, field.name, field.ageGroup)}
                  min={field.type === "date" ? min : undefined}
                  max={field.type === "date" ? max : undefined}
                  className={`border rounded-full w-full py-2 px-4 text-gray ${
                    errors[field.name] ? "border-red-500" : ""
                  }`}
                />
              )}
              {errors[field.name] && (
                <p className="text-red-500 text-sm">{errors[field.name]}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FormPenumpang;
