import React from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";

interface AlertProps {
  variant: "error" | "warning" | "info";
  message: string;
}

export default function Alert({ variant, message }: AlertProps) {
  let bgClass: string;
  let iconClass: string;
  let textClass: string;
  let icon: React.ReactElement;

  if (variant === "error") {
    bgClass =
      "bg-red-50 dark:bg-red-500/10 dark:outline dark:outline-red-500/15";
    iconClass = "text-red-400 dark:text-red-300";
    textClass = "text-red-700 dark:text-red-100/80";
    icon = (
      <ExclamationTriangleIcon
        aria-hidden="true"
        className={`size-5 ${iconClass}`}
      />
    );
  } else if (variant === "warning") {
    bgClass =
      "bg-yellow-50 dark:bg-yellow-500/10 dark:outline dark:outline-yellow-500/15";
    iconClass = "text-yellow-400 dark:text-yellow-300";
    textClass = "text-yellow-700 dark:text-yellow-100/80";
    icon = (
      <ExclamationTriangleIcon
        aria-hidden="true"
        className={`size-5 ${iconClass}`}
      />
    );
  } else {
    // info - blue
    bgClass =
      "bg-blue-50 dark:bg-blue-500/10 dark:outline dark:outline-blue-500/15";
    iconClass = "text-blue-400 dark:text-blue-300";
    textClass = "text-blue-700 dark:text-blue-100/80";
    icon = (
      <ExclamationTriangleIcon
        aria-hidden="true"
        className={`size-5 ${iconClass}`}
      />
    );
  }

  return (
    <div className={`rounded-md p-4 ${bgClass}`}>
      <div className="flex">
        <div className="shrink-0">{icon}</div>
        <div className="ml-3">
          <div className={`text-sm ${textClass}`}>
            <p>{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
