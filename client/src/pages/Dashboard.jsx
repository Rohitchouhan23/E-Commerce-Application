import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Mycars from "../component/Mycars";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Car,
  PlusCircle,
  Package,
  Settings,
  Menu,
  X,
} from "lucide-react";
import MySoldCars from "../component/MySoldCars";

const Dashboard = () => {
  const [active, setActive] = useState("MyCars");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  const options = [
    { name: "MyCars", icon: <Car size={18} /> },
    { name: "MySoldCars", icon: <LayoutDashboard size={18} /> },
    { name: "AddCars", icon: <PlusCircle size={18} /> },
    { name: "Orders", icon: <Package size={18} /> },
    { name: "Settings", icon: <Settings size={18} /> },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) setMobileMenu(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-2 mb-10">
        <div className="bg-gradient-to-r from-indigo-500 to-cyan-500 p-2 rounded-xl">
          <Car size={20} className="text-white" />
        </div>
        <h1 className="text-xl font-bold tracking-wide text-white">
          CarPanel
        </h1>
      </div>

      <div className="space-y-3">
        {options.map((item) => (
          <div
            key={item.name}
            onClick={() => {
              // ✅ FIXED NAVIGATION
              if (item.name === "AddCars") {
                navigate("/carsform");
              } else {
                setActive(item.name);
              }

              if (isMobile) setMobileMenu(false);
            }}
            className={`relative flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 group ${
              active === item.name
                ? "bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-lg"
                : "text-gray-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.name}</span>

            {active === item.name && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute right-0 top-0 h-full w-1 bg-white rounded-l-xl"
              />
            )}
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div className="mt-20 flex min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      
      {/* DESKTOP SIDEBAR */}
      <div className="w-72 bg-slate-900 p-8 hidden lg:block shadow-2xl">
        <SidebarContent />
      </div>

      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {isMobile && mobileMenu && (
          <div className="fixed inset-0 z-50 flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black backdrop-blur-sm"
              onClick={() => setMobileMenu(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="relative w-64 h-full bg-slate-900 p-6 shadow-2xl"
            >
              <button
                className="mb-6 text-white"
                onClick={() => setMobileMenu(false)}
              >
                <X />
              </button>
              <SidebarContent />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* RIGHT CONTENT */}
      <div className="flex-1 p-4 sm:p-6 lg:p-10">
        
        {/* Mobile Header */}
        {isMobile && (
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setMobileMenu(true)}
              className="bg-gradient-to-r from-indigo-600 to-cyan-600 text-white p-2 rounded-lg shadow-md"
            >
              <Menu />
            </button>
            <h2 className="text-xl font-semibold">{active}</h2>
          </div>
        )}

        {/* Desktop Header */}
        {!isMobile && (
          <h2 className="text-3xl font-bold mb-8 text-gray-800">
            {active}
          </h2>
        )}

        <motion.div
          key={active}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-4 sm:p-6 lg:p-8 border border-gray-200"
        >
          {active === "MyCars" && <Mycars />}
          {active === "MySoldCars" && (
            <MySoldCars/>
          )}
          {active === "Orders" && (
            <p>📦 Orders management section.</p>
          )}
          {active === "Settings" && (
            <p>⚙️ Settings panel.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;