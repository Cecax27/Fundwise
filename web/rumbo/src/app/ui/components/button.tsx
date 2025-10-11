import React from "react";
import Link from "next/link";
import { quicksand } from "../fonts";

export default function Button({children, href, secondary = false}: {children: React.ReactNode, href: string, secondary?: boolean}) {
  return (
    <Link
      href={href}
      className={secondary?`${quicksand.className} font-bold hover:opacity-80`:`${quicksand.className} font-bold bg-orange-400 px-6 py-1 rounded-xl hover:bg-orange-500`}
    >
      {children}
    </Link>
  );
}
