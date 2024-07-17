import { Viewer } from "@/components/viewer";
import { useParams } from "react-router-dom";

export function Meeting() {
  const { botId } = useParams();
  return <Viewer isBaasRecording={true} botId={botId} />;
}

export default Meeting;
