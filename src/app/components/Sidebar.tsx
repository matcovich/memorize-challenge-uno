'use client'

import Image from "next/image"
import SidebarMenuItem from "./SidebarMenuItem"
import {  IoCloseOutline } from "react-icons/io5"
import { GiAbstract050, GiAbstract058 } from "react-icons/gi"
import { useUIStore } from "@/store"
import clsx from "clsx"


const  menuItems = [
    {
        path: "/dashboard/main",
        icon: <GiAbstract058 size={40} />,
        title: "Inicio",
        subTitle: "Memorize Challenge"
    },
    {
        path: "/dashboard/memorize",
        icon: <GiAbstract050 size={40} />,
        title: "Memorize",
        subTitle: "Jugamos al memorize"
    }
]
export const Sidebar = () => {

    const isSideMenuopen = useUIStore((state) => state.isSideMenuOpen);
    const closeMenu = useUIStore((state) => state.closeSideMenu);

    return (
        <>
            {/* velo */}
            {
                isSideMenuopen && (
                    <div
                        className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30 md:hidden"
                    />
                )
            }

            {/* blur */}
            {
                isSideMenuopen && (
                    <div
                        onClick={closeMenu}
                        className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm md:hidden"
                    />
                )
            }

            <div
                className={
                    clsx(
                        "bg-gray-900 h-screen z-10 md:min-w-64 lg:min-72 text-slate-300 w-64 fixed left-0 top-0 md:relative md:translate-x-0  transform transition-all duration-500 ease-in-out",
                        {
                            "-translate-x-full": !isSideMenuopen,
                        }
                    )
                }>
                <div id="logo" className="flex flex-col items-center my-12 px-6 relative">
                    <IoCloseOutline
                        size={40}
                        className="absolute -top-6 right-4 cursor-pointer md:hidden "
                        onClick={() => closeMenu()}
                    />
                    <Image className="" src="https://www.uno.cl/_next/static/media/logo-uno.fcd9df2d.svg" alt="AFP UNO" width={120} height={40} priority={true} />
                    <p className="text-slate-100 text-sm pt-3 ">Memorize Challenge <span className="text-blue-300 font-semibold ">uno</span></p>
                </div>
                <div id="nav" className="w-full px-6">
                    {
                        menuItems.map((item) => (
                            <SidebarMenuItem
                                key={item.path} {...item}
                            />
                        ))
                    }
                </div>
            </div>
        </>
    )
}