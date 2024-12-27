import { useState, useMemo } from "react";
import { useLazyGetVideosQuery } from "../../store/videoApi";
import { useGetHistoryQuery } from "../../store/videoApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setVideos, setError } from "../../store/videoSlice";
import Loader from "../Loading/loading";

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [query, setQuery] = useState("");
    const [isInputFocused, setIsInputFocused] = useState(false);

    const { data: historyData, isLoading: isHistoryLoading, refetch: refetchHistory } = useGetHistoryQuery();
    const [getVideos, { data, isLoading, isError, error }] = useLazyGetVideosQuery();

    const filteredHistory = useMemo(() => {
        return (
            historyData?.history?.filter((value, index, self) => 
                index === self.findIndex((t) => t.query === value.query)
            ) || []
        );
    }, [historyData]);


    const formatDate = useMemo(() => {
        return (timestamp) =>
            new Intl.DateTimeFormat("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            }).format(new Date(timestamp));
    }, []);

    const handleSearchSubmit = () => {
        getVideos({ query });
    
        if (isError) {
            dispatch(setError(error?.message || "An error occurred"));
        } else {
            refetchHistory();
            dispatch(setVideos(data?.results));
            navigate(`/?q=${query}`);
        }
    
        setIsInputFocused(false);
    };
    
    const handleHistorySelect = (historyItemQuery) => {
        setQuery(historyItemQuery);
        setIsInputFocused(false);
    
        getVideos({ query: historyItemQuery }).then(() => {
            if (isError) {
                dispatch(setError(error?.message || "An error occurred"));
            } else {
                refetchHistory();
                dispatch(setVideos(data?.results));
                navigate(`/?q=${historyItemQuery}`);
            }
        }).catch(error => {
            dispatch(setError(error?.message || "An unexpected error occurred"));
        });
    };

    return (
        <div className="h-[30vh] flex flex-col gap-y-8 items-center justify-center bg-gradient-to-r from-indigo-800 via-purple-800 to-pink-700">
            {isLoading && <Loader />}
            <h1 className="text-7xl font-heading text-white font-extrabold tracking-wide">Start Video Search</h1>

            <div className="relative flex flex-col items-center w-full">
                <div className="flex items-center w-full max-w-md">
                    <input
                        type="text"
                        className="outline-none p-3 w-full h-10 rounded-s-sm font-sans text-gray-700 placeholder:text-gray-400 shadow-sm transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:shadow-md"
                        placeholder="Type keywords..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setIsInputFocused(true)}
                    />
                    <button
                        onClick={handleSearchSubmit}
                        className="h-10 rounded-e-sm bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 font-sans font-semibold transition-all duration-300 ease-in-out hover:bg-indigo-700 hover:from-blue-700 hover:to-purple-800 hover:shadow-lg"
                    >
                        Search
                    </button>
                </div>

                {isInputFocused && !isHistoryLoading && (
                    <div className="absolute top-14 left-15 w-full max-w-md bg-white border border-gray-300 shadow-md rounded-md z-50 p-4">
                        <h3 className="text-lg font-heading text-gray-800 mb-2">Your History</h3>
                        <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
                            {filteredHistory?.length > 0 ? (
                                filteredHistory.map((historyItem, index) => (
                                    <div
                                        key={index}
                                        className="p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                                        onClick={() => handleHistorySelect(historyItem.query)}
                                    >
                                        <div className="text-sm text-gray-700">{historyItem.query}</div>
                                        <div className="text-xs text-gray-500">
                                            {formatDate(historyItem.timestamp)}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-gray-500 text-sm">No search history found.</div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;
