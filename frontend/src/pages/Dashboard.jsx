import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TaskForm from "../components/TaskForm";
import UserForm from "../components/UserForm";
import TaskTable from "../components/TaskTable";
import api from "../services/api";

export default function Dashboard() {
    const role = localStorage.getItem("role") || "USER";
    const email = localStorage.getItem("email") || "";
    
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [activeTab, setActiveTab] = useState("all");
    
    // Modal states
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isUserFormOpen, setIsUserFormOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);

    // Refresh function to load data
    const loadDashboardData = async (showSpinner = false) => {
        if (showSpinner) {
            setLoading(true);
        }
        try {
            // Load tasks based on role
            let tasksRes;
            if (role === "ADMIN") {
                tasksRes = await api.get("/api/tasks");
            } else {
                tasksRes = await api.get(`/api/tasks/assigned?user=${email}`);
            }
            setTasks(tasksRes.data);

            // Load users if ADMIN (for assignment dropdown)
            if (role === "ADMIN") {
                const usersRes = await api.get("/api/users");
                setUsers(usersRes.data);
            }
        } catch (error) {
            console.error("Error loading dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDashboardData(false);
    }, [role, email]);

    // Calculate metrics locally based on loaded tasks
    const tasksArray = Array.isArray(tasks) ? tasks : [];
    const countTotal = tasksArray.length;
    const countPending = tasksArray.filter((t) => t.status === "PENDING").length;
    const countCompleted = tasksArray.filter((t) => t.status === "COMPLETED").length;

    // Filter tasks based on activeTab and search query
    const filteredTasks = tasksArray.filter((task) => {
        const matchesTab =
            activeTab === "all" ||
            (activeTab === "pending" && task.status === "PENDING") ||
            (activeTab === "completed" && task.status === "COMPLETED");

        const matchesSearch =
            (task.title || "").toLowerCase().includes(search.toLowerCase()) ||
            (task.description || "").toLowerCase().includes(search.toLowerCase());

        return matchesTab && matchesSearch;
    });

    // Form Submit Handler (both Create & Edit)
    const handleFormSubmit = async (taskData) => {
        try {
            if (taskData.id) {
                // Edit mode
                await api.put(`/api/tasks/${taskData.id}`, taskData);
            } else {
                // Create mode
                await api.post("/api/tasks", taskData);
            }
            setIsFormOpen(false);
            setTaskToEdit(null);
            loadDashboardData(true);
        } catch (error) {
            console.error("Error submitting task form:", error);
            alert("Failed to submit task details.");
        }
    };

    // Task Delete Handler (Admin only)
    const handleTaskDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            try {
                await api.delete(`/api/tasks/${id}`);
                loadDashboardData(true);
            } catch (error) {
                console.error("Error deleting task:", error);
                alert("Failed to delete task.");
            }
        }
    };

    // Inline Task Status Toggle (for both Users and Admins)
    const handleTaskStatusToggle = async (task, newStatus) => {
        const updatedStatus = newStatus || (task.status === "PENDING" ? "COMPLETED" : "PENDING");
        const updatedTask = {
            ...task,
            status: updatedStatus
        };
        try {
            await api.put(`/api/tasks/${task.id}`, updatedTask);
            loadDashboardData(true);
        } catch (error) {
            console.error("Error updating task status:", error);
            alert("Failed to update status.");
        }
    };

    // User creation handler (Admin only)
    const handleUserFormSubmit = async (userData) => {
        try {
            await api.post("/api/users", userData);
            setIsUserFormOpen(false);
            loadDashboardData(true);
            alert("User created successfully!");
        } catch (error) {
            console.error("Error creating user:", error);
            alert(error.response?.data || "Failed to create user.");
        }
    };

    return (
        <div className="flex min-h-screen bg-[#0b0f19]">
            {/* Sidebar */}
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-screen overflow-y-auto">
                <Navbar />

                <div className="p-6 md:p-8 space-y-6 max-w-7xl w-full mx-auto">
                    {activeTab === "users" ? (
                        <div className="space-y-6">
                            {/* User Table Header */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <h1 className="text-3xl font-extrabold tracking-tight text-white">User Management</h1>
                                    <p className="text-sm text-gray-400 mt-1">
                                        Manage your team profiles, accounts, and workspace permissions.
                                    </p>
                                </div>

                                <button
                                    onClick={() => setIsUserFormOpen(true)}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 active:scale-98 transition-all cursor-pointer text-sm"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                    </svg>
                                    Create User
                                </button>
                            </div>

                            {/* User List Table */}
                            {loading ? (
                                <div className="glass rounded-2xl border border-white/5 p-12 flex flex-col items-center justify-center gap-3">
                                    <svg className="animate-spin h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    <span className="text-gray-400 text-sm">Loading users...</span>
                                </div>
                            ) : (
                                <div className="glass rounded-2xl border border-white/5 overflow-hidden shadow-xl">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="border-b border-white/5 bg-white/2">
                                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Name</th>
                                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Email Address</th>
                                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400 text-center">System Role</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/5">
                                                {users.length > 0 ? (
                                                    users.map((user) => (
                                                        <tr key={user.id} className="hover:bg-white/2 transition-colors">
                                                            <td className="px-6 py-4 font-semibold text-white">{user.name}</td>
                                                            <td className="px-6 py-4 text-sm text-gray-300">{user.email}</td>
                                                            <td className="px-6 py-4 text-center">
                                                                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${
                                                                    user.role === "ADMIN" 
                                                                        ? "bg-rose-500/10 text-rose-400 border-rose-500/20" 
                                                                        : "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                                                                }`}>
                                                                    {user.role}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={3} className="px-6 py-12 text-center text-gray-500">No Users Found</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            {/* Welcome Header */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <h1 className="text-3xl font-extrabold tracking-tight text-white">
                                        {activeTab === "all"
                                            ? "All Tasks"
                                            : activeTab === "pending"
                                            ? "Pending Tasks"
                                            : "Completed Tasks"}
                                    </h1>
                                    <p className="text-sm text-gray-400 mt-1">
                                        Manage and track workflow items on this workspace.
                                    </p>
                                </div>

                                {role === "ADMIN" && (
                                    <button
                                        onClick={() => {
                                            setTaskToEdit(null);
                                            setIsFormOpen(true);
                                        }}
                                        className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 active:scale-98 transition-all cursor-pointer text-sm"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                        </svg>
                                        Create Task
                                    </button>
                                )}
                            </div>

                            {/* Analytics Summary */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                {/* Card 1: Total */}
                                <div className="glass p-5 rounded-2xl border border-white/5 relative overflow-hidden flex flex-col justify-between h-32">
                                    <div className="absolute top-0 right-0 p-3 text-white/5">
                                        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z" />
                                        </svg>
                                    </div>
                                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Tasks</span>
                                    <span className="text-4xl font-extrabold text-white leading-none mt-2">{countTotal}</span>
                                    <span className="text-xs text-gray-500 mt-2">Active tasks in workspace</span>
                                </div>

                                {/* Card 2: Pending */}
                                <div className="glass p-5 rounded-2xl border border-white/5 relative overflow-hidden flex flex-col justify-between h-32">
                                    <div className="absolute top-0 right-0 p-3 text-white/5">
                                        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm3.3 14.3L11 12.8V7h1.5v4.9l3.7 2.2-.7 1.2z" />
                                        </svg>
                                    </div>
                                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Pending</span>
                                    <span className="text-4xl font-extrabold text-yellow-400 leading-none mt-2">{countPending}</span>
                                    <span className="text-xs text-gray-500 mt-2">Awaiting completion</span>
                                </div>

                                {/* Card 3: Completed */}
                                <div className="glass p-5 rounded-2xl border border-white/5 relative overflow-hidden flex flex-col justify-between h-32">
                                    <div className="absolute top-0 right-0 p-3 text-white/5">
                                        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.47 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                        </svg>
                                    </div>
                                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Completed</span>
                                    <span className="text-4xl font-extrabold text-emerald-400 leading-none mt-2">{countCompleted}</span>
                                    <span className="text-xs text-gray-500 mt-2">Tasks verified complete</span>
                                </div>
                            </div>

                            {/* Filter & Search Controls */}
                            <div className="flex flex-col sm:flex-row gap-4 items-center">
                                <div className="relative w-full sm:flex-1">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-500">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="Search by task title or description..."
                                        className="w-full pl-11 pr-4 py-3 bg-gray-900/50 border border-white/10 rounded-2xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white placeholder-gray-500 outline-none transition-all text-sm"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </div>

                                {/* Dropdown status toggle for mobile or quick selection */}
                                <div className="flex items-center gap-2 w-full sm:w-auto">
                                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Filter Status:</span>
                                    <select
                                        className="w-full sm:w-40 px-3.5 py-2.5 bg-gray-900/50 border border-white/10 rounded-2xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white outline-none transition-all text-sm [&>option]:bg-gray-950"
                                        value={activeTab}
                                        onChange={(e) => setActiveTab(e.target.value)}
                                    >
                                        <option value="all">All Tasks</option>
                                        <option value="pending">Pending</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                            </div>

                            {/* Task Table */}
                            {loading ? (
                                <div className="glass rounded-2xl border border-white/5 p-12 flex flex-col items-center justify-center gap-3">
                                    <svg className="animate-spin h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    <span className="text-gray-400 text-sm">Syncing workspace...</span>
                                </div>
                            ) : (
                                <TaskTable
                                    tasks={filteredTasks}
                                    role={role}
                                    onEdit={(task) => {
                                        setTaskToEdit(task);
                                        setIsFormOpen(true);
                                    }}
                                    onDelete={handleTaskDelete}
                                    onStatusToggle={handleTaskStatusToggle}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Task Form Modal (Create / Edit) */}
            {isFormOpen && (
                <TaskForm
                    key={taskToEdit ? `edit-${taskToEdit.id}` : "new"}
                    isOpen={isFormOpen}
                    onClose={() => {
                        setIsFormOpen(false);
                        setTaskToEdit(null);
                    }}
                    onSubmit={handleFormSubmit}
                    taskToEdit={taskToEdit}
                    usersList={users}
                    currentUserEmail={email}
                />
            )}

            {/* User Form Modal (Create User - Admin only) */}
            {isUserFormOpen && (
                <UserForm
                    key="user-form"
                    isOpen={isUserFormOpen}
                    onClose={() => setIsUserFormOpen(false)}
                    onSubmit={handleUserFormSubmit}
                />
            )}
        </div>
    );
}