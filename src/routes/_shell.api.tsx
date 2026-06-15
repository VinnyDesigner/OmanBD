import { createFileRoute } from "@tanstack/react-router";
import { Code2, KeyRound, BookOpen, Lock, Plus, Copy, Activity, Users, Timer, Gauge } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader } from "@/components/page-header";
import { KpiCard } from "@/components/kpi-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { APIS } from "@/lib/nas-data";
import { toast } from "sonner";

export const Route = createFileRoute("/_shell/api")({
  head: () => ({ meta: [{ title: "API Developer Portal — NAS" }, { name: "description", content: "Marketplace, Swagger, API key management and OAuth 2.0." }] }),
  component: APIPortal,
});

const CATEGORIES = ["All", "Address", "Sign", "Reference", "Monitoring"];

function APIPortal() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="API Developer Portal"
        description="OAuth 2.0 · JWT · Swagger UI · enterprise key management."
        actions={
          <>
            <Button variant="outline" className="gap-1.5"><BookOpen className="h-4 w-4" /> Docs</Button>
            <Button className="gap-1.5 gradient-brand text-primary-foreground"><Plus className="h-4 w-4" /> Request Access</Button>
          </>
        }
      />

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <KpiCard label="API Calls Today" value={5240000} icon={Activity} tone="primary" delta="+8.4%" />
        <KpiCard label="Active Consumers" value={184} icon={Users} tone="info" delta="+6" />
        <KpiCard label="Avg Response Time" value={128} suffix="ms" icon={Timer} tone="success" delta="-12ms" />
        <KpiCard label="Error Rate" value={0} suffix=".24%" icon={Gauge} tone="warning" delta="-0.08%" />
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 shadow-elev-1">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h3 className="font-semibold">API Usage Metrics</h3>
            <p className="text-xs text-muted-foreground">Calls per hour · last 24 hours</p>
          </div>
          <Badge variant="outline" className="border-info/30 bg-info/5 text-info">Live</Badge>
        </div>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={Array.from({ length: 24 }, (_, i) => ({ h: `${i}:00`, calls: 140000 + Math.round(Math.sin(i / 3) * 60000 + (i > 8 && i < 18 ? 80000 : 0)) }))}>
              <defs><linearGradient id="api" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="oklch(0.48 0.18 22)" stopOpacity={0.4}/><stop offset="100%" stopColor="oklch(0.48 0.18 22)" stopOpacity={0}/></linearGradient></defs>
              <XAxis dataKey="h" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} interval={2} />
              <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.005 260)", fontSize: 12 }} />
              <Area type="monotone" dataKey="calls" stroke="oklch(0.48 0.18 22)" fill="url(#api)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <Tabs defaultValue="marketplace">
        <TabsList>
          <TabsTrigger value="marketplace">API Marketplace</TabsTrigger>
          <TabsTrigger value="swagger">Swagger UI</TabsTrigger>
          <TabsTrigger value="keys">API Keys</TabsTrigger>
          <TabsTrigger value="samples">Sample Code</TabsTrigger>
        </TabsList>

        <TabsContent value="marketplace" className="mt-5 space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((c) => (
              <Badge key={c} variant="outline" className={c === "All" ? "border-primary/30 bg-primary/5 text-primary" : ""}>{c}</Badge>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {APIS.map((a) => (
              <div key={a.name} className="group rounded-2xl border border-border bg-card p-5 shadow-elev-1 transition hover:-translate-y-0.5 hover:shadow-elev-2">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Code2 className="h-4 w-4 text-primary" />
                      <div className="font-semibold">{a.name}</div>
                    </div>
                    <div className="mt-0.5 text-xs text-muted-foreground">{a.category} · {a.version}</div>
                  </div>
                  <Badge variant="outline" className="text-[10px]">{a.auth}</Badge>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">Production endpoint serving {a.calls}. SLA 99.95%.</p>
                <div className="mt-4 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Status</span>
                  <span className="inline-flex items-center gap-1.5 font-medium text-success"><span className="h-1.5 w-1.5 rounded-full bg-success" /> Operational</span>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">View Docs</Button>
                  <Button size="sm" className="flex-1 gradient-brand text-primary-foreground">Try It</Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="swagger" className="mt-5">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-elev-1">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-semibold">/api/v3/address/lookup</h3>
              <Badge variant="outline" className="border-success/30 bg-success/5 text-success">GET</Badge>
            </div>
            <div className="overflow-hidden rounded-lg border border-border bg-[#0F172A] p-4 font-mono text-xs leading-relaxed text-slate-100">
{`curl -X GET "https://api.nas.gov.om/v3/address/lookup?token=OM-MA-BWS-2842-124" \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \\
  -H "Accept: application/json"`}
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Parameters</div>
                <table className="w-full text-xs">
                  <tbody className="divide-y divide-border">
                    {[
                      { n: "token", t: "string", r: "required" },
                      { n: "lang", t: "ar | en", r: "optional" },
                      { n: "include", t: "string[]", r: "optional" },
                    ].map((p) => (
                      <tr key={p.n}><td className="py-2 font-mono">{p.n}</td><td className="py-2 text-muted-foreground">{p.t}</td><td className="py-2 text-right text-muted-foreground">{p.r}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Response 200</div>
                <pre className="overflow-x-auto rounded-lg border border-border bg-muted/40 p-3 text-[11px]">{`{
  "token": "OM-MA-BWS-2842-124",
  "governorate": "Muscat",
  "wilayat": "Bawshar",
  "lat": 23.5859, "lng": 58.4059,
  "verified": true
}`}</pre>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="keys" className="mt-5">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-elev-1">
            <div className="mb-3 flex items-center justify-between"><h3 className="font-semibold">My API Keys</h3><Button size="sm" className="gradient-brand text-primary-foreground gap-1.5"><Plus className="h-4 w-4" /> New Key</Button></div>
            <ul className="space-y-3">
              {[
                { name: "Production · Address Lookup", key: "nas_prod_a1b2c3d4e5f6•••", scope: "address.read" },
                { name: "Staging · Sign Registry", key: "nas_stg_z9y8x7w6v5u4•••", scope: "sign.read,sign.write" },
                { name: "Dev · Monitoring", key: "nas_dev_m3n4b5v6c7x8•••", scope: "monitoring.read" },
              ].map((k) => (
                <li key={k.key} className="rounded-lg border border-border p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3"><KeyRound className="h-4 w-4 text-primary" /><div><div className="text-sm font-medium">{k.name}</div><div className="font-mono text-[11px] text-muted-foreground">{k.key}</div></div></div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[10px]">{k.scope}</Badge>
                      <Button size="sm" variant="outline" onClick={() => { navigator.clipboard.writeText(k.key); toast.success("Copied"); }}><Copy className="h-3.5 w-3.5" /></Button>
                      <Button size="sm" variant="outline" className="gap-1.5"><Lock className="h-3.5 w-3.5" /> Revoke</Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="samples" className="mt-5">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {[
              { lang: "JavaScript", code: `const res = await fetch("https://api.nas.gov.om/v3/address/lookup?token=OM-MA-BWS-2842-124", {\n  headers: { Authorization: \`Bearer \${token}\` },\n});\nconst data = await res.json();` },
              { lang: "Python", code: `import requests\nres = requests.get(\n  "https://api.nas.gov.om/v3/address/lookup",\n  params={"token": "OM-MA-BWS-2842-124"},\n  headers={"Authorization": f"Bearer {token}"},\n)\nprint(res.json())` },
              { lang: "cURL", code: `curl https://api.nas.gov.om/v3/address/lookup?token=OM-MA-BWS-2842-124 \\\n  -H "Authorization: Bearer $TOKEN"` },
            ].map((s) => (
              <div key={s.lang} className="rounded-2xl border border-border bg-card p-4 shadow-elev-1">
                <div className="mb-2 flex items-center justify-between"><div className="text-sm font-semibold">{s.lang}</div><Button size="sm" variant="ghost" onClick={() => { navigator.clipboard.writeText(s.code); toast.success("Copied"); }}><Copy className="h-3 w-3" /></Button></div>
                <pre className="overflow-x-auto rounded-lg bg-[#0F172A] p-3 text-[11px] text-slate-100">{s.code}</pre>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="rounded-2xl border border-border bg-card p-5 shadow-elev-1">
        <h3 className="font-semibold">Request Access Workflow</h3>
        <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-4">
          {["Submit Request", "Compliance Review", "Approval", "Provisioning"].map((s, i) => (
            <div key={s} className="rounded-lg border border-border p-3">
              <div className="text-xs font-mono text-muted-foreground">STEP {i + 1}</div>
              <div className="mt-0.5 text-sm font-medium">{s}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-end gap-3">
          <div className="flex-1"><label className="text-xs text-muted-foreground">System name</label><Input className="mt-1 h-9" placeholder="e.g. Civil Registry batch sync" /></div>
          <Button className="gradient-brand text-primary-foreground">Submit Request</Button>
        </div>
      </div>
    </div>
  );
}
