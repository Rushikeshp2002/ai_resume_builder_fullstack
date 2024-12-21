import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeContext } from "@/context/ResumeContext";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "@/utils/firebase_config";

const PersonalDetailForm = ({ resumeId, email, enableNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const db = getFirestore(app);

  // Initialize formData with existing values from resumeInfo
  const [formData, setFormData] = useState({
    personalDetail: {
      firstName: resumeInfo?.personalDetail?.firstName || "",
      lastName: resumeInfo?.personalDetail?.lastName || "",
      jobTitle: resumeInfo?.personalDetail?.jobTitle || "",
      address: resumeInfo?.personalDetail?.address || "",
      phone: resumeInfo?.personalDetail?.phone || "",
      email: resumeInfo?.personalDetail?.email || ""
    }
  });

  // Update formData when resumeInfo changes (e.g., when loaded from Firestore)
  useEffect(() => {
    if (resumeInfo?.personalDetail) {
      setFormData({
        personalDetail: {
          ...resumeInfo.personalDetail
        }
      });
    }
  }, [resumeInfo]);

  const handleInputChange = (e) => {
    enableNext(false);
    const { name, value } = e.target;
    
    // Update both formData and resumeInfo with nested structure
    setFormData(prev => ({
      ...prev,
      personalDetail: {
        ...prev.personalDetail,
        [name]: value
      }
    }));

    setResumeInfo(prev => ({
      ...prev,
      personalDetail: {
        ...(prev?.personalDetail || {}),
        [name]: value
      }
    }));
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const resumeRef = doc(
        db,
        `usersByEmail/${email}/resumes`,
        `resume-${resumeId}`
      );
      
      await setDoc(resumeRef, formData, { merge: true });
      toast.success("Details Updated");
      enableNext(true);
    } catch (error) {
      console.error("Error updating document: ", error);
      toast.error("Failed to update details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Detail</h2>
      <p>Get Started with the basic information</p>

      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label className="text-sm">First Name</label>
            <Input
              name="firstName"
              value={formData.personalDetail.firstName}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Last Name</label>
            <Input
              name="lastName"
              value={formData.personalDetail.lastName}
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Job Title</label>
            <Input
              name="jobTitle"
              value={formData.personalDetail.jobTitle}
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <Input
              name="address"
              value={formData.personalDetail.address}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Phone</label>
            <Input
              name="phone"
              value={formData.personalDetail.phone}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <Input
              name="email"
              value={formData.personalDetail.email}
              required
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetailForm;