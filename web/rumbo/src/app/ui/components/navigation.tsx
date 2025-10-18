'use client'

import React from "react";
import Link from "next/link";
import { figtree } from "../fonts";
import {
  Dashboard,
  SwapHoriz,
  AccountBalanceWallet,
  Settings,
} from "@mui/icons-material";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Navigation() {
  return (
    <nav className="mt-10 mb-10">
      <ul className="flex flex-col gap-5">
        <Item href="/app/home">
          <Dashboard /> Dashboard
        </Item>
        <Item href="#">
          <SwapHoriz /> Transacciones
        </Item>
        <Item href="#">
          <AccountBalanceWallet /> Cuentas
        </Item>
        <Item href="#">
          <Settings /> Ajustes
        </Item>
      </ul>
    </nav>
  );
}

function Item({ children, href }: { children: React.ReactNode; href: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <li
      className={clsx("rounded-lg hover:bg-blue-100 transition-colors", {
        "text-blue-700 bg-blue-200": isActive,
        "text-neutral-600": !isActive,
      })}
    >
      <Link
        href={href}
        className={`flex gap-4 p-3 ${figtree.className} font-semibold`}
      >
        {children}
      </Link>
    </li>
  );
}
