import { useGetRelatedVideosQuery } from "../../../features/apiSlice/apiSlice";
import Error from "../../ui/Error";
import RelatedVideoLoader from "../../ui/loaders/RelatedVideoLoader";
import RelatedVideo from "./RelatedVideo";

export default function RelatedVideos({ id, title }) {
  const {
    data: relatedVideos,
    isError,
    isLoading,
    error,
  } = useGetRelatedVideosQuery({
    id,
    title,
  });

  //   what to show
  let content;

  if (isLoading && !isError) {
    content = <RelatedVideoLoader></RelatedVideoLoader>;
  }
  if (!isLoading && isError) {
    content = <Error massage={error}></Error>;
  }

  if (!isLoading && !isError && relatedVideos.length === 0) {
    content = <Error massage={"No Related Videos Found"}></Error>;
  }
  if (!isLoading && !isError && relatedVideos.length > 0) {
    content = relatedVideos.map((relatedVideo) => (
      <RelatedVideo relatedVideo={relatedVideo} />
    ));
  }
  console.log(relatedVideos);
  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
      {content}
    </div>
  );
}
