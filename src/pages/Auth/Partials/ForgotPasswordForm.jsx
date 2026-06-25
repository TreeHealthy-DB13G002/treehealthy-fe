import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import PasswordInput from "./PasswordInput";

const ForgotPasswordForm = () => {
  return (
    <div className="space-y-8 w-full max-w-sm mx-auto lg:mx-0">
      <div className="space-y-1.5 text-center">
        <h1 className="text-3xl font-black tracking-tight text-brand-secondary">Forgot Password</h1>
        <p className="text-sm font-medium text-brand-text opacity-90">Verify your account to reset your password.</p>
      </div>

      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-2">
          <Label htmlFor="username" className="text-xs font-bold uppercase tracking-wider text-brand-secondary">
            Username
          </Label>
          <Input id="username" type="text" placeholder="Enter your username" className="h-11 rounded-xl border-gray-200 focus-visible:ring-brand-primary" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pin" className="text-xs font-bold uppercase tracking-wider text-brand-secondary">
            Security PIN
          </Label>
          <PasswordInput id="pin" placeholder="Enter your Security PIN" inputMode="numeric" maxLength={4} className="h-11 rounded-xl border-gray-200 focus-visible:ring-brand-primary" />
          <p className="text-xs italic font-medium text-brand-text/80 leading-normal">*Masukkan PIN yang Anda buat saat registrasi.</p>
        </div>

        <Button type="submit" className="h-11 w-full bg-brand-primary hover:bg-brand-secondary text-sm font-bold text-white rounded-xl shadow-md transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer mt-2">
          Verify
        </Button>
      </form>

      <p className="text-center text-sm font-medium text-brand-text">
        Remember your password?{" "}
        <Link to="/login" className="font-bold text-brand-primary hover:text-brand-secondary transition-colors">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default ForgotPasswordForm;
