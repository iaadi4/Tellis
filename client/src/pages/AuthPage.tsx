import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { CheckCircle } from "lucide-react";

interface AuthPageProps {
  type: "login" | "signup";
}

export default function AuthPage({ type }: AuthPageProps) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isLogin = type === "login";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`http://localhost:5000/api/auth/${isLogin ? "login" : "register"}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      toast.success(
        `${isLogin ? "Login Successful" : "Signup Successful"}: Welcome${
          isLogin ? " back" : ""
        }, ${data.data.name}!`
      );

      navigate("/home");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error(`Failed to ${isLogin ? "login" : "signup"}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="w-full px-6 py-4 bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center h-8 w-8 rounded-md bg-indigo-600 text-white">
              <CheckCircle size={24} />
            </div>
            <span className="text-xl font-semibold text-indigo-600">
              TaskFlow
            </span>
          </Link>
        </div>
      </header>

      <div className="flex flex-1 justify-center items-center p-4">
        <Card className="w-full max-w-md shadow-xl rounded-2xl">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
              {isLogin ? "Welcome Back" : "Create an Account"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="********"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
              </div>

              <Button
                type="submit"
                className="w-full mt-2 bg-indigo-600 hover:bg-indigo-500 cursor-pointer"
                disabled={loading}
              >
                {loading
                  ? isLogin
                    ? "Logging in..."
                    : "Signing up..."
                  : isLogin
                  ? "Login"
                  : "Sign up"}
              </Button>
            </form>

            <div className="text-center text-sm text-muted-foreground mt-4">
              {isLogin ? (
                <>
                  Don&apos;t have an account?{" "}
                  <Link
                    to="/register"
                    className="text-indigo-600 hover:underline"
                  >
                    Sign up
                  </Link>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <Link to="/login" className="text-indigo-600 hover:underline">
                    Login
                  </Link>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
