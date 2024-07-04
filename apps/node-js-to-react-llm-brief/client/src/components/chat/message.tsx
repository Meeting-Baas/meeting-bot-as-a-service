import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

function Message({ message }: { message: { content: string; role: string } }) {
  return (
    <>
      <div
        className={cn("flex items-start gap-4", {
          "flex-row-reverse": message.role === "assistant",
        })}
      >
        <Avatar className="w-8 h-8 border">
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback>YO</AvatarFallback>
        </Avatar>
        <div className={cn("bg-muted rounded-lg p-3 max-w-[70%] text-sm", {
            "bg-primary text-primary-foreground": message.role === "assistant",
        })}>
          <p>{message.content}</p>
        </div>
      </div>
    </>
  );
}

export default Message;
