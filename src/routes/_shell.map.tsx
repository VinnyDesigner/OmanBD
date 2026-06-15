import { createFileRoute } from "@tanstack/react-router";
import { Layers, Ruler, MousePointer2, Pencil, Printer, Download, Maximize2, Search, Plus, Minus, Locate } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { OmanMap } from "@/components/oman-map";
import { GOVERNORATES } from "@/lib/nas-data";

export const Route = createFileRoute("/_shell/map")({
  head: () => ({ meta: [{ title: "GIS Map Center — NAS" }, { name: "description", content: "Fullscreen GIS — signs, addresses, boundaries and tools." }] }),
  component: MapCenter,
});

const LAYERS = [
  { id: "signs", label: "Signs", color: "#B21F2D", on: true },
  { id: "addresses", label: "Addresses", color: "#3B82F6", on: true },
  { id: "gov", label: "Governorates", color: "#D4AF37", on: true },
  { id: "wil", label: "Wilayats", color: "#F59E0B", on: false },
  { id: "str", label: "Streets", color: "#22C55E", on: true },
  { id: "heat", label: "Heatmap", color: "#7A1220", on: false },
];

function MapCenter() {
  const [layers, setLayers] = useState(LAYERS);

  return (
    <div className="space-y-4">
      <PageHeader
        title="GIS Map Center"
        description="Fullscreen GIS experience powered by ArcGIS Enterprise / Mapbox."
        actions={
          <>
            <Button variant="outline" className="gap-1.5"><Printer className="h-4 w-4" /> Print</Button>
            <Button variant="outline" className="gap-1.5"><Download className="h-4 w-4" /> Export</Button>
            <Button className="gap-1.5 gradient-brand text-primary-foreground"><Maximize2 className="h-4 w-4" /> Fullscreen</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[300px_1fr]">
        {/* Side panel */}
        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-4 shadow-elev-1">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search address or sign…" className="h-9 pl-9" />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4 shadow-elev-1">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold"><Layers className="h-4 w-4 text-primary" /> Layers</div>
            <ul className="space-y-2.5">
              {layers.map((l) => (
                <li key={l.id} className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm"><span className="h-3 w-3 rounded" style={{ background: l.color }} />{l.label}</span>
                  <Switch checked={l.on} onCheckedChange={(v) => setLayers((p) => p.map((x) => x.id === l.id ? { ...x, on: v } : x))} />
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4 shadow-elev-1">
            <div className="mb-3 text-sm font-semibold">Tools</div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { i: MousePointer2, l: "Identify" },
                { i: Ruler, l: "Measure" },
                { i: Pencil, l: "Draw" },
                { i: Locate, l: "Locate" },
              ].map((t) => (
                <Button key={t.l} variant="outline" size="sm" className="justify-start gap-1.5"><t.i className="h-3.5 w-3.5" /> {t.l}</Button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4 shadow-elev-1">
            <div className="mb-3 text-sm font-semibold">Governorates</div>
            <ul className="space-y-1 text-xs">
              {GOVERNORATES.slice(0, 8).map((g) => (
                <li key={g.code} className="flex items-center justify-between rounded-md px-2 py-1.5 hover:bg-accent">
                  <span>{g.name}</span>
                  <Badge variant="outline" className="text-[10px]">{g.signs.toLocaleString()}</Badge>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Map */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-elev-2">
          <OmanMap height={720} />
          <div className="absolute right-4 top-4 flex flex-col gap-1.5 rounded-lg border border-border bg-card/90 p-1 shadow-elev-1 backdrop-blur">
            <Button variant="ghost" size="icon" className="h-8 w-8"><Plus className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" className="h-8 w-8"><Minus className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" className="h-8 w-8"><Locate className="h-4 w-4" /></Button>
          </div>
          <div className="absolute left-4 top-4 rounded-lg border border-border bg-card/90 px-3 py-1.5 text-xs font-medium shadow-elev-1 backdrop-blur">
            Scale 1 : 250,000 · WGS 84
          </div>
        </div>
      </div>
    </div>
  );
}
