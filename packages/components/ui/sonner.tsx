"use client";
import React from "react";
import { LoaderIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = () => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      richColors
      theme={theme as ToasterProps["theme"]}
      expand={false}
      visibleToasts={5}
      closeButton={true}
      position="bottom-right"
      swipeDirections={["left", "right"]}
      icons={{
        loading: <LoaderIcon size={16} className="animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "!text-white !border-none rounded-lg cursor-grab active:cursor-grabbing select-none z-99999",
          icon: "!size-6",
          title: "!text-sm !font-bold",
          description: "!text-xs !font-semibold !text-white/80",
          success: "!bg-success",
          info: "!bg-blue-700 dark:!bg-blue-500",
          loading: "!bg-slate-500 dark:!bg-slate-400",
          warning: "!bg-warning",
          error: "!bg-destructive",
          closeButton:
            "!text-gray-400 hover:!text-gray-500 !bg-neutral-50 hover:!bg-gray-100 !border-none !shadow",
        },
      }}
      className="toaster group pointer-events-auto !z-999999"
    />
  );
};

export { Toaster };
