import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check, MapPin, Upload, QrCode, Save, Image as ImageIcon, FileText } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { OmanMap } from "@/components/oman-map";
import { GOVERNORATES } from "@/lib/nas-data";
import { toast } from "sonner";

export const Route = createFileRoute("/_shell/signs/new")({
  head: () => ({ meta: [{ title: "Create Sign — NAS" }, { name: "description", content: "Register a new sign in the NAS program." }] }),
  component: NewSign,
});

function NewSign() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Create New Sign"
        description="Register a new sign with location, installation and QR details."
        actions={
          <>
            <Button variant="outline" className="gap-1.5" onClick={() => toast.success("Draft saved")}><Save className="h-4 w-4" /> Save Draft</Button>
            <Button variant="ghost" asChild><Link to="/signs/registry">Cancel</Link></Button>
          </>
        }
      />

      <form
        onSubmit={(e) => { e.preventDefault(); toast.success("Sign submitted · SGN-077821"); navigate({ to: "/signs/registry" }); }}
        className="space-y-6"
      >
        {/* Basic Information */}
        <Section icon={FileText} title="Basic Information" desc="Identify the sign type, category and name.">
          <Grid>
            <Field label="Sign Type">
              <Select defaultValue="street"><SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="street">Street Sign</SelectItem>
                  <SelectItem value="building">Building Sign</SelectItem>
                  <SelectItem value="junction">Junction Sign</SelectItem>
                  <SelectItem value="poi">Point of Interest</SelectItem>
                  <SelectItem value="plot">Plot Sign</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Sign Category">
              <Select defaultValue="primary"><SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="primary">Primary</SelectItem>
                  <SelectItem value="secondary">Secondary</SelectItem>
                  <SelectItem value="tertiary">Tertiary</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Sign Name" full><Input placeholder="e.g. Way 2842 — Bawshar" /></Field>
            <Field label="Description" full><Textarea rows={3} placeholder="Optional notes about the sign." /></Field>
          </Grid>
        </Section>

        {/* Location Information */}
        <Section icon={MapPin} title="Location Information" desc="Address and coordinates.">
          <Grid>
            <Field label="Governorate">
              <Select defaultValue="MA"><SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{GOVERNORATES.map((g) => <SelectItem key={g.code} value={g.code}>{g.name}</SelectItem>)}</SelectContent>
              </Select>
            </Field>
            <Field label="Wilayat"><Input defaultValue="Bawshar" /></Field>
            <Field label="Street"><Input defaultValue="Way 2842" /></Field>
            <Field label="Building No."><Input defaultValue="124" /></Field>
            <Field label="Latitude"><Input defaultValue="23.5859" /></Field>
            <Field label="Longitude"><Input defaultValue="58.4059" /></Field>
            <div className="md:col-span-2">
              <Label>Pin location on the map</Label>
              <div className="mt-2"><OmanMap height={300} /></div>
              <p className="mt-1 text-xs text-muted-foreground">Tap the map to capture coordinates from ArcGIS.</p>
            </div>
          </Grid>
        </Section>

        {/* Installation Details */}
        <Section icon={FileText} title="Installation Details" desc="Contractor and planned installation date.">
          <Grid>
            <Field label="Contractor">
              <Select defaultValue="bau04"><SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="bau04">BAU-04 (Bawshar Group)</SelectItem>
                  <SelectItem value="eng12">ENG-12 (Salalah Eng.)</SelectItem>
                  <SelectItem value="bau09">BAU-09 (North Batinah)</SelectItem>
                  <SelectItem value="eng07">ENG-07 (Dakhiliyah)</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Planned Installation Date"><Input type="date" defaultValue="2026-07-15" /></Field>
            <Field label="Crew Lead"><Input defaultValue="M. Al Balushi" /></Field>
            <Field label="Pole Type">
              <Select defaultValue="single"><SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single 60mm</SelectItem>
                  <SelectItem value="double">Double 80mm</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </Grid>
        </Section>

        {/* QR Details */}
        <Section icon={QrCode} title="QR Details" desc="Generate the QR code linked to this sign.">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_1fr]">
            <div>
              <Label>QR Preview</Label>
              <div className="mt-2 grid h-56 place-items-center rounded-xl border border-border bg-muted/30">
                <div className="grid h-40 w-40 grid-cols-12 gap-0.5 rounded-lg bg-card p-3 shadow-elev-2">
                  {Array.from({ length: 144 }).map((_, i) => (
                    <div key={i} className={`rounded-[1px] ${(i * 7) % 13 < 6 ? "bg-foreground" : "bg-transparent"}`} />
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <Field label="QR Code"><Input defaultValue="QR-A4F2E1" readOnly className="font-mono" /></Field>
              <Field label="Resolves to"><Input defaultValue="https://nas.gov.om/r/A4F2E1" readOnly /></Field>
              <Field label="Print template">
                <Select defaultValue="std"><SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="std">Standard 40×40mm</SelectItem>
                    <SelectItem value="lg">Large 80×80mm</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Button type="button" className="gradient-brand text-primary-foreground gap-1.5"><QrCode className="h-4 w-4" /> Generate QR</Button>
            </div>
          </div>
        </Section>

        {/* Attachments */}
        <Section icon={Upload} title="Attachments" desc="Upload drawings and design files.">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {["Upload Drawing", "Upload Design", "Site Photo"].map((l) => (
              <button key={l} type="button" className="flex h-32 flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-muted/30 text-muted-foreground transition hover:border-primary hover:bg-primary/5 hover:text-primary">
                <ImageIcon className="h-6 w-6" />
                <span className="text-xs font-medium">{l}</span>
                <span className="text-[10px]">Click to upload</span>
              </button>
            ))}
          </div>
        </Section>

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-2 rounded-2xl border border-border bg-card p-4 shadow-elev-1">
          <Button type="button" variant="outline" onClick={() => toast.success("Draft saved")} className="gap-1.5"><Save className="h-4 w-4" /> Save Draft</Button>
          <Button type="submit" className="gap-1.5 gradient-brand text-primary-foreground">Submit <Check className="h-4 w-4" /></Button>
        </div>
      </form>
    </div>
  );
}

function Section({ icon: Icon, title, desc, children }: { icon: typeof FileText; title: string; desc: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-elev-1">
      <div className="mb-5 flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"><Icon className="h-5 w-5" /></div>
        <div>
          <h2 className="font-semibold">{title}</h2>
          <p className="text-xs text-muted-foreground">{desc}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 gap-4 md:grid-cols-2">{children}</div>;
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <div className={`space-y-1.5 ${full ? "md:col-span-2" : ""}`}>
      <Label>{label}</Label>
      {children}
    </div>
  );
}
