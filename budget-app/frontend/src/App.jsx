import Footer from "@components/Footer";
import Header from "@components/Header";
import React from "react";
import Home from "./pages/Home";

const App = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <Home />
            </main>
            <Footer />
        </div>
    );
};

export default App;
