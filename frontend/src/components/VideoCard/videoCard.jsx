import { Link } from 'react-router-dom';
import "../../App.css";

function VideoCard({ data, index }) {
  const delay = index * 0.1;

  const delayStyle = { animationDelay: `${delay}s`, opacity: 0 };

  const formatedDate = data.publishedAt ? new Date(data.publishedAt).toLocaleDateString() : '';

  return (
    <Link to={`/video/${data.videoId}`} className="fade-in" style={delayStyle}>
      <div className="cursor-pointer w-[380px] h-[360px] bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <img
          src={data?.thumbnailUrl}
          alt="Video Thumbnail"
          className="w-full h-[200px] object-cover"
        />
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 truncate">
            {data.title}
          </h2>
          <p className="text-gray-600 mt-3 text-base line-clamp-2">
            {data.description}
          </p>
          <p className="text-gray-400 mt-4 text-sm">
            {formatedDate}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;
