import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Row from "../components/Row";
import videos from "../data/videos";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [lastVideo, setLastVideo] = useState(null); 
  const navigate = useNavigate();

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  
  useEffect(() => {
    if (debouncedQuery.trim() === "") {
      setFilteredVideos([]);
    } else {
      const result = videos.filter((video) =>
        video.title.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
      setFilteredVideos(result);
    }
  }, [debouncedQuery]);

  
  useEffect(() => {
    const data = localStorage.getItem("lastWatched");
    if (data) {
      setLastVideo(JSON.parse(data));
    }
  }, []);

  return (
    <div>
      <Navbar onSearch={setSearchQuery} />
      <Banner />

      
      {lastVideo && !debouncedQuery && (
        <div style={{ margin: "20px" }}>
          <h2>Continue Watching</h2>
          <img
            src={lastVideo.thumbnail}
            alt={lastVideo.title}
            style={{ width: "200px", cursor: "pointer" }}
            onClick={() => navigate(`/watch/${lastVideo.id}`)}
          />
        </div>
      )}

      
      {debouncedQuery && (
        <div style={{ margin: "20px" }}>
          <h2>Search Results</h2>

          <div style={{ display: "flex" }}>
            {filteredVideos.map((video) => (
              <img
                key={video.id}
                src={video.thumbnail}
                alt={video.title}
                style={{ width: "200px", marginRight: "10px", cursor: "pointer" }}
                onClick={() => navigate(`/watch/${video.id}`)}
              />
            ))}
          </div>
        </div>
      )}

      
      {!debouncedQuery && (
        <>
          <Row title="Cyber Attacks" />
          <Row title="DevSecOps" />
        </>
      )}
    </div>
  );
}

export default Home;