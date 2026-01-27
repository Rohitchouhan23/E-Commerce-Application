import { useState, useEffect } from "react";
import Mycars from "../component/Mycars";
import CarForm from "./CarForm";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("MyCars");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const options = [
    "MyCars",
    "MySoldCars",
    "AddCars",
    "Orders",
    "Settings",
  ];

  // Screen size detect
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // 1024 = lg breakpoint
      if (window.innerWidth >= 1024) setMobileMenu(false); // desktop pe menu close
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const SidebarContent = () => (
    <>
      <h1 className="text-xl font-bold mb-6">My Dashboard</h1>

      {/* VIEW ALL */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center bg-gray-300 px-4 py-2 rounded-md"
      >
        <span>View All</span>
        <span
          className={`ml-auto transition-transform duration-700 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        >
          ▼
        </span>
      </button>

      {/* SMOOTH DROPDOWN */}
      <div
        className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          open ? "max-h-96 mt-3" : "max-h-0"
        }`}
      >
        <ul className="space-y-2 py-2">
          {options.map((item) => (
            <li
              key={item}
              onClick={() => {
                setActive(item);
                if (isMobile) setMobileMenu(false); // mobile pe close
              }}
              className={`cursor-pointer px-4 py-2 rounded-md transition-colors hover:bg-indigo-600 ${
                active === item ? "bg-indigo-600" : "bg-slate-800"
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      {/* DESKTOP SIDEBAR */}
      <div className="w-80  rounded-tr-3xl my-4 rounded-br-3xl bg-slate-900 text-white p-4 hidden lg:block">
        <SidebarContent />
      </div>

      {/* MOBILE / TABLET SIDEBAR */}
      {isMobile && mobileMenu && (
        <div className=" inset-0 z-40 lg:hidden">
          {/* BACKDROP */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileMenu(false)}
          />
          {/* SIDEBAR */}
          <div className="absolute left-0 top-0 w-64 h-full bg-slate-900 text-white p-4">
            <button
              className="mb-4 text-right w-full text-xl"
              onClick={() => setMobileMenu(false)}
            >
              ✕
            </button>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* RIGHT CONTENT */}
      <div className="flex-1 pt-4 lg:p-6 px-4">
        {/* MOBILE HEADER */}
        {isMobile && (
          <div className="flex items-center justify-between mb-4 lg:hidden">
            <button
              onClick={() => setMobileMenu(true)}
              className="text-2xl bg-slate-900 text-white px-3 py-1 rounded-md"
            >
              ☰
            </button>
            <h2 className="text-lg font-semibold">{active}</h2>
          </div>
        )}

        {/* DESKTOP HEADER */}
        <h2 className="text-2xl font-semibold mb-4 hidden lg:block">{active}</h2>

        <div className="bg-white rounded-xl shadow lg:p-6">
          {active === "MyCars" && <Mycars />}
          {active === "Users" && <p>👤 Users management section</p>}
          {active === "AddCars" && <CarForm/>}
          {active === "Products" && <p>📦 Product listing</p>}
          {active === "Settings" && <p>⚙️ Settings panel</p>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
