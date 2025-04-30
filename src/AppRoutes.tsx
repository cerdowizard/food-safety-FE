import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import LoadingSpinner from "./components/LoadingSpinner";
import Checklist from "./pages/home/Checklist";
import ProfilePage from "./pages/home/ProfilePage";
import CourseDetailPage from "./pages/home/CourseDetailPage";

// Lazy load pages for better performance
const DashboardPage = lazy(() => import("./pages/home/DashboardPage"));
const TrainingPage = lazy(() => import("./pages/home/TrainingPage"));
const SettingsPage = lazy(() => import("./pages/home/SettingsPage"));
const ReportsPage = lazy(() => import("./pages/home/ReportsPage"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const NotificationPage = lazy(() => import("./pages/home/NotificationPage"));
const SignUpPage = lazy(() => import("./pages/auth/SignUpPage"));
const SignUpUser = lazy(() => import("./pages/auth/SignUpUser"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AppRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Public Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/sign-up" element={<SignUpPage />} />
            // <Route path="/auth/admin/sign-up-user" element={<SignUpUser />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/training" element={<TrainingPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/checklist" element={<Checklist />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/notifications" element={<NotificationPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/course/:id" element={<CourseDetailPage />} />
          </Route>

          {/* 404 Page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
