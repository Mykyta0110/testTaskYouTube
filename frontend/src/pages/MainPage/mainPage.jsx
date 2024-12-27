import "../../App.css";
import { useState, useEffect } from "react";
import VideoCard from "../../components/VideoCard/videoCard";
import { useLazyGetVideosQuery } from "../../store/videoApi";
import Header from "../../components/Header/header";
import { useSelector } from "react-redux";
import Loader from "../../components/Loading/loading";
import { useNavigate } from "react-router-dom";

function MainPage() {
    const searchParams = new URLSearchParams(window.location.search);
    const queryParam = searchParams.get("q");

    const [getVideos, { data, isLoading }] = useLazyGetVideosQuery();
    const [pageToken, setPageToken] = useState(null);

    const error = useSelector((state) => state.videos.error);
    const navigate = useNavigate();

    useEffect(() => {
        if (queryParam) {
            getVideos({ query: queryParam, pageToken });
        }
        
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
        
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, [queryParam, pageToken, getVideos]);

    const [isVisible, setIsVisible] = useState(false);
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    const handleNextPage = () => {
        if (data?.nextPageToken) {
            const newPageToken = data.nextPageToken;
            setPageToken(newPageToken);
            navigate(`/?q=${queryParam}&pageToken=${newPageToken}`);
        }
    };

    const handlePrevPage = () => {
        if (data?.prevPageToken) {
            const newPageToken = data.prevPageToken;
            setPageToken(newPageToken);
            navigate(`/?q=${queryParam}&pageToken=${newPageToken}`);
        }
    };


    return (
        <>
            <Header />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {error && (
                    <div className="p-4 text-center text-gray-800 font-bold mb-6">
                        Something went wrong :(
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-10">
                    {isLoading && <Loader />}

                    {data?.results?.length > 0 &&
                        data.results.map((result, index) => <VideoCard data={result} key={index} index={index} />)}
                </div>

                <div className="flex justify-between items-center mt-6">
                    {data?.prevPageToken && (
                        <button
                            onClick={handlePrevPage}
                            className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
                        >
                            Previous Page
                        </button>
                    )}
                    {data?.nextPageToken && (
                        <button
                            onClick={handleNextPage}
                            className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
                        >
                            Next Page
                        </button>
                    )}
                </div>
            </div>

            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-10 right-10 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-500"
                >
                    ↑
                </button>
            )}
        </>
    );
}

export default MainPage;
