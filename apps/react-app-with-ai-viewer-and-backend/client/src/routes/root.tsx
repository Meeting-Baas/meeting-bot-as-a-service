import { Button } from "@/components/ui/button";
import { Upload } from "@/components/upload";
import { SettingsIcon } from "lucide-react";
import { Link } from "react-router-dom";

function Root() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[calc(100dvh-94px)] space-y-2 relative">
      <div className="flex flex-col items-center justify-center w-full max-w-md">
        <Button
          variant="ghost"
          className="w-full h-20 text-4xl font-extrabold text-gray-800 mb-2"
        >
          <Link to="https://meetingbaas.com"> Meeting Baas 🐟</Link>
        </Button>
        <div className="flex gap-4 pb-2 items-center w-full">
          <Button className="flex-1" variant="secondary" asChild>
            <Link to="/settings">
              <SettingsIcon className="w-4 h-4 mr-2" /> API Keys
            </Link>
          </Button>
          <Button className="flex-1" variant="outline" asChild>
            <Link to="/meetings">Recordings</Link>
          </Button>
        </div>
        <div className="flex gap-4 w-full">
          <Upload>
            <Button className="flex-1 h-16 text-lg">Upload File</Button>
          </Upload>
          <Button className="flex-1 h-16 text-lg" asChild>
            <Link to="/join">Record Meeting</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Root;
