// src/AppRoutes.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import LoadingSpinner from "./components/LoadingSpinner";

// Lazy load pages for better performance
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const TrainingPage = lazy(() => import("./pages/TrainingPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const ReportsPage = lazy(() => import("./pages/ReportsPage"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const NotificationPage = lazy(() => import("./pages/NotificationPage"));
const SignUpPage = lazy(() => import("./pages/auth/SignUpPage"));

const AppRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Public Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/sign-up" element={<SignUpPage />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/training" element={<TrainingPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/notifications" element={<NotificationPage />} />
          </Route>

          {/* 404 Page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
