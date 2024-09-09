

import MenuIcon from "./MenuIcon"
import ProfileUser from "./ProfileUser"


export const TopMenu = () => {

    return (
        <nav className="flex  bg-gray-800 justify-between md:justify-end items-center  w-full  min-h-20 p-4" >
            <MenuIcon/>
            <ProfileUser />
        </nav>
    )
}
