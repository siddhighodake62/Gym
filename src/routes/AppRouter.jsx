import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout.jsx';
import DashboardLayout from '../layouts/DashboardLayout.jsx';
import AuthLayout from '../layouts/AuthLayout.jsx';

// Public pages
import HomePage from '../pages/HomePage.jsx';
import AboutPage from '../pages/AboutPage.jsx';
import ProgramsPage from '../pages/ProgramsPage.jsx';
import MembershipPage from '../pages/MembershipPage.jsx';
import TrainersPage from '../pages/TrainersPage.jsx';
import GalleryPage from '../pages/GalleryPage.jsx';
import BMIPage from '../pages/BMIPage.jsx';
import WorkoutPlansPage from '../pages/WorkoutPlansPage.jsx';
import DietPlansPage from '../pages/DietPlansPage.jsx';
import SchedulePage from '../pages/SchedulePage.jsx';
import ContactPage from '../pages/ContactPage.jsx';

// Auth pages
import LoginPage from '../pages/LoginPage.jsx';
import RegisterPage from '../pages/RegisterPage.jsx';

// Dashboard pages
import DashboardOverview from '../pages/dashboard/DashboardOverview.jsx';
import DashboardProfile from '../pages/dashboard/DashboardProfile.jsx';
import DashboardMembership from '../pages/dashboard/DashboardMembership.jsx';
import DashboardWorkout from '../pages/dashboard/DashboardWorkout.jsx';
import DashboardBMI from '../pages/dashboard/DashboardBMI.jsx';
import DashboardDiet from '../pages/dashboard/DashboardDiet.jsx';
import DashboardAttendance from '../pages/dashboard/DashboardAttendance.jsx';
import DashboardNotifications from '../pages/dashboard/DashboardNotifications.jsx';
import DashboardSettings from '../pages/dashboard/DashboardSettings.jsx';

// 404
import NotFoundPage from '../pages/NotFoundPage.jsx';

const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
      <Route path="/about" element={<MainLayout><AboutPage /></MainLayout>} />
      <Route path="/programs" element={<MainLayout><ProgramsPage /></MainLayout>} />
      <Route path="/membership" element={<MainLayout><MembershipPage /></MainLayout>} />
      <Route path="/trainers" element={<MainLayout><TrainersPage /></MainLayout>} />
      <Route path="/gallery" element={<MainLayout><GalleryPage /></MainLayout>} />
      <Route path="/bmi-calculator" element={<MainLayout><BMIPage /></MainLayout>} />
      <Route path="/workout-plans" element={<MainLayout><WorkoutPlansPage /></MainLayout>} />
      <Route path="/diet-plans" element={<MainLayout><DietPlansPage /></MainLayout>} />
      <Route path="/schedule" element={<MainLayout><SchedulePage /></MainLayout>} />
      <Route path="/contact" element={<MainLayout><ContactPage /></MainLayout>} />

      {/* Auth Routes */}
      <Route path="/login" element={<AuthLayout><LoginPage /></AuthLayout>} />
      <Route path="/register" element={<AuthLayout><RegisterPage /></AuthLayout>} />

      {/* Dashboard Routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardOverview />} />
        <Route path="profile" element={<DashboardProfile />} />
        <Route path="membership" element={<DashboardMembership />} />
        <Route path="workout" element={<DashboardWorkout />} />
        <Route path="bmi" element={<DashboardBMI />} />
        <Route path="diet" element={<DashboardDiet />} />
        <Route path="attendance" element={<DashboardAttendance />} />
        <Route path="notifications" element={<DashboardNotifications />} />
        <Route path="settings" element={<DashboardSettings />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
