/* eslint-disable react/prop-types */
const SkillsPreview = ({ resumeInfo }) => {
  const skills = resumeInfo?.skills;

  if (!skills || !Array.isArray(skills) || skills.length === 0) {
    return (
      <div className="text-center text-gray-500 text-sm font-medium py-4">
        No skills data added.
      </div>
    );
  }

  // Split skills array into two arrays for two columns
  const midPoint = Math.ceil(skills.length / 2);
  const leftColumnSkills = skills.slice(0, midPoint);
  const rightColumnSkills = skills.slice(midPoint);

  const SkillColumn = ({ skillList }) => (
    <ul className="list-none p-0">
      {skillList.map((skill, index) => (
        <li key={index} className="flex items-center mb-2">
          <span className="text-sm font-medium mr-2">
            {skill?.name || "Skill not specified"}
          </span>
          <span>
            {skill?.rating
              ? Array.from({ length: skill.rating }, () => "⭐").join(" ")
              : "No rating provided"}
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="my-6">
      <h2 className="text-center font-bold text-sm mb-2">
        Skills
      </h2>
      <hr className="border-[1.5px] my-2" style={{borderColor: resumeInfo?.themeColor || "rgb(107 114 128 "}}  />
      <div className="grid grid-cols-2 gap-4">
        <div className="pr-2">
          <SkillColumn skillList={leftColumnSkills} />
        </div>
        <div className="pl-2">
          <SkillColumn skillList={rightColumnSkills} />
        </div>
      </div>
    </div>
  );
};

export default SkillsPreview;