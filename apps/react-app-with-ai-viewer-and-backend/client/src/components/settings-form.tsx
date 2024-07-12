"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormState } from "react-hook-form";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useAtom } from "jotai";
import { toast } from "sonner";

import { baasApiKeyAtom, openAIApiKeyAtom } from "@/store";
import { useEffect } from "react";

const formSchema = z.object({
  baasApiKey: z.string().optional(),
  openAIApiKey: z.string().optional(),
});

export function SettingsForm() {
  const [baasApiKey, setBassApiKey] = useAtom(baasApiKeyAtom);
  const [openAIApiKey, setOpenAIApiKey] = useAtom(openAIApiKeyAtom);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      baasApiKey: baasApiKey,
      openAIApiKey: openAIApiKey,
    },
  });
  const { isDirty } = useFormState({ control: form.control });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Submitted values:", values);
    setBassApiKey(values.baasApiKey!);
    setOpenAIApiKey(values.openAIApiKey!);

    toast.success("API keys updated successfully");
    form.reset(values);
  }

  useEffect(() => {
    form.reset({
      baasApiKey: baasApiKey,
      openAIApiKey: openAIApiKey,
    });
  }, [baasApiKey, openAIApiKey]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="baasApiKey"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>Meeting Baas 🐟</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter API key" {...field} />
              </FormControl>
              <FormDescription>
                Record, transcribe and display video meetings. Get your Meeting
                Baas API key by visiting{" "}
                <Button variant="link" asChild className="p-0">
                  <a
                    href="https://meetingbaas.com/login"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    MeetingBaas
                  </a>
                </Button>
                .
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="openAIApiKey"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>OpenAI</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter API key" {...field} />
              </FormControl>
              <FormDescription>
                Optional. Used to "chat with your meetings". Get your key by
                visiting{" "}
                <Button variant="link" asChild className="p-0">
                  <a
                    href="https://platform.openai.com/api-keys"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    OpenAI
                  </a>
                </Button>
                .
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {isDirty && (
          <Button className="mt-8" type="submit" variant={"default"}>
            Save Changes
          </Button>
        )}
      </form>
    </Form>
  );
}
