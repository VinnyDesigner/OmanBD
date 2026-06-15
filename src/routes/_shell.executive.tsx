import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, Building2, MapPin, Signpost, AlertTriangle, Target, Download } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend, RadialBar, RadialBarChart, PolarAngleAxis } from "recharts";
import { PageHeader } from "@/components/page-header";
import { KpiCard } from "@/components/kpi-card";
import { OmanMap } from "@/components/oman-map";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { GOVERNORATES, INSTALL_TREND } from "@/lib/nas-data";

export const Route = createFileRoute("/_shell/executive")({
  head: () => ({ meta: [{ title: "Executive NAS Dashboard" }, { name: "description", content: "Board-level KPIs, risk and milestone tracking." }] }),
  component: Executive,
});

const RISKS = [
  { id: "RSK-021", title: "Sharqiyah South — verification backlog", level: "High", trend: "+8%" },
  { id: "RSK-019", title: "Amalak integration latency", level: "Medium", trend: "+12%" },
  { id: "RSK-017", title: "Contractor BAU-02 SLA risk", level: "Medium", trend: "-2%" },
  { id: "RSK-014", title: "QR vandalism — Sohar district", level: "Low", trend: "+3%" },
];

const MILESTONES = [
  { name: "Phase 3 Bawshar — Installation", pct: 94, due: "Jul 2026" },
  { name: "Salalah Cornish — Verification", pct: 72, due: "Aug 2026" },
  { name: "Sharqiyah Address Audit", pct: 58, due: "Sep 2026" },
  { name: "National GIS Boundary Re-survey", pct: 41, due: "Oct 2026" },
];

const CONNECTED_SYSTEMS = [
  { name: "ArcGIS Enterprise", status: "Online" },
  { name: "LIS", status: "Online" },
  { name: "Amalak", status: "Degraded" },
  { name: "Civil Registry", status: "Online" },
];

const AI_INSIGHTS = [
  { tone: "warning" as const, text: "Verification backlog detected in Sharqiyah South (+18% WoW)." },
  { tone: "info" as const, text: "Amalak integration latency above SLA — 312ms p95." },
  { tone: "success" as const, text: "Coverage milestone achieved: Muscat passed 92%." },
];

function Executive() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Executive NAS Dashboard"
        description="Board-level overview of the National Addressing program."
        actions={<Button variant="outline" className="gap-1.5"><Download className="h-4 w-4" /> Export PDF</Button>}
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        <KpiCard label="NAS Completion" value={81} suffix="%" icon={Target} tone="primary" delta="+2.1%" />
        <KpiCard label="Address Units" value={1874000} icon={Building2} tone="info" delta="+1.4%" />
        <KpiCard label="Verified Addresses" value={1521000} icon={Building2} tone="success" delta="+3.2%" />
        <KpiCard label="Named Streets" value={48210} icon={MapPin} tone="gold" delta="+1.8%" />
        <KpiCard label="Installed Signs" value={78410} icon={Signpost} tone="primary" delta="+5.1%" />
        <KpiCard label="Open Risks" value={24} icon={AlertTriangle} tone="danger" delta="+3" />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="xl:col-span-2 rounded-2xl border border-border bg-card p-5 shadow-elev-1">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Program Progress</h3>
              <p className="text-xs text-muted-foreground">Planned · Installed · Verified — last 12 months</p>
            </div>
            <Badge variant="outline" className="border-info/30 bg-info/5 text-info">Live · Power BI Embed</Badge>
          </div>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={INSTALL_TREND}>
                <defs>
                  <linearGradient id="ea" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="oklch(0.48 0.18 22)" stopOpacity={0.4}/><stop offset="100%" stopColor="oklch(0.48 0.18 22)" stopOpacity={0}/></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.005 260)" vertical={false} />
                <XAxis dataKey="m" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.005 260)", fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Area type="monotone" dataKey="installed" name="Installed" stroke="oklch(0.48 0.18 22)" fill="url(#ea)" strokeWidth={2} />
                <Line type="monotone" dataKey="verified" name="Verified" stroke="oklch(0.78 0.12 85)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="manufactured" name="Planned" stroke="oklch(0.62 0.18 250)" strokeWidth={2} dot={false} strokeDasharray="4 4" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-elev-1">
          <h3 className="font-semibold">Completion vs Target</h3>
          <div className="grid h-[200px] place-items-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart innerRadius="60%" outerRadius="100%" data={[{ name: "v", value: 81, fill: "oklch(0.48 0.18 22)" }]} startAngle={90} endAngle={-270}>
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar dataKey="value" cornerRadius={20} background={{ fill: "oklch(0.93 0.005 260)" }} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div className="-mt-32 text-center">
            <div className="font-display text-4xl font-semibold text-gradient-brand">81%</div>
            <div className="mt-1 text-xs text-muted-foreground">Target 90% by Dec 2026</div>
          </div>
          <div className="mt-20 grid grid-cols-3 gap-2 text-center text-xs">
            <div><div className="text-muted-foreground">Achieved</div><div className="font-semibold">81%</div></div>
            <div><div className="text-muted-foreground">Gap</div><div className="font-semibold text-warning">9%</div></div>
            <div><div className="text-muted-foreground">Eta</div><div className="font-semibold">Q4</div></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="xl:col-span-2 rounded-2xl border border-border bg-card p-5 shadow-elev-1">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold">Heatmap by Governorate</h3>
            <Badge variant="outline" className="text-[10px]">ArcGIS Layer</Badge>
          </div>
          <OmanMap height={340} labeled />
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 shadow-elev-1">
          <h3 className="mb-3 font-semibold">Governorate Completion</h3>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={[...GOVERNORATES].sort((a, b) => b.completion - a.completion)}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.005 260)" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} width={120} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.005 260)", fontSize: 12 }} />
                <Bar dataKey="completion" fill="oklch(0.48 0.18 22)" radius={[0,4,4,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-elev-1">
          <h3 className="font-semibold">Risk Summary</h3>
          <ul className="mt-4 space-y-3">
            {RISKS.map((r) => (
              <li key={r.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <div className="text-xs font-mono text-muted-foreground">{r.id}</div>
                  <div className="text-sm font-medium">{r.title}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={r.level === "High" ? "border-destructive/30 bg-destructive/5 text-destructive" : r.level === "Medium" ? "border-warning/30 bg-warning/5 text-warning" : "border-info/30 bg-info/5 text-info"}>{r.level}</Badge>
                  <span className="text-xs text-muted-foreground">{r.trend}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 shadow-elev-1">
          <h3 className="font-semibold">Milestones</h3>
          <ul className="mt-4 space-y-4">
            {MILESTONES.map((m) => (
              <li key={m.name}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium">{m.name}</span>
                  <span className="text-xs text-muted-foreground">due {m.due}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={m.pct} className="h-2 flex-1" />
                  <span className="w-10 text-right text-xs font-semibold tabular-nums">{m.pct}%</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Connected Systems + AI Insights */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-elev-1">
          <h3 className="font-semibold">Connected Systems</h3>
          <p className="text-xs text-muted-foreground">Real-time integration health</p>
          <ul className="mt-4 space-y-2">
            {CONNECTED_SYSTEMS.map((s) => {
              const color = s.status === "Online" ? "bg-success" : s.status === "Degraded" ? "bg-warning" : "bg-destructive";
              const text = s.status === "Online" ? "text-success" : s.status === "Degraded" ? "text-warning" : "text-destructive";
              return (
                <li key={s.name} className="flex items-center justify-between rounded-lg border border-border p-3">
                  <span className="text-sm font-medium">{s.name}</span>
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${text}`}>
                    <span className={`h-2 w-2 rounded-full ${color} ring-4 ring-current/10`} />{s.status}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 shadow-elev-1">
          <h3 className="font-semibold">AI Insights</h3>
          <p className="text-xs text-muted-foreground">Generated from latest snapshot</p>
          <ul className="mt-4 space-y-2">
            {AI_INSIGHTS.map((a, i) => {
              const t = a.tone === "warning" ? "border-warning/30 bg-warning/5 text-warning" : a.tone === "success" ? "border-success/30 bg-success/5 text-success" : "border-info/30 bg-info/5 text-info";
              return (
                <li key={i} className={`rounded-lg border p-3 text-sm ${t}`}>{a.text}</li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
