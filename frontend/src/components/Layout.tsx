import type React from "react"
import Header from "./Header"
import SideBar from "./SideBar"
import Player from "./Player"
interface LayoutProps {
    children: React.ReactNode
}

const Layout:React.FC<LayoutProps> = ({children}) => {
  return (
  <>
    <div className="h-screen">
        <div className="h-[90%] flex">
            <SideBar/>

            <div className="bg-[#121212] w-[100%] m-2 px-6 pt-4 rounded text-white overflow-auto lg:w-[70%]">
                <Header/>
                {children}
            </div>
        </div>
      <Player/>
    </div>
  </>
  )
}

export default Layout
