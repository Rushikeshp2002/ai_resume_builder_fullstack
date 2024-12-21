import { Button } from "@/components/ui/button";
import PersonalDetailForm from "./form/PersonalDetailForm";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { useState } from "react";

import SummaryForm from "./form/SummaryForm";
import ExperienceForm from "./form/ExperienceForm";
import Education from "./form/Education";
import Skills from "./form/Skills";
import { Link, Navigate, useParams } from "react-router-dom";
import ThemeColor from "./ThemeColor";

const FormSection = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(true);
  const { resumeId, email } = useParams(); 

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-5">
          <Link to={"/dashboard"}>
            <Button>
              <Home />
            </Button>
          </Link>
          <ThemeColor/>
        </div>
        <div className="flex gap-2">
          {activeIndex > 1 && (
            <Button
              size="sm"
              onClick={() => setActiveIndex(activeIndex - 1)}
              className=""
            >
              <ArrowLeft />
            </Button>
          )}
          <Button
            onClick={() => setActiveIndex(activeIndex + 1)}
            disabled={!enableNext}
            className="flex gap-2"
            size="sm"
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>
      {activeIndex === 1 ? (
        <PersonalDetailForm
          resumeId={resumeId}
          email={email}
          enableNext={(v) => setEnableNext(v)}
        />
      ) : activeIndex === 2 ? (
        <SummaryForm
          resumeId={resumeId}
          email={email}
          enableNext={(v) => setEnableNext(v)}
        />
      ) : activeIndex === 3 ? (
        <ExperienceForm
          resumeId={resumeId}
          email={email}
          enableNext={(v) => setEnableNext(v)}
        />
      ) : activeIndex === 4 ? (
        <Education
          resumeId={resumeId}
          email={email}
          enableNext={(v) => setEnableNext(v)}
        />
      ) : activeIndex === 5 ? (
        <Skills
          resumeId={resumeId}
          email={email}
          enableNext={(v) => setEnableNext(v)}
        />
      ) : activeIndex === 6 ? (
        <Navigate to={`/dashboard/${email}/${resumeId}/view`} />
      ) : null}
    </div>
  );
};

export default FormSection;
