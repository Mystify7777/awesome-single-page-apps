// src/components/About.js
function About({ mode }) {
    return (
        <div className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-black dark:text-white">About WordPlay</h1>
            <p className="text-gray-700 dark:text-gray-300">
                WordPlay is a professional text utility application built with React and Tailwind CSS. It provides a wide range of tools for text manipulation, analysis, and encoding in a clean, modern interface.
            </p>
            <h2 className="text-2xl font-semibold text-black dark:text-white">Features</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Case conversions: Uppercase, Lowercase, Invert Case, Capitalize, Title Case, Sentence Case</li>
                <li>Text reversal and space removal</li>
                <li>Strip HTML tags, sort lines, remove duplicates, remove accents</li>
                <li>Encoding/Decoding: Base64, URL</li>
                <li>Find and replace, add prefix/suffix</li>
                <li>Copy to clipboard and clear text</li>
                <li>Real-time summary (words, characters, lines, sentences, reading time) and preview</li>
                <li>Dark/Light mode toggle</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
                Designed for efficiency and ease of use, WordPlay helps with everyday text tasks in a professional environment.
            </p>
        </div>
    );
}

export default About;