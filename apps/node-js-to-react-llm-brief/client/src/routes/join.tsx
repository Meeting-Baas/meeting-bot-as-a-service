import { Link } from "react-router-dom";
import { MeetingForm } from "../components/meeting-form";
import { ArrowLeft } from "lucide-react";

function Join() {
  return (
    <div className="p-8">
      <Link
        to={`/meetings`}
        className="flex text-sm items-center py-2 gap-1 hover:text-muted-foreground w-min"
      >
        <ArrowLeft />
        <p>Back</p>
      </Link>
      <h1 className="text-2xl font-bold">Join a Meeting</h1>
      <MeetingForm />
    </div>
  );
}

export default Join;
