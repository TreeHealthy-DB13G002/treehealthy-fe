import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import PasswordInput from "./PasswordInput";

const ResetPasswordForm = () => {
  return (
    <div className="space-y-8 w-full max-w-sm mx-auto lg:mx-0">
      <div className="space-y-1.5 text-center">
        <h1 className="text-3xl font-black tracking-tight text-brand-secondary sm:text-4xl">Reset Password</h1>
        <p className="text-sm font-medium text-brand-text opacity-90">Create a new password for your account.</p>
      </div>

      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-brand-secondary">
            New Password
          </Label>
          <PasswordInput id="password" placeholder="Enter your new password" className="h-11 rounded-xl border-gray-200 focus-visible:ring-brand-primary" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-xs font-bold uppercase tracking-wider text-brand-secondary">
            Confirm New Password
          </Label>
          <PasswordInput id="confirmPassword" placeholder="Confirm your new password" className="h-11 rounded-xl border-gray-200 focus-visible:ring-brand-primary" />
        </div>

        <Button type="submit" className="h-11 w-full bg-brand-primary hover:bg-brand-secondary text-sm font-bold text-white rounded-xl shadow-md transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer mt-2">
          Reset Password
        </Button>
      </form>

      <p className="text-center text-sm font-medium text-brand-text">
        <Link to="/login" className="font-bold text-brand-primary hover:text-brand-secondary transition-colors">
          Return to the Sign In page
        </Link>
      </p>
    </div>
  );
};

export default ResetPasswordForm;
