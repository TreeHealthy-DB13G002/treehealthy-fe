import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import PasswordInput from "./PasswordInput";
import { authService } from "@/services/authServices";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // const handleRegister = async (e) => {
  //   e.preventDefault();
  //   setError("");
  //   setSuccess("");

  //   // 🛡️ Validasi Lokal
  //   if (password !== confirmPassword) {
  //     setError("Confirm password doesn't match!");
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     const response = await authService.register(fullname, username, password, confirmPassword);
  //     if (response.status === "success") {
  //       // 🔥 Mengambil pesan sukses dinamis langsung dari BE
  //       setSuccess(response.message || "Account created successfully! Redirecting to sign in...");

  //       // Reset form
  //       setFullname("");
  //       setUsername("");
  //       setPassword("");
  //       setConfirmPassword("");

  //       // Pindahkan ke halaman login setelah 2 detik
  //       setTimeout(() => {
  //         navigate("/login");
  //       }, 2000);
  //     }
  //   } catch (err) {
  //     setError(err.message || "Failed to register. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // 🛡️ Validasi Lokal
    if (password !== confirmPassword) {
      setError("Confirm password doesn't match!");
      return;
    }

    setLoading(true);
    try {
      const response = await authService.register(fullname, username, password, confirmPassword);

      setSuccess(response?.message || "Account created successfully! Redirecting to sign in...");

      setFullname("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 w-full max-w-lg mx-auto lg:mx-0 py-4">
      <div className="space-y-1.5 text-center">
        <h1 className="text-3xl font-black tracking-tight text-brand-secondary">Create Account</h1>
        <p className="text-sm font-medium text-brand-text opacity-90">Create your free TreeHealthy account</p>
      </div>

      <form className="space-y-4" onSubmit={handleRegister}>
        {error && <div className="p-3 text-sm font-medium text-red-600 bg-red-50 rounded-xl border border-red-100 text-center">⚠️ {error}</div>}
        {success && <div className="p-3 text-sm font-medium text-green-600 bg-green-50 rounded-xl border border-green-100 text-center">✅ {success}</div>}

        <div className="space-y-2">
          <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-brand-secondary">
            Full Name
          </Label>
          <Input id="name" type="text" placeholder="Enter your full name" className="h-11 rounded-xl border-gray-200 focus-visible:ring-brand-primary" value={fullname} onChange={(e) => setFullname(e.target.value)} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="username" className="text-xs font-bold uppercase tracking-wider text-brand-secondary">
            Username
          </Label>
          <Input id="username" type="text" placeholder="Choose a username" className="h-11 rounded-xl border-gray-200 focus-visible:ring-brand-primary" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-brand-secondary">
            Password
          </Label>
          <PasswordInput id="password" placeholder="Create a password" className="h-11 rounded-xl border-gray-200 focus-visible:ring-brand-primary" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-xs font-bold uppercase tracking-wider text-brand-secondary">
            Confirm Password
          </Label>
          <PasswordInput
            id="confirmPassword"
            placeholder="Confirm your password"
            className="h-11 rounded-xl border-gray-200 focus-visible:ring-brand-primary"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="h-11 w-full bg-brand-primary hover:bg-brand-secondary text-sm font-bold text-white rounded-xl shadow-md transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer mt-4 disabled:opacity-50"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>

      <p className="text-center text-sm font-medium text-brand-text">
        Already have an account?{" "}
        <Link to="/login" className="font-bold text-brand-primary hover:text-brand-secondary transition-colors">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
