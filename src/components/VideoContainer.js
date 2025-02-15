// import React, { useEffect, useState } from "react";
// import { YOUTUBE_VIDEOS_API } from "../utils/contants";
// import VideoCard, { AdVideoCard } from "./VideoCard";
// import { Link } from "react-router-dom";

// const VideoContainer = () => {
//   const [videos, setVideos] = useState([]);

//   useEffect(() => {
//     getVideos();
//   }, []);

//   const getVideos = async () => {
//     const data = await fetch(YOUTUBE_VIDEOS_API);
//     const json = await data.json();
//     console.log("video container json:", json);
//     setVideos(json.items);
//   };

//   return (
//     <div className="flex flex-wrap">
//       {videos[0] && <AdVideoCard info={videos[0]} />}
//       {videos.map((video) => (
//         <Link key={video.id} to={"/watch?v=" + video.id}>
//           <VideoCard info={video} />
//         </Link>
//       ))}
//     </div>
//   );
// };

// export default VideoContainer;

import React, { useEffect, useState } from "react";
import { GOOGLE_API_KEY, YOUTUBE_VIDEOS_API } from "../utils/contants";
import VideoCard, { AdVideoCard } from "./VideoCard";
import { Link } from "react-router-dom";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    try {
      const response = await fetch(YOUTUBE_VIDEOS_API, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${GOOGLE_API_KEY}`, // Replace with your access token
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const json = await response.json();
      console.log("video container json:", json);
      setVideos(json.items);
    } catch (error) {
      console.error("Fetching videos failed:", error);
    }
  };

  return (
    <div className="flex flex-wrap">
      {videos[0] && <AdVideoCard info={videos[0]} />}
      {videos.map((video) => (
        <Link key={video.id} to={"/watch?v=" + video.id}>
          <VideoCard info={video} />
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;
