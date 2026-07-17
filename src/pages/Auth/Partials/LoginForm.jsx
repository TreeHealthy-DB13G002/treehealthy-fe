import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import PasswordInput from "./PasswordInput";
import { authService } from "@/services/authServices";

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await authService.login(username, password);
      if (response.status === "success") {
        setSuccess(response.message || "Login successful! Redirecting...");

        setTimeout(() => {
          navigate("/assessment");
        }, 1500);
      }
    } catch (err) {
      setError(err.message || "Failed to sign in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 w-full max-w-sm mx-auto lg:mx-0">
      <div className="space-y-1.5 text-center">
        <h1 className="text-3xl font-black tracking-tight text-brand-secondary">Welcome Back</h1>
        <p className="text-sm font-medium text-brand-text opacity-90">Sign in to your health dashboard</p>
      </div>

      <form className="space-y-5" onSubmit={handleLogin}>
        {error && <div className="p-3 text-sm font-medium text-red-600 bg-red-50 rounded-xl border border-red-100 text-center">⚠️ {error}</div>}
        {success && <div className="p-3 text-sm font-medium text-green-600 bg-green-50 rounded-xl border border-green-100 text-center">✅ {success}</div>}

        <div className="space-y-2">
          <Label htmlFor="username" className="text-xs font-bold uppercase tracking-wider text-brand-secondary">
            Username
          </Label>
          <Input id="username" type="text" placeholder="Enter your username" className="h-11 rounded-xl border-gray-200 focus-visible:ring-brand-primary" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-brand-secondary">
              Password
            </Label>
          </div>
          <PasswordInput id="password" placeholder="Enter your password" className="h-11 rounded-xl border-gray-200 focus-visible:ring-brand-primary" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="h-11 w-full bg-brand-primary hover:bg-brand-secondary text-sm font-bold text-white rounded-xl shadow-md transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer mt-2 disabled:opacity-50"
        >
          {loading ? "Signing In..." : "Sign In"}
        </Button>
      </form>

      <p className="text-center text-sm font-medium text-brand-text">
        Don't have an account?{" "}
        <Link to="/register" className="font-bold text-brand-primary hover:text-brand-secondary transition-colors">
          Create Account
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
