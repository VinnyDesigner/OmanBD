import { type LucideIcon } from "lucide-react";
import { useCountUp } from "@/hooks/use-count-up";
import { cn } from "@/lib/utils";
import { fmt } from "@/lib/nas-data";

export function KpiCard({
  label, value, delta, icon: Icon, tone = "default", suffix,
}: {
  label: string;
  value: number;
  delta?: string;
  icon: LucideIcon;
  tone?: "default" | "primary" | "success" | "warning" | "danger" | "info" | "gold";
  suffix?: string;
}) {
  const v = useCountUp(value);
  const toneMap: Record<string, string> = {
    default: "from-muted to-muted text-foreground",
    primary: "from-primary/15 to-primary/5 text-primary",
    success: "from-success/15 to-success/5 text-success",
    warning: "from-warning/15 to-warning/5 text-warning",
    danger: "from-destructive/15 to-destructive/5 text-destructive",
    info: "from-info/15 to-info/5 text-info",
    gold: "from-gold/20 to-gold/5 text-gold",
  };
  const deltaPositive = delta?.startsWith("+");
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-elev-1 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elev-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
          <p className="mt-3 font-display text-3xl font-semibold tabular-nums tracking-tight">
            {fmt(v)}{suffix}
          </p>
          {delta && (
            <p className={cn(
              "mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium",
              deltaPositive ? "bg-success/10 text-success" : delta.startsWith("-") ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"
            )}>
              {delta} vs last period
            </p>
          )}
        </div>
        <div className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br", toneMap[tone])}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
  );
}
