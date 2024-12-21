/* eslint-disable react/prop-types */
const EducationalPreview = ({ resumeInfo }) => {
  const education = resumeInfo?.education || []; // Default to an empty array if undefined

  if (education.length === 0) {
    return (
      <div className="text-center text-gray-500 text-sm font-medium py-4">
        No educational data added.
      </div>
    );
  }

  return (
    <div className="my-6">
      <h2 className="text-center font-bold text-sm mb-2">
        Education
      </h2>
      <hr className="border-[1.5px] my-2" style={{borderColor: resumeInfo?.themeColor || "rgb(107 114 128 "}} />


      {education.map((educationItem, index) => (
        <div key={index} className="my-5">
          <h2 className="text-sm font-bold">{educationItem?.school || "University Not Specified"}</h2>
          <h2 className="text-xs flex justify-between">
            {educationItem?.degree || "Degree not specified"} in {educationItem?.fieldOfStudy || "Field not specified"}
            <span>{educationItem?.graduationDate || "Date not specified"}</span>
          </h2>
          <div 
          className="text-xs my-2 text-justify" dangerouslySetInnerHTML={{
            __html: educationItem?.description || "No description provided.",
          }}/>
          
  
          </div>
        
      ))}
    </div>
  );
};

export default EducationalPreview;
