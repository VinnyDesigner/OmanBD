import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";

const LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  signs: "Sign Management",
  registry: "Registry",
  new: "Create Sign",
  map: "GIS Map Center",
  tasks: "Tasks",
  incidents: "Incidents",
  executive: "Executive NAS",
  progress: "Signage Progress",
  quality: "Data Quality",
  ai: "AI Analytics",
  api: "API Portal",
  integrations: "Integrations",
  portal: "Address Portal",
};

export function Breadcrumbs() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const parts = pathname.split("/").filter(Boolean);
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <Link to="/dashboard" className="flex items-center gap-1 hover:text-foreground">
        <Home className="h-3.5 w-3.5" />
      </Link>
      {parts.map((p, i) => {
        const href = "/" + parts.slice(0, i + 1).join("/");
        const last = i === parts.length - 1;
        const label = LABELS[p] ?? p;
        return (
          <span key={href} className="flex items-center gap-1.5">
            <ChevronRight className="h-3 w-3" />
            {last ? (
              <span className="font-medium text-foreground">{label}</span>
            ) : (
              <Link to={href as never} className="hover:text-foreground">{label}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export function PageHeader({
  title, description, actions,
}: { title: string; description?: string; actions?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-3 md:mb-8 md:flex-row md:items-end md:justify-between">
      <div>
        <Breadcrumbs />
        <h1 className="mt-1.5 text-2xl font-semibold tracking-tight md:text-3xl">{title}</h1>
        {description && (
          <p className="mt-1.5 max-w-3xl text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}
