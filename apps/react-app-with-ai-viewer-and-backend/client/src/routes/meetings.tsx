import { HeaderTitle } from "@/components/header-title";
import { ImportMeeting } from "@/components/import-meeting";
import MeetingTable from "@/components/meeting-table";

function Meetings() {
  return (
    <div className="h-full p-8">
      <div className="pb-4">
        <HeaderTitle path="/" title="Recordings" />
      </div>

      <div className="py-4">
        <ImportMeeting />
      </div>
      <MeetingTable />
    </div>
  );
}

export default Meetings;