import { useState, useEffect, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { logout } from "../services/authService";
import Menu from "./Menu";
import X from "./X";
import { motion, AnimatePresence } from "framer-motion";
import profile from "../assets/profile.png";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const timeoutRef = useRef(null);

  /* ================= Profile Hover Delay ================= */
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsProfileOpen(false);
    }, 3000);
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  /* ================= Scroll Hide / Show ================= */
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 60) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const closeMenu = () => setIsOpen(false);

  const isActive = (path) =>
    location.pathname === path
      ? "text-orange-400 bg-orange-50"
      : "text-gray-700";

  /* ================= Reusable Nav Link ================= */
  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      className="relative group text-gray-700 font-bold transition-colors duration-300"
    >
      <span>{children}</span>
    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 w-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500 group-hover:w-16"></span>

    </Link>
  );

  return (
    <header
      className={`fixed w-full z-50 bg-white/70 backdrop-blur-md transition-transform duration-300 border-b ${
        showNavbar ? "translate-y-0" : "-translate-y-32"
      }`}
    >
      <div className="container mx-auto px-4 py-5 flex justify-between items-center">
        
        {/* ================= Logo ================= */}
        <Link
          to="/"
          className="flex items-center gap-2 text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 13l2-5a3 3 0 012.8-2h8.4a3 3 0 012.8 2l2 5M5 13h14M6.5 16a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm14 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM8 10h8"
              />
            </svg>
          </div>
          <span>CarBazaar</span>
        </Link>

        {/* ================= Mobile Button ================= */}
        <button
          className="lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>

        {/* ================= Desktop Nav ================= */}
        <nav className="hidden lg:flex items-center gap-6">
          <NavLink to="/">Home</NavLink>

          {token ? (
            <>
              <NavLink to="/dashboard">Dashboard</NavLink>
              <NavLink to="/carsform">Add Car</NavLink>

              {/* ================= Profile ================= */}
              <div
                className="relative"
                onMouseLeave={handleMouseLeave}
                onMouseEnter={handleMouseEnter}
              >
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 hover:scale-105 transition"
                >
                  <img
                    src={profile}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-5 w-40 bg-white rounded-xl shadow-lg border p-2"
                    >
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsProfileOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
        </nav>
      </div>

      {/* ================= Mobile Menu ================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white shadow-md border-t"
          >
            <div className="px-4 py-3 space-y-2 text-center">
              <Link
                to="/"
                onClick={closeMenu}
                className={`block py-2 rounded-lg font-bold ${isActive("/")}`}
              >
                Home
              </Link>

              {token ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={closeMenu}
                    className={`block py-2 rounded-lg font-bold ${isActive("/dashboard")}`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/carsform"
                    onClick={closeMenu}
                    className={`block py-2 rounded-lg font-bold ${isActive("/carsform")}`}
                  >
                    Add Car
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full py-2 font-bold rounded-lg"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className={`block py-2 rounded-lg font-bold ${isActive("/login")}`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={closeMenu}
                    className={`block py-2 rounded-lg font-bold ${isActive("/register")}`}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;