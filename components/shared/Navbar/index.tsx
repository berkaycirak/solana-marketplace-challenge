import { cn } from "@/lib/utils";
import React from "react";
import WalletSection from "./WalletSection";

import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-primary px-12 py-4 shadow-lg">
      {/* Main Navbar */}
      <div className="flex h-[2rem] w-full items-center justify-between">
        <Link href={"/"} className={cn("font-bold text-white")}>
          <h4>Markethall</h4>
        </Link>
        <WalletSection />
      </div>
    </nav>
  );
};

export default Navbar;
