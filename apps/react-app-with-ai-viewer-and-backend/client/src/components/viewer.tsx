import Transcript from "@/components/transcript";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Player as VideoPlayer } from "@/components/video-player";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn, fetchBotData, MeetingInfo } from "@/lib/utils";
import { MediaPlayerInstance } from "@vidstack/react";
import axios from "axios";
import * as React from "react";

import Chat, { Message } from "@/components/chat";
import { formSchema as chatSchema } from "@/components/chat/chat-input";
import Editor from "@/components/editor";
import { fetchBotDetailsWrapper as fetchBotDetails } from "@/lib/axios";
import { serverAvailabilityAtom } from "@/store";

import { toast } from "sonner";
import { z } from "zod";

import { HeaderTitle } from "@/components/header-title";

import { baasApiKeyAtom } from "@/store";
import { useAtom } from "jotai";
import NotFound from "./../routes/not-found";

type ViewerProps = {
  isBaasRecording: boolean;
  botId?: string;
};

export function Viewer({ isBaasRecording = true, botId }: ViewerProps) {
  const [serverAvailability] = useAtom(serverAvailabilityAtom);

  if (isBaasRecording) {
    // this doesn't check if the bot-id is valid in any
    // case
    if (!botId) {
      return <NotFound />;
    }
    fetchBotData(botId, serverAvailability);
  } else {
  }

  const [data, setData] = React.useState<MeetingInfo>({
    data: {
      id: "",
      name: "",
      editors: [
        {
          video: {
            transcripts: [
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
            ],
          },
        },
      ],
      attendees: [{ name: "-" }],
      assets: [
        {
          mp4_s3_path: "",
        },
      ],
      created_at: {
        secs_since_epoch: 0,
        nanos_since_epoch: 0,
      },
    },
  });
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

  const [messages, setMessages] = React.useState<Message[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [meetingURL, setMeetingURL] = React.useState("");

  const [baasApiKey] = useAtom(baasApiKeyAtom);
  // const [serverAvailability] = useAtom(serverAvailabilityAtom);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleChatSubmit = async (values: z.infer<typeof chatSchema>) => {
    const message = values.message;
    setMessages((prev) => [...prev, { content: message, role: "user" }]);
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
      messagesList.push({ content: message, role: "user" });

      let res: {
        data: {
          response: string;
        };
      };
      if (serverAvailability === "server") {
        res = await axios.post("/api/chat", {
          messages: messagesList,
        });
      } else {
        res = {
          data: {
            response:
              "This feature is not available without access to the backend",
          },
        };
      }

      setMessages((prev) => [
        ...prev,
        { content: res.data.response, role: "assistant" },
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
        // seek on click
        player.currentTime = time;
      }
    },
    [player]
  );

  const setPlayerRef = React.useCallback((player: MediaPlayerInstance) => {
    setPlayer(player);
  }, []);

  // TODO:
  // if we passed a promise to Meeting itself
  // it'd be better...
  // const fetchData = async () => {
  //   setIsLoading(true);
  //   try {
  //     const fetchedData = await fetchDataFunction();
  //     setData(fetchedData);
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.error("error", error);
  //     toast.error("Failed to fetch meeting data");
  //     setIsLoading(false);
  //   }
  // };
  const fetchData = async () => {
    try {
      const res = await fetchBotDetails({
        baasApiKey,
        serverAvailability,
        botId: botId || "",
        raw: true,
      });

      console.log("response", res);

      setData(res.data);
      setIsLoading(false);
    } catch (error) {
      console.error("error", error);
      toast.error("Failed to fetch meeting data");
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (isBaasRecording) {
      if (!botId) {
        // Handle the case when botId is not provided
        toast.error("No bot ID provided");
        return;
      }
      if (!baasApiKey) return;
      fetchData();
    } else {
      // Handle non-Baas recording case
    }
  }, [isBaasRecording, botId, serverAvailability]);

  // React.useEffect(() => {
  //   if (!baasApiKey) return;
  //   fetchData();
  // }, []);

  // this should come along the loaded data or props and doesn't make sense.
  React.useEffect(() => {
    if (!baasApiKey) return;
    let url = data?.data?.assets[0]?.mp4_s3_path;
    if (!url) return;
    url = url.split("/bots-videos/")[1];
    if (!url) return;
    setMeetingURL("/replace/" + url);
  }, [baasApiKey, data]);

  React.useEffect(() => {
    if (data?.data?.editors?.length > 0) {
      const editors = data.data.editors;
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
    <>
      <div className="px-4 py-2">
        <HeaderTitle path="/meetings" title={`Viewing Meeting`} />
      </div>
      <ResizablePanelGroup
        className="flex min-h-[200dvh] lg:min-h-[85dvh]"
        direction={isDesktop ? "horizontal" : "vertical"}
      >
        <ResizablePanel defaultSize={100} minSize={25}>
          <ResizablePanelGroup
            direction="vertical"
            className={cn("flex w-full h-full")}
          >
            <ResizablePanel defaultSize={50} minSize={25}>
              <div className="flex flex-1 h-full rounded-b-none overflow-hidden border-0 border-t border-x border-b lg:border-0 lg:border-b lg:border-t lg:border-l">
                <VideoPlayer
                  src={meetingURL}
                  onTimeUpdate={handleTimeUpdate}
                  setPlayer={setPlayerRef}
                />
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50} minSize={15}>
              <div className="flex-1 bg-background rounded-t-none border-0 border-x lg:border-0 lg:border-b lg:border-l p-4 md:p-6 space-y-2 max-h-full h-full overflow-auto">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold px-0.5">
                    Meeting Transcript
                  </h2>
                  {/* <p className="text-muted-foreground">
                    A detailed transcript of the video meeting.
                  </p> */}
                </div>
                {isLoading && <div className="flex px-0.5">Loading...</div>}
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
        <ResizablePanel defaultSize={100} minSize={25}>
          <ResizablePanelGroup
            direction="vertical"
            className={cn("flex w-full h-full")}
          >
            <ResizablePanel defaultSize={67} minSize={25}>
              <Editor
                initialValue={undefined}
                onChange={(v) => {
                  console.log("editor changed", v);
                }}
              />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={33} minSize={25}>
              <Chat messages={messages} handleSubmit={handleChatSubmit} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}
