import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CheckCircle, Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Task {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [taskForm, setTaskForm] = useState({ name: "", description: "" });
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const navigate = useNavigate();

  const fetchTasks = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:5000/api/tasks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (res.status === 401) {
        toast.error("Unauthorized. Please login again.");
        navigate("/login");
        return;
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch tasks");
      }

      setTasks(data.data);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Failed to fetch tasks");
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTaskForm({ ...taskForm, [e.target.name]: e.target.value });
  };

  const handleCreateTask = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(taskForm),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create task");
      }

      toast.success("Task created successfully");
      setTaskForm({ name: "", description: "" });
      setIsCreateDialogOpen(false);
      fetchTasks();
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Failed to create task");
      }
    }
  };

  const handleUpdateTask = async () => {
    if (!currentTask) return;

    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${currentTask.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(taskForm),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update task");
      }

      toast.success("Task updated successfully");
      setIsUpdateDialogOpen(false);
      fetchTasks();
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Failed to update task");
      }
    }
  };

  const handleDeleteTask = async () => {
    if (!currentTask) return;

    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${currentTask.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete task");
      }

      toast.success("Task deleted successfully");
      setIsDeleteDialogOpen(false);
      fetchTasks();
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Failed to delete task");
      }
    }
  };

  const openUpdateDialog = (task: Task) => {
    setCurrentTask(task);
    setTaskForm({ name: task.name, description: task.description });
    setIsUpdateDialogOpen(true);
  };

  const openDeleteDialog = (task: Task) => {
    setCurrentTask(task);
    setIsDeleteDialogOpen(true);
  };

  const handleLogout = async () => {
    await fetch('http://localhost:5000/api/auth/logout');
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="w-full px-6 py-4 bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/home" className="flex items-center space-x-2">
            <div className="flex items-center justify-center h-8 w-8 rounded-md bg-indigo-600 text-white">
              <CheckCircle size={24} />
            </div>
            <span className="text-xl font-semibold text-indigo-600">TaskFlow</span>
          </Link>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>

      <div className="flex-1 container max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">My Tasks</h1>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-indigo-600 hover:bg-indigo-500">
                <Plus size={18} className="mr-2" /> Add Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Task</DialogTitle>
                <DialogDescription>
                  Add details for your new task.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="task-name">Task Name</Label>
                  <Input 
                    id="task-name" 
                    name="name"
                    value={taskForm.name}
                    onChange={handleChange}
                    placeholder="Enter task name" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="task-description">Description</Label>
                  <Textarea 
                    id="task-description"
                    name="description"
                    value={taskForm.description}
                    onChange={handleChange}
                    placeholder="Enter task description"
                    rows={4}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  className="bg-indigo-600 hover:bg-indigo-500"
                  onClick={handleCreateTask}
                  disabled={!taskForm.name || !taskForm.description}
                >
                  Create Task
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {loading && (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
          </div>
        )}

        {!loading && tasks.length === 0 && (
          <Card className="border border-dashed border-gray-300 bg-white">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="rounded-full bg-indigo-100 p-3 mb-4">
                <CheckCircle className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No tasks yet</h3>
              <p className="text-sm text-gray-500 mb-4">Create your first task to get started</p>
              <Button 
                className="bg-indigo-600 hover:bg-indigo-500"
                onClick={() => setIsCreateDialogOpen(true)}
              >
                <Plus size={18} className="mr-2" /> Add Task
              </Button>
            </CardContent>
          </Card>
        )}

        {!loading && tasks.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <Card key={task.id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold">{task.name}</CardTitle>
                  <CardDescription className="text-xs text-gray-500">
                    Created: {formatDate(task.createdAt)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{task.description}</p>
                </CardContent>
                <CardFooter className="pt-2 flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => openUpdateDialog(task)}
                  >
                    <Pencil size={16} className="mr-1" /> Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                    onClick={() => openDeleteDialog(task)}
                  >
                    <Trash2 size={16} className="mr-1" /> Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Task</DialogTitle>
              <DialogDescription>
                Make changes to your task.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="update-task-name">Task Name</Label>
                <Input 
                  id="update-task-name" 
                  name="name"
                  value={taskForm.name}
                  onChange={handleChange}
                  placeholder="Enter task name" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="update-task-description">Description</Label>
                <Textarea 
                  id="update-task-description"
                  name="description"
                  value={taskForm.description}
                  onChange={handleChange}
                  placeholder="Enter task description"
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsUpdateDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                className="bg-indigo-600 hover:bg-indigo-500"
                onClick={handleUpdateTask}
                disabled={!taskForm.name || !taskForm.description}
              >
                Update Task
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your task.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={handleDeleteTask}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}