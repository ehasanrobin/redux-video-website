import { useGetVideosQuery } from "../../features/apiSlice/apiSlice";
import Error from "../ui/Error";
import VideoLoader from "../ui/loaders/VideoLoader";
import Video from "./Video";

export default function Videos() {
  const { data: videos, isError, isLoading, error } = useGetVideosQuery();

  let content;

  if (isLoading && !isError) {
    content = (
      <>
        <VideoLoader></VideoLoader>
        <VideoLoader></VideoLoader>
        <VideoLoader></VideoLoader>
        <VideoLoader></VideoLoader>
      </>
    );
  }

  if (!isLoading && isError) {
    content = <Error message={error}></Error>;
  }
  if (!isLoading && !isError && videos.length === 0) {
    content = <Error message="No Videos Found"></Error>;
  }
  if (!isLoading && !isError && videos.length > 0) {
    content = videos.map((video) => <Video video={video} />);
  }

  return <>{content}</>;
}
