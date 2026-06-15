import { createFileRoute, Link } from "@tanstack/react-router";
import { Signpost, CheckCircle2, AlertTriangle, Wrench, Clock, QrCode, ShieldCheck, Plus, Download, ArrowRight } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";
import { PageHeader } from "@/components/page-header";
import { KpiCard } from "@/components/kpi-card";
import { OmanMap } from "@/components/oman-map";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { INSTALL_TREND, SIGN_STATUS, GOVERNORATES, INCIDENTS } from "@/lib/nas-data";

export const Route = createFileRoute("/_shell/signs/")({
  head: () => ({
    meta: [
      { title: "Sign Dashboard — NAS" },
      { name: "description", content: "Analytics & monitoring dashboard for NAS signs across Oman." },
    ],
  }),
  component: SignsDashboard,
});

const QR_DATA = Array.from({ length: 14 }, (_, i) => ({ d: `D${i + 1}`, scans: 2400 + Math.round(Math.sin(i) * 600 + i * 80) }));
const SIGN_TYPES = [
  { t: "Street", v: 38200 }, { t: "Building", v: 26100 }, { t: "Junction", v: 12400 },
  { t: "POI", v: 11200 }, { t: "Plot", v: 8330 },
];

function SignsDashboard() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Sign Dashboard"
        description="Analytics & monitoring across the national sign program — installations, verification, QR scans and alerts."
        actions={
          <>
            <Button variant="outline" className="gap-1.5"><Download className="h-4 w-4" /> Export</Button>
            <Button asChild className="gap-1.5 gradient-brand text-primary-foreground">
              <Link to="/signs/new"><Plus className="h-4 w-4" /> New Sign</Link>
            </Button>
          </>
        }
      />

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        <KpiCard label="Total Signs" value={96230} icon={Signpost} tone="primary" delta="+3.2%" />
        <KpiCard label="Installed Signs" value={78410} icon={CheckCircle2} tone="success" delta="+5.1%" />
        <KpiCard label="Verified Signs" value={71240} icon={ShieldCheck} tone="gold" delta="+6.2%" />
        <KpiCard label="Pending Verification" value={7170} icon={Clock} tone="info" delta="-2.1%" />
        <KpiCard label="Damaged Signs" value={2180} icon={AlertTriangle} tone="danger" delta="+12" />
        <KpiCard label="Maintenance Due" value={1420} icon={Wrench} tone="warning" delta="-3.1%" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="xl:col-span-2 rounded-2xl border border-border bg-card p-5 shadow-elev-1">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Installation Progress</h3>
              <p className="text-xs text-muted-foreground">Planned · Installed · Verified — last 12 months</p>
            </div>
            <Badge variant="outline">Last 12 months</Badge>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={INSTALL_TREND}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="oklch(0.48 0.18 22)" stopOpacity={0.4}/><stop offset="100%" stopColor="oklch(0.48 0.18 22)" stopOpacity={0}/></linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="oklch(0.62 0.18 250)" stopOpacity={0.4}/><stop offset="100%" stopColor="oklch(0.62 0.18 250)" stopOpacity={0}/></linearGradient>
                  <linearGradient id="g3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="oklch(0.78 0.12 85)" stopOpacity={0.4}/><stop offset="100%" stopColor="oklch(0.78 0.12 85)" stopOpacity={0}/></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.005 260)" vertical={false} />
                <XAxis dataKey="m" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.005 260)", fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Area type="monotone" dataKey="manufactured" name="Planned" stroke="oklch(0.62 0.18 250)" fill="url(#g2)" strokeWidth={2} />
                <Area type="monotone" dataKey="installed" name="Installed" stroke="oklch(0.48 0.18 22)" fill="url(#g1)" strokeWidth={2} />
                <Area type="monotone" dataKey="verified" name="Verified" stroke="oklch(0.78 0.12 85)" fill="url(#g3)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 shadow-elev-1">
          <h3 className="font-semibold">Status Distribution</h3>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={SIGN_STATUS} dataKey="value" nameKey="name" innerRadius={50} outerRadius={84} paddingAngle={2}>
                  {SIGN_STATUS.map((e) => <Cell key={e.name} fill={e.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.005 260)", fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-1.5 text-[11px]">
            {SIGN_STATUS.map((s) => (
              <div key={s.name} className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full" style={{ background: s.color }} />{s.name}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Sign types + QR */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-elev-1">
          <h3 className="font-semibold">Sign Type Distribution</h3>
          <p className="text-xs text-muted-foreground">Volume by sign category</p>
          <div className="mt-3 h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SIGN_TYPES}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.005 260)" vertical={false} />
                <XAxis dataKey="t" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.005 260)", fontSize: 12 }} />
                <Bar dataKey="v" fill="oklch(0.48 0.18 22)" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-elev-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">QR Scan Analytics</h3>
              <p className="text-xs text-muted-foreground">Public QR scans · last 14 days</p>
            </div>
            <QrCode className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="mt-3 h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={QR_DATA}>
                <defs><linearGradient id="qr" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="oklch(0.78 0.12 85)" stopOpacity={0.5}/><stop offset="100%" stopColor="oklch(0.78 0.12 85)" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.005 260)" vertical={false} />
                <Area type="monotone" dataKey="scans" stroke="oklch(0.78 0.12 85)" fill="url(#qr)" strokeWidth={2} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.005 260)", fontSize: 12 }} />
                <XAxis dataKey="d" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} /><YAxis hide />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-1 grid grid-cols-3 gap-2 text-center text-xs">
            <div><div className="text-muted-foreground">Total scans</div><div className="font-semibold tabular-nums">47,820</div></div>
            <div><div className="text-muted-foreground">Avg / day</div><div className="font-semibold tabular-nums">3,412</div></div>
            <div><div className="text-muted-foreground">Unique users</div><div className="font-semibold tabular-nums">18,240</div></div>
          </div>
        </div>
      </div>

      {/* GIS widget + Alerts */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="xl:col-span-2 rounded-2xl border border-border bg-card p-5 shadow-elev-1">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Governorate-wise Sign Distribution</h3>
              <p className="text-xs text-muted-foreground">ArcGIS layer · coverage intensity by governorate</p>
            </div>
            <Button asChild variant="outline" size="sm"><Link to="/map">Open full map</Link></Button>
          </div>
          <OmanMap height={360} labeled />
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-elev-1">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold">Alerts</h3>
            <Badge variant="outline" className="border-destructive/30 bg-destructive/5 text-destructive">Action needed</Badge>
          </div>
          <ul className="space-y-3">
            <AlertItem icon={AlertTriangle} tone="danger" title="Damaged Signs" count="2,180" desc="Awaiting field inspection" to="/incidents" />
            <AlertItem icon={QrCode} tone="warning" title="Missing QR Codes" count="184" desc="Signs without active QR" to="/signs/registry" />
            <AlertItem icon={Clock} tone="info" title="Verification Backlog" count="7,170" desc="Pending audit verification" to="/tasks" />
            <AlertItem icon={Wrench} tone="warning" title="Maintenance Overdue" count="312" desc="Past scheduled SLA" to="/incidents" />
          </ul>
          <div className="mt-4 rounded-lg border border-border bg-muted/30 p-3">
            <h4 className="text-sm font-semibold">Recent Incidents</h4>
            <ul className="mt-2 space-y-1.5">
              {INCIDENTS.slice(0, 3).map((i) => (
                <li key={i.id} className="flex items-center justify-between text-xs">
                  <span className="truncate text-muted-foreground">{i.title} · {i.governorate}</span>
                  <Badge variant="outline" className="text-[10px]">{i.severity}</Badge>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Coverage by governorate bar */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-elev-1">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Signs by Governorate</h3>
            <p className="text-xs text-muted-foreground">Total installed signs</p>
          </div>
        </div>
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={GOVERNORATES}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.005 260)" vertical={false} />
              <XAxis dataKey="code" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.005 260)", fontSize: 12 }} />
              <Bar dataKey="signs" fill="oklch(0.48 0.18 22)" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function AlertItem({ icon: Icon, tone, title, count, desc, to }: { icon: typeof AlertTriangle; tone: "danger" | "warning" | "info"; title: string; count: string; desc: string; to: string }) {
  const t: Record<string, string> = {
    danger: "border-destructive/30 bg-destructive/5 text-destructive",
    warning: "border-warning/30 bg-warning/5 text-warning",
    info: "border-info/30 bg-info/5 text-info",
  };
  return (
    <li>
      <Link to={to} className="flex items-center gap-3 rounded-lg border border-border p-3 transition hover:bg-accent">
        <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border ${t[tone]}`}><Icon className="h-4 w-4" /></div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{title}</span>
            <span className="font-semibold tabular-nums">{count}</span>
          </div>
          <div className="text-[11px] text-muted-foreground">{desc}</div>
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground" />
      </Link>
    </li>
  );
}
