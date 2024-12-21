/* eslint-disable react/prop-types */
const SummaryDetails = ({resumeInfo}) => {
  if (!resumeInfo || !resumeInfo.personalDetail) {
    return (
      <div className="text-center text-gray-500 text-sm font-medium py-4">
        No summary data added.
      </div>
    );
  }
  return (
   <p className="text-xs text-justify">{resumeInfo?.summary}</p>
  )
}

export default SummaryDetails