import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="px-12 py-4">
      <Link
        href={"https://github.com/berkaycirak"}
        target="_blank"
        className={cn(
          "flex cursor-pointer items-center justify-center gap-2 text-center",
        )}
      >
        powered by <span className="font-bold">KindaDev</span>
        <ExternalLink size={14} />
      </Link>
    </div>
  );
};

export default Footer;
