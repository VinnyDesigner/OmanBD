import { createFileRoute } from "@tanstack/react-router";
import { AlertOctagon, Camera, DollarSign, ShieldCheck, MapIcon, Plus } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { KpiCard } from "@/components/kpi-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { OmanMap } from "@/components/oman-map";
import { INCIDENTS } from "@/lib/nas-data";

export const Route = createFileRoute("/_shell/incidents")({
  head: () => ({ meta: [{ title: "Incidents — NAS" }, { name: "description", content: "Incident dashboard with severity, warranty and resolution workflows." }] }),
  component: Incidents,
});

const SEVERITY: Record<string, string> = {
  Critical: "border-destructive/30 bg-destructive/5 text-destructive",
  High: "border-warning/30 bg-warning/5 text-warning",
  Medium: "border-info/30 bg-info/5 text-info",
  Low: "border-border bg-muted text-muted-foreground",
};

function Incidents() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Incident Management"
        description="Damage reports, warranty claims, cost recovery, resolutions and GIS-based incident tracking."
        actions={<Button className="gap-1.5 gradient-brand text-primary-foreground"><Plus className="h-4 w-4" /> Report Incident</Button>}
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <KpiCard label="Open Incidents" value={142} icon={AlertOctagon} tone="danger" delta="+12" />
        <KpiCard label="In Repair" value={48} icon={ShieldCheck} tone="warning" delta="-3" />
        <KpiCard label="Resolved (MTD)" value={284} icon={ShieldCheck} tone="success" delta="+18%" />
        <KpiCard label="Recovery (OMR)" value={41240} icon={DollarSign} tone="gold" delta="+6.2%" />
      </div>

      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
          <TabsTrigger value="gis">GIS Map View</TabsTrigger>
          <TabsTrigger value="warranty">Warranty Claims</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="mt-4">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-elev-1">
            <table className="w-full text-sm">
              <thead className="bg-muted/30 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr><th className="px-4 py-3">ID</th><th className="px-4 py-3">Title</th><th className="px-4 py-3">Sign</th><th className="px-4 py-3">Governorate</th><th className="px-4 py-3">Severity</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Reported</th><th className="px-4 py-3 text-right">Cost (OMR)</th></tr>
              </thead>
              <tbody className="divide-y divide-border">
                {INCIDENTS.map((i) => (
                  <tr key={i.id} className="hover:bg-accent/40">
                    <td className="px-4 py-3 font-mono text-xs">{i.id}</td>
                    <td className="px-4 py-3 font-medium">{i.title}</td>
                    <td className="px-4 py-3 font-mono text-xs">{i.sign}</td>
                    <td className="px-4 py-3 text-muted-foreground">{i.governorate}</td>
                    <td className="px-4 py-3"><Badge variant="outline" className={SEVERITY[i.severity]}>{i.severity}</Badge></td>
                    <td className="px-4 py-3"><Badge variant="outline">{i.status}</Badge></td>
                    <td className="px-4 py-3 text-muted-foreground">{i.reported}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{i.cost.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="map" className="mt-4"><OmanMap height={460} labeled /></TabsContent>
        <TabsContent value="gis" className="mt-4">
          <div className="rounded-2xl border border-border bg-card p-4 shadow-elev-1">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">GIS — Incident Locations</h3>
                <p className="text-xs text-muted-foreground">ArcGIS layer with severity color coding</p>
              </div>
              <Badge variant="outline" className="text-[10px]">ArcGIS Live</Badge>
            </div>
            <OmanMap height={420} labeled />
          </div>
        </TabsContent>

        <TabsContent value="warranty" className="mt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {INCIDENTS.slice(0, 6).map((i) => (
              <div key={i.id} className="rounded-2xl border border-border bg-card p-4 shadow-elev-1">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-xs font-mono text-muted-foreground">{i.id}</div>
                    <div className="font-medium">{i.title}</div>
                  </div>
                  <Badge variant="outline" className={SEVERITY[i.severity]}>{i.severity}</Badge>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                  <div><div className="text-muted-foreground">Sign</div><div className="font-medium">{i.sign}</div></div>
                  <div><div className="text-muted-foreground">Status</div><div className="font-medium">{i.status}</div></div>
                  <div><div className="text-muted-foreground">Cost</div><div className="font-medium">OMR {i.cost}</div></div>
                </div>
                <div className="mt-3 flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1.5"><Camera className="h-3.5 w-3.5" /> Photos</Button>
                  <Button variant="outline" size="sm" className="gap-1.5"><MapIcon className="h-3.5 w-3.5" /> Locate</Button>
                  <Button size="sm" className="ml-auto gradient-brand text-primary-foreground">File Claim</Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
