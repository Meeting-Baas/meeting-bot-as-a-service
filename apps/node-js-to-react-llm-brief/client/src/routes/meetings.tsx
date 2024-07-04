import MeetingTable from "@/components/meeting-table";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

function Meetings() {
  return (
    <div className="p-8">
      <Link to="/" className="flex text-sm items-center py-2 gap-1 hover:text-muted-foreground">
        <ArrowLeft /> 
        <p>Back</p>
      </Link>
      <h1 className="text-2xl font-bold">View Meetings</h1>
      <MeetingTable />
    </div>
  );
}

export default Meetings;
