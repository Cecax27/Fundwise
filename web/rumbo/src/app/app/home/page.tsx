"use client";

import React from "react";
import Image from "next/image";
import { quicksand, figtree } from "../../ui/fonts";
import Button from "../../ui/components/button";
import NotificationIcon from "@mui/icons-material/Notifications";
import Navigation from "../../ui/components/navigation";
import { ToolsContext } from "@/contexts/ToolsContext";
import { useContext } from "react";

export default function Home() {

  const budgetPlans = useContext(ToolsContext)!;

  console.log(budgetPlans)

  return (
    <>
      <div id="header" className="flex justify-between items-center">
        <div className="leading-loose">
          <h1
            className={`${quicksand.className} text-3xl font-bold text-neutral-700`}
          >
            Hola
          </h1>
          <p className="text-neutral-600">
            Bienvenido a tu dashboard financiero
          </p>
        </div>
        <div className="flex items-center gap-5">
          <NotificationIcon className="text-neutral-600" />
          <div className="rounded-full bg-amber-100 w-10 h-10"></div>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-2xl text-neutral-800">
            Herramientas
          </h2>
          <Button href="#">+ Agregar</Button>
          <div>
            {budgetPlans.map((budgetPlan) => (
              <div key={budgetPlan.name}>
                <h3 className="font-bold text-lg text-neutral-700">
                  {budgetPlan.name}
                </h3>
                <ul>
                  {budgetPlan.groups.map((group) => (
                    <li key={group.group_name} className="text-neutral-600">
                      {group.group_name} - {group.limit_percentage}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}
