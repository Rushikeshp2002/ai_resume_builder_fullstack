/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader2Icon, MoreVertical } from "lucide-react";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getFirestore, collection, query, where, orderBy, limit, doc, deleteDoc } from "firebase/firestore";
import { UserContext } from "@/context/UserContext";

const ResumeItem = ({ resume, refreshData }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext); 
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    if (!user?.email) {
      console.error("User is not authenticated.");
      return;
    }

    setLoading(true);

    try {
      const db = getFirestore();
      const resumesRef = collection(db, "usersByEmail", user.email, "resumes");
      const resumeRef = doc(resumesRef, `resume-${resume.resumeId}`);

      await deleteDoc(resumeRef);

      toast.success("Resume Deleted!");
      refreshData();
    } catch (error) {
      console.error("Error deleting resume:", error);
      toast.error("Failed to delete resume.");
    } finally {
      setLoading(false);
      setOpenAlert(false);
    }
  };

  return (
    <div>
      <Link to={`/dashboard/${user.email}/${resume.resumeId}/view`}>
        <div
          className="p-14 bg-gradient-to-bl from-slate-200 to-slate-50  h-[280px] rounded-t-lg border-t-4"
          style={{
            borderColor: "rgb(76, 135, 255)",
          }}
        >
          <div className="flex items-center justify-center h-[180px]">
            <img
              src="https://cdn-icons-png.flaticon.com/512/5988/5988999.png"
              
              className="hover:rotate-6 hover:scale-125 transition-all"
            />
          </div>
        </div>
      </Link>
      <div
        className="border p-3 flex justify-between text-white rounded-b-lg shadow-lg"
        style={{
          background: "rgb(76, 135, 255)",
        }}
      >
        <h2 className="text-sm">Resume ID: {resume.resumeId}</h2>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-4 w-4 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => navigate(`/dashboard/${user.email}/${resume.resumeId}/edit`)}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate(`/dashboard/${user.email}/${resume.resumeId}/view`)}
            >
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate(`/dashboard/${user.email}/${resume.resumeId}/view`)}
            >
              Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAlert(true)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={openAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                resume and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} disabled={loading}>
                {loading ? <Loader2Icon className="animate-spin" /> : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default ResumeItem;
