import ServerAvailability from "@/components/server-availablity";

function Footer() {
  return (
    <footer className="w-full text-sm flex flex-col items-center px-3">
      <div className="w-full">
        <hr className="border-foreground/10" />
      </div>
      <div className="w-full py-3.5 flex flex-col items-center justify-center">
        <div className="mt-2">
          <a
            href="https://github.com/meeting-baas/meeting-bot-as-a-service/apps/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Open-source meeting interface
          </a>{" "}
          by Meeting Baas 🐟
        </div>

        <ServerAvailability />
      </div>
    </footer>
  );
}

export default Footer;