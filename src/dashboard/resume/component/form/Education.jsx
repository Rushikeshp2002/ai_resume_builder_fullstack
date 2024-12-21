/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContext, useEffect, useState, useCallback } from "react";
import RichTextEditor from "../RichTextEditor";
import { ResumeContext } from "@/context/ResumeContext";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "@/utils/firebase_config";

const formField = {
  school: "",
  degree: "",
  city: "",
  state: "",
  fieldOfStudy: "",
  graduationDate: "",
  description: "",
};

const Education = ({ resumeId, email, enableNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeContext);
  const [educationList, setEducationList] = useState(() => 
    resumeInfo?.education?.length > 0 ? resumeInfo.education : [formField]
  );
  const [loading, setLoading] = useState(false);
  const [shouldUpdateContext, setShouldUpdateContext] = useState(false);

  useEffect(() => {
    if (shouldUpdateContext) {
      setResumeInfo(prev => ({
        ...prev,
        education: educationList
      }));
      setShouldUpdateContext(false);
    }
  }, [shouldUpdateContext, setResumeInfo, educationList]);

  const handleChange = useCallback((index, event) => {
    const { name, value } = event.target;
    setEducationList(prev => {
      const newEntries = [...prev];
      newEntries[index][name] = value;
      return newEntries;
    });
    setShouldUpdateContext(true);
  }, []);

  const addNewEducation = useCallback(() => {
    setEducationList(prev => [...prev, { ...formField }]);
    setShouldUpdateContext(true);
  }, []);

  const removeEducation = useCallback(() => {
    if (educationList.length > 1) {
      setEducationList(prev => prev.slice(0, -1));
      setShouldUpdateContext(true);
    }
  }, [educationList.length]);

  const handleRichTextEditor = useCallback((e, name, index) => {
    setEducationList(prev => {
      const newEntries = [...prev];
      newEntries[index][name] = e.target.value;
      return newEntries;
    });
    setShouldUpdateContext(true);
  }, []);

  const onSave = async () => {
    setLoading(true);
    try {
      const db = getFirestore(app);
      const resumeRef = doc(
        db,
        `usersByEmail/${email}/resumes`,
        `resume-${resumeId}`
      );
      await setDoc(resumeRef, { education: educationList }, { merge: true });
      setLoading(false);
      toast.success("Education details updated!");
      enableNext(true);
    } catch (error) {
      setLoading(false);
      console.error("Error saving to Firestore:", error);
      toast.error("Error updating education details!");
    }
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Education</h2>
        <p>Add your educational background</p>
        <div>
          {educationList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div>
                  <label className="text-xs">School/University</label>
                  <Input
                    name="school"
                    value={item.school}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div>
                  <label className="text-xs">Degree</label>
                  <Input
                    name="degree"
                    value={item.degree}
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
                  <label className="text-xs">Field of Study</label>
                  <Input
                    name="fieldOfStudy"
                    value={item.fieldOfStudy}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div>
                  <label className="text-xs">Graduation Date</label>
                  <Input
                    type="date"
                    name="graduationDate"
                    value={item.graduationDate}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div className="col-span-2">
                  {/* <label className="text-xs">Description</label> */}
                  <RichTextEditor
                    index={index}
                    value={item.description}
                    onRichTextEditorChange={(event) =>
                      handleRichTextEditor(event, "description", index)
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
              onClick={addNewEducation}
              className="text-primary"
            >
              + Add More Education
            </Button>
            <Button
              variant="outline"
              onClick={removeEducation}
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

export default Education; 