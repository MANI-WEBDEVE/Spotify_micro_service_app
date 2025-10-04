import { useNavigate } from "react-router-dom";
import PlayListCard from "./PlayListCard";
const SideBar = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="h-full p-2 w-[25%] text-white flex-col hidden lg:flex gap-2">
        <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
          <div
            className="flex items-center gap-3 pl-8 cursor-pointer "
            onClick={() => {
              navigate("/");
            }}
          >
            <img src="./home.png" alt="" className="h-6" />
            <h1 className="text-sm font-semibold">Home</h1>
          </div>
          <div
            className="flex items-center gap-3 pl-8 cursor-pointer "
            onClick={() => {
              navigate("/");
            }}
          >
            <img src="./search.png" alt="" className="h-6" />
            <h1 className="text-sm font-semibold">Search</h1>
          </div>
        </div>

        <div className="h-[85%] bg-[#121212] rounded flex flex-col justiy-around">
          <div className="flex justify-between items-center  cursor-pointer ">
            <div className="flex items-center gap-3 pl-8 cursor-pointer pt-4 ">
              <img src="./stack.png" className="h-7" alt="" />
              <p className="text-sm font-semibold">Your Playlist</p>
            </div>
            <div className="flex gap-3 items-center pt-2 mr-2 mt-2">
              <img src="./arrow.png" className="h-6" alt="" />
              <img src="./plus.png" className="h-6" alt="" />
            </div>
          </div>
          <div
            onClick={() => {
              navigate("/playlist");
            }}
          >
            <PlayListCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
