import { useNavigate } from "react-router-dom"

const Header = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <div className="p-2  rounded-full bg-black text-white cursor-pointer">
            <img src="./left_arrow.png" className=" h-5 " onClick={() => { navigate(-1) }} alt="" />
          </div>
          <div className="p-2 rounded-full bg-black text-white cursor-pointer">
            <img src="./right_arrow.png" className=" h-5 " onClick={() => { navigate(+1) }} alt="" />
          </div>
        </div>
        <div className="flex items-center gap-2 font-semibold">
            <button className="rounded-full text-black bg-white px-3  cursor-pointer py-1 mt-2 hidden md:block ">Get APP</button>
            <button className="rounded-full text-black bg-white px-3  cursor-pointer py-1 mt-2">Login</button>

        </div>
      </div>
    </>
  )
}

export default Header

