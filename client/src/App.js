import React, { useState } from "react";
import io from "socket.io-client";
import ChatWidget from "./component/ChatWidget";
import "./App.css";

const socket = io.connect("http://localhost:3001/chat");

function App() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (name !== "" && room !== "") {
      socket.emit("joinRoom", room);
      setShowChat(true);
    }
  };

  return (
    <div className="flex justify-center align-middle min-w-screen min-h-screen bg-slate-50 h-1">
      {!showChat ? (
        <div className="flex h-96 lg:w-1/4 sm:w-2/4 mx-auto my-auto bg-white rounded-xl shadow-lg  py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full">
            <h1 className="text-xl font-medium text-black text-center">
              Join A Chat
            </h1>
            <div className="flex flex-col ">
              <label className="text-xl mt-3">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                onChange={(event) => {
                  setName(event.target.value);
                }}
                className="p-2 mt-3 border border-indigo-600"
              />
              <label className="text-xl mt-3">Room ID</label>
              <input
                type="text"
                placeholder="Room ID..."
                onChange={(event) => {
                  setRoom(event.target.value);
                }}
                className="p-2 mt-3 border border-indigo-600"
              />
              <button
                className="mt-3 block bg-indigo-600 text-xl font-bold  text-white p-2"
                onClick={joinRoom}
              >
                Join
              </button>
            </div>
          </div>
        </div>
      ) : (
        <ChatWidget socket={socket} username={name} room={room} />
      )}
    </div>
  );
}

export default App;
