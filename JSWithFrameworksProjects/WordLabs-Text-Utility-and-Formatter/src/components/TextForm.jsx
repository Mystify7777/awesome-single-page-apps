// src/components/TextForm.jsx
import { useState, useRef } from 'react';

export default function TextForm({ showAlert, heading, mode }) {
    const [text, setText] = useState('');
    const [findText, setFindText] = useState('');
    const [replaceText, setReplaceText] = useState('');
    const [prefix, setPrefix] = useState('');
    const [suffix, setSuffix] = useState('');
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const textareaRef = useRef(null);
    const MAX_HISTORY = 50;
    const MAX_TEXT_LENGTH = 100000;

    const updateTextWithHistory = (newText, alertMessage, alertType = 'success') => {
        // Limit history size
        const historySlice = history.slice(Math.max(0, history.length - MAX_HISTORY));
        setHistory([...historySlice.slice(0, historyIndex + 1), text]);
        setHistoryIndex(Math.min(historyIndex + 1, historySlice.length - 1));
        setText(newText);
        showAlert(alertMessage, alertType);
    };

    const handleChange = (e) => {
        const newText = e.target.value;
        if (newText.length > MAX_TEXT_LENGTH) {
            showAlert('Text exceeds maximum length of 100,000 characters', 'warning');
            return;
        }
        // Update history on manual text input
        const historySlice = history.slice(Math.max(0, history.length - MAX_HISTORY));
        setHistory([...historySlice.slice(0, historyIndex + 1), text]);
        setHistoryIndex(Math.min(historyIndex + 1, historySlice.length - 1));
        setText(newText);
    };

    const handleUndo = () => {
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setText(history[newIndex]);
            showAlert('Undo performed', 'success');
        } else {
            showAlert('Nothing to undo', 'warning');
        }
    };

    const handleRedo = () => {
        if (historyIndex < history.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            setText(history[newIndex]);
            showAlert('Redo performed', 'success');
        } else {
            showAlert('Nothing to redo', 'warning');
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        showAlert('Copied to clipboard!', 'success');
    };

    const handleClear = () => {
        updateTextWithHistory('', 'Text cleared');
    };

    const handleDownload = () => {
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'edited-text.txt';
        a.click();
        URL.revokeObjectURL(url);
        showAlert('Text downloaded as file', 'success');
    };

    // Selection-based formatting helper
    const applyFormatting = (prefixMarker, suffixMarker, alertMsg) => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        if (start === end) {
            // No selection, wrap entire text
            updateTextWithHistory(`${prefixMarker}${text}${suffixMarker}`, alertMsg);
        } else {
            // Wrap selected text
            const selectedText = text.slice(start, end);
            const newText = text.slice(0, start) + `${prefixMarker}${selectedText}${suffixMarker}` + text.slice(end);
            updateTextWithHistory(newText, `Selected text ${alertMsg.toLowerCase()}`);
            // Restore cursor position after formatting
            setTimeout(() => {
                textarea.focus();
                textarea.setSelectionRange(end + prefixMarker.length + suffixMarker.length, end + prefixMarker.length + suffixMarker.length);
            }, 0);
        }
    };

    const handleUppercase = () => {
        updateTextWithHistory(text.toUpperCase(), 'Converted to uppercase');
    };

    const handleLowercase = () => {
        updateTextWithHistory(text.toLowerCase(), 'Converted to lowercase');
    };

    const handleInvertCase = () => {
        updateTextWithHistory(
            text.split('').map(char => char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()).join(''),
            'Case inverted'
        );
    };

    const handleCapitalize = () => {
        updateTextWithHistory(
            text.replace(/\b\w/g, char => char.toUpperCase()),
            'Capitalized each word'
        );
    };

    const handleTitleCase = () => {
        updateTextWithHistory(
            text.toLowerCase().replace(/\b\w/g, char => char.toUpperCase()),
            'Converted to title case'
        );
    };

    const handleSentenceCase = () => {
        updateTextWithHistory(
            text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, char => char.toUpperCase()),
            'Converted to sentence case'
        );
    };

    const handleReverse = () => {
        updateTextWithHistory(
            text.split(' ').reverse().join(' '),
            'Text reversed'
        );
    };

    const handleRemoveExtraSpaces = () => {
        updateTextWithHistory(
            text.split(/[ ]+/).join(' '),
            'Extra spaces removed!'
        );
    };

    const handleStripHTML = () => {
        updateTextWithHistory(
            text.replace(/<[^>]*>/g, ''),
            'HTML tags stripped'
        );
    };

    const handleSortLines = () => {
        updateTextWithHistory(
            text.split('\n').sort().join('\n'),
            'Lines sorted alphabetically'
        );
    };

    const handleRemoveDuplicates = () => {
        const lines = text.split('\n');
        const uniqueLines = [...new Set(lines)];
        updateTextWithHistory(
            uniqueLines.join('\n'),
            'Duplicate lines removed'
        );
    };

    const handleBase64Encode = () => {
        updateTextWithHistory(btoa(text), 'Text encoded to Base64');
    };

    const handleBase64Decode = () => {
        try {
            updateTextWithHistory(atob(text), 'Text decoded from Base64');
        } catch (e) {
            showAlert('Invalid Base64 string', 'warning');
        }
    };

    const handleURLEncode = () => {
        updateTextWithHistory(encodeURIComponent(text), 'Text URL encoded');
    };

    const handleURLDecode = () => {
        try {
            updateTextWithHistory(decodeURIComponent(text), 'Text URL decoded');
        } catch (e) {
            showAlert('Invalid URL encoded string', 'warning');
        }
    };

    const handleRemoveAccents = () => {
        updateTextWithHistory(
            text.normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
            'Accents removed'
        );
    };

    const handleAddPrefixSuffix = () => {
        if (!prefix && !suffix) {
            showAlert('Please enter a prefix or suffix', 'warning');
            return;
        }
        const lines = text.split('\n').map(line => `${prefix}${line}${suffix}`);
        updateTextWithHistory(lines.join('\n'), 'Prefix and suffix added');
    };

    const handleFindReplace = () => {
        if (!findText) {
            showAlert('Please enter text to find', 'warning');
            return;
        }
        updateTextWithHistory(
            text.replaceAll(findText, replaceText),
            'Find and replace completed'
        );
    };

    const handleBold = () => {
        applyFormatting('**', '**', 'Text bolded (Markdown)');
    };

    const handleItalic = () => {
        applyFormatting('*', '*', 'Text italicized (Markdown)');
    };

    const handleStrikethrough = () => {
        applyFormatting('~~', '~~', 'Text strikethrough (Markdown)');
    };

    const handleUnderline = () => {
        applyFormatting('<u>', '</u>', 'Text underlined (HTML)');
    };

    const handleCode = () => {
        applyFormatting('`', '`', 'Text formatted as code (Markdown)');
    };

    // Simple Markdown to HTML converter for preview
    const markdownToHtml = (md) => {
        let html = md
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/~~(.*?)~~/g, '<del>$1</del>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            // Handle <u> for underline
            .replace(/<u>(.*?)<\/u>/g, '<u>$1</u>')
            .replace(/\n/g, '<br>');
        return html;
    };

    const isTextEmpty = text.trim().length === 0;
    const lines = text.split('\n').length;
    const sentences = (text.match(/[\w|\)][.?!](\s|$)/g) || []).length;
    const words = text.split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;
    const uniqueWords = [...new Set(words)].length;
    const charCount = text.length;
    const readingTime = (0.008 * wordCount).toFixed(3);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
            {/* Left side: Form input, summary, preview */}
            <div className="space-y-4">
                <h1 className="text-3xl font-bold text-black dark:text-white">{heading}</h1>
                <textarea
                    ref={textareaRef}
                    className="w-full h-44 p-4 text-black dark:text-white bg-white dark:bg-[#2b323a] border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300 resize-y"
                    value={text}
                    onChange={handleChange}
                    placeholder="Enter your text here..."
                    aria-label="Text input area"
                />

                {/* Copy, Clear, Undo, Redo, Download */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    <button
                        disabled={isTextEmpty}
                        onClick={handleCopy}
                        className="px-4 py-2 bg-transparent border-[1.5px] text-white hover:bg-neutral-700 disabled:opacity-50 transition-all"
                        aria-label="Copy text to clipboard"
                    >
                        Copy
                    </button>
                    <button
                        disabled={isTextEmpty}
                        onClick={handleClear}
                        className="px-4 py-2 bg-[#e63727] text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-all"
                        aria-label="Clear text"
                    >
                        Clear
                    </button>
                    <button
                        disabled={historyIndex <= 0}
                        onClick={handleUndo}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 transition-all"
                        aria-label="Undo last action"
                    >
                        Undo
                    </button>
                    <button
                        disabled={historyIndex >= history.length - 1 || history.length === 0}
                        onClick={handleRedo}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 transition-all"
                        aria-label="Redo last undone action"
                    >
                        Redo
                    </button>
                    <button
                        disabled={isTextEmpty}
                        onClick={handleDownload}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-all"
                        aria-label="Download text as file"
                    >
                        Download
                    </button>
                </div>

                <div className="space-y-4 bg-white dark:bg-[#2b323a] p-6 rounded-lg shadow-md transition-colors duration-300">
                    <h2 className="text-2xl font-semibold text-black dark:text-white">Summary</h2>
                    <p className="text-gray-700 dark:text-gray-300">{wordCount} words ({uniqueWords} unique), {charCount} characters</p>
                    <p className="text-gray-700 dark:text-gray-300">{lines} lines, {sentences} sentences</p>
                    <p className="text-gray-700 dark:text-gray-300">{readingTime} Minutes Reading Time</p>
                </div>
                <div className="space-y-4 bg-white dark:bg-[#2b323a] p-6 rounded-lg shadow-md transition-colors duration-300">
                    <h2 className="text-2xl font-semibold text-black dark:text-white">Preview</h2>
                    <p
                        className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words"
                        dangerouslySetInnerHTML={{
                            __html: markdownToHtml(text) || 'Enter something to preview...'
                        }}
                    />
                </div>
            </div>

            {/* Right side: Features */}
            <div className="space-y-6">
                {/* Find & Replace */}
                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold text-black dark:text-white">Find & Replace</h2>
                    <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
                        <input
                            type="text"
                            placeholder="Find..."
                            value={findText}
                            onChange={(e) => setFindText(e.target.value)}
                            className="px-4 py-2 bg-white dark:bg-[#2b323a] text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 flex-1 min-w-[150px] transition-colors duration-300"
                            aria-label="Text to find"
                        />
                        <input
                            type="text"
                            placeholder="Replace with..."
                            value={replaceText}
                            onChange={(e) => setReplaceText(e.target.value)}
                            className="px-4 py-2 bg-white dark:bg-[#2b323a] text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 flex-1 min-w-[150px] transition-colors duration-300"
                            aria-label="Replacement text"
                        />
                        <button
                            disabled={isTextEmpty || !findText}
                            onClick={handleFindReplace}
                            className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-all"
                            aria-label="Replace all occurrences"
                        >
                            Replace All
                        </button>
                    </div>
                </div>

                {/* Add Prefix/Suffix */}
                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold text-black dark:text-white">Add Prefix/Suffix</h2>
                    <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
                        <input
                            type="text"
                            placeholder="Prefix..."
                            value={prefix}
                            onChange={(e) => setPrefix(e.target.value)}
                            className="px-4 py-2 bg-white dark:bg-[#2b323a] text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 flex-1 min-w-[150px] transition-colors duration-300"
                            aria-label="Prefix text"
                        />
                        <input
                            type="text"
                            placeholder="Suffix..."
                            value={suffix}
                            onChange={(e) => setSuffix(e.target.value)}
                            className="px-4 py-2 bg-white dark:bg-[#2b323a] text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 flex-1 min-w-[150px] transition-colors duration-300"
                            aria-label="Suffix text"
                        />
                        <button
                            disabled={isTextEmpty || (!prefix && !suffix)}
                            onClick={handleAddPrefixSuffix}
                            className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-all"
                            aria-label="Apply prefix and suffix"
                        >
                            Apply
                        </button>
                    </div>
                </div>

                {/* Encoding/Decoding Features */}
                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold text-black dark:text-white">Encoding/Decoding</h2>
                    <div className="grid grid-cols-2 gap-3">
                        <button disabled={isTextEmpty} onClick={handleBase64Encode} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all" aria-label="Encode to Base64">Base64 Encode</button>
                        <button disabled={isTextEmpty} onClick={handleBase64Decode} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all" aria-label="Decode from Base64">Base64 Decode</button>
                        <button disabled={isTextEmpty} onClick={handleURLEncode} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all" aria-label="Encode for URL">URL Encode</button>
                        <button disabled={isTextEmpty} onClick={handleURLDecode} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all" aria-label="Decode from URL">URL Decode</button>
                    </div>
                </div>

                {/* Formatting Features */}
                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold text-black dark:text-white">Formatting</h2>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            disabled={isTextEmpty}
                            onClick={handleBold}
                            className="px-4 py-2  bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all"
                            aria-label="Apply bold formatting"
                        >
                            Bold
                        </button>
                        <button
                            disabled={isTextEmpty}
                            onClick={handleItalic}
                            className="px-4 py-2 bg-blue-600 text-white italic rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all"
                            aria-label="Apply italic formatting"
                        >
                            Italic
                        </button>
                        <button
                            disabled={isTextEmpty}
                            onClick={handleStrikethrough}
                            className="px-4 py-2  bg-blue-600 text-white line-through rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all"
                            aria-label="Apply strikethrough"
                        >
                            Strikethrough
                        </button>
                        <button
                            disabled={isTextEmpty}
                            onClick={handleUnderline}
                            className="px-4 py-2  bg-blue-600 text-white underline rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all"
                            aria-label="Apply underline"
                        >
                            Underline
                        </button>
                        <button
                            disabled={isTextEmpty}
                            onClick={handleCode}
                            className="px-4 py-2  bg-blue-600 text-white font-mono rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all"
                            aria-label="Apply code formatting"
                        >
                            &lt; Code &gt;
                        </button>
                    </div>
                </div>
                {/* Text Transformations */}
                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold text-black dark:text-white">Text Transformations</h2>
                    <div className="grid grid-cols-2 gap-3">
                        <button disabled={isTextEmpty} onClick={handleUppercase} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all" aria-label="Convert to uppercase">Uppercase</button>
                        <button disabled={isTextEmpty} onClick={handleLowercase} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all" aria-label="Convert to lowercase">Lowercase</button>
                        <button disabled={isTextEmpty} onClick={handleInvertCase} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all" aria-label="Invert case">Invert Case</button>
                        <button disabled={isTextEmpty} onClick={handleCapitalize} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all" aria-label="Capitalize words">Capitalize</button>
                        <button disabled={isTextEmpty} onClick={handleTitleCase} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all" aria-label="Convert to title case">Title Case</button>
                        <button disabled={isTextEmpty} onClick={handleSentenceCase} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all" aria-label="Convert to sentence case">Sentence Case</button>
                        <button disabled={isTextEmpty} onClick={handleRemoveExtraSpaces} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all" aria-label="Remove extra spaces">Remove Extra Spaces</button>
                        <button disabled={isTextEmpty} onClick={handleStripHTML} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all" aria-label="Strip HTML tags">Strip HTML</button>
                        <button disabled={isTextEmpty} onClick={handleSortLines} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all" aria-label="Sort lines alphabetically">Sort Lines</button>
                        <button disabled={isTextEmpty} onClick={handleRemoveDuplicates} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all" aria-label="Remove duplicate lines">Remove Duplicates</button>
                        <button disabled={isTextEmpty} onClick={handleRemoveAccents} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all" aria-label="Remove accents">Remove Accents</button>
                        <button disabled={isTextEmpty} onClick={handleReverse} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all" aria-label="Reverse words">Reverse</button>
                    </div>
                </div>
            </div>
        </div>
    );
}