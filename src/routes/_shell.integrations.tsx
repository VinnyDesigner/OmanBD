import { createFileRoute } from "@tanstack/react-router";
import { Activity, AlertOctagon, Clock, RefreshCw, TrendingUp, Zap, Webhook } from "lucide-react";
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader } from "@/components/page-header";
import { KpiCard } from "@/components/kpi-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SYSTEMS } from "@/lib/nas-data";

export const Route = createFileRoute("/_shell/integrations")({
  head: () => ({ meta: [{ title: "Integration Monitoring — NAS" }, { name: "description", content: "Real-time monitoring of connected systems, SLA, errors and retries." }] }),
  component: Integrations,
});

const LATENCY = Array.from({ length: 30 }, (_, i) => ({ t: i, v: 80 + Math.round(Math.sin(i / 3) * 40 + Math.random() * 30) }));
const ERRORS = Array.from({ length: 30 }, (_, i) => ({ t: i, v: Math.max(0, Math.round(Math.sin(i / 2) * 8 + Math.random() * 6)) }));

const LOGS = Array.from({ length: 14 }, (_, i) => ({
  t: `${i * 7}s ago`,
  level: ["INFO", "WARN", "ERROR", "INFO", "INFO", "WARN"][i % 6],
  sys: ["Amalak", "ArcGIS", "Krooki", "LIS", "Civil Reg.", "Emergency"][i % 6],
  msg: ["Sync completed (1284 records)", "Latency above threshold (312ms)", "Connection refused — retrying", "Token refreshed", "Batch queued", "Rate limited"][i % 6],
}));

function Integrations() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Integration Monitoring"
        description="Real-time monitoring of connected systems and services."
        actions={
          <>
            <Button variant="outline" className="gap-1.5"><RefreshCw className="h-4 w-4" /> Refresh</Button>
            <Button className="gap-1.5 gradient-brand text-primary-foreground"><Zap className="h-4 w-4" /> Run All Retries</Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <KpiCard label="API Calls (24h)" value={4280000} icon={Activity} tone="primary" delta="+8.2%" />
        <KpiCard label="Failed Transactions" value={284} icon={AlertOctagon} tone="danger" delta="+12" />
        <KpiCard label="Avg Response (ms)" value={142} icon={Clock} tone="info" delta="-8%" />
        <KpiCard label="SLA Compliance" value={99} suffix=".7%" icon={TrendingUp} tone="success" delta="+0.2" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {SYSTEMS.map((s) => {
          const ok = s.status === "operational";
          return (
            <div key={s.name} className="rounded-2xl border border-border bg-card p-4 shadow-elev-1">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2"><Webhook className="h-4 w-4 text-muted-foreground" /><div className="text-sm font-semibold">{s.name}</div></div>
                  <div className="mt-0.5 text-xs text-muted-foreground">Last sync 38s ago</div>
                </div>
                <span className={`mt-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${ok ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${ok ? "bg-success" : "bg-warning"}`} />
                  {ok ? "Operational" : "Degraded"}
                </span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div><div className="text-muted-foreground">Uptime</div><div className="font-semibold tabular-nums">{s.uptime}%</div></div>
                <div><div className="text-muted-foreground">Latency</div><div className="font-semibold tabular-nums">{s.latency}ms</div></div>
              </div>
              <Progress value={s.uptime} className="mt-3 h-1.5" />
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-elev-1">
          <h3 className="mb-3 font-semibold">Response Time (ms)</h3>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={LATENCY}>
                <defs><linearGradient id="lat" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="oklch(0.62 0.18 250)" stopOpacity={0.5}/><stop offset="100%" stopColor="oklch(0.62 0.18 250)" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.005 260)" vertical={false} />
                <XAxis dataKey="t" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.005 260)", fontSize: 12 }} />
                <Area type="monotone" dataKey="v" stroke="oklch(0.62 0.18 250)" fill="url(#lat)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 shadow-elev-1">
          <h3 className="mb-3 font-semibold">Error Rate</h3>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ERRORS}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.005 260)" vertical={false} />
                <XAxis dataKey="t" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.005 260)", fontSize: 12 }} />
                <Line type="monotone" dataKey="v" stroke="oklch(0.62 0.22 25)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 shadow-elev-1">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-semibold">Live Event Log</h3>
          <Badge variant="outline" className="border-success/30 bg-success/5 text-success">Streaming</Badge>
        </div>
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-xs">
            <thead className="bg-muted/40 text-left uppercase tracking-wider text-muted-foreground">
              <tr><th className="px-3 py-2">Time</th><th className="px-3 py-2">Level</th><th className="px-3 py-2">System</th><th className="px-3 py-2">Message</th></tr>
            </thead>
            <tbody className="divide-y divide-border font-mono">
              {LOGS.map((l, i) => (
                <tr key={i} className="hover:bg-accent/30">
                  <td className="px-3 py-2 text-muted-foreground">{l.t}</td>
                  <td className="px-3 py-2">
                    <Badge variant="outline" className={l.level === "ERROR" ? "border-destructive/30 bg-destructive/5 text-destructive" : l.level === "WARN" ? "border-warning/30 bg-warning/5 text-warning" : "border-info/30 bg-info/5 text-info"}>{l.level}</Badge>
                  </td>
                  <td className="px-3 py-2">{l.sys}</td>
                  <td className="px-3 py-2 text-muted-foreground">{l.msg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
