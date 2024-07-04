import * as React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
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
  const isDesktop = useMediaQuery("(min-width: 768px)")

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
        player.pause()
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
      <h1 className="text-2xl font-bold">Viewing Meeting - {botId}</h1>
      {/* url={data?.data.assets[0].mp4_s3_path} */}
      {/* data?.data.editors[0].video.transcripts */}
      <ResizablePanelGroup
        direction={isDesktop ? "horizontal" : "vertical"}
        className={cn("flex w-full mx-auto py-6 md:py-8", {
          "min-h-[calc(85dvh)]": !isDesktop,
        })}
      >
        <ResizablePanel defaultSize={55} minSize={25}>
          <div className="flex flex-1 h-full rounded-b-none sm:rounded-l-lg overflow-hidden">
            <VideoPlayer
              // src={data?.data.meeting.video_url}
              src={"https://files.vidstack.io/sprite-fight/720p.mp4"}
              onTimeUpdate={handleTimeUpdate}
              setPlayer={setPlayerRef}
            />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={45} minSize={15}>
          <div className="flex-1 bg-background rounded-t-none sm:rounded-r-lg border p-6 md:p-8 space-y-2 min-h-full">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Meeting Transcript
              </h2>
              {/* <p className="text-muted-foreground">
              A detailed transcript of the video meeting.
            </p> */}
            </div>
            {isLoading && (
              <div className="flex items-center justify-center w-full h-full">
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
    </div>
  );
}

export default Meeting;
