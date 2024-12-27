import { useNavigate, useParams } from 'react-router-dom';
import { useGetVideoByIdQuery } from '../../store/videoApi';

function VideoDetailsPage() {
    const navigate = useNavigate();

    const { id } = useParams()

    const {data, isLoading, error} = useGetVideoByIdQuery({videoId: id})
    

    const formatedDate = data?.publishedAt ? new Date(data?.publishedAt).toLocaleDateString() : '';

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
                <button 
                    onClick={handleBackClick} 
                    className="mb-4 p-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-200"
                >
                    Back to Main Page
                </button>
                <div className="relative">
                    <img
                        src={data?.thumbnailUrl}
                        alt="Video Thumbnail"
                        className="w-full h-80 object-cover rounded-md"
                    />
                </div>
                <div className="mt-6 space-y-4">
                    <h1 className="text-3xl font-bold text-gray-800">
                        {data?.title}
                    </h1>
                    <p className="text-sm text-gray-500">
                        Published on: <span className="font-semibold">{formatedDate}</span>
                    </p>
                    <div className="flex items-center gap-4 text-gray-700">
                        <p>
                            <span className="font-bold">12,345</span> views
                        </p>
                        <p>
                            <span className="font-bold">567</span> likes
                        </p>
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        {data?.description}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default VideoDetailsPage;
