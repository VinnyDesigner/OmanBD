import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Signpost, Map, ListChecks, AlertOctagon, BarChart3,
  TrendingUp, ShieldCheck, Sparkles, Code2, Activity, Globe2, Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.svg";

const NAV: Array<{ section: string; items: Array<{ to: string; label: string; icon: typeof LayoutDashboard }> }> = [
  {
    section: "Workspace",
    items: [
      { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { to: "/portal", label: "Address Portal", icon: Globe2 },
    ],
  },
  {
    section: "Sign Management",
    items: [
      { to: "/signs", label: "Sign Dashboard", icon: Signpost },
      { to: "/signs/registry", label: "Sign Registry", icon: ListChecks },
      { to: "/signs/new", label: "Create Sign", icon: Settings },
      { to: "/map", label: "GIS Map Center", icon: Map },
    ],
  },
  {
    section: "Operations",
    items: [
      { to: "/tasks", label: "Tasks", icon: ListChecks },
      { to: "/incidents", label: "Incidents", icon: AlertOctagon },
    ],
  },
  {
    section: "Analytics",
    items: [
      { to: "/executive", label: "Executive NAS", icon: BarChart3 },
      { to: "/progress", label: "Signage Progress", icon: TrendingUp },
      { to: "/quality", label: "Data Quality", icon: ShieldCheck },
      { to: "/ai", label: "AI Analytics", icon: Sparkles },
    ],
  },
  {
    section: "Platform",
    items: [
      { to: "/api", label: "API Portal", icon: Code2 },
      { to: "/integrations", label: "Integrations", icon: Activity },
    ],
  },
];

export function AppSidebar({ collapsed }: { collapsed: boolean }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside
      className={cn(
        "sticky top-0 hidden h-dvh shrink-0 border-r border-sidebar-border bg-sidebar transition-all duration-300 md:flex md:flex-col",
        collapsed ? "w-[72px]" : "w-[268px]"
      )}
    >
      <Link to="/dashboard" className="flex h-16 items-center gap-3 border-b border-sidebar-border px-4 transition hover:bg-sidebar-accent/40">
        <img
          src={logo}
          alt="Ministry of Housing and Urban Planning"
          className="h-12 w-auto max-w-full object-contain dark:brightness-0 dark:invert"
        />
      </Link>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {NAV.map((group) => (
          <div key={group.section} className="mb-5">
            {!collapsed && (
              <div className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                {group.section}
              </div>
            )}
            <ul className="space-y-0.5">
              {group.items.map((it) => {
                const active = pathname === it.to || (it.to !== "/dashboard" && pathname.startsWith(it.to));
                const Icon = it.icon;
                return (
                  <li key={it.to}>
                    <Link
                      to={it.to}
                      className={cn(
                        "group flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-colors",
                        active
                          ? "bg-primary/8 text-primary font-medium"
                          : "text-sidebar-foreground hover:bg-sidebar-accent"
                      )}
                    >
                      <Icon className={cn("h-4 w-4 shrink-0", active && "text-primary")} />
                      {!collapsed && <span className="truncate">{it.label}</span>}
                      {!collapsed && active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {!collapsed && (
        <div className="border-t border-sidebar-border p-3">
          <div className="rounded-xl gradient-brand-soft p-3">
            <div className="flex items-center gap-2 text-xs font-medium">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              Enterprise Secured
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">OIDC · RBAC · Audit · TLS 1.3</p>
          </div>
        </div>
      )}
    </aside>
  );
}
