import { memo, useEffect, useRef, useState } from "react";

const EditableTitle = ({ initialTitle, onSaveTitle }) => {
    const [title, setTitle] = useState(initialTitle);
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        setTitle(initialTitle);
    }, [initialTitle]);

    useEffect(() => {
        if (editing) {
            inputRef.current?.focus();
            inputRef.current?.select();
        }
    }, [editing]);

    const handleSave = () => {
        const trimmed = title.trim();
        if (trimmed !== initialTitle.trim()) {
            onSaveTitle(trimmed);
        }
        setEditing(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" || e.key === "Tab") {
            e.preventDefault();
            handleSave();
        }
        if ((e.ctrlKey || e.metaKey) && e.key === "s") {
            e.preventDefault();
            handleSave();
        }
        if (e.key === "Escape") {
            setTitle(initialTitle);
            setEditing(false);
        }
    };

    return (
        <div className="inline-flex max-w-full">
            {editing ? (
                <input
                    ref={inputRef}
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={handleKeyDown}
                    className="text-3xl font-semibold text-gray-800 bg-transparent border-b border-gray-300 focus:outline-none w-full"
                    style={{ maxWidth: "100%" }}
                />
            ) : (
                <h1
                    onClick={() => setEditing(true)}
                    title={title}
                    className="truncate whitespace-nowrap overflow-hidden text-3xl font-semibold text-gray-800 cursor-pointer transition-all duration-200 ease-in-out border-2 border-transparent hover:border-blue-500 hover:bg-blue-50 hover:shadow-md rounded px-2 py-1 inline-block max-w-[40vw]"
                >
                    {title}
                </h1>
            )}
        </div>
    );
};

export default memo(EditableTitle);
