import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { AppHeader } from "@/components/app-header";

export const Route = createFileRoute("/_shell")({
  component: ShellLayout,
});

function ShellLayout() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="flex min-h-dvh w-full bg-background">
      <AppSidebar collapsed={collapsed} />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader onToggleSidebar={() => setCollapsed((c) => !c)} />
        <div className="flex-1 px-4 py-6 md:px-8 md:py-8 animate-in fade-in slide-in-from-bottom-1 duration-300">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
