import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";

const JoinCreateRoom = ({ uuid, setUser, setRoomJoined }) => {
  const [roomId, setRoomId] = useState(uuid());
  const [name, setName] = useState("");
  const [joinName, setJoinName] = useState("");
  const [joinRoomId, setJoinRoomId] = useState("");

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!name) return toast.dark("Please enter your name!");

    setUser({
      roomId,
      userId: uuid(),
      userName: name,
      host: true,
      presenter: true,
    });
    setRoomJoined(true);
  };

  const handleJoinSubmit = (e) => {
    e.preventDefault();
    if (!joinName) return toast.dark("Please enter your name!");

    setUser({
      roomId: joinRoomId,
      userId: uuid(),
      userName: joinName,
      host: false,
      presenter: false,
    });
    setRoomJoined(true);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl text-center font-bold mb-10">
        Welcome To Realtime Whiteboard Sharing App
      </h1>

      <div className="flex flex-col lg:flex-row justify-center gap-10">
        {/* Create Room */}
        <div className="w-full lg:w-1/2 border rounded-lg p-8 shadow-md">
          <h2 className="text-xl font-semibold text-blue-600 mb-6 text-center">
            Create Room
          </h2>
          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-2 border rounded outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <div className="flex items-center gap-2">
              <input
                type="text"
                className="flex-1 px-4 py-2 border rounded outline-none text-sm"
                value={roomId}
                readOnly
              />
              <button
                type="button"
                onClick={() => setRoomId(uuid())}
                className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
              >
                Generate
              </button>
              <CopyToClipboard
                text={roomId}
                onCopy={() => toast.success("Room Id Copied To Clipboard!")}
              >
                <button
                  type="button"
                  className="px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 text-sm"
                >
                  Copy
                </button>
              </CopyToClipboard>
            </div>

            <button
              type="submit"
              className="w-full mt-4 py-2 bg-black text-white rounded hover:bg-gray-900"
            >
              Create Room
            </button>
          </form>
        </div>

        {/* Join Room */}
        <div className="w-full lg:w-1/2 border rounded-lg p-8 shadow-md">
          <h2 className="text-xl font-semibold text-blue-600 mb-6 text-center">
            Join Room
          </h2>
          <form onSubmit={handleJoinSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-2 border rounded outline-none focus:ring-2 focus:ring-blue-500"
              value={joinName}
              onChange={(e) => setJoinName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Room Id"
              className="w-full px-4 py-2 border rounded outline-none focus:ring-2 focus:ring-blue-500"
              value={joinRoomId}
              onChange={(e) => setJoinRoomId(e.target.value)}
            />

            <button
              type="submit"
              className="w-full mt-4 py-2 bg-black text-white rounded hover:bg-gray-900"
            >
              Join Room
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JoinCreateRoom;

