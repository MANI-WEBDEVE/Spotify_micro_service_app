import { FaMusic } from "react-icons/fa";

const PlayListCard = () => {
  return (
    <>
      <div className="flex items-center gap-2 bg-[#ffffff26] m-2 rounded hover:bg-[#ffffff3d] hover:duration-500 duration-300 cursor-pointer p-1">
        <div className="bg-[#656866] rounded m-2">
          <FaMusic className="text-2xl m-2 text-white" />
        </div>
        <div className="text-white">
          <h1 className="font-semibold">My Playlist #1</h1>
          <p className="text-sm text-gray-300">10 Songs</p>
        </div>
      </div>
    </>
  );
};

export default PlayListCard;
