import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { gladiaApiKeyAtom } from "@/store/index";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { UploadCloudIcon } from "lucide-react";
import { toast } from "sonner";
import { startTranscription, uploadFile } from "./gladia";

import convertToWav from "./audioBufferToWav";
import { convertToBuffer, extractAudio } from "./utils";

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB (100 * 1024 KB * 1024 bytes)
const ACCEPTED_FILE_TYPES = [
  "video/mp4",
  "video/avi",
  "video/mkv",
  "video/mov",
  "video/wmv",
  "video/webm",
  "audio/mpeg",
  "audio/mp3",
  "audio/wav",
  "audio/ogg",
  "audio/aac",
  "audio/flac",
];

const formSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size < MAX_FILE_SIZE, {
      message: "Your file must be less than 100MB.",
    })
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file?.type),
      "Only .mp4, .avi, .mkv, .mov, .wmv, .webm, .mpeg, .mp3, .wav, .ogg, .aac, and .flac formats are supported."
    ),
});

export function Upload({ children }: { children: React.ReactNode }) {
  const [gladiaApiKey, _] = useAtom(gladiaApiKeyAtom);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const { file } = values;
    const loading = toast.loading("Processing file...");

    try {
      const buffer = await convertToBuffer(file);
      const audio = await extractAudio(buffer);
      const wav = convertToWav(audio);
      const blob = new Blob([wav], { type: "audio/wav" });

      // todo: leaked api key, remove later (lol)
      const uploadURL = await uploadFile(blob, gladiaApiKey);
      const transcript = await startTranscription(
        uploadURL.audio_url,
        gladiaApiKey
      );

      console.log(transcript);
      toast.success("File processed successfully!", { id: loading });
    } catch (error) {
      console.error("Error generating transcript:", error);
      toast.error("Oops! Something went wrong, please try again later", {
        id: loading,
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload a file from your device</DialogTitle>
          <DialogDescription>
            {
              "Supported formats: .mp4, .avi, .mkv, .mov, .wmv, .webm, .mpeg, .mp3, .wav, .ogg, .aac, and .flac."
            }
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="file"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>File</FormLabel>
                  <FormControl>
                    <Input
                      {...fieldProps}
                      type="file"
                      accept="audio/*,video/*"
                      onChange={(event) =>
                        onChange(event.target.files && event.target.files[0])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">
                <UploadCloudIcon className="w-4 h-4 mr-2" /> Upload
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
