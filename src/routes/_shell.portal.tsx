import { createFileRoute } from "@tanstack/react-router";
import { Search, Globe2, MapPin, QrCode, Download } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { OmanMap } from "@/components/oman-map";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export const Route = createFileRoute("/_shell/portal")({
  head: () => ({ meta: [{ title: "National Address Portal — NAS" }, { name: "description", content: "Public address lookup, registration and verification." }] }),
  component: Portal,
});

const RESULTS = [
  { token: "OM-MA-BWS-2842-124", street: "Way 2842, Bawshar", building: "Building 124", verified: true },
  { token: "OM-MA-BWS-2842-128", street: "Way 2842, Bawshar", building: "Building 128", verified: true },
  { token: "OM-MA-BWS-2842-132", street: "Way 2842, Bawshar", building: "Building 132", verified: false },
  { token: "OM-MA-SEB-1140-040", street: "Way 1140, Seeb", building: "Building 40", verified: true },
];

function Portal() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="National Address Portal"
        description="Federated address lookup across the Sultanate of Oman."
        actions={<Button variant="outline" className="gap-1.5"><Download className="h-4 w-4" /> Export Results</Button>}
      />

      {/* Search hero */}
      <div className="relative overflow-hidden rounded-2xl border border-border gradient-brand-soft p-6 md:p-10">
        <div className="grid-bg absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/80 px-3 py-1 text-xs font-medium text-primary backdrop-blur">
            <Globe2 className="h-3 w-3" /> Federated Address Search
          </div>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Find any <span className="text-gradient-brand">address in Oman</span>
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">Search by token, street, building, plot or coordinates.</p>
          <div className="mx-auto mt-6 flex max-w-2xl gap-2">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input defaultValue="Way 2842, Bawshar" className="h-12 pl-10 text-base" />
            </div>
            <Button className="h-12 gradient-brand text-primary-foreground px-6">Search</Button>
          </div>
          <div className="mt-3 flex flex-wrap justify-center gap-2 text-[11px] text-muted-foreground">
            <span>Suggestions:</span>
            {["Muttrah Cornish", "Nizwa Fort", "Salalah Airport", "OM-MA-BWS-2842-124"].map((s) => (
              <button key={s} className="rounded-full border border-border bg-card/70 px-2 py-0.5 hover:border-primary hover:text-primary">{s}</button>
            ))}
          </div>
        </div>
      </div>

      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">Results ({RESULTS.length})</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
          <TabsTrigger value="register">Register New Address</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="mt-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {RESULTS.map((r) => (
              <div key={r.token} className="group rounded-2xl border border-border bg-card p-5 shadow-elev-1 transition hover:-translate-y-0.5 hover:shadow-elev-2">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <div className="font-mono text-sm font-semibold">{r.token}</div>
                    </div>
                    <div className="mt-0.5 text-sm">{r.street} · {r.building}</div>
                  </div>
                  {r.verified ? (
                    <Badge variant="outline" className="border-success/30 bg-success/5 text-success">Verified</Badge>
                  ) : (
                    <Badge variant="outline" className="border-warning/30 bg-warning/5 text-warning">Pending</Badge>
                  )}
                </div>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Muscat · Bawshar</span>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="gap-1.5"><QrCode className="h-3 w-3" /> QR</Button>
                    <Button size="sm" className="gradient-brand text-primary-foreground">Details</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="map" className="mt-5"><OmanMap height={480} /></TabsContent>

        <TabsContent value="register" className="mt-5">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-elev-1">
            <h3 className="font-semibold">Register New Address</h3>
            <p className="text-xs text-muted-foreground">Submit a new address for verification by the ministry.</p>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              {["Governorate", "Wilayat", "Street", "Building"].map((l) => (
                <div key={l}><label className="text-xs text-muted-foreground">{l}</label><Input className="mt-1 h-10" placeholder={l} /></div>
              ))}
            </div>
            <Button className="mt-5 gradient-brand text-primary-foreground">Submit for Review</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
