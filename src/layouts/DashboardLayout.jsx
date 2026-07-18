import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Sidebar from '../components/layout/Sidebar.jsx';
import Navbar from '../components/layout/Navbar.jsx';
import BackToTop from '../components/common/BackToTop.jsx';

const DashboardLayout = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col">
      <Navbar />
      <div className="flex flex-1 pt-16 md:pt-20 relative">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto min-w-0">
          <Outlet />
        </main>
      </div>
      <BackToTop />
    </div>
  );
};

export default DashboardLayout;
