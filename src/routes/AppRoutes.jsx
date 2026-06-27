import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingLayout from "../layouts/LandingLayout";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import AssessmentLayout from "@/layouts/AssessmentLayout";

import Landing from "@/pages/Landing";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "@/pages/Auth/ForgotPassword";
import ResetPassword from "@/pages/Auth/ResetPassword";

import Assessment from "@/pages/Assessment/Assessment";

import Dashboard from "@/pages/Dashboard/Dashboard";
import Analytics from "@/pages/History/Analytics";
import JourneyLog from "@/pages/History/JourneyLog";
import Settings from "@/pages/Settings";

import NotFound from "@/pages/NotFound";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LandingLayout />}>
          <Route path="/" element={<Landing />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        <Route element={<AssessmentLayout />}>
          <Route path="/assessment" element={<Assessment />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/history/analytics" element={<Analytics />} />
          <Route path="/history/journey-log" element={<JourneyLog />} />

          <Route path="/settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
