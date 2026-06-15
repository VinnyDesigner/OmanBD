import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Copy, Database, GitFork, MapPin, AlertTriangle, Download } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Bar, BarChart } from "recharts";
import { PageHeader } from "@/components/page-header";
import { KpiCard } from "@/components/kpi-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { OmanMap } from "@/components/oman-map";
import { DATA_QUALITY, GOVERNORATES } from "@/lib/nas-data";

export const Route = createFileRoute("/_shell/quality")({
  head: () => ({ meta: [{ title: "Data Quality — NAS" }, { name: "description", content: "Duplicates, missing records, spatial errors and correction workflows." }] }),
  component: Quality,
});

const ERRORS = [
  { type: "Duplicate address", count: 412, sev: "High" },
  { type: "Missing coordinates", count: 1284, sev: "Critical" },
  { type: "Invalid governorate ref", count: 318, sev: "Medium" },
  { type: "Spatial mismatch", count: 96, sev: "High" },
  { type: "Unverified sign linkage", count: 184, sev: "Medium" },
  { type: "Stale address record", count: 612, sev: "Low" },
];

function Quality() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Data Quality"
        description="Engine-driven detection of duplicates, missing records, invalid references and spatial errors."
        actions={<Button variant="outline" className="gap-1.5"><Download className="h-4 w-4" /> Export Report</Button>}
      />

      <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-card px-4 py-3 text-xs shadow-elev-1">
        <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-success ring-4 ring-success/15" /><span className="font-medium">Engine Online</span></div>
        <span className="text-muted-foreground">Last refresh: <span className="font-semibold text-foreground">10 mins ago</span></span>
        <span className="text-muted-foreground">Records analyzed: <span className="font-semibold text-foreground">1.24M</span></span>
        <span className="text-muted-foreground">Next scheduled run: <span className="font-semibold text-foreground">in 50 mins</span></span>
        <Badge variant="outline" className="ml-auto border-info/30 bg-info/5 text-info">Power BI Analytics</Badge>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        <KpiCard label="Quality Score" value={92} suffix=".4" icon={ShieldCheck} tone="success" delta="+0.6" />
        <KpiCard label="Duplicates" value={DATA_QUALITY.duplicates} icon={Copy} tone="warning" delta="-22" />
        <KpiCard label="Missing Records" value={DATA_QUALITY.missing} icon={Database} tone="danger" delta="-184" />
        <KpiCard label="Invalid Refs" value={DATA_QUALITY.invalidRefs} icon={GitFork} tone="warning" delta="+12" />
        <KpiCard label="Spatial Errors" value={DATA_QUALITY.spatial} icon={MapPin} tone="info" delta="-8" />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="xl:col-span-2 rounded-2xl border border-border bg-card p-5 shadow-elev-1">
          <h3 className="mb-3 font-semibold">Quality Trend</h3>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DATA_QUALITY.trend}>
                <defs><linearGradient id="q" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="oklch(0.72 0.17 145)" stopOpacity={0.4}/><stop offset="100%" stopColor="oklch(0.72 0.17 145)" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.005 260)" vertical={false} />
                <XAxis dataKey="d" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis domain={[80, 100]} tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.005 260)", fontSize: 12 }} />
                <Area type="monotone" dataKey="score" stroke="oklch(0.72 0.17 145)" fill="url(#q)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 shadow-elev-1">
          <h3 className="mb-3 font-semibold">Errors by Governorate</h3>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={GOVERNORATES.map((g) => ({ name: g.code, v: g.risks * 30 + 40 }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.005 260)" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.005 260)", fontSize: 12 }} />
                <Bar dataKey="v" fill="oklch(0.62 0.22 25)" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="xl:col-span-2 rounded-2xl border border-border bg-card p-5 shadow-elev-1">
          <h3 className="mb-3 font-semibold">Error Categories</h3>
          <ul className="space-y-3">
            {ERRORS.map((e) => (
              <li key={e.type} className="rounded-lg border border-border p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium"><AlertTriangle className="h-4 w-4 text-warning" /> {e.type}</div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={e.sev === "Critical" ? "border-destructive/30 bg-destructive/5 text-destructive" : e.sev === "High" ? "border-warning/30 bg-warning/5 text-warning" : "border-info/30 bg-info/5 text-info"}>{e.sev}</Badge>
                    <span className="w-16 text-right text-sm font-semibold tabular-nums">{e.count.toLocaleString()}</span>
                    <Button size="sm" variant="outline">Review</Button>
                  </div>
                </div>
                <Progress value={Math.min(100, (e.count / 1300) * 100)} className="mt-2 h-1.5" />
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 shadow-elev-1">
          <h3 className="mb-3 font-semibold">Spatial Error Heatmap</h3>
          <OmanMap height={400} labeled />
        </div>
      </div>
    </div>
  );
}
