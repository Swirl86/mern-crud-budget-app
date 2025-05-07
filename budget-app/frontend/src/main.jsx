import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    //<React.StrictMode>
    //** Using strict mode with react-beautiful-dnd leads to the frustrating “Unable to find draggable with id: […]” warning */
    <App />
    //</React.StrictMode>
);
