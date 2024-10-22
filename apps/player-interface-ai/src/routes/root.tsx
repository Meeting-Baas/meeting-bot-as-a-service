import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function Root() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[100dvh] space-y-2">
      <h1 className="text-2xl font-bold">Meeting BAAS 🐟</h1>
      <div className="flex flex-col gap-2 items-center w-52">
        <Button className="w-full" asChild>
          <Link to="/player">Video Player</Link>
        </Button>
      </div>
    </div>
  );
}

export default Root;
