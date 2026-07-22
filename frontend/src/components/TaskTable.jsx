export default function TaskTable({ tasks, role, onEdit, onDelete, onStatusToggle }) {
    
    const getPriorityBadge = (priority) => {
        switch (priority) {
            case "HIGH":
                return "bg-rose-500/10 text-rose-400 border border-rose-500/20";
            case "MEDIUM":
                return "bg-amber-500/10 text-amber-400 border border-amber-500/20";
            case "LOW":
            default:
                return "bg-sky-500/10 text-sky-400 border border-sky-500/20";
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case "COMPLETED":
                return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
            case "PENDING":
            default:
                return "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20";
        }
    };

    return (
        <div className="glass rounded-2xl border border-white/5 overflow-hidden shadow-xl mt-6">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/2">
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                                Title
                            </th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                                Description
                            </th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                                Assignment
                            </th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400 text-center">
                                Priority
                            </th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400 text-center">
                                Status
                            </th>
                            {role === "ADMIN" && (
                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400 text-right">
                                    Actions
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {tasks.length > 0 ? (
                            tasks.map((task) => (
                                <tr key={task.id} className="hover:bg-white/2 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-white group-hover:text-indigo-400 transition-colors">
                                            {task.title}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 max-w-xs md:max-w-md">
                                        <div className="text-sm text-gray-300 truncate">
                                            {task.description}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-xs space-y-0.5">
                                            <div className="text-gray-300">
                                                <span className="text-gray-500">To:</span> {task.assignedTo || "Unassigned"}
                                            </div>
                                            <div className="text-gray-400">
                                                <span className="text-gray-600">By:</span> {task.assignedBy || "System"}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${getPriorityBadge(task.priority)}`}>
                                            {task.priority}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <select
                                            disabled={role !== "USER" && role !== "ADMIN"}
                                            value={task.status}
                                            onChange={(e) => onStatusToggle && onStatusToggle(task, e.target.value)}
                                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-gray-900/40 border outline-none cursor-pointer transition-all duration-200 ${getStatusBadge(task.status)}`}
                                        >
                                            <option value="PENDING" className="bg-gray-950 text-yellow-400 font-semibold">Pending</option>
                                            <option value="COMPLETED" className="bg-gray-950 text-emerald-400 font-semibold">Completed</option>
                                        </select>
                                    </td>
                                    {role === "ADMIN" && (
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => onEdit && onEdit(task)}
                                                    className="p-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 rounded-lg hover:text-white transition-all cursor-pointer"
                                                    title="Edit Task"
                                                >
                                                    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => onDelete && onDelete(task.id)}
                                                    className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-lg hover:text-white transition-all cursor-pointer"
                                                    title="Delete Task"
                                                >
                                                    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={role === "ADMIN" ? 6 : 5} className="px-6 py-12 text-center text-gray-500">
                                    <svg className="w-10 h-10 mx-auto mb-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    No Tasks Assigned or Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}