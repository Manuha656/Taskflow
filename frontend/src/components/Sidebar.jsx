import { useNavigate } from "react-router-dom";

export default function Sidebar({ activeTab, setActiveTab }) {
    const navigate = useNavigate();
    const name = localStorage.getItem("name") || "User";
    const role = localStorage.getItem("role") || "USER";

    const logout = () => {
        localStorage.clear();
        navigate("/");
    };

    const menuItems = [
        {
            id: "all",
            name: "All Tasks",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
            )
        },
        {
            id: "pending",
            name: "Pending Tasks",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        {
            id: "completed",
            name: "Completed Tasks",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        }
    ];

    if (role === "ADMIN") {
        menuItems.push({
            id: "users",
            name: "User Management",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            )
        });
    }

    return (
        <div className="w-64 h-screen bg-[#070a13] border-r border-white/5 flex flex-col justify-between p-6">
            <div>
                {/* Brand */}
                <div className="flex items-center gap-2.5 mb-10">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-md shadow-indigo-500/20">
                        T
                    </div>
                    <div>
                        <span className="text-lg font-bold tracking-wider text-white">TaskFlow</span>
                        <div className="text-[10px] text-gray-500 tracking-widest uppercase">Workspace</div>
                    </div>
                </div>

                {/* Menu */}
                <div className="space-y-1.5">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-3">
                        Navigation
                    </div>
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab && setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                                activeTab === item.id
                                    ? "bg-indigo-600/15 text-indigo-400 border border-indigo-500/20"
                                    : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                            }`}
                        >
                            {item.icon}
                            {item.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* User Footer Panel */}
            <div className="pt-6 border-t border-white/5 space-y-4">
                <div className="flex items-center gap-3 px-2">
                    <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center font-bold text-white uppercase border border-white/10">
                        {name.charAt(0)}
                    </div>
                    <div className="overflow-hidden">
                        <div className="text-sm font-semibold text-white truncate">{name}</div>
                        <div className="text-xs text-gray-400 capitalize truncate">{role.toLowerCase()} Account</div>
                    </div>
                </div>

                <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-transparent hover:border-red-500/10 rounded-xl text-sm font-medium transition-all cursor-pointer"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                </button>
            </div>
        </div>
    );
}