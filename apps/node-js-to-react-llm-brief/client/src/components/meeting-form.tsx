"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

import axios from "axios";
import { toast } from "sonner";

const formSchema = z.object({
  meetingURL: z.string().url().nonempty("Meeting URL is required"),
  meetingBotName: z.string().optional(),
  // meetingBotImage: z.string().url().optional(),
  meetingBotEntryMessage: z.string().optional(),
  apiKey: z.string().optional(),
});

export function MeetingForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      meetingURL: "",
      meetingBotName: "",
      // meetingBotImage: "",
      meetingBotEntryMessage: "",
      apiKey: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.post("/api/form", values);
      console.log(response.data);
      toast.success("Meeting bot created successfully");
    } catch (error) {
      console.error("Error adding meeting bot:", error);
      toast.error("Failed to create meeting bot");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="meetingURL"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meeting URL *</FormLabel>
              <FormControl>
                <Input type="url" placeholder="Enter meeting URL" {...field} />
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
                  placeholder="Enter meeting bot name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="meetingBotImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meeting Bot Image (optional)</FormLabel>
              <FormControl>
                <Input type="url" placeholder="Enter URL for meeting bot image" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="meetingBotEntryMessage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meeting Bot Entry Message (optional)</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter meeting bot entry message"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* this doesn't really make sense if you think about it */}
        {/* <FormField
          control={form.control}
          name="apiKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>API Key (optional)</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter API key" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
