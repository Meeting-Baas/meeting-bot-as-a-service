import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
    // ArrowLeft, 
    ArrowUpIcon 
} from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";

import {
  Form,
  FormControl,
//   FormDescription,
  FormField,
  FormItem,
//   FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

export const formSchema = z.object({
  message: z.string().trim().min(2, {
    message: "Message must be at least 2 characters.",
  }),
});

function ChatInput({
  handleSubmit,
}: {
  handleSubmit: (values: z.infer<typeof formSchema>) => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      handleSubmit(values);

      form.reset({ message: "" });
      toast.success("Message sent successfully");
    } catch (error) {
      console.error("Error sending message:", error);

      form.reset({ message: "" });
      toast.error("Failed to send message");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative w-full">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Type your message..."
                  rows={1}
                  className="min-h-[48px] rounded-2xl resize-none p-4 border shadow-sm"
                  onKeyDown={(e) => {
                    if (
                      e.key === "Enter" &&
                      !e.shiftKey &&
                      "form" in e.target
                    ) {
                      e.preventDefault();
                      (e.target.form as HTMLFormElement).requestSubmit();
                    }
                  }}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          size="icon"
          className="absolute w-8 h-8 top-2.5 right-3"
        >
          <ArrowUpIcon className="w-4 h-4" />
          <span className="sr-only">Send</span>
        </Button>
      </form>
    </Form>
  );
}

export default ChatInput;
