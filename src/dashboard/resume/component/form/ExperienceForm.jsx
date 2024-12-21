/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContext, useEffect, useState } from "react";
import RichTextEditor from "../RichTextEditor";
import { ResumeContext } from "@/context/ResumeContext";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "@/utils/firebase_config";

const formField = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummery: "",
};

const ExperienceForm = ({ resumeId, email, enableNext }) => {
  const [experienceList, setExperienceList] = useState([formField]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeContext);
  const [loading, setLoading] = useState(false);

  // Initialize form with existing data
  useEffect(() => {
    if (resumeInfo?.experience?.length > 0) {
      setExperienceList(resumeInfo.experience);
    }
  }, [resumeInfo?.experienc]);

  // Update context whenever experienceList changes
  useEffect(() => {
    setResumeInfo((prevInfo) => ({
      ...prevInfo,
      experience: experienceList,
    }));
  }, [experienceList, setResumeInfo]);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    setExperienceList((prevList) => {
      const newList = [...prevList];
      newList[index] = {
        ...newList[index],
        [name]: value,
      };
      return newList;
    });
  };

  const handleRichTextEditor = (e, name, index) => {
    setExperienceList((prevList) => {
      const newList = [...prevList];
      newList[index] = {
        ...newList[index],
        [name]: e.target.value,
      };
      return newList;
    });
  };

  const addNewExperience = () => {
    setExperienceList((prevList) => [...prevList, { ...formField }]);
  };

  const removeExperience = () => {
    if (experienceList.length > 1) {
      setExperienceList((prevList) => prevList.slice(0, -1));
    }
  };

  const onSave = async () => {
    setLoading(true);
    try {
      const db = getFirestore(app);
      const resumeRef = doc(db, `usersByEmail/${email}/resumes`, `resume-${resumeId}`);
      const data = {
        experience: experienceList.map((item, index) => ({
          id: `exp-${index + 1}`,
          title: item.title || "Position title not provided",
          companyName: item.companyName || "Company not specified",
          location: {
            city: item.city || "City not specified",
            state: item.state || "State not specified",
          },
          duration: {
            startDate: item.startDate || "Start date not provided",
            endDate: item.endDate || "End date not provided",
          },
          workSummery: item.workSummery || "No work summary provided.",
        })),
      };

      await setDoc(resumeRef, data, { merge: true });
      setResumeInfo((prev) => ({
        ...prev,
        experience: data.experience,
      }));

      toast.success("Details updated!");
      enableNext(true);
    } catch (error) {
      console.error("Error saving to Firestore:", error);
      toast.error("Error updating details!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Professional Experience</h2>
        <p>Add your previous job experience</p>
        <div>
          {experienceList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div>
                  <label className="text-xs">Position Title</label>
                  <Input
                    name="title"
                    value={item.title}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div>
                  <label className="text-xs">Company Name</label>
                  <Input
                    name="companyName"
                    value={item.companyName}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div>
                  <label className="text-xs">City</label>
                  <Input
                    name="city"
                    value={item.city}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div>
                  <label className="text-xs">State</label>
                  <Input
                    name="state"
                    value={item.state}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div>
                  <label className="text-xs">Start Date</label>
                  <Input
                    type="date"
                    name="startDate"
                    value={item.startDate}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div>
                  <label className="text-xs">End Date</label>
                  <Input
                    type="date"
                    name="endDate"
                    value={item.endDate}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div className="col-span-2">
                  <RichTextEditor
                    index={index}
                    value={item.workSummery}
                    onRichTextEditorChange={(event) =>
                      handleRichTextEditor(event, "workSummery", index)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={addNewExperience}
              className="text-primary"
            >
              + Add More Experience
            </Button>
            <Button
              variant="outline"
              onClick={removeExperience}
              className="text-primary"
            >
              - Remove
            </Button>
          </div>
          <Button disabled={loading} onClick={onSave}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceForm;