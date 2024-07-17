import axios from "axios";
import { useEffect } from "react";

import { cn } from "@/lib/utils";
import { baasApiKeyAtom, serverAvailabilityAtom } from "@/store";
import { useAtom } from "jotai";

function ServerAvailablity() {
  const [serverAvailability, setServerAvailablity] = useAtom(
    serverAvailabilityAtom
  );
  const [baasApiKey] = useAtom(baasApiKeyAtom);

  const checkServerAvailability = async () => {
    try {
      const response = await axios.get("/api/health");
      if (response.status === 200) {
        setServerAvailablity("server");
      } else {
        if (baasApiKey) {
          setServerAvailablity("local");
        } else {
          setServerAvailablity("error");
        }
      }
    } catch (error) {
      if (baasApiKey) {
        setServerAvailablity("local");
      } else {
        setServerAvailablity("error");
      }
    }
  };

  useEffect(() => {
    checkServerAvailability();
  }, [baasApiKey]);

  return (
    <div className="flex items-center gap-2 text-sm">
      <span
        className={cn(
          "w-3.5 h-3.5 border-2 border-white dark:border-gray-800 rounded-full",
          {
            "bg-green-500": serverAvailability === "server",
            "bg-yellow-500": serverAvailability === "local",
            "bg-red-500": serverAvailability === "error",
          }
        )}
      />
      {serverAvailability === "server"
        ? "Connected to API Backend"
        : serverAvailability === "local"
        ? "Running on localstorage"
        : "Invalid or missing API Keys"}
    </div>
  );
}

export default ServerAvailablity;
