/* eslint-disable react/prop-types */
const PersonalDetailPreview = ({ resumeInfo }) => {
  const personalDetail = resumeInfo?.personalDetail;

  if (!personalDetail) {
    return (
      <div className="text-center text-gray-500 text-sm font-medium py-4">
        No personal data added.
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-bold text-xl text-center">
        {personalDetail.firstName || "First Name"} {personalDetail.lastName || "Last Name"}
      </h2>
      <h2 className="text-center text-sm font-medium">
        {personalDetail.jobTitle || "Job Title not specified"}
      </h2>
      <h2 className="text-center font-normal text-xs">
        {personalDetail.address || "Address not provided"}
      </h2>

      <div className="flex justify-between">
        <h2 className="font-normal text-xs">
          {personalDetail.phone || "Phone not provided"}
        </h2>
        <h2 className="font-normal text-xs">
          {personalDetail.email || "Email not provided"}
        </h2>
      </div>
      <hr
        className="border-[1.5px] my-2"
        style={{ borderColor: resumeInfo?.themeColor || "#000"}}
      />
    </div>
  );
};

export default PersonalDetailPreview;
