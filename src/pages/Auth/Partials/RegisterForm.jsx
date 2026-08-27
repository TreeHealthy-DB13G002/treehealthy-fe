import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import PasswordInput from "./PasswordInput";
import { useAuth } from "@/hooks/useAuth";

const RegisterForm = () => {
  const { registerForm, handleRegisterChange, handleRegister, loading } = useAuth();

  return (
    <div className="space-y-6 w-full max-w-lg mx-auto lg:mx-0 py-4">
      <div className="space-y-1.5 text-center">
        <h1 className="text-3xl font-black tracking-tight text-brand-secondary">Create Account</h1>
        <p className="text-sm font-medium text-brand-text opacity-90">Create your free TreeHealthy account</p>
      </div>

      <form className="space-y-4" onSubmit={handleRegister}>
        <div className="space-y-2">
          <Label htmlFor="fullname" className="text-xs font-bold uppercase tracking-wider text-brand-secondary">
            Full Name
          </Label>
          <Input id="fullname" type="text" placeholder="Enter your full name" className="h-11 rounded-xl border-gray-200" value={registerForm.fullname} onChange={handleRegisterChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="username" className="text-xs font-bold uppercase tracking-wider text-brand-secondary">
            Username
          </Label>
          <Input id="username" type="text" placeholder="Choose a username" className="h-11 rounded-xl border-gray-200" value={registerForm.username} onChange={handleRegisterChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-brand-secondary">
            Password
          </Label>
          <PasswordInput id="password" placeholder="Create a password" className="h-11 rounded-xl border-gray-200" value={registerForm.password} onChange={handleRegisterChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-xs font-bold uppercase tracking-wider text-brand-secondary">
            Confirm Password
          </Label>
          <PasswordInput id="confirmPassword" placeholder="Confirm your password" className="h-11 rounded-xl border-gray-200" value={registerForm.confirmPassword} onChange={handleRegisterChange} required />
        </div>

        <Button type="submit" disabled={loading} className="h-11 w-full bg-brand-primary hover:bg-brand-secondary text-sm font-bold text-white rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer mt-4">
          {loading ? <Spinner /> : "Create Account"}
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
