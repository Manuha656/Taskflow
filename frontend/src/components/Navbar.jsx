export default function Navbar() {
    const name = localStorage.getItem("name") || "Guest User";
    const email = localStorage.getItem("email") || "";
    const role = localStorage.getItem("role") || "USER";

    return (
        <div className="p-4 glass border-b border-white/5 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md">
            <div>
                <h1 className="text-xl font-bold tracking-wider text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></span>
                    TaskFlow Workspace
                </h1>
            </div>

            <div className="flex items-center gap-4">
                {/* User details and role badge */}
                <div className="text-right hidden sm:block">
                    <div className="text-sm font-semibold text-gray-200">{name}</div>
                    <div className="text-xs text-gray-400">{email}</div>
                </div>

                <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-full border ${
                        role === "ADMIN" 
                            ? "bg-red-500/10 text-red-400 border-red-500/20" 
                            : "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                    }`}>
                        {role}
                    </span>

                    {/* Simple user avatar */}
                    <div className="w-9.5 h-9.5 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-md">
                        {name.charAt(0).toUpperCase()}
                    </div>
                </div>
            </div>
        </div>
    );
}