"use client";

import { joinMeetingWrapper as joinMeeting } from "@/lib/axios";
import { baasApiKeyAtom, meetingsAtom, serverAvailablityAtom } from "@/store";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  DEFAULT_BOT_IMAGE,
  DEFAULT_BOT_NAME,
  DEFAULT_ENTRY_MESSAGE,
} from "@meeting-baas/shared";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Remove the axios import

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleAlertIcon, TerminalIcon, TriangleAlertIcon } from "lucide-react";

import { useAtom } from "jotai";

const formSchema = z.object({
  meetingURL: z.string().url().nonempty("Meeting URL is required"),
  meetingBotName: z.string().optional(),
  meetingBotImage: z.string().url().optional(),
  meetingBotEntryMessage: z.string().optional(),
});

export function MeetingAlert(props: { mode: "server" | "local" | "error" }) {
  return (
    <div className="my-2">
      {props.mode === "server" ? (
        <Alert className="bg-blue-300/10 border-blue-300/30">
          <TerminalIcon className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            Connected to API Backend.
            {/* {customAxios && customAxios.defaults && (
          <>
            {" @"}
            {customAxios.defaults.baseURL}
          </>
        )} */}
          </AlertDescription>
        </Alert>
      ) : props.mode === "local" ? (
        <Alert className="bg-blue-300/10 border-blue-300/30">
          <TriangleAlertIcon className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            We're using your browser's local storage as there is no server to
            connect to.{" "}
            <p>
              Get your back-end running by following our{" "}
              <a
                href="https://github.com/Meeting-Baas/Meeting-Bot-As-A-Service/main/apps"
                target="_blank"
                className="underline font-semibold"
              >
                GitHub tutorial
              </a>
              .
            </p>
          </AlertDescription>
        </Alert>
      ) : (
        <Alert className="bg-yellow-300/10 border-yellow-300/30">
          <CircleAlertIcon className="h-4 w-4" />
          <AlertTitle>No API key defined</AlertTitle>
          <AlertDescription>
            You don't have an API key, or a back-end connected which could
            replace it. Head{" "}
            <a href="/settings" className="underline font-semibold">
              here
            </a>
            .
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

export function MeetingForm() {
  const [baasApiKey] = useAtom(baasApiKeyAtom);
  const [serverAvailablity] = useAtom(serverAvailablityAtom);
  const [meetings, setMeetings] = useAtom(meetingsAtom);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      meetingURL: "",
      meetingBotName: DEFAULT_BOT_NAME,
      meetingBotEntryMessage: DEFAULT_ENTRY_MESSAGE,
      meetingBotImage: DEFAULT_BOT_IMAGE,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { meetingURL, meetingBotName, meetingBotEntryMessage } = values;
      const result = await joinMeeting({
        baasApiKey,
        serverAvailablity,
        params: {
          meetingURL,
          meetingBotName,
          meetingBotEntryMessage,
          apiKey: baasApiKey,
        },
      });

      if ("error" in result) {
        throw new Error(result.error);
      }

      const apiSource =
        serverAvailablity === "server" ? "server API" : "local implementation";

      const newMeeting = {
        bot_id: result.data.bot_id,
        name: "New Meeting",
        attendees: ["-"],
        createdAt: new Date(),
      };
      setMeetings([...meetings, newMeeting]);
      // setMeetings((prevMeetings) => {
      //   const newMeetings = [...prevMeetings, { bot_id: result.data.bot_id, name: "New Meeting", attendees: ['-'], created_at: new Date() }];
      //   return newMeetings;
      // });
      console.log(result.data);
      toast.success(`Meeting bot created successfully using ${apiSource}`);
    } catch (error) {
      console.error("Error adding meeting bot:", error);
      toast.error("Failed to create meeting bot");
    }
  }

  console.log("bassApiKey", baasApiKey);

  return (
    <>
      <div className="bg-white">
        <MeetingAlert mode={serverAvailablity} />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="meetingURL"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meeting URL *</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="Enter meeting URL"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="meetingBotName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meeting Bot Name (optional)</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder={DEFAULT_BOT_NAME}
                    className={!field.value ? "text-gray-400" : ""}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="meetingBotImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meeting Bot Image (optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder={DEFAULT_BOT_IMAGE}
                    className={!field.value ? "text-gray-400" : ""}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="meetingBotEntryMessage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meeting Bot Entry Message (optional)</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder={DEFAULT_ENTRY_MESSAGE}
                    className={!field.value ? "text-gray-400" : ""}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}