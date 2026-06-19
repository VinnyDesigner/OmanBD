import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, MapPin, QrCode, Wrench, ShieldCheck, FileText, History, Image as ImageIcon, MessageSquare } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { OmanMap } from "@/components/oman-map";

export const Route = createFileRoute("/_shell/signs/$id")({
  head: ({ params }) => ({
    meta: [{ title: `${params.id} — Sign Lifecycle | NAS` }, { name: "description", content: "Full lifecycle, audit and history for a single sign." }],
  }),
  component: Lifecycle,
});

const STAGES = ["Planned", "Approved", "Ready for Installation", "Ready", "Installed", "Verified", "Active", "Maintenance", "Replaced", "Retired"];
const CURRENT = 6; // index of Active

function Lifecycle() {
  const { id } = Route.useParams();
  return (
    <div className="space-y-6">
      <PageHeader
        title={`Sign ${id}`}
        description="Lifecycle view · audit history · linked tasks and incidents"
        actions={
          <>
            <Button variant="outline">Print</Button>
            <Button variant="outline">Edit</Button>
            <Button className="gradient-brand text-primary-foreground">Generate Report</Button>
          </>
        }
      />

      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <div className="lg:col-span-1 rounded-2xl border border-border bg-card p-5 shadow-elev-1">
          <div className="grid h-32 place-items-center rounded-xl bg-muted/40">
            <div className="grid h-24 w-24 grid-cols-10 gap-0.5 rounded-md bg-card p-1.5 shadow-elev-2">
              {Array.from({ length: 100 }).map((_, i) => (<div key={i} className={`rounded-[0.5px] ${Math.random() > 0.5 ? "bg-foreground" : "bg-transparent"}`} />))}
            </div>
          </div>
          <div className="mt-3 text-center">
            <div className="font-mono text-sm font-semibold">{id}</div>
            <div className="text-xs text-muted-foreground">QR-A4F2E1</div>
            <Badge variant="outline" className="mt-2 border-success/30 bg-success/5 text-success">Active</Badge>
          </div>
        </div>
        <div className="lg:col-span-3 rounded-2xl border border-border bg-card p-5 shadow-elev-1">
          <h3 className="font-semibold">Lifecycle Timeline</h3>
          <ol className="mt-5 flex items-start">
            {STAGES.map((s, i) => {
              const done = i <= CURRENT;
              const cur = i === CURRENT;
              return (
                <li key={s} className="relative flex flex-1 flex-col items-center">
                  <div className={`z-10 grid h-8 w-8 place-items-center rounded-full text-[11px] font-medium ${cur ? "ring-4 ring-primary/20 gradient-brand text-primary-foreground" : done ? "gradient-brand text-primary-foreground" : "border border-border bg-card text-muted-foreground"}`}>
                    {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
                  </div>
                  {i < STAGES.length - 1 && <div className={`absolute left-1/2 top-4 h-0.5 w-full ${i < CURRENT ? "bg-primary" : "bg-border"}`} />}
                  <div className="mt-2 max-w-[64px] text-center text-[10px] font-medium leading-tight">{s}</div>
                </li>
              );
            })}
          </ol>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { l: "Governorate", v: "Muscat" }, { l: "Wilayat", v: "Bawshar" },
              { l: "Contractor", v: "BAU-04" }, { l: "Installed", v: "2026-06-18" },
            ].map((r) => (
              <div key={r.l}>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{r.l}</div>
                <div className="text-sm font-medium">{r.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview">
        <TabsList className="flex flex-wrap">
          {[
            { v: "overview", l: "Overview", i: FileText },
            { v: "address", l: "Address", i: MapPin },
            { v: "map", l: "Map", i: MapPin },
            { v: "tasks", l: "Tasks", i: Check },
            { v: "incidents", l: "Incidents", i: Wrench },
            { v: "maintenance", l: "Maintenance", i: Wrench },
            { v: "warranty", l: "Warranty", i: ShieldCheck },
            { v: "attachments", l: "Attachments", i: ImageIcon },
            { v: "audit", l: "Audit", i: History },
          ].map((t) => (
            <TabsTrigger key={t.v} value={t.v} className="gap-1.5">
              <t.i className="h-3.5 w-3.5" /> {t.l}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="mt-5">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <Card title="Identity">
              <Row label="Sign ID" value={id} />
              <Row label="QR" value="QR-A4F2E1" />
              <Row label="Type" value="Street Sign · Aluminium" />
              <Row label="Phase" value="Bawshar Phase 3" />
            </Card>
            <Card title="Location">
              <Row label="Address" value="OM-MA-BWS-2842-124" />
              <Row label="Coordinates" value="23.5859, 58.4059" />
              <Row label="Plot" value="Bawshar Block 7" />
              <Row label="Elevation" value="42m" />
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="map" className="mt-5"><OmanMap height={420} /></TabsContent>

        <TabsContent value="audit" className="mt-5">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-elev-1">
            <h3 className="font-semibold">Activity History</h3>
            <ol className="mt-4 space-y-4 border-l border-border pl-5">
              {[
                { t: "Today 09:42", u: "S. Al Hinai", a: "Approved verification request" },
                { t: "Yesterday 16:20", u: "ENG-12", a: "Submitted verification evidence (3 photos)" },
                { t: "2 days ago", u: "BAU-04", a: "Marked sign as Installed" },
                { t: "5 days ago", u: "Quality Eng.", a: "Linked to address OM-MA-BWS-2842-124" },
                { t: "1 week ago", u: "F. Al Saidi", a: "Created sign record" },
              ].map((e, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-[26px] mt-1 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-primary/15" />
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-sm font-medium">{e.u}</span>
                    <span className="text-[11px] text-muted-foreground">{e.t}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{e.a}</p>
                </li>
              ))}
            </ol>
          </div>
        </TabsContent>

        {["address","tasks","incidents","maintenance","warranty","attachments"].map((v) => (
          <TabsContent key={v} value={v} className="mt-5">
            <div className="rounded-2xl border border-border bg-card p-10 text-center shadow-elev-1">
              <MessageSquare className="mx-auto h-8 w-8 text-muted-foreground" />
              <h3 className="mt-3 font-semibold">{v[0].toUpperCase() + v.slice(1)} panel</h3>
              <p className="mt-1 text-sm text-muted-foreground">Detailed records for {v} are connected to this sign.</p>
              <Button asChild variant="outline" className="mt-4"><Link to="/signs/registry">Back to registry</Link></Button>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-elev-1">
      <h3 className="mb-3 font-semibold">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}
function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border/50 pb-2 text-sm last:border-0">
      <span className="text-muted-foreground">{label}</span><span className="font-medium">{value}</span>
    </div>
  );
}
