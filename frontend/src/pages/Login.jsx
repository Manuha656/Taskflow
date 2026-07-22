import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await api.post("/api/auth/login", form);
            
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("email", response.data.email);
            localStorage.setItem("name", response.data.name);
            localStorage.setItem("role", response.data.role);

            navigate("/dashboard");
        } catch (err) {
            console.error(err);
            setError(err.response?.data || "Invalid email or password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0b0f19] relative overflow-hidden px-4">
            {/* Glowing background circles for modern tech-art aesthetic */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

            {/* Glowing glass card */}
            <div className="w-full max-w-4xl glass rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden relative z-10 border border-white/10">
                
                {/* Branding Panel */}
                <div className="w-full md:w-1/2 p-8 md:p-12 bg-gradient-to-br from-indigo-900/60 to-purple-900/60 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/5">
                    <div>
                        <div className="flex items-center gap-2 mb-8">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white shadow-lg">
                                T
                            </div>
                            <span className="text-xl font-bold tracking-wider text-white">TaskFlow</span>
                        </div>
                        <h2 className="text-3xl font-extrabold text-white leading-tight mb-4">
                            Accelerate your workflow.
                        </h2>
                        <p className="text-indigo-200/80 leading-relaxed font-light">
                            Collaborate with your team, assign tasks seamlessly, and track analytics in real time on our premium workflow platform.
                        </p>
                    </div>

                    <div className="mt-8 text-xs text-indigo-300/50">
                        © 2026 TaskFlow Inc. All rights reserved.
                    </div>
                </div>

                {/* Login Form Panel */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-gray-950/40">
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold text-white mb-2">Welcome Back</h3>
                        <p className="text-sm text-gray-400">Please sign in to access your dashboard</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                required
                                placeholder="name@company.com"
                                className="w-full px-4 py-3 bg-gray-900/50 border border-white/10 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white placeholder-gray-500 outline-none transition-all"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                            />
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
                                    Password
                                </label>
                            </div>
                            <input
                                type="password"
                                required
                                placeholder="••••••••"
                                className="w-full px-4 py-3 bg-gray-900/50 border border-white/10 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white placeholder-gray-500 outline-none transition-all"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-indigo-500/20 focus:outline-none transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                        >
                            {loading ? (
                                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-gray-400">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-indigo-400 hover:underline hover:text-indigo-300 font-medium">
                            Register now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}