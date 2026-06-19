import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Download, Filter, Plus, Search, FileSpreadsheet, FileText, ChevronLeft, ChevronRight, ArrowUpDown, QrCode } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { OmanMap } from "@/components/oman-map";
import { SIGNS, GOVERNORATES } from "@/lib/nas-data";

export const Route = createFileRoute("/_shell/signs/registry")({
  head: () => ({
    meta: [{ title: "Sign Registry — NAS" }, { name: "description", content: "Enterprise grid of all signs across the addressing program." }],
  }),
  component: Registry,
});

const STATUS_COLOR: Record<string, string> = {
  Installed: "border-success/30 bg-success/5 text-success",
  Verified: "border-gold/30 bg-gold/5 text-gold",
  "Ready for Installation": "border-info/30 bg-info/5 text-info",
  Damaged: "border-destructive/30 bg-destructive/5 text-destructive",
  Maintenance: "border-warning/30 bg-warning/5 text-warning",
  Planned: "border-border bg-muted text-muted-foreground",
};

function Registry() {
  const [page, setPage] = useState(1);
  const pageSize = 12;
  const total = SIGNS.length;
  const rows = SIGNS.slice((page - 1) * pageSize, page * pageSize);
  const pages = Math.ceil(total / pageSize);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sign Registry"
        description="Enterprise data grid with filters, bulk actions and exports."
        actions={
          <>
            <Button variant="outline" className="gap-1.5"><FileSpreadsheet className="h-4 w-4" /> Excel</Button>
            <Button variant="outline" className="gap-1.5"><FileText className="h-4 w-4" /> PDF</Button>
            <Button asChild className="gap-1.5 gradient-brand text-primary-foreground">
              <Link to="/signs/new"><Plus className="h-4 w-4" /> New Sign</Link>
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_360px]">
      <div className="rounded-2xl border border-border bg-card shadow-elev-1">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 border-b border-border p-4">
          <div className="relative max-w-sm flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search by ID, QR, address, contractor…" className="h-9 pl-9" />
          </div>
          <Select defaultValue="all"><SelectTrigger className="h-9 w-[160px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Governorates</SelectItem>
              {GOVERNORATES.map((g) => <SelectItem key={g.code} value={g.code}>{g.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select defaultValue="all"><SelectTrigger className="h-9 w-[140px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Installed">Installed</SelectItem>
              <SelectItem value="Verified">Verified</SelectItem>
              <SelectItem value="Damaged">Damaged</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="gap-1.5"><Filter className="h-4 w-4" /> More filters</Button>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="sm">Columns</Button>
            <Button variant="ghost" size="sm" className="gap-1.5"><Download className="h-4 w-4" /> Export</Button>
          </div>
        </div>

        {/* Bulk actions */}
        <div className="flex items-center gap-2 border-b border-border bg-muted/30 px-4 py-2 text-xs">
          <Checkbox /> <span className="text-muted-foreground">Select all on page · </span>
          <Button variant="ghost" size="sm" className="h-7 text-xs">Bulk update status</Button>
          <Button variant="ghost" size="sm" className="h-7 text-xs">Assign contractor</Button>
          <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive">Archive</Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/30 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3 w-10"><Checkbox /></th>
                <th className="px-4 py-3"><button className="inline-flex items-center gap-1">Sign ID <ArrowUpDown className="h-3 w-3" /></button></th>
                <th className="px-4 py-3">QR</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Contractor</th>
                <th className="px-4 py-3">Condition</th>
                <th className="px-4 py-3">Updated</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((s) => (
                <tr key={s.id} className="hover:bg-accent/30">
                  <td className="px-4 py-3"><Checkbox /></td>
                  <td className="px-4 py-3 font-mono text-xs font-medium">
                    <Link to="/signs/$id" params={{ id: s.id }} className="text-primary hover:underline">{s.id}</Link>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-0.5 font-mono text-[11px]">
                      <QrCode className="h-3 w-3" />{s.qr}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium leading-tight">{s.location}</div>
                    <div className="text-[11px] text-muted-foreground">{s.address}</div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{s.type}</td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className={STATUS_COLOR[s.status]}>{s.status}</Badge>
                  </td>
                  <td className="px-4 py-3 text-xs font-mono">{s.contractor}</td>
                  <td className="px-4 py-3">{s.condition}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.updated}</td>
                  <td className="px-4 py-3 text-right">
                    <Button asChild variant="ghost" size="sm">
                      <Link to="/signs/$id" params={{ id: s.id }}>View</Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-border px-4 py-3 text-xs">
          <div className="text-muted-foreground">Showing <span className="font-medium text-foreground">{(page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)}</span> of <span className="font-medium text-foreground">{total.toLocaleString()}</span></div>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}><ChevronLeft className="h-3.5 w-3.5" /></Button>
            {Array.from({ length: pages }, (_, i) => (
              <Button key={i} variant={page === i + 1 ? "default" : "ghost"} size="sm" className={page === i + 1 ? "h-8 w-8 gradient-brand text-primary-foreground" : "h-8 w-8"} onClick={() => setPage(i + 1)}>{i + 1}</Button>
            ))}
            <Button variant="outline" size="sm" disabled={page === pages} onClick={() => setPage(page + 1)}><ChevronRight className="h-3.5 w-3.5" /></Button>
          </div>
        </div>
      </div>
      <aside className="space-y-4">
        <div className="rounded-2xl border border-border bg-card p-4 shadow-elev-1">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-semibold">Selected Sign Location</h3>
            <Badge variant="outline" className="text-[10px]">GIS</Badge>
          </div>
          <p className="mb-3 text-xs text-muted-foreground">Click any row to preview its location.</p>
          <OmanMap height={260} />
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 shadow-elev-1">
          <h3 className="text-sm font-semibold">Registry Summary</h3>
          <ul className="mt-3 space-y-2 text-xs">
            <li className="flex justify-between"><span className="text-muted-foreground">Total records</span><span className="font-semibold tabular-nums">96,230</span></li>
            <li className="flex justify-between"><span className="text-muted-foreground">Governorates</span><span className="font-semibold tabular-nums">11</span></li>
            <li className="flex justify-between"><span className="text-muted-foreground">Active contractors</span><span className="font-semibold tabular-nums">24</span></li>
            <li className="flex justify-between"><span className="text-muted-foreground">QR linked</span><span className="font-semibold tabular-nums">99.8%</span></li>
          </ul>
        </div>
      </aside>
      </div>
    </div>
  );
}
