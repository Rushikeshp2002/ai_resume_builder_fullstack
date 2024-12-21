/* eslint-disable no-unused-vars */
import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { ResumeContext } from "@/context/ResumeContext";
import ResumePreview from "@/dashboard/resume/component/ResumePreview";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RWebShare } from "react-web-share";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "@/utils/firebase_config";
import { LoaderCircle } from "lucide-react";

const ViewResume = () => {
  const [resumeInfo, setResumeInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { email, resumeId } = useParams();

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const db = getFirestore(app);
        const resumeRef = doc(
          db,
          `usersByEmail/${email}/resumes`,
          `resume-${resumeId}`
        );

        const resumeSnap = await getDoc(resumeRef);

        if (resumeSnap.exists()) {
          const data = resumeSnap.data();
          setResumeInfo(data)
        } else {
          console.error("No resume found!");
        }
      } catch (error) {
        console.error("Error fetching resume:", error);
      } finally {
        setLoading(false);
      }
    };

    if (email && resumeId) {
      fetchResumeData();
    }
  }, [email, resumeId]);

  const handleDownload = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoaderCircle className="animate-spin h-8 w-8" />
      </div>
    );
  }

  if (!resumeInfo) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">Resume not found</p>
      </div>
    );
  }

  const fullName = `${resumeInfo?.personalInfo?.firstName || ''} ${resumeInfo?.personalInfo?.lastName || ''}`;
  const shareUrl = `${window.location.origin}/my-resume/${email}/${resumeId}/view`;

  return (
    <ResumeContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header />
        <div className="my-5 mx-10 md:mx-20 lg:mx-36">
          <h2 className="text-center text-2xl font-medium">
            Congrats! Your Ultimate AI generated Resume is ready!
          </h2>
          <p className="text-center text-gray-400">
            Now you are ready to download your resume and you can share your
            unique resume to recruiters
          </p>
          <div className="w-auto m-auto flex justify-center mt-3 items-center ">
            <Button 
              onClick={handleDownload}
              className="bg-primary hover:bg-primary/90"
            >
              Download
            </Button>

          </div>
        </div>
      </div>

      <div id="print-area" className="my-5 mx-10 md:mx-20 lg:mx-36">
        <ResumePreview />
      </div>
    </ResumeContext.Provider>
  );
};

export default ViewResume;
