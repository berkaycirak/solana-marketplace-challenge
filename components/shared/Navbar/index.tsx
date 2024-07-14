import { cn } from "@/lib/utils";
import React from "react";
import WalletSection from "./WalletSection";

import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full bg-primary px-2 py-4 shadow-lg md:px-12">
      {/* Main Navbar */}
      <div className="flex h-[2rem] w-full items-center justify-between">
        <Link href={"/"} className={cn("font-bold text-white")}>
          <h4>RabidHall</h4>
        </Link>
        <WalletSection />
      </div>
    </nav>
  );
};

export default Navbar;
