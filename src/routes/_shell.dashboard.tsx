import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Signpost, CheckCircle2, ListTodo, AlertTriangle, PlugZap, ArrowRight,
  BarChart3, Globe2, Search, Code2, Activity, FileBarChart, ShieldCheck,
  Sparkles, ChevronRight, CircleDot,
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader } from "@/components/page-header";
import { KpiCard } from "@/components/kpi-card";
import { OmanMap } from "@/components/oman-map";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  KPI_TOP, MODULES, SYSTEMS, ACTIVITIES, APPROVALS, GOVERNORATES,
  INSTALL_TREND, SIGN_STATUS,
} from "@/lib/nas-data";

const ICONS = { Signpost, CheckCircle2, ListTodo, AlertTriangle, PlugZap, BarChart3, Globe2, Search, Code2, Activity, FileBarChart, ShieldCheck, Sparkles };

export const Route = createFileRoute("/_shell/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — NAS" },
      { name: "description", content: "National Addressing System overview, KPIs, integrations and coverage." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Welcome back, Salim"
        description="Here's the live state of the National Addressing System across all governorates."
        actions={
          <>
            <Button variant="outline" className="gap-1.5"><FileBarChart className="h-4 w-4" /> Export</Button>
            <Button className="gap-1.5 gradient-brand text-primary-foreground"><Sparkles className="h-4 w-4" /> Ask AI</Button>
          </>
        }
      />

      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border border-border gradient-brand-soft p-6 md:p-8">
        <div className="grid-bg absolute inset-0 opacity-40" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/70 px-3 py-1 text-xs font-medium text-primary backdrop-blur">
              <CircleDot className="h-3 w-3" /> Q2-2026 Program · On Track
            </div>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight md:text-3xl">
              National coverage hit <span className="text-gradient-brand">81.4%</span>
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Address growth +12% MoM. Two governorates at risk — review the executive snapshot.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button asChild className="gradient-brand text-primary-foreground"><Link to="/executive">Executive Dashboard</Link></Button>
              <Button asChild variant="outline"><Link to="/map">Open GIS Map</Link></Button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {[
              { l: "NAS Completion", v: "81.4%" },
              { l: "Verified Addresses", v: "1.78M" },
              { l: "Data Quality", v: "92.4" },
            ].map((s) => (
              <div key={s.l} className="glass rounded-xl px-4 py-3 text-center shadow-elev-1">
                <div className="font-display text-2xl font-semibold text-gradient-brand">{s.v}</div>
                <div className="text-[11px] text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {KPI_TOP.map((k, i) => {
          const tones = ["primary", "success", "warning", "danger", "info"] as const;
          const Icon = ICONS[k.icon as keyof typeof ICONS] ?? Signpost;
          return <KpiCard key={k.label} label={k.label} value={k.value} delta={k.delta} icon={Icon} tone={tones[i]} />;
        })}
      </div>

      {/* Modules */}
      <section>
        <SectionHead title="Modules" description="Jump into a workspace" link="/signs" linkLabel="All modules" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MODULES.map((m) => {
            const Icon = ICONS[m.icon as keyof typeof ICONS] ?? Signpost;
            return (
              <Link key={m.id} to={m.to} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-elev-1 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elev-3">
                <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${m.color} text-white shadow-elev-2`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold">{m.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{m.desc}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Open <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* BI snapshot */}
      <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="xl:col-span-2 rounded-2xl border border-border bg-card p-5 shadow-elev-1">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Power BI Snapshot</h3>
              <p className="text-xs text-muted-foreground">Planned vs Installed vs Verified — last 12 months</p>
            </div>
            <Badge variant="outline" className="border-info/30 bg-info/5 text-info">Live · Power BI</Badge>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={INSTALL_TREND}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.005 260)" vertical={false} />
                <XAxis dataKey="m" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.005 260)", fontSize: 12 }} />
                <Bar dataKey="manufactured" fill="oklch(0.62 0.18 250)" radius={[4,4,0,0]} />
                <Bar dataKey="installed" fill="oklch(0.48 0.18 22)" radius={[4,4,0,0]} />
                <Bar dataKey="verified" fill="oklch(0.78 0.12 85)" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 shadow-elev-1">
          <h3 className="font-semibold">Sign Status</h3>
          <p className="text-xs text-muted-foreground">Distribution across the registry</p>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={SIGN_STATUS} dataKey="value" nameKey="name" innerRadius={48} outerRadius={78} paddingAngle={2}>
                  {SIGN_STATUS.map((e) => <Cell key={e.name} fill={e.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.005 260)", fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-2 space-y-1.5 text-xs">
            {SIGN_STATUS.map((s) => (
              <li key={s.name} className="flex items-center justify-between">
                <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: s.color }} />{s.name}</span>
                <span className="font-medium tabular-nums">{s.value.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Integrations */}
      <section>
        <SectionHead title="Connected Systems" description="Real-time integration health" link="/integrations" linkLabel="Monitoring center" />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {SYSTEMS.map((s) => {
            const ok = s.status === "operational";
            return (
              <div key={s.name} className="rounded-xl border border-border bg-card p-4 shadow-elev-1 transition hover:shadow-elev-2">
                <div className="flex items-start justify-between">
                  <div className="text-sm font-medium leading-tight">{s.name}</div>
                  <span className={`h-2 w-2 shrink-0 translate-y-1 rounded-full ${ok ? "bg-success" : "bg-warning"} ring-4 ${ok ? "ring-success/15" : "ring-warning/15"}`} />
                </div>
                <div className="mt-3 flex items-baseline gap-1 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">{s.uptime}%</span> uptime · {s.latency}ms
                </div>
                <Progress value={s.uptime} className="mt-2 h-1.5" />
              </div>
            );
          })}
        </div>
      </section>

      {/* Map + governorates */}
      <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="xl:col-span-2 rounded-2xl border border-border bg-card p-5 shadow-elev-1">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">National Coverage</h3>
              <p className="text-xs text-muted-foreground">Heatmap — completion intensity by governorate</p>
            </div>
            <Button asChild variant="outline" size="sm"><Link to="/map">Open GIS</Link></Button>
          </div>
          <OmanMap height={340} />
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 shadow-elev-1">
          <h3 className="font-semibold">Governorate Progress</h3>
          <ul className="mt-4 space-y-3">
            {GOVERNORATES.slice(0, 7).map((g) => (
              <li key={g.code}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium">{g.name}</span>
                  <span className="tabular-nums text-muted-foreground">{g.completion}%</span>
                </div>
                <Progress value={g.completion} className="h-1.5" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Activity + approvals */}
      <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="xl:col-span-2 rounded-2xl border border-border bg-card p-5 shadow-elev-1">
          <h3 className="font-semibold">Recent Activity</h3>
          <ol className="mt-4 space-y-4">
            {ACTIVITIES.map((a, i) => (
              <li key={i} className="relative flex gap-3 pl-2">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary ring-4 ring-primary/15" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-sm font-medium">{a.user}</span>
                    <span className="text-[11px] text-muted-foreground">{a.t}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{a.action}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 shadow-elev-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Pending Approvals</h3>
            <Badge variant="outline" className="border-warning/30 bg-warning/5 text-warning">{APPROVALS.length}</Badge>
          </div>
          <ul className="mt-4 space-y-3">
            {APPROVALS.map((a) => (
              <li key={a.id} className="rounded-lg border border-border bg-background/50 p-3 transition hover:bg-accent">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-xs font-medium text-muted-foreground">{a.id}</div>
                    <div className="text-sm font-medium leading-snug">{a.title}</div>
                  </div>
                  <Badge variant="outline" className={
                    a.priority === "high" ? "border-destructive/30 bg-destructive/5 text-destructive" :
                    a.priority === "medium" ? "border-warning/30 bg-warning/5 text-warning" :
                    "border-info/30 bg-info/5 text-info"
                  }>{a.priority}</Badge>
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>{a.count} items · {a.submitted}</span>
                  <button className="inline-flex items-center gap-0.5 font-medium text-primary hover:underline">Review <ChevronRight className="h-3 w-3" /></button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

function SectionHead({ title, description, link, linkLabel }: { title: string; description: string; link: string; linkLabel: string }) {
  return (
    <div className="mb-4 flex items-end justify-between">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Button asChild variant="ghost" size="sm" className="gap-1 text-primary">
        <Link to={link}>{linkLabel} <ArrowRight className="h-3.5 w-3.5" /></Link>
      </Button>
    </div>
  );
}
