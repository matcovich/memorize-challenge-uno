'use client'
import { useUIStore } from "@/store"
import { IoMenu } from "react-icons/io5"
export default function MenuIcon() {

    const openSideMenu = useUIStore((state) => state.openSideMenu);
    return (
        <button onClick={() => openSideMenu()}>
            <IoMenu size={40} className="text-gray-100 md:hidden " />
            </button>
    )
}
