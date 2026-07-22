import { useState } from "react";

export default function UserForm({ isOpen, onClose, onSubmit }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "USER"
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
        setForm({
            name: "",
            email: "",
            password: "",
            role: "USER"
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-md glass border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-float-short">
                
                {/* Header */}
                <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">Create New User</h2>
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
                            Full Name
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="John Doe"
                            className="w-full px-4 py-2.5 bg-gray-900/50 border border-white/10 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white placeholder-gray-500 outline-none transition-all text-sm"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                            Email Address
                        </label>
                        <input
                            type="email"
                            required
                            placeholder="john@company.com"
                            className="w-full px-4 py-2.5 bg-gray-900/50 border border-white/10 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white placeholder-gray-500 outline-none transition-all text-sm"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                            Initial Password
                        </label>
                        <input
                            type="password"
                            required
                            placeholder="••••••••"
                            className="w-full px-4 py-2.5 bg-gray-900/50 border border-white/10 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white placeholder-gray-500 outline-none transition-all text-sm"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />
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
                            Create User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
