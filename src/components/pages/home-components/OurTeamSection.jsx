import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";


const TeamCard = ({ imageSrc, name, role, linkedInUrl, githubUrl }) => {
  return (
    <div className="md:px-8 py-4">
      <div className="relative w-full bg-white rounded-lg border border-neutral/30 shadow-md h-full bg-transparent overflow-visible text-main hover:shadow-lg">
        {/* Card hold */}
        <div className="flex justify-center items-center mt-4">
          <img src="/icons/card-hold.svg" alt="Card Hold" className="opacity-50" />
        </div>
        <div className="relative mt-2 md:px-14">
          <img
            className="object-cover w-full h-96 md:h-[240px] 2xl:h-[280px]"
            src={imageSrc}
            alt={name}
          />
        </div>

        <div className="p-4 md:p-2.5 mt-4">
          <h3 className="text-lg md:base font-bold text-main mb-2 leading-5">{name}</h3>
          <p className="text-darkgray font-medium text-sm">{role}</p>
          <div className="flex items-center mt-4 justify-end">
            <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={28} className="mr-2 text-darkgray cursor-pointer hover:text-secondary" />
            </a>
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <FaGithub size={28} className="mr-2 text-darkgray cursor-pointer hover:text-secondary" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const OurTeamSection = () => {
  return (
    <div className="container text-main mb-24">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between -mt-3">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={40}
            height={40}
            viewBox="0 0 10 10"
            className="text-secondary"
          >
            <path fill="currentColor" d="M0 7h16v1H0z"></path>
          </svg>
          <span className="text-xl md:text-2xl font-bold text-main">
            Aviatick
          </span>
          <span className="text-xl md:text-2xl ml-2 font-bold text-primary">
            Team
          </span>
        </div>
      </div>
      <div className="mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <TeamCard
            imageSrc="/team/abiyyi.png"
            name="Muhammad Faiq Al Abiyyi"
            role="Back-end Developer"
            linkedInUrl="https://www.linkedin.com/in/faiqabiyyi/"
            githubUrl="https://github.com/FaiqAbiyyi666"
          />
          <TeamCard
            imageSrc="/team/rama.png"
            name="I Putu Rama Astra Arimbawa"
            role="Back-end Developer"
            linkedInUrl="https://www.linkedin.com/in/rama-astra"
            githubUrl="https://github.com/ramaastra"
          />
          <TeamCard
            imageSrc="/team/rizki.png"
            name="Rizki Setyo Putro Robawa"
            role="Back-end Developer"
            linkedInUrl="https://www.linkedin.com/in/rizkirobawa"
            githubUrl="https://github.com/rizkirobawa"
          />
          <TeamCard
            imageSrc="/team/adit.png"
            name="Aditya Herdiansyah Putra"
            role="Front-end Developer"
            linkedInUrl="https://www.linkedin.com/in/adityaherdiansyahputra"
            githubUrl="https://github.com/dittttttt"
          />
          <TeamCard
            imageSrc="/team/amal.png"
            name="Amalia Rodhya Ulfa"
            role="Front-end Developer"
            linkedInUrl="https://www.linkedin.com/in/amaliarodhyaulfa35/"
            githubUrl="https://github.com/Amalia212"
          />
          <TeamCard
            imageSrc="/team/talitha.png"
            name="Talitha Syafiyah"
            role="Front-end Developer"
            linkedInUrl="https://www.linkedin.com/in/talithasyafiyah/"
            githubUrl="https://github.com/talithasyafiyah"
          />
        </div>
      </div>
    </div>
  );
};

export default OurTeamSection;
