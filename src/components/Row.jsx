import { useNavigate } from "react-router-dom";
import "../styles/row.css";
import videos from "../data/videos";

function Row({ title }) {
  const navigate = useNavigate();

  const filteredVideos = videos.filter(
    (video) => video.category === title
  );

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row-posters">
        {filteredVideos.map((video) => (
          <img
            key={video.id}
            src={video.thumbnail}
            alt={video.title}
            className="poster"
            onClick={() => navigate(`/watch/${video.id}`)}
          />
        ))}
      </div>
    </div>
  );
}

export default Row;