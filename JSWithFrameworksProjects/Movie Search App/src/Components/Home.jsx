import React, { useState } from 'react';
import { buildApiUrl, isApiKeyConfigured } from '../utils/apiConfig';

export default function Home() {
    const [text, setText] = useState("");
    const [isloading, setIsloading] = useState(false);
    const [movie, setMovie] = useState([]);
    const [searchAttempted, setSearchAttempted] = useState(false);


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
        } finally {
            setIsloading(false);
        }
    }; // ✅ CLOSED HERE

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
                        {movie.map((movie) => (
                            <div
                                key={movie.imdbID}
                                className="bg-amber-100 p-4 shadow-lg rounded-xl overflow-hidden transform hover:scale-105 hover:bg-amber-200 transition-transform duration-300 border border-gray-300"
                            >
                                <img
                                    className="w-full h-72 object-cover"
                                    src={movie.Poster !== "N/A" ? movie.Poster : "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg"}
                                    alt={movie.Title}
                                />
                                <div className="p-4 text-center">
                                    <h2 className="text-xl font-semibold mb-1">{movie.Title}</h2>
                                    <p className="text-sm text-gray-600">Year: {movie.Year}</p>
                                </div>
                            </div>
                        ))}
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
