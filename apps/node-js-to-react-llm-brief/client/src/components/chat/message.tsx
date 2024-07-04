import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { BotMessageSquareIcon, UserIcon } from "lucide-react";

function Message({ message }: { message: { content: string; role: string } }) {
  return (
    <>
      <div
        className={cn("flex items-start gap-4", {
          "flex-row-reverse": message.role === "assistant",
        })}
      >
        <Avatar className="w-8 h-8 border">
          <AvatarFallback>
            {message.role === "assistant" ? (
              <BotMessageSquareIcon className="w-4 h-4" />
            ) : (
              <UserIcon className="w-4 h-4" />
            )}
          </AvatarFallback>
        </Avatar>
        <div
          className={cn("bg-muted rounded-lg p-3 max-w-[70%] text-sm", {
            "bg-primary text-primary-foreground": message.role === "assistant",
          })}
        >
          <p>{message.content}</p>
        </div>
      </div>
    </>
  );
}

export default Message;
