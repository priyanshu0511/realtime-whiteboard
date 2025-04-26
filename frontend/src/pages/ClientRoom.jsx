import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";

const ClientRoom = ({ userNo, socket, setUsers, setUserNo }) => {
  const imgRef = useRef(null);

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

  useEffect(() => {
    socket.on("canvasImage", (data) => {
      imgRef.current.src = data;
    });
  }, []);

  return (
    <div className="w-full px-4">
      <div className="pb-2">
        <h1 className="text-3xl font-semibold text-center pt-4 pb-3">
          React Drawing App - users online: {userNo}
        </h1>
      </div>
      <div className="mt-5 flex justify-center">
        <div className="overflow-hidden border border-black px-0 mt-3 w-full max-w-4xl h-[500px]">
          <img className="w-full h-full object-contain" ref={imgRef} src="" alt="image" />
        </div>
      </div>
    </div>
  );
};

export default ClientRoom;
