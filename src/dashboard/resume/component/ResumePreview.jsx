/* eslint-disable no-unused-vars */
import { ResumeContext } from "@/context/ResumeContext";
import { useContext } from "react";
import PersonalDetailPreview from "./preview/PersonalDetailPreview";
import SummaryDetails from "./preview/SummaryDetails";
import ExperiencePreview from "./preview/ExperiencePreview";
import EducationalPreview from "./preview/EducationalPreview";
import SkillsPreview from "./preview/SkillsPreview";

const ResumePreview = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeContext);
  console.log(resumeInfo + "resumeinfo");

  if (!resumeInfo) {
    return (
      <div className="text-center text-gray-500 text-lg font-medium py-20">
        Data needs to be added in the resume.
      </div>
    );
  }

  return (
    <div
      className="shadow-lg h-full p-14 border-t-[20px]"
      style={{borderColor: resumeInfo?.themeColor}}
    >
      {resumeInfo && (
        <>
          <PersonalDetailPreview resumeInfo={resumeInfo} />
          <SummaryDetails resumeInfo={resumeInfo} />
          <ExperiencePreview resumeInfo={resumeInfo} />
          <EducationalPreview resumeInfo={resumeInfo} />
          <SkillsPreview resumeInfo={resumeInfo} />
        </>
      )}
    </div>
  );
};

export default ResumePreview;
