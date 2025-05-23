import React from "react";

const SavingIndicator = () => {
    const letters = "Sparar...".split("");

    return (
        <div className="flex items-center gap-2 text-sm ml-2">
            <svg
                className="animate-spin h-4 w-4 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                />
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                />
            </svg>
            <span className="flex gap-0.5 font-semibold">
                {letters.map((char, i) => (
                    <span
                        key={i}
                        className="animate-wave bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent"
                        style={{
                            animationDelay: `${i * 0.1}s`,
                        }}
                    >
                        {char}
                    </span>
                ))}
            </span>
        </div>
    );
};

export default SavingIndicator;
