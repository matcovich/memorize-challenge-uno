import { Sidebar, TopMenu } from "@/app/components";

export default function DashboardLayout({ children}: { children: React.ReactNode;}) {
    return (
        <div className="bg-gray-900 overflow-y-scroll w-screen h-screen antialiased text-slate-300 selection:bg-blue-600 selection:text-white">
            <div className="flex flex-row">
                <Sidebar />
                <div className="flex flex-col w-full ">
                    <TopMenu />
                    <div className="text-slate-800 p-4 w-full h-screen lg:h-full bg-white">
                        {children}
                    </div>
                </div>

            </div>
        </div>
    );
}