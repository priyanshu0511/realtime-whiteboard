import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Canvas from "../components/Canvas";

const Room = ({ userNo, socket, setUsers, setUserNo }) => {
  const canvasRef = useRef(null);
  const ctx = useRef(null);
  const [color, setColor] = useState("#000000");
  const [elements, setElements] = useState([]);
  const [history, setHistory] = useState([]);
  const [tool, setTool] = useState("pencil");

  useEffect(() => {
    socket.on("message", (data) => {
      toast.info(data.message);
    });
  }, []);

  useEffect(() => {
    socket.on("users", (data) => {
      setUsers(data);
      setUserNo(data.length);
    });
  }, []);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    setElements([]);
  };

  const undo = () => {
    setHistory((prevHistory) => [
      ...prevHistory,
      elements[elements.length - 1],
    ]);
    setElements((prevElements) =>
      prevElements.slice(0, prevElements.length - 1)
    );
  };

  const redo = () => {
    setElements((prevElements) => [
      ...prevElements,
      history[history.length - 1],
    ]);
    setHistory((prevHistory) => prevHistory.slice(0, prevHistory.length - 1));
  };

  return (
    <div className="w-full px-4 py-6">
      <h1 className="text-2xl font-semibold text-center mb-6">
        React Drawing App – Users Online: {userNo}
      </h1>

      <div className="flex flex-wrap justify-center items-center gap-4 mb-6 text-center">
        <div className="flex items-center gap-2">
          <span className="font-medium">Color Picker:</span>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-8 h-8 p-0 border rounded"
          />
        </div>

        <div className="flex items-center gap-4 flex-wrap justify-center">
          {["pencil", "line", "rect"].map((t) => (
            <label key={t} className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                name="tools"
                value={t}
                checked={tool === t}
                onClick={(e) => setTool(e.target.value)}
                readOnly
                className="accent-blue-600"
              />
              <span className="capitalize">{t}</span>
            </label>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            className="px-4 py-1 border border-blue-600 text-blue-600 rounded hover:bg-blue-100 disabled:opacity-50"
            disabled={elements.length === 0}
            onClick={undo}
          >
            Undo
          </button>
          <button
            type="button"
            className="px-4 py-1 border border-blue-600 text-blue-600 rounded hover:bg-blue-100 disabled:opacity-50"
            disabled={history.length < 1}
            onClick={redo}
          >
            Redo
          </button>
        </div>

        <button
          className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          onClick={clearCanvas}
        >
          Clear Canvas
        </button>
      </div>

      <Canvas
        canvasRef={canvasRef}
        ctx={ctx}
        color={color}
        setElements={setElements}
        elements={elements}
        tool={tool}
        socket={socket}
      />
    </div>
  );
};

export default Room;
