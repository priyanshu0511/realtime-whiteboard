import React, { useRef } from "react";

const Sidebar = ({ users, user, socket }) => {
  const sideBarRef = useRef(null);

  const openSideBar = () => {
    sideBarRef.current.style.left = 0;
  };

  const closeSideBar = () => {
    sideBarRef.current.style.left = "-100%";
  };

  return (
    <>
      <button
        className="bg-black text-white text-sm px-3 py-1 rounded absolute top-[5%] left-[5%]"
        onClick={openSideBar}
      >
        Users
      </button>

      <div
        ref={sideBarRef}
        className="fixed top-0 pt-2 h-full bg-black transition-all duration-300 z-[9999]"
        style={{ width: "150px", left: "-100%" }}
      >
        <button
          className="w-full bg-white text-black py-2 font-medium"
          onClick={closeSideBar}
        >
          Close
        </button>
        <div className="w-full mt-5">
          {users.map((usr, index) => (
            <p
              key={index}
              className="text-white text-center py-2 text-sm break-words"
            >
              {usr.username}
              {usr.id === socket.id && " - (You)"}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
