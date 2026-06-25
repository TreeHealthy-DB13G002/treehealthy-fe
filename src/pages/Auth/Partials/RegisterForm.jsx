import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import PasswordInput from "./PasswordInput";

const RegisterForm = () => {
  return (
    <div className="space-y-6 w-full max-w-lg mx-auto lg:mx-0 py-4">
      <div className="space-y-1.5 text-center">
        <h1 className="text-3xl font-black tracking-tight text-brand-secondary">Create Account</h1>
        <p className="text-sm font-medium text-brand-text opacity-90">Create your free TreeHealthy account</p>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-brand-secondary">
              Full Name
            </Label>
            <Input id="name" type="text" placeholder="Enter your full name" className="h-11 rounded-xl border-gray-200 focus-visible:ring-brand-primary" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="username" className="text-xs font-bold uppercase tracking-wider text-brand-secondary">
              Username
            </Label>
            <Input id="username" type="text" placeholder="Choose a username" className="h-11 rounded-xl border-gray-200 focus-visible:ring-brand-primary" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="pin" className="text-xs font-bold uppercase tracking-wider text-brand-secondary">
            Security PIN
          </Label>
          <PasswordInput id="pin" type="text" inputMode="numeric" maxLength={4} placeholder="Create a 4-digit PIN" className="h-11 rounded-xl border-gray-200 focus-visible:ring-brand-primary" />
          <p className="text-xs italic font-medium text-brand-text/80 leading-normal">*PIN ini akan digunakan sebagai verifikasi jika Anda lupa password.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-brand-secondary">
              Password
            </Label>
            <PasswordInput id="password" placeholder="Create a password" className="h-11 rounded-xl border-gray-200 focus-visible:ring-brand-primary" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-xs font-bold uppercase tracking-wider text-brand-secondary">
              Confirm Password
            </Label>
            <PasswordInput id="confirmPassword" placeholder="Confirm your password" className="h-11 rounded-xl border-gray-200 focus-visible:ring-brand-primary" />
          </div>
        </div>

        <Button type="submit" className="h-11 w-full bg-brand-primary hover:bg-brand-secondary text-sm font-bold text-white rounded-xl shadow-md transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer mt-4">
          Create Account
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
