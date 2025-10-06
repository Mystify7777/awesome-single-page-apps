import React, { useState, useEffect } from 'react';
import { buildApiUrl, isApiKeyConfigured } from '../utils/apiConfig';

export default function Home() {
    const [text, setText] = useState("");
    const [isloading, setIsloading] = useState(false);
    const [movie, setMovie] = useState([]);
    const [searchAttempted, setSearchAttempted] = useState(false);

    // NEW: number of visible cards for staggered animation
    const [visibleCount, setVisibleCount] = useState(0);

    const getMovies = async (url) => {
        try {
            const resp = await fetch(url);
            const data = await resp.json();

            if (data.Response === "True") {
                setMovie(data.Search);
            } else {
                setMovie([]);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setMovie([]);
        } finally {
            setIsloading(false);
        }
    }; // ✅ CLOSED HERE

    // NEW: effect to animate cards in with a stagger when `movie` changes
    useEffect(() => {
        // reset visible count on new movie list
        setVisibleCount(0);

        if (!movie || movie.length === 0) {
            return;
        }

        let i = 0;
        const intervalMs = 80; // delay between card reveals
        const timer = setInterval(() => {
            i += 1;
            setVisibleCount(i);
            if (i >= movie.length) {
                clearInterval(timer);
            }
        }, intervalMs);

        // cleanup on unmount or new movie list
        return () => clearInterval(timer);
    }, [movie]);

    const handle_click = () => {
        if (text.trim() === "") return;
        
        // Check if API key is configured
        if (!isApiKeyConfigured()) {
            alert("⚠️ API Configuration Missing!\n\nPlease:\n1. Copy .env.example to .env.local\n2. Add your OMDB API key\n3. Restart the development server");
            return;
        }
        
        // Build API URL using the helper function
        const apiUrl = buildApiUrl(text);
        if (!apiUrl) {
            alert("❌ Failed to build API URL. Please check your configuration.");
            return;
        }
        
        setIsloading(true);
        setSearchAttempted(true);   
        getMovies(apiUrl);
    };

    const changetext = (e) => {
        setText(e.target.value);
    };

    return (
        <>
            <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white text-4xl font-extrabold p-6 text-center shadow-lg">
                🎬 Movie Search App
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center mt-10 gap-4 px-4">
                <input
                    onChange={changetext}
                    className="h-12 w-full md:w-96 px-4 border-2 border-indigo-700 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200"
                    placeholder="Search for a movie..."
                    type="text"
                />
                <button
                    onClick={handle_click}
                    className="px-6 py-2 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold rounded-full shadow transition duration-300"
                >
                    Search
                </button>
            </div>

            {
                isloading ? (
                    <p className="text-center text-lg mt-10 text-blue-500">Loading...</p>
                ) : movie.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8">
                        {movie.map((m, idx) => {
                            // Each card becomes "visible" after visibleCount advances past its index.
                            const isVisible = idx < visibleCount;
                            return (
                                <div
                                    key={m.imdbID}
                                    className={
                                        `bg-amber-100 p-4 shadow-lg rounded-xl overflow-hidden transform transition-all duration-500 border border-gray-300 ` +
                                        (isVisible
                                            ? 'opacity-100 translate-y-0 scale-100'
                                            : 'opacity-0 translate-y-4 scale-95')
                                    }
                                    // inline style for staggered delay so items animate in cascade
                                    style={{ transitionDelay: `${idx * 60}ms` }}
                                >
                                    <img
                                        className="w-full h-72 object-cover"
                                        src={m.Poster !== "N/A" ? m.Poster : "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg"}
                                        alt={m.Title}
                                    />
                                    <div className="p-4 text-center">
                                        <h2 className="text-xl font-semibold mb-1">{m.Title}</h2>
                                        <p className="text-sm text-gray-600">Year: {m.Year}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    searchAttempted && movie.length === 0 && !isloading && (
                        <p className="text-center text-lg text-red-600 mt-10">No results found 😞</p>
                    )
                )
            }
        </>
    );
}
