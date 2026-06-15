import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { LayoutGrid, List, Plus, Paperclip, MessageSquare, X } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { TASKS } from "@/lib/nas-data";

export const Route = createFileRoute("/_shell/tasks")({
  head: () => ({ meta: [{ title: "Tasks — NAS" }, { name: "description", content: "Kanban and table view of all program tasks." }] }),
  component: Tasks,
});

const COLUMNS = ["New", "Assigned", "In Progress", "Pending Approval", "Completed", "Reopened"];
const PRIORITY: Record<string, string> = {
  high: "border-destructive/30 bg-destructive/5 text-destructive",
  medium: "border-warning/30 bg-warning/5 text-warning",
  low: "border-info/30 bg-info/5 text-info",
};

function Tasks() {
  const [view, setView] = useState<"kanban" | "list">("kanban");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Task Management"
        description="Manage operational tasks across sign management, GIS validation, address verification, integrations and approvals."
        actions={
          <>
            <div className="flex items-center rounded-lg border border-border bg-card p-0.5">
              <button onClick={() => setView("kanban")} className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition ${view === "kanban" ? "gradient-brand text-primary-foreground" : "text-muted-foreground"}`}><LayoutGrid className="h-3.5 w-3.5" /> Kanban</button>
              <button onClick={() => setView("list")} className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition ${view === "list" ? "gradient-brand text-primary-foreground" : "text-muted-foreground"}`}><List className="h-3.5 w-3.5" /> List</button>
            </div>
            <Button className="gap-1.5 gradient-brand text-primary-foreground"><Plus className="h-4 w-4" /> New Task</Button>
          </>
        }
      />

      {view === "kanban" ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6">
          {COLUMNS.map((col) => {
            const items = (TASKS as never as Record<string, typeof TASKS["New"]>)[col] ?? [];
            return (
              <div key={col} className="rounded-2xl border border-border bg-card/60 p-3 shadow-elev-1">
                <div className="mb-3 flex items-center justify-between px-1">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{col}</div>
                  <Badge variant="outline" className="text-[10px]">{items.length}</Badge>
                </div>
                <div className="space-y-2">
                  {items.map((t) => (
                    <Sheet key={t.id}>
                      <SheetTrigger asChild>
                        <button className="w-full rounded-xl border border-border bg-card p-3 text-left shadow-elev-1 transition hover:-translate-y-0.5 hover:shadow-elev-2">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[11px] text-muted-foreground">{t.id}</span>
                            <Badge variant="outline" className={`text-[10px] ${PRIORITY[t.priority]}`}>{t.priority}</Badge>
                          </div>
                          <div className="mt-1.5 text-sm font-medium leading-tight">{t.title}</div>
                          <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
                            <span>{t.assignee}</span><span>{t.due}</span>
                          </div>
                        </button>
                      </SheetTrigger>
                      <SheetContent className="w-full sm:max-w-lg">
                        <SheetHeader><SheetTitle>{t.title}</SheetTitle></SheetHeader>
                        <div className="space-y-4 px-1 py-4">
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline">{t.id}</Badge>
                            <Badge variant="outline" className={PRIORITY[t.priority]}>{t.priority}</Badge>
                            <Badge variant="outline">{col}</Badge>
                          </div>
                          <Row l="Assignee" v={t.assignee} />
                          <Row l="Due" v={t.due} />
                          <Row l="Linked sign" v="SGN-077821" />
                          <div>
                            <div className="mb-2 flex items-center gap-2 text-sm font-semibold"><MessageSquare className="h-4 w-4" /> Comments</div>
                            <div className="space-y-2 rounded-lg border border-border bg-muted/30 p-3 text-sm">
                              <div><span className="font-medium">S. Al Hinai</span> <span className="text-xs text-muted-foreground">· 1h ago</span><p className="mt-0.5 text-muted-foreground">Field crew dispatched, ETA 14:00.</p></div>
                            </div>
                            <div className="mt-2 flex gap-2"><Input placeholder="Add a comment…" className="h-9" /><Button size="sm">Send</Button></div>
                          </div>
                          <div>
                            <div className="mb-2 flex items-center gap-2 text-sm font-semibold"><Paperclip className="h-4 w-4" /> Attachments</div>
                            <div className="rounded-lg border border-dashed border-border p-4 text-center text-xs text-muted-foreground">Drop files or click to upload</div>
                          </div>
                        </div>
                      </SheetContent>
                    </Sheet>
                  ))}
                  <button className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-border py-2 text-xs text-muted-foreground hover:border-primary hover:text-primary">
                    <Plus className="h-3.5 w-3.5" /> Add task
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-elev-1">
          <table className="w-full text-sm">
            <thead className="bg-muted/30 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr><th className="px-4 py-3">ID</th><th className="px-4 py-3">Title</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Assignee</th><th className="px-4 py-3">Priority</th><th className="px-4 py-3">Due</th></tr>
            </thead>
            <tbody className="divide-y divide-border">
              {COLUMNS.flatMap((col) => (TASKS as never as Record<string, typeof TASKS["New"]>)[col].map((t) => ({ ...t, col }))).map((t) => (
                <tr key={t.id} className="hover:bg-accent/40">
                  <td className="px-4 py-3 font-mono text-xs">{t.id}</td>
                  <td className="px-4 py-3 font-medium">{t.title}</td>
                  <td className="px-4 py-3"><Badge variant="outline">{t.col}</Badge></td>
                  <td className="px-4 py-3 text-muted-foreground">{t.assignee}</td>
                  <td className="px-4 py-3"><Badge variant="outline" className={PRIORITY[t.priority]}>{t.priority}</Badge></td>
                  <td className="px-4 py-3 text-muted-foreground">{t.due}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Row({ l, v }: { l: string; v: string }) {
  return (
    <div className="flex justify-between border-b border-border pb-2 text-sm">
      <span className="text-muted-foreground">{l}</span><span className="font-medium">{v}</span>
    </div>
  );
}
