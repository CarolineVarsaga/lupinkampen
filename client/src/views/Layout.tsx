import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="main-content">
        <ScrollToTop />
        <Outlet></Outlet>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
