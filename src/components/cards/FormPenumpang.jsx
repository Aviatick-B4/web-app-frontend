import react from "react";

function FormPenumpang({ title, fields, formData, handleInputChange }) {
  return (
    <>
      <div className="rounded-xl p-[32px] shadow-md">
        <p className="text-xl mb-[32px]">
          <strong>{title}</strong>
        </p>
        {fields.map((field, index) => (
          <div key={index} className="text-gray">
            <div className="flex flex-col gap-2 mb-[12px]">
              <p>{field.label}</p>
              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  className="border rounded-full w-full py-2 px-4 text-gray"
                >
                  {field.options.map((option, idx) => (
                    <option key={idx} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  className="border rounded-full w-full py-2 px-4 text-gray"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default FormPenumpang;
