import { useParams } from "react-router-dom";
import videos from "../data/videos";
import { useEffect } from "react";

function Watch() {
  const { id } = useParams();
  const video = videos.find((v) => v.id === parseInt(id));

  useEffect(() => {
    if (video) {
      localStorage.setItem("lastWatched", JSON.stringify(video));
    }
  }, [video]);

  if (!video) return <h1>Video not found</h1>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{video.title}</h1>

      <video width="800" controls>
        <source src={video.url} type="video/mp4" />
      </video>
    </div>
  );
}

export default Watch;