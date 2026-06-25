import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import PasswordInput from "./PasswordInput";

const LoginForm = () => {
  return (
    <div className="space-y-8 w-full max-w-sm mx-auto lg:mx-0">
      <div className="space-y-1.5 text-center">
        <h1 className="text-3xl font-black tracking-tight text-brand-secondary">Welcome Back</h1>
        <p className="text-sm font-medium text-brand-text opacity-90">Sign in to your health dashboard</p>
      </div>

      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-2">
          <Label htmlFor="username" className="text-xs font-bold uppercase tracking-wider text-brand-secondary">
            Username
          </Label>
          <Input id="username" type="text" placeholder="Enter your username" className="h-11 rounded-xl border-gray-200 focus-visible:ring-brand-primary" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-brand-secondary">
              Password
            </Label>
            <Link to="/forgot-password" className="text-xs font-bold text-brand-primary hover:text-brand-secondary transition-colors">
              Forgot password?
            </Link>
          </div>
          <PasswordInput id="password" placeholder="Enter your password" className="h-11 rounded-xl border-gray-200 focus-visible:ring-brand-primary" />
        </div>

        <Button type="submit" className="h-11 w-full bg-brand-primary hover:bg-brand-secondary text-sm font-bold text-white rounded-xl shadow-md transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer mt-2">
          Sign In
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
