import Transcript from "@/components/transcript";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Player as VideoPlayer } from "@/components/video-player";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { MediaPlayerInstance } from "@vidstack/react";
import axios from "axios";
import * as React from "react";
import { useParams } from "react-router-dom";

import Chat, { Message } from "@/components/chat";
import { formSchema as chatSchema } from "@/components/chat/chat-input";
import Editor from "@/components/editor";
import { fetchBotDetailsWrapper as fetchBotDetails } from "@/lib/axios";
import { toast } from "sonner";
import { z } from "zod";

import { HeaderTitle } from "@/components/header-title";

import { baasApiKeyAtom, serverAvailablityAtom } from "@/store";
import { useAtom } from "jotai";

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
  let { botId } = useParams();

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
      assets: [
        {
          mp4_s3_path: "",
        },
      ],
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
  const [serverAvailablity] = useAtom(serverAvailablityAtom);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const fetchData = async () => {
    try {
      const res = await fetchBotDetails({
        baasApiKey,
        serverAvailablity,
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

      const res = await axios.post("/api/chat", {
        messages: messagesList,
      });

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

  React.useEffect(() => {
    if (!baasApiKey) return;
    fetchData();
  }, [baasApiKey]);

  React.useEffect(() => {
    if (!baasApiKey) return;
    let url = data?.data?.assets[0]?.mp4_s3_path;
    url = url.replace("https://s3.eu-west-3.amazonaws.com/bots-videos", "");
    if (!url) return;
    setMeetingURL("/s3" + url);
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
                  // src={}
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

export default Meeting;