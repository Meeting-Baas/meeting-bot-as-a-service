import * as React from "react";
import { Link } from "react-router-dom";
import { Player as VideoPlayer } from "@/components/video-player/video-player";
import Transcript from "@/components/video-player/transcript";
import { MediaPlayerInstance } from "@vidstack/react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { 
  ArrowLeft, 
  // ArrowUpIcon 
} from "lucide-react";

import {
  Card,
  CardHeader,
  CardContent,
  // CardFooter,
} from "@/components/ui/card";
import Editor from "@/components/editor";
import Message from "@/components/chat/message";
import ChatInput, { formSchema as chatSchema } from "@/components/chat/chat-input";
import { z } from "zod";

import data from "@/data/meeting.json";

export type MeetingInfo = {
  data: {
    id: string;
    name: string;
    editors: [
      {
        video: {
          transcripts: [
            {
              speaker: string;
              words: [
                {
                  start_time: number;
                  end_time: number;
                  text: string;
                }
              ];
            }
          ];
        };
      }
    ];
    assets: [
      {
        mp4_s3_path: string;
      }
    ];
  };
};

function Meeting() {
  const [transcripts, setTranscripts] = React.useState<any[]>([
    {
      speaker: "",
      words: [
        {
          start_time: 0,
          end_time: 0,
          text: "",
        },
      ],
    },
  ]);

  const [player, setPlayer] = React.useState<MediaPlayerInstance>();
  const [currentTime, setCurrentTime] = React.useState(0);

  const [messages, setMessages] = React.useState<
    { content: string; role: string }[]
  >([]);

  const [isLoading, setIsLoading] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleChatSubmit = async (values: z.infer<typeof chatSchema>) => {
    const message = values.message;
    setMessages((prev) => [
      ...prev, 
      { content: message, role: "user" }
    ]);
    // setIsLoading(true);

    // axios handling
    try {
      let messagesList = [];

      transcripts.forEach((transcript) => {
        let text: string = "";
        transcript.words.forEach((word: { text: string }) => {
          text += word.text + " ";
        });
        messagesList.push({ content: text, role: "user" });
      });

      messagesList.push(...messages);
      messagesList.push({ content: message, role: "user" })

      setMessages((prev) => [
        ...prev,
        { content: "AI Response here.", role: "assistant" },
      ]);
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleTimeUpdate = React.useCallback((time: number) => {
    setCurrentTime(time);
  }, []);

  const handleSeek = React.useCallback(
    (time: number) => {
      if (player) {
        console.log(time);
        // todo: implement this
        player.pause();
      }
    },
    [player]
  );

  const setPlayerRef = React.useCallback((player: MediaPlayerInstance) => {
    setPlayer(player);
  }, []);

  React.useEffect(() => {
    if (data?.data.editors.length > 0) {
      const editors = data?.data.editors;
      const transcripts: MeetingInfo["data"]["editors"][0]["video"]["transcripts"][0][] =
        [];
      editors.forEach((editor) => {
        transcripts.push(...editor.video.transcripts);
      });

      console.log(transcripts);
      setTranscripts(transcripts);
    }
  }, [data]);

  return (
    <div className="p-8">
      <Link
        to={`/`}
        className="flex text-sm items-center py-2 gap-1 hover:text-muted-foreground w-min"
      >
        <ArrowLeft />
        <p>Back</p>
      </Link>
      <h1 className="text-2xl font-bold">Video Player</h1>
      {/* url={data?.data.assets[0].mp4_s3_path} */}
      {/* data?.data.editors[0].video.transcripts */}
      <ResizablePanelGroup
        className="flex py-6 min-h-[85dvh]"
        direction={isDesktop ? "horizontal" : "vertical"}
      >
        <ResizablePanel defaultSize={50} minSize={25}>
          <ResizablePanelGroup
            direction="vertical"
            className={cn("flex w-full h-full")}
          >
            <ResizablePanel defaultSize={50} minSize={25}>
              <div className="flex flex-1 h-full rounded-b-none overflow-hidden">
                <VideoPlayer
                  // src={data?.data.meeting.video_url}
                  // src={"https://files.vidstack.io/sprite-fight/720p.mp4"}
                  src={data?.data.assets[0].mp4_s3_path}
                  onTimeUpdate={handleTimeUpdate}
                  setPlayer={setPlayerRef}
                />
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50} minSize={15}>
              <div className="flex-1 bg-background rounded-t-none border-y border-l p-4 md:p-6 space-y-2 max-h-full h-full overflow-auto">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold px-0.5">
                    Meeting Transcript
                  </h2>
                  {/* <p className="text-muted-foreground">
                  A detailed transcript of the video meeting.
                </p> */}
                </div>
                {isLoading && (
                  <div className="flex items-center w-full h-full px-0.5">
                    Loading...
                  </div>
                )}
                <Transcript
                  transcript={transcripts}
                  currentTime={currentTime}
                  onWordClick={handleSeek}
                />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50} minSize={25}>
          <ResizablePanelGroup
            direction="vertical"
            className={cn("flex w-full h-full")}
          >
            <ResizablePanel defaultSize={50} minSize={25}>
              <Editor
                initialValue={undefined}
                onChange={(v) => {
                  console.log("editor changed", v);
                }}
              />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50} minSize={25}>
              <Card className="h-full w-full mx-auto rounded-none relative border-0 border-b border-r flex flex-col">
                <CardHeader className="flex items-center gap-4 p-4 border-b">
                  <div className="text-sm font-medium">ChatGPT</div>
                </CardHeader>
                <CardContent className="p-4 flex flex-col gap-4 overflow-auto h-full">
                  <div className="overflow-auto h-full flex flex-col gap-4">
                    {messages.length === 0 && (
                      <div className="text-muted-foreground text-center flex w-full h-full items-center justify-center">
                        Start a conversation with ChatGPT
                      </div>
                    )}
                    {messages.map((message, index) => (
                      <Message key={index} message={message} />
                    ))}
                  </div>

                  <div className="flex items-end flex-1">
                    <ChatInput handleSubmit={handleChatSubmit} />
                  </div>
                </CardContent>
              </Card>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default Meeting;
