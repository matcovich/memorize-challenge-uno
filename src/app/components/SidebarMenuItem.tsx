'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
    path: string;
    icon: JSX.Element;
    title: string;
    subTitle: string;
}

export default function SidebarMenuItem( { path, icon, title, subTitle}: Props) {

    const currentPath = usePathname();

    return (
        <Link href={path}
        className={`
        w-full px-2 inline-flex space-x-2 items-center border-b border-slate-700 py-3 hover:bg-white/5 transition ease-linear duration-150
        ${currentPath === path ? 'bg-[#59464f] text-[#25a4dd]' : ''}
        `}>
            <div>
                {icon}
            </div>
            <div className="flex flex-col">
                <span className= "text-lg font-bold leading-5 text-white">{title}</span>
                <span className={`text-sm  hidden lg:block  ${currentPath === path ? 'text-[#25a4dd]' : 'text-white/50'}`} >{subTitle}</span>
            </div>
        </Link>
    )
}
