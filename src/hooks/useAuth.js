import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { authService } from "@/services/authServices";

export const useAuth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Form State untuk Login
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  // Form State untuk Register
  const [registerForm, setRegisterForm] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  // Handler onChange universal untuk input form
  const handleLoginChange = (e) => {
    const { id, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleRegisterChange = (e) => {
    const { id, value } = e.target;
    setRegisterForm((prev) => ({ ...prev, [id]: value }));
  };

  // Submit Login Logic
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    toast.promise(authService.login(loginForm.username, loginForm.password), {
      loading: "Signing in to your account...",
      success: (res) => {
        const hasProfile = res.data?.hasProfile;
        if (hasProfile === false) {
          navigate("/assessment");
        } else {
          navigate("/dashboard");
        }
        return res.message || "Welcome back to TreeHealthy!";
      },
      error: (err) => {
        setLoading(false);
        return err.message || "Failed to sign in. Please check your credentials.";
      },
      finally: () => setLoading(false),
    });
  };

  // Submit Register Logic
  const handleRegister = async (e) => {
    e.preventDefault();

    if (registerForm.password !== registerForm.confirmPassword) {
      toast.error("Confirm password doesn't match!");
      return;
    }

    setLoading(true);

    toast.promise(authService.register(registerForm.fullname, registerForm.username, registerForm.password, registerForm.confirmPassword), {
      loading: "Creating your account...",
      success: (res) => {
        setRegisterForm({
          fullname: "",
          username: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/login");
        return res?.message || "Account created successfully!";
      },
      error: (err) => {
        setLoading(false);
        return err.message || "Failed to register.";
      },
      finally: () => setLoading(false),
    });
  };

  return {
    loading,
    loginForm,
    registerForm,
    handleLoginChange,
    handleRegisterChange,
    handleLogin,
    handleRegister,
  };
};
