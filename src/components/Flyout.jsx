import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { motion } from "motion/react"
import { Link } from "react-router-dom"; // ✅ Import from react-router-dom
import { UserAuth } from "./Context/Auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/Firebase";
import { signOut } from "firebase/auth";

const Flyout = () => {
  const [user] = useAuthState(auth);
  
  return (
    <div className="z-50">
      <FlyoutLink to="#" FlyoutContent={PricingContent}>
        <p className="pl-5 font-bold"> {user ? user.displayName?.split(' ')[0] : 'Login'}</p>
      </FlyoutLink>
    </div>
  );
};

const FlyoutLink = ({ children, to, FlyoutContent }) => {
  const [open, setOpen] = useState(false);
  const showFlyout = FlyoutContent && open;

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative w-fit h-fit"
    >
      <Link to={to} className="relative text-black">
        {children}
        <span
          style={{
            transform: showFlyout ? "scaleX(1)" : "scaleX(0)",
          }}
          className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left scale-x-0 rounded-full bg-indigo-300 transition-transform duration-300 ease-out"
        />
      </Link>

      <AnimatePresence>
        {showFlyout && (
          
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            style={{ translateX: "-50%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-1/2 top-12 bg-white text-black"
          >
            <div className="absolute -top-6 left-0 right-0 h-6 bg-black" />
            <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-amber-300" />
            <FlyoutContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PricingContent = () => {
  const [user]=useAuthState(auth);
   const handleLogout = async () => {
    try {
      
      await signOut(auth);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  
  return (
    <div className="w-64 bg-white p-1 shadow-xl z-100">
      <div className="mb-3 space-y-3">
        <h3 className="font-semibold">For Individuals</h3>
        <Link to="/myads" className="block text-sm hover:underline">
          My Ads
        </Link>
       
      </div>
      {/* <div className="mb-6 space-y-3">
        <h3 className="font-semibold">For Companies</h3>
        <Link to="#" className="block text-sm hover:underline">
          Startups
        </Link>
        <Link to="#" className="block text-sm hover:underline">
          SMBs
        </Link>
        <Link to="#" className="block text-sm hover:underline">
          Enterprise
        </Link>
      </div> */}
      <button
      onClick={handleLogout}
       className="w-full rounded-lg border-2 border-neutral-950 px-4 py-2 font-semibold transition-colors hover:bg-neutral-950 hover:text-white">
        logOut
      </button>
    </div>
  );
};

export default Flyout;
