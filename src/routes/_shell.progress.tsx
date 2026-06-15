import { createFileRoute } from "@tanstack/react-router";
import { Download, Factory, Wrench, Map } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend, Area, AreaChart } from "recharts";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { INSTALL_TREND, GOVERNORATES } from "@/lib/nas-data";

export const Route = createFileRoute("/_shell/progress")({
  head: () => ({ meta: [{ title: "Signage Progress — NAS" }, { name: "description", content: "Manufacturing vs installation, contractor performance and backlog." }] }),
  component: Prog,
});

const CONTRACTORS = [
  { name: "BAU-04", installed: 12480, planned: 13000, sla: 97 },
  { name: "ENG-12", installed: 9420, planned: 10500, sla: 94 },
  { name: "BAU-09", installed: 8120, planned: 9800, sla: 91 },
  { name: "ENG-07", installed: 7640, planned: 8000, sla: 96 },
  { name: "BAU-02", installed: 6210, planned: 8200, sla: 88 },
];

function Prog() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Signage Progress"
        description="Manufacturing throughput vs installation, contractor scorecards and maintenance backlog."
        actions={<Button variant="outline" className="gap-1.5"><Download className="h-4 w-4" /> Export</Button>}
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-elev-1">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Planned vs Installed</h3>
              <p className="text-xs text-muted-foreground">Sign deployment progress · last 12 months</p>
            </div>
            <Factory className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={INSTALL_TREND}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.005 260)" vertical={false} />
                <XAxis dataKey="m" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.005 260)", fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="manufactured" name="Planned" fill="oklch(0.62 0.18 250)" radius={[4,4,0,0]} />
                <Bar dataKey="installed" name="Installed" fill="oklch(0.48 0.18 22)" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-elev-1">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Maintenance Backlog</h3>
              <p className="text-xs text-muted-foreground">Open work orders trend</p>
            </div>
            <Wrench className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={Array.from({ length: 12 }, (_, i) => ({ m: i, v: 1400 - i * 18 + Math.round(Math.sin(i) * 80) }))}>
                <defs><linearGradient id="mb" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="oklch(0.78 0.16 75)" stopOpacity={0.5}/><stop offset="100%" stopColor="oklch(0.78 0.16 75)" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.005 260)" vertical={false} />
                <XAxis dataKey="m" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.005 260)", fontSize: 12 }} />
                <Area type="monotone" dataKey="v" stroke="oklch(0.78 0.16 75)" fill="url(#mb)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 shadow-elev-1">
        <h3 className="mb-4 font-semibold">Contractor Performance Scorecards</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {CONTRACTORS.map((c) => (
            <div key={c.name} className="rounded-xl border border-border p-4">
              <div className="flex items-center justify-between">
                <div className="font-mono text-sm font-semibold">{c.name}</div>
                <Badge variant="outline" className={c.sla >= 95 ? "border-success/30 bg-success/5 text-success" : "border-warning/30 bg-warning/5 text-warning"}>{c.sla}%</Badge>
              </div>
              <div className="mt-3">
                <div className="mb-1 flex justify-between text-xs"><span className="text-muted-foreground">Installed</span><span className="font-semibold tabular-nums">{c.installed.toLocaleString()}</span></div>
                <Progress value={(c.installed / c.planned) * 100} className="h-1.5" />
                <div className="mt-1 text-[10px] text-muted-foreground">of {c.planned.toLocaleString()} planned</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 shadow-elev-1">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="font-semibold">GIS Progress by Governorate</h3>
            <p className="text-xs text-muted-foreground">Installed vs planned</p>
          </div>
          <Map className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={GOVERNORATES}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.005 260)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} width={140} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.005 260)", fontSize: 12 }} />
              <Bar dataKey="signs" radius={[0,4,4,0]}>
                {GOVERNORATES.map((g, i) => (
                  <Cell key={i} fill={g.completion >= 85 ? "oklch(0.72 0.17 145)" : g.completion >= 75 ? "oklch(0.48 0.18 22)" : "oklch(0.78 0.16 75)"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
