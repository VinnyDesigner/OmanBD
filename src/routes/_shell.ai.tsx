import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Download, Bookmark, Clock, MapPin, AlertOctagon } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { OmanMap } from "@/components/oman-map";
import { AI_SUGGESTIONS, GOVERNORATES, INCIDENTS } from "@/lib/nas-data";

export const Route = createFileRoute("/_shell/ai")({
  head: () => ({ meta: [{ title: "AI Analytics — NAS" }, { name: "description", content: "Ask natural language questions across the NAS data estate." }] }),
  component: AI,
});

type Msg = { role: "user" | "assistant"; content: string; kind?: "incidents" | "chart" | "map" };

const HISTORY = [
  "Show open incidents in Muscat",
  "Which governorate has the lowest completion rate?",
  "Top 5 contractors by SLA breach",
  "Verified addresses growth this quarter",
];

const SEVERITY_DATA = [
  { name: "Critical", value: 4, color: "#EF4444" },
  { name: "High", value: 7, color: "#F59E0B" },
  { name: "Medium", value: 9, color: "#3B82F6" },
  { name: "Low", value: 4, color: "#6B7280" },
];

function AI() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "user", content: "Show open incidents in Muscat" },
    {
      role: "assistant",
      content: "Found 24 open incidents in Muscat governorate. Severity distribution and locations below.",
      kind: "incidents",
    },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = (q?: string) => {
    const text = (q ?? input).trim();
    if (!text) return;
    const kind: Msg["kind"] = text.toLowerCase().includes("map") || text.toLowerCase().includes("heatmap")
      ? "map"
      : text.toLowerCase().includes("incident") || text.toLowerCase().includes("open")
      ? "incidents"
      : "chart";
    setMessages((m) => [
      ...m,
      { role: "user", content: text },
      { role: "assistant", content: `Here's what I found for: "${text}".`, kind },
    ]);
    setInput("");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Analytics"
        description="Natural language insights across signs, addresses, integrations and operations."
        actions={
          <>
            <Button variant="outline" className="gap-1.5"><Bookmark className="h-4 w-4" /> Saved</Button>
            <Button variant="outline" className="gap-1.5"><Download className="h-4 w-4" /> Export</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_280px]">
        <div className="flex h-[calc(100dvh-220px)] min-h-[640px] flex-col rounded-2xl border border-border bg-card shadow-elev-1">
          <div className="flex-1 space-y-5 overflow-y-auto p-6">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
                {m.role === "assistant" && (
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full gradient-brand text-primary-foreground">
                    <Sparkles className="h-4 w-4" />
                  </div>
                )}
                <div className={`max-w-3xl rounded-2xl px-4 py-3 text-sm ${m.role === "user" ? "gradient-brand text-primary-foreground" : "border border-border bg-background"}`}>
                  <p>{m.content}</p>

                  {m.kind === "incidents" && (
                    <div className="mt-4 space-y-3">
                      {/* AI Response card */}
                      <div className="grid grid-cols-3 gap-2">
                        <Stat label="Open Incidents" value="24" tone="danger" icon={AlertOctagon} />
                        <Stat label="Critical" value="4" tone="warning" />
                        <Stat label="In Repair" value="9" tone="info" />
                      </div>

                      {/* Chart */}
                      <div className="rounded-lg border border-border bg-card p-3">
                        <div className="mb-2 text-xs font-semibold">Severity Distribution</div>
                        <div className="h-[160px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={SEVERITY_DATA}>
                              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.005 260)" vertical={false} />
                              <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                              <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.005 260)", fontSize: 12 }} />
                              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                {SEVERITY_DATA.map((d) => <Cell key={d.name} fill={d.color} />)}
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Table */}
                      <div className="overflow-hidden rounded-lg border border-border">
                        <div className="bg-muted/40 px-3 py-2 text-xs font-semibold">Incident List</div>
                        <table className="w-full text-xs">
                          <thead className="bg-muted/20 text-left text-muted-foreground">
                            <tr><th className="px-3 py-2">ID</th><th className="px-3 py-2">Title</th><th className="px-3 py-2">Severity</th><th className="px-3 py-2">Status</th></tr>
                          </thead>
                          <tbody className="divide-y divide-border">
                            {INCIDENTS.slice(0, 5).map((inc) => (
                              <tr key={inc.id}>
                                <td className="px-3 py-2 font-mono">{inc.id}</td>
                                <td className="px-3 py-2">{inc.title}</td>
                                <td className="px-3 py-2"><Badge variant="outline" className="text-[10px]">{inc.severity}</Badge></td>
                                <td className="px-3 py-2 text-muted-foreground">{inc.status}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* GIS Map */}
                      <div>
                        <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold"><MapPin className="h-3 w-3 text-primary" /> Incident Locations (GIS)</div>
                        <OmanMap height={220} />
                      </div>
                    </div>
                  )}

                  {m.kind === "chart" && (
                    <div className="mt-3 h-[200px] rounded-lg border border-border bg-card p-3">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={GOVERNORATES.slice(0, 7)}>
                          <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.005 260)" vertical={false} />
                          <XAxis dataKey="code" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                          <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.005 260)", fontSize: 12 }} />
                          <Bar dataKey="completion" fill="oklch(0.48 0.18 22)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}

                  {m.kind === "map" && <div className="mt-3"><OmanMap height={240} labeled /></div>}
                </div>
                {m.role === "user" && <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-muted text-xs font-semibold">SA</div>}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="border-t border-border p-3">
            <div className="mb-2 flex flex-wrap gap-1.5">
              {AI_SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => send(s)} className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground transition hover:border-primary hover:text-primary">
                  {s}
                </button>
              ))}
            </div>
            <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex gap-2">
              <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything about the NAS program…" className="h-11" />
              <Button type="submit" className="h-11 gradient-brand text-primary-foreground"><Send className="h-4 w-4" /></Button>
            </form>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-4 shadow-elev-1">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold"><Clock className="h-4 w-4 text-primary" /> History</div>
            <ul className="space-y-1.5 text-xs">
              {HISTORY.map((h) => (
                <li key={h}><button onClick={() => send(h)} className="line-clamp-2 w-full rounded-md p-2 text-left text-muted-foreground hover:bg-accent hover:text-foreground">{h}</button></li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border gradient-brand-soft p-4">
            <div className="text-sm font-semibold">Pro tip</div>
            <p className="mt-1 text-xs text-muted-foreground">Combine filters: "Damaged signs in Sohar last 30 days, grouped by contractor."</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Stat({ label, value, tone, icon: Icon }: { label: string; value: string; tone: "danger" | "warning" | "info"; icon?: typeof AlertOctagon }) {
  const t: Record<string, string> = {
    danger: "border-destructive/30 bg-destructive/5 text-destructive",
    warning: "border-warning/30 bg-warning/5 text-warning",
    info: "border-info/30 bg-info/5 text-info",
  };
  return (
    <div className={`rounded-lg border p-3 ${t[tone]}`}>
      <div className="flex items-center justify-between text-[10px] font-medium uppercase tracking-wider opacity-80">{label}{Icon && <Icon className="h-3 w-3" />}</div>
      <div className="mt-1 font-display text-2xl font-semibold tabular-nums">{value}</div>
    </div>
  );
}
