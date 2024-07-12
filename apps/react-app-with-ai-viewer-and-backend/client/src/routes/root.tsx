import { Button } from "@/components/ui/button";
import { SettingsIcon } from "lucide-react";
import { Link } from "react-router-dom";

function Root() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[calc(100dvh-94px)] space-y-2 relative">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
          <a
            href="https://meetingbaas.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Meeting Baas 🐟
          </a>
        </h1>
        <div className="flex gap-2 items-center w-full">
          <div className="flex flex-col gap-2 w-1/2">
            <Button className="w-full" variant="secondary" asChild>
              <Link to="/settings">
                <SettingsIcon className="w-4 h-4 mr-2" /> API Keys
              </Link>
            </Button>
            <Button className="w-full" variant="outline" asChild>
              <Link to="/meetings">View Meetings</Link>
            </Button>
          </div>

          <Button className="w-1/2 min-h-fit" asChild>
            <Link
              to="/join"
              className="flex items-center justify-center h-[88px]"
            >
              Join Meeting
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Root;
