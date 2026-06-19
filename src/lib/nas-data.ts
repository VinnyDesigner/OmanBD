// Shared mock data for the entire NAS platform
export const GOVERNORATES = [
  { name: "Muscat", code: "MA", signs: 18420, completion: 92, addresses: 412300, risks: 4 },
  { name: "Dhofar", code: "DH", signs: 9810, completion: 81, addresses: 184200, risks: 6 },
  { name: "Musandam", code: "MU", signs: 2140, completion: 88, addresses: 38400, risks: 1 },
  { name: "Al Buraimi", code: "BU", signs: 3220, completion: 76, addresses: 52100, risks: 3 },
  { name: "Ad Dakhiliyah", code: "DA", signs: 11280, completion: 84, addresses: 198000, risks: 5 },
  { name: "North Al Batinah", code: "BN", signs: 14620, completion: 79, addresses: 286400, risks: 7 },
  { name: "South Al Batinah", code: "BS", signs: 12480, completion: 82, addresses: 242100, risks: 4 },
  { name: "Ash Sharqiyah North", code: "SN", signs: 8410, completion: 74, addresses: 162200, risks: 8 },
  { name: "Ash Sharqiyah South", code: "SS", signs: 7820, completion: 71, addresses: 154800, risks: 9 },
  { name: "Adh Dhahirah", code: "DR", signs: 6190, completion: 78, addresses: 121500, risks: 4 },
  { name: "Al Wusta", code: "WU", signs: 1840, completion: 68, addresses: 22100, risks: 2 },
];

export const KPI_TOP = [
  { label: "Total Signs", value: 96230, delta: "+3.2%", icon: "Signpost" },
  { label: "Installed Signs", value: 78410, delta: "+5.1%", icon: "CheckCircle2" },
  { label: "Pending Tasks", value: 1284, delta: "-1.8%", icon: "ListTodo" },
  { label: "Open Incidents", value: 142, delta: "+12", icon: "AlertTriangle" },
  { label: "Active Integrations", value: 18, delta: "100%", icon: "PlugZap" },
];

export const MODULES = [
  { id: "signs", title: "Sign Management", desc: "Lifecycle, registry, QR and field ops", to: "/signs", icon: "Signpost", color: "from-[#B21F2D] to-[#7A1220]" },
  { id: "portal", title: "National Address Portal", desc: "Public address lookup & registration", to: "/portal", icon: "Globe2", color: "from-[#3B82F6] to-[#1E40AF]" },
  { id: "search", title: "Address Search", desc: "Address search and validation", to: "/portal", icon: "Search", color: "from-[#D4AF37] to-[#9A7B16]" },
  { id: "bi", title: "BI Dashboard", desc: "Executive analytics & KPIs", to: "/executive", icon: "BarChart3", color: "from-[#22C55E] to-[#15803D]" },
  { id: "api", title: "API Developer Portal", desc: "API documentation and developer services", to: "/api", icon: "Code2", color: "from-[#7A1220] to-[#B21F2D]" },
  { id: "integ", title: "Integration Monitoring", desc: "Real-time SLA & error logs", to: "/integrations", icon: "Activity", color: "from-[#F59E0B] to-[#B45309]" },
  { id: "reports", title: "Reports", desc: "Operational & board-level", to: "/quality", icon: "FileBarChart", color: "from-[#3B82F6] to-[#1E3A8A]" },
  { id: "admin", title: "Administration", desc: "RBAC, jurisdictions, audit", to: "/api", icon: "ShieldCheck", color: "from-[#1F2937] to-[#374151]" },
];

export const SYSTEMS = [
  { name: "ArcGIS Enterprise", status: "operational", uptime: 99.98, latency: 42 },
  { name: "LIS (Land Info System)", status: "operational", uptime: 99.91, latency: 88 },
  { name: "Amalak", status: "degraded", uptime: 98.42, latency: 312 },
  { name: "Krooki", status: "operational", uptime: 99.87, latency: 121 },
  { name: "Civil Registry", status: "operational", uptime: 99.99, latency: 64 },
  { name: "Utility Providers", status: "operational", uptime: 99.72, latency: 144 },
  { name: "Telecom Providers", status: "operational", uptime: 99.65, latency: 196 },
  { name: "Emergency Services", status: "operational", uptime: 99.99, latency: 38 },
];

export const ACTIVITIES = [
  { t: "2m ago", user: "S. Al Hinai", action: "Approved sign installation batch BTH-2284", type: "approval" },
  { t: "14m ago", user: "M. Al Balushi", action: "Reported damaged sign SGN-77821 in Seeb", type: "incident" },
  { t: "38m ago", user: "Integration Bus", action: "Synced 1,284 records from Amalak", type: "sync" },
  { t: "1h ago", user: "F. Al Saidi", action: "Created 24 sign records for Salalah Phase 3", type: "create" },
  { t: "2h ago", user: "Quality Engine", action: "Flagged 18 duplicate addresses in Ad Dakhiliyah", type: "quality" },
  { t: "3h ago", user: "Contractor BAU-04", action: "Uploaded installation evidence for 64 signs", type: "field" },
];

export const APPROVALS = [
  { id: "APR-2284", title: "Sign batch installation — Bawshar", count: 124, submitted: "1d ago", priority: "high" },
  { id: "APR-2283", title: "Address re-zoning — Salalah Cornish", count: 12, submitted: "2d ago", priority: "medium" },
  { id: "APR-2282", title: "Contractor onboarding — BAU-09", count: 1, submitted: "3d ago", priority: "low" },
  { id: "APR-2281", title: "QR re-issuance — Nizwa Old Town", count: 48, submitted: "3d ago", priority: "medium" },
];

export const SIGN_STATUS = [
  { name: "Planned", value: 4820, color: "#6B7280" },
  { name: "Ready for Installation", value: 8210, color: "#3B82F6" },
  { name: "Installed", value: 78410, color: "#22C55E" },
  { name: "Verified", value: 71240, color: "#D4AF37" },
  { name: "Damaged", value: 2180, color: "#EF4444" },
  { name: "Maintenance", value: 1420, color: "#F59E0B" },
];

export const INSTALL_TREND = Array.from({ length: 12 }, (_, i) => ({
  m: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
  manufactured: 4200 + Math.round(Math.sin(i / 2) * 800 + i * 240),
  installed: 3800 + Math.round(Math.cos(i / 2) * 600 + i * 280),
  verified: 3200 + Math.round(Math.sin(i / 3) * 500 + i * 240),
}));

export const SIGNS = Array.from({ length: 42 }, (_, i) => {
  const gov = GOVERNORATES[i % GOVERNORATES.length];
  const status = ["Installed", "Verified", "Ready for Installation", "Damaged", "Maintenance", "Planned"][i % 6];
  const condition = ["Excellent", "Good", "Fair", "Poor"][i % 4];
  return {
    id: `SGN-${(77200 + i).toString().padStart(6, "0")}`,
    qr: `QR-${(10000 + i).toString(36).toUpperCase()}`,
    location: `${gov.name} • Wilayat ${["Seeb","Bawshar","Muttrah","Sohar","Nizwa","Sur"][i % 6]}`,
    address: `Way ${1000 + i * 7}, Building ${100 + i}`,
    status, condition,
    contractor: ["BAU-04", "BAU-09", "ENG-12", "BAU-04", "ENG-07"][i % 5],
    type: ["Street", "Building", "Junction", "POI", "Plot"][i % 5],
    updated: `${(i % 28) + 1}d ago`,
    governorate: gov.name,
  };
});

export const TASKS = {
  New: [
    { id: "T-9821", title: "Verify sign installation BTH-2281", assignee: "F. Al Saidi", priority: "high", due: "Today" },
    { id: "T-9820", title: "GIS Address Validation — Salalah Block 7", assignee: "M. Al Balushi", priority: "medium", due: "Tomorrow" },
    { id: "T-9819", title: "Re-print QR labels (48 signs)", assignee: "Unassigned", priority: "low", due: "Fri" },
    { id: "T-9818", title: "Verify Address Location — Bawshar Zone 4", assignee: "GIS Team", priority: "medium", due: "Mon" },
  ],
  Assigned: [
    { id: "T-9810", title: "Prepare Sign Batch BTH-2281", assignee: "BAU-04", priority: "high", due: "Today" },
    { id: "T-9809", title: "ArcGIS Sync Verification — Muscat", assignee: "S. Al Hinai", priority: "medium", due: "Wed" },
    { id: "T-9808", title: "Coordinate Correction — Sohar district", assignee: "GIS Team", priority: "medium", due: "Thu" },
  ],
  "In Progress": [
    { id: "T-9788", title: "Sign Installation Batch BTH-2280 — Muttrah", assignee: "ENG-12", priority: "high", due: "Today" },
    { id: "T-9787", title: "Resolve Duplicate Addresses — Nizwa", assignee: "Quality Eng.", priority: "medium", due: "Thu" },
    { id: "T-9786", title: "Replace damaged signs — Sohar", assignee: "BAU-09", priority: "high", due: "Today" },
    { id: "T-9785", title: "Fix Missing Coordinates (1,284 records)", assignee: "Quality Eng.", priority: "high", due: "Fri" },
    { id: "T-9784", title: "Civil Registry Integration Review", assignee: "Integration Team", priority: "medium", due: "Mon" },
  ],
  "Pending Approval": [
    { id: "T-9770", title: "Approve installation batch BTH-2284", assignee: "Reviewer", priority: "high", due: "Today" },
    { id: "T-9769", title: "Approve QR re-issuance Nizwa", assignee: "Reviewer", priority: "medium", due: "Fri" },
    { id: "T-9768", title: "Approve Boundary Verification — Dhofar", assignee: "GIS Lead", priority: "medium", due: "Wed" },
  ],
  Completed: [
    { id: "T-9701", title: "Installed 124 signs in Bawshar", assignee: "BAU-04", priority: "medium", due: "Done" },
    { id: "T-9700", title: "Verified 64 signs Salalah", assignee: "ENG-07", priority: "low", due: "Done" },
    { id: "T-9699", title: "LIS Data Validation — Batch 41", assignee: "Integration Team", priority: "medium", due: "Done" },
    { id: "T-9698", title: "Validate QR Linkage — 312 signs", assignee: "Quality Eng.", priority: "low", due: "Done" },
  ],
  Reopened: [
    { id: "T-9650", title: "Re-verify alignment SGN-77432", assignee: "ENG-12", priority: "high", due: "Today" },
  ],
};

export const INCIDENTS = Array.from({ length: 18 }, (_, i) => {
  const sev = ["Critical", "High", "Medium", "Low"][i % 4];
  const gov = GOVERNORATES[i % GOVERNORATES.length];
  return {
    id: `INC-${(4200 + i).toString().padStart(5, "0")}`,
    title: ["Damaged sign", "Missing QR plate", "Misaligned post", "Vandalism reported", "Faded reflective", "Knocked down"][i % 6],
    sign: `SGN-${(77200 + i * 3).toString().padStart(6, "0")}`,
    severity: sev,
    status: ["Open", "Investigating", "In Repair", "Resolved"][i % 4],
    governorate: gov.name,
    reported: `${i + 1}d ago`,
    cost: (i + 1) * 145,
  };
});

export const DATA_QUALITY = {
  score: 92.4,
  duplicates: 412,
  missing: 1284,
  invalidRefs: 318,
  spatial: 96,
  trend: Array.from({ length: 14 }, (_, i) => ({ d: `D${i + 1}`, score: 86 + Math.round(Math.sin(i / 2) * 3 + i * 0.4) })),
};

export const AI_SUGGESTIONS = [
  "Which governorate has the lowest sign completion rate?",
  "Show pending incidents in Muscat for the last 7 days.",
  "Compare manufacturing vs installation in Dhofar this quarter.",
  "List contractors with SLA breach this month.",
  "Heatmap of damaged signs by Wilayat.",
];

export const APIS = [
  { name: "Address Lookup", category: "Address", version: "v3.2", calls: "1.2M/d", auth: "OAuth 2.0" },
  { name: "Reverse Geocoding", category: "Address", version: "v2.1", calls: "820K/d", auth: "OAuth 2.0" },
  { name: "Sign Registry", category: "Sign", version: "v4.0", calls: "412K/d", auth: "JWT" },
  { name: "QR Resolve", category: "Sign", version: "v1.4", calls: "2.4M/d", auth: "Public" },
  { name: "Governorate Reference", category: "Reference", version: "v1.0", calls: "98K/d", auth: "API Key" },
  { name: "Wilayat Reference", category: "Reference", version: "v1.0", calls: "84K/d", auth: "API Key" },
  { name: "Integration Health", category: "Monitoring", version: "v2.0", calls: "210K/d", auth: "OAuth 2.0" },
  { name: "Audit Stream", category: "Monitoring", version: "v1.2", calls: "62K/d", auth: "JWT" },
];

export const fmt = (n: number) => new Intl.NumberFormat("en-US").format(n);
