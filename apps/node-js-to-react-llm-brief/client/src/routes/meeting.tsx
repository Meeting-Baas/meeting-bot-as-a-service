import * as React from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
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
import { ArrowLeft, ArrowUpIcon } from "lucide-react";

import {
  Card,
  CardHeader,
  CardContent,
  // CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Editor from "@/components/editor";

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

  const [isLoading, setIsLoading] = React.useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const fetchData = async () => {
    try {
      const res = await axios.get<MeetingInfo>(`/api/meeting/${botId}`);

      console.log("response", res);
      setData(res.data);
      setIsLoading(false);
    } catch (error) {
      console.error("error", error);
      setIsLoading(false);
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
    fetchData();
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
        to={`/meetings`}
        className="flex text-sm items-center py-2 gap-1 hover:text-muted-foreground"
      >
        <ArrowLeft />
        <p>Back</p>
      </Link>
      <h1 className="text-2xl font-bold">Viewing Meeting - {botId}</h1>
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
                  src={"https://files.vidstack.io/sprite-fight/720p.mp4"}
                  onTimeUpdate={handleTimeUpdate}
                  setPlayer={setPlayerRef}
                />
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50} minSize={15}>
              <div className="flex-1 bg-background rounded-t-none border-y border-l p-4 md:p-6 space-y-2 min-h-full">
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
              <Editor initialValue={undefined} onChange={(v) => {
                console.log("editor changed", v);
              }} />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50} minSize={25}>
              <Card className="h-full w-full mx-auto rounded-none relative border-0 border-b border-r">
                <CardHeader className="flex items-center gap-4 p-4 border-b">
                  <div className="text-sm font-medium">ChatGPT</div>
                </CardHeader>
                <CardContent className="p-4 flex flex-col gap-4 h-[calc(100%-7.125rem)]">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-8 h-8 border">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>YO</AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg p-3 max-w-[70%] text-sm">
                      <p>Hi there!</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 justify-end">
                    <div className="bg-primary rounded-lg p-3 max-w-[70%] text-sm text-primary-foreground">
                      <p>Hi! How can I assist you today?</p>
                    </div>
                    <Avatar className="w-8 h-8 border">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>GPT</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex items-start gap-4">
                    <Avatar className="w-8 h-8 border">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>YO</AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg p-3 max-w-[70%] text-sm">
                      <p>I need help with...</p>
                    </div>
                  </div>

                  <div className="absolute left-0 bottom-0 w-full">
                    <div className="relative p-2">
                      <Textarea
                        placeholder="Type your message..."
                        name="message"
                        id="message"
                        rows={1}
                        className="min-h-[48px] rounded-2xl resize-none p-4 border shadow-sm"
                      />
                      <Button
                        type="submit"
                        size="icon"
                        className="absolute w-8 h-8 top-[18px] right-5"
                      >
                        <ArrowUpIcon className="w-4 h-4" />
                        <span className="sr-only">Send</span>
                      </Button>
                    </div>
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
