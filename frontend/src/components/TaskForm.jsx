import { useState } from "react";

export default function TaskForm({ isOpen, onClose, onSubmit, taskToEdit, usersList, currentUserEmail }) {
    const [form, setForm] = useState(() => {
        if (taskToEdit) {
            return {
                id: taskToEdit.id,
                title: taskToEdit.title || "",
                description: taskToEdit.description || "",
                status: taskToEdit.status || "PENDING",
                priority: taskToEdit.priority || "LOW",
                assignedBy: taskToEdit.assignedBy || currentUserEmail || "",
                assignedTo: taskToEdit.assignedTo || ""
            };
        }
        return {
            title: "",
            description: "",
            status: "PENDING",
            priority: "LOW",
            assignedBy: currentUserEmail || "",
            assignedTo: usersList[0]?.email || ""
        };
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg glass border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-float-short">
                
                {/* Header */}
                <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">
                        {taskToEdit ? "Edit Task Details" : "Create New Task"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                            Task Title
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. Implement JWT filter"
                            className="w-full px-4 py-2.5 bg-gray-900/50 border border-white/10 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white placeholder-gray-500 outline-none transition-all text-sm"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                            Description
                        </label>
                        <textarea
                            required
                            placeholder="e.g. Write a JWT Authentication Filter in spring security and test endpoints..."
                            rows="3"
                            className="w-full px-4 py-2.5 bg-gray-900/50 border border-white/10 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white placeholder-gray-500 outline-none transition-all text-sm resize-none"
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                                Priority Level
                            </label>
                            <select
                                className="w-full px-4 py-2.5 bg-gray-900/50 border border-white/10 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white outline-none transition-all text-sm [&>option]:bg-gray-950"
                                value={form.priority}
                                onChange={(e) => setForm({ ...form, priority: e.target.value })}
                            >
                                <option value="LOW">Low</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="HIGH">High</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                                Current Status
                            </label>
                            <select
                                className="w-full px-4 py-2.5 bg-gray-900/50 border border-white/10 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white outline-none transition-all text-sm [&>option]:bg-gray-950"
                                value={form.status}
                                onChange={(e) => setForm({ ...form, status: e.target.value })}
                            >
                                <option value="PENDING">Pending</option>
                                <option value="COMPLETED">Completed</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                                Assigned By
                            </label>
                            <input
                                type="text"
                                disabled
                                className="w-full px-4 py-2.5 bg-gray-950/60 border border-white/5 rounded-xl text-gray-400 outline-none text-sm cursor-not-allowed"
                                value={form.assignedBy}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                                Assign To (User)
                            </label>
                            <select
                                required
                                className="w-full px-4 py-2.5 bg-gray-900/50 border border-white/10 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white outline-none transition-all text-sm [&>option]:bg-gray-950"
                                value={form.assignedTo}
                                onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
                            >
                                <option value="" disabled>Select User</option>
                                {usersList.map((user) => (
                                    <option key={user.id} value={user.email}>
                                        {user.name} ({user.email})
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-4 border-t border-white/5 flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl text-sm font-medium transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold shadow-lg hover:shadow-indigo-500/20 transition-all cursor-pointer"
                        >
                            {taskToEdit ? "Save Changes" : "Create Task"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}