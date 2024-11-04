import React, { useEffect } from "react";
import Boared from "./components/BoaredColumn";

const App = () => {
  const loadBoared = async () => {
    const response = await fetch("https://sugoku.onrender.com/board");
    const json = await response.json();
  };

  useEffect(() => {
    loadBoared();
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Boared />
    </div>
  );
};

export default App;
