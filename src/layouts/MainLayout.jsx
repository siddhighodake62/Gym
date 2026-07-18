import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import BackToTop from '../components/common/BackToTop.jsx';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-dark-bg">
      <Navbar />
      <main className="flex-1 pt-16 md:pt-20">
        {children}
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default MainLayout;
