import {
  LayoutGrid, TrendingUp, Search, Calendar, Settings, LogOut, Sparkles,
  Bell, MessageSquare, CalendarDays, ArrowUpRight, ArrowDownRight,
  BarChart3, Wallet, Users, ShoppingBag, Command,
} from "lucide-react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell,
  AreaChart, Area, PieChart, Pie,
  RadialBarChart, RadialBar, PolarAngleAxis, LineChart, Line,
} from "recharts";
import aiOrb from "@/assets/ai-orb.jpg";

/* ---------- mock data ---------- */
const salesData = [
  { m: "Feb", v: 42 }, { m: "Mar", v: 58 }, { m: "Apr", v: 64 },
  { m: "May", v: 51 }, { m: "Jun", v: 96 }, { m: "Jul", v: 72 },
  { m: "Aug", v: 68 },
];

const revenueData = Array.from({ length: 24 }, (_, i) => ({
  x: i,
  a: 30 + Math.sin(i / 2.4) * 14 + i * 1.6,
  b: 22 + Math.cos(i / 3) * 9 + i * 1.1,
}));

const ageData = [
  { name: "0-18",  value: 22, fill: "hsl(var(--chart-2))" },
  { name: "18-24", value: 38, fill: "hsl(var(--chart-3))" },
  { name: "24-36", value: 40, fill: "hsl(var(--chart-1))" },
];

const creditData = [{ name: "score", value: 80, fill: "url(#creditGrad)" }];

const sparkA = Array.from({ length: 16 }, (_, i) => ({ x: i, y: 30 + Math.sin(i / 2) * 10 + i }));
const sparkB = Array.from({ length: 16 }, (_, i) => ({ x: i, y: 60 - Math.cos(i / 2) * 8 - i * 0.6 }));
const sparkC = Array.from({ length: 16 }, (_, i) => ({ x: i, y: 20 + Math.sin(i / 1.5) * 6 + i * 0.8 }));

const navItems = [
  { icon: LayoutGrid, label: "Overview", active: true },
  { icon: TrendingUp, label: "Analytics" },
  { icon: ShoppingBag, label: "Products" },
  { icon: Users, label: "Customers" },
  { icon: Calendar, label: "Calendar" },
  { icon: Settings, label: "Settings" },
];

/* ---------- sidebar ---------- */
const Sidebar = () => (
  <aside className="hidden md:flex flex-col items-center gap-5 py-6 px-3 glass-card w-[78px] shrink-0">
    <div className="w-11 h-11 rounded-2xl bg-gradient-primary grid place-items-center shadow-soft ring-soft">
      <Sparkles className="w-5 h-5 text-primary-foreground" />
    </div>
    <div className="w-8 h-px bg-border/80" />
    <nav className="flex flex-col gap-2">
      {navItems.map((Item, i) => (
        <button
          key={i}
          aria-label={Item.label}
          className={`group relative w-11 h-11 rounded-2xl grid place-items-center transition-all duration-300 ${
            Item.active
              ? "bg-secondary text-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
          }`}
        >
          {Item.active && (
            <span className="absolute -left-[14px] top-1/2 -translate-y-1/2 h-6 w-[3px] rounded-r-full bg-gradient-primary" />
          )}
          <Item.icon className="w-[18px] h-[18px]" />
        </button>
      ))}
    </nav>
    <div className="mt-auto flex flex-col items-center gap-3">
      <div className="w-8 h-px bg-border/80" />
      <button aria-label="logout" className="w-11 h-11 rounded-2xl grid place-items-center text-muted-foreground hover:text-foreground transition">
        <LogOut className="w-[18px] h-[18px]" />
      </button>
    </div>
  </aside>
);

/* ---------- top bar ---------- */
const TopBar = () => (
  <header className="flex items-center justify-between mb-7 gap-4 flex-wrap">
    <div className="animate-rise">
      <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-2">
        <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
        Live · Q3 2025
      </div>
      <h1 className="text-[28px] md:text-[34px] leading-[1.05] font-display font-semibold tracking-tight">
        Product Sales <span className="text-gradient">Intelligence</span>
      </h1>
    </div>

    <div className="flex items-center gap-3">
      <div className="hidden lg:flex items-center gap-2 glass-card px-4 h-11 rounded-full text-xs text-muted-foreground">
        <Search className="w-4 h-4" />
        <span>Search anything</span>
        <span className="ml-2 px-1.5 py-0.5 rounded-md border border-border/80 font-mono text-[10px] flex items-center gap-1">
          <Command className="w-3 h-3" /> K
        </span>
      </div>
      {[CalendarDays, MessageSquare, Bell].map((Icon, i) => (
        <button
          key={i}
          aria-label="action"
          className="relative w-11 h-11 rounded-full glass-card grid place-items-center text-muted-foreground hover:text-foreground transition"
        >
          <Icon className="w-[16px] h-[16px]" />
          {Icon === Bell && (
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gradient-primary ring-2 ring-background" />
          )}
        </button>
      ))}
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-gradient-primary blur-md opacity-50" />
        <div className="relative w-11 h-11 rounded-full bg-gradient-violet grid place-items-center text-sm font-semibold text-primary-foreground ring-1 ring-white/20">
          MA
        </div>
      </div>
    </div>
  </header>
);

/* ---------- KPI cards ---------- */
const KpiCard = ({
  icon: Icon, label, value, delta, positive, spark, color,
}: {
  icon: any; label: string; value: string; delta: string; positive: boolean; spark: any[]; color: string;
}) => (
  <section className="glass-card p-5 group hover:border-white/10 transition-colors">
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-secondary grid place-items-center text-muted-foreground">
          <Icon className="w-[16px] h-[16px]" />
        </div>
        <div>
          <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
          <p className="text-[26px] font-display font-semibold tracking-tight leading-none mt-1.5">{value}</p>
        </div>
      </div>
      <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-full ${
        positive ? "bg-success/15 text-[hsl(var(--success))]" : "bg-destructive/15 text-[hsl(var(--destructive))]"
      }`}>
        {positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {delta}
      </span>
    </div>
    <div className="h-12 -mx-1 mt-3">
      <ResponsiveContainer>
        <LineChart data={spark}>
          <defs>
            <linearGradient id={`spark-${label}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={color} stopOpacity={1} />
            </linearGradient>
          </defs>
          <Line type="monotone" dataKey="y" stroke={`url(#spark-${label})`} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </section>
);

/* ---------- AI Assistant ---------- */
const AIAssistant = () => (
  <section className="glass-card p-7 flex flex-col h-full min-h-[520px]">
    {/* aurora */}
    <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-primary/25 blur-[100px] pointer-events-none" />
    <div className="absolute -bottom-32 -right-20 w-80 h-80 rounded-full bg-accent/20 blur-[100px] pointer-events-none" />

    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">AI · Online</span>
      </div>
      <span className="text-[11px] font-mono text-muted-foreground">v4.2</span>
    </div>

    <h2 className="text-2xl font-display font-semibold mt-3">Assistant</h2>

    <div className="relative my-4 flex-1 grid place-items-center min-h-[220px]">
      <div className="absolute w-64 h-64 rounded-full bg-primary/20 blur-3xl animate-pulse-glow" />
      <div className="absolute w-60 h-60 rounded-full border border-white/5 animate-spin-slow"
        style={{ background: "conic-gradient(from 0deg, transparent, hsl(var(--primary)/0.3), transparent 30%)" }} />
      <div className="relative w-52 h-52 rounded-full overflow-hidden ring-1 ring-white/10 animate-float">
        <img src={aiOrb} alt="AI assistant" width={1024} height={1024} className="w-full h-full object-cover scale-110" />
      </div>
    </div>

    <p className="text-[15px] leading-relaxed text-muted-foreground">
      <span className="text-foreground font-medium">Analyze product sales</span> over the last year.
      Compare revenue, quality, sales and brand — instantly.
    </p>

    <button className="mt-5 group relative overflow-hidden rounded-2xl bg-gradient-primary text-primary-foreground font-semibold py-3.5 shadow-soft hover:shadow-[0_0_40px_hsl(var(--primary)/0.5)] transition-all">
      <span className="relative z-10 flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4" />
        Try it now
      </span>
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
    </button>
  </section>
);

/* ---------- Total Sale ---------- */
const TotalSale = () => (
  <section className="glass-card p-6">
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-secondary grid place-items-center text-muted-foreground">
          <BarChart3 className="w-[16px] h-[16px]" />
        </div>
        <div>
          <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">Total sale</p>
          <p className="text-[28px] font-display font-semibold tracking-tight leading-none mt-1.5">
            90,<span className="text-muted-foreground">744</span>
          </p>
        </div>
      </div>
      <button aria-label="open" className="w-9 h-9 rounded-full border border-border grid place-items-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition">
        <ArrowUpRight className="w-4 h-4" />
      </button>
    </div>

    <div className="h-44 mt-5 -mx-2">
      <ResponsiveContainer>
        <BarChart data={salesData} barSize={26}>
          <defs>
            <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--chart-1))" />
              <stop offset="100%" stopColor="hsl(var(--chart-2))" />
            </linearGradient>
            <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="6" stroke="hsl(var(--chart-1))" strokeWidth="3" />
            </pattern>
          </defs>
          <XAxis dataKey="m" axisLine={false} tickLine={false}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
          <YAxis hide />
          <Tooltip cursor={{ fill: "hsl(var(--secondary)/0.4)" }}
            contentStyle={{ background: "hsl(var(--card-elevated))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }} />
          <Bar dataKey="v" radius={[10, 10, 10, 10]}>
            {salesData.map((d, i) => (
              <Cell key={i} fill={i === 4 ? "url(#hatch)" : "hsl(var(--secondary))"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  </section>
);

/* ---------- Age donut ---------- */
const AgeDonut = () => (
  <section className="glass-card p-5">
    <div className="flex items-center justify-between mb-2">
      <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">Age groups</p>
      <span className="text-[10px] font-mono text-muted-foreground">100%</span>
    </div>
    <div className="flex items-center gap-4">
      <div className="w-28 h-28 shrink-0 relative">
        <ResponsiveContainer>
          <PieChart>
            <Pie data={ageData} dataKey="value" innerRadius={32} outerRadius={52}
              paddingAngle={4} stroke="none" cornerRadius={4} />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 grid place-items-center pointer-events-none">
          <div className="text-center">
            <p className="text-[10px] font-mono text-muted-foreground leading-none">Total</p>
            <p className="text-base font-display font-semibold leading-tight">12.4k</p>
          </div>
        </div>
      </div>
      <ul className="flex-1 space-y-1.5 text-xs">
        {ageData.map((d) => (
          <li key={d.name} className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ background: d.fill }} />
              <span className="text-muted-foreground">{d.name}</span>
            </span>
            <span className="font-mono text-foreground">{d.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

/* ---------- Credit rate ---------- */
const CreditRate = () => (
  <section className="glass-card p-5 flex flex-col">
    <div className="flex items-center justify-between">
      <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">Credit rate</p>
      <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground font-mono">Apr</span>
    </div>
    <div className="relative flex-1 grid place-items-center min-h-[140px]">
      <div className="w-full h-36">
        <ResponsiveContainer>
          <RadialBarChart innerRadius="78%" outerRadius="100%" data={creditData}
            startAngle={210} endAngle={-30}>
            <defs>
              <linearGradient id="creditGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="hsl(var(--chart-2))" />
                <stop offset="100%" stopColor="hsl(var(--chart-1))" />
              </linearGradient>
            </defs>
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar dataKey="value" cornerRadius={20} background={{ fill: "hsl(var(--secondary))" }} />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-3">
        <p className="text-[32px] font-display font-semibold leading-none">803</p>
        <p className="text-[10px] font-mono text-muted-foreground mt-1">EXCELLENT</p>
      </div>
    </div>
  </section>
);

/* ---------- Revenue trend ---------- */
const RevenueTrend = () => (
  <section className="glass-card p-6">
    <div className="flex items-start justify-between flex-wrap gap-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-secondary grid place-items-center text-muted-foreground">
          <TrendingUp className="w-[16px] h-[16px]" />
        </div>
        <div>
          <h3 className="text-lg font-display font-semibold">Revenue trend</h3>
          <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">Summary statistics</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {["1D", "1W", "1M", "1Y"].map((t, i) => (
          <button key={t} className={`text-[11px] font-mono px-3 h-8 rounded-full transition ${
            i === 2 ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}>{t}</button>
        ))}
        <button aria-label="expand" className="w-9 h-9 rounded-full border border-border grid place-items-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition">
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>

    <div className="flex flex-wrap gap-x-7 gap-y-2 mt-5">
      {[["1.2", "Min"], ["5.33", "Max"], ["2.43", "Avg"], ["+18%", "Δ Day"], ["+42%", "Δ Week"]].map(([n, l]) => (
        <div key={l} className="flex items-baseline gap-1.5">
          <span className="font-display font-semibold text-foreground text-base">{n}</span>
          <span className="text-muted-foreground text-[11px] font-mono uppercase tracking-wider">{l}</span>
        </div>
      ))}
    </div>

    <div className="h-56 mt-4 relative">
      <ResponsiveContainer>
        <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity={0.55} />
              <stop offset="100%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
            </linearGradient>
            <pattern id="areaHatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="8" stroke="hsl(var(--chart-1))" strokeWidth="2" strokeOpacity="0.35" />
            </pattern>
          </defs>
          <XAxis dataKey="x" hide />
          <YAxis hide />
          <Tooltip contentStyle={{ background: "hsl(var(--card-elevated))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }} />
          <Area type="monotone" dataKey="a" stroke="hsl(var(--chart-1))" strokeWidth={2.2}
            fill="url(#areaGrad)" />
          <Area type="monotone" dataKey="a" stroke="transparent" fill="url(#areaHatch)" />
          <Line type="monotone" dataKey="b" stroke="hsl(var(--muted-foreground))" strokeWidth={1.4}
            dot={false} strokeDasharray="4 4" />
        </AreaChart>
      </ResponsiveContainer>
      <span className="absolute top-1 left-1 text-[10px] font-mono text-muted-foreground">2025</span>
      <span className="absolute bottom-1 left-1 text-[10px] font-mono text-muted-foreground">2024</span>
    </div>

    <div className="mt-5 flex items-center gap-4">
      <span className="text-[10px] font-mono text-muted-foreground">JAN</span>
      <div className="flex-1 h-1.5 rounded-full bg-secondary relative">
        <div className="absolute inset-y-0 left-0 w-2/3 rounded-full bg-gradient-primary" />
        <div className="absolute -top-1.5 left-2/3 -translate-x-1/2 flex flex-col items-center">
          <div className="w-4 h-4 rounded-full bg-foreground ring-4 ring-background shadow-[0_0_0_1px_hsl(var(--primary))]" />
          <span className="mt-1 text-[10px] font-mono text-foreground bg-secondary px-1.5 py-0.5 rounded">15 Jun</span>
        </div>
      </div>
      <span className="text-[10px] font-mono text-muted-foreground">DEC</span>
    </div>
  </section>
);

/* ---------- page ---------- */
const Index = () => {
  return (
    <main className="min-h-screen p-3 md:p-5 flex gap-5">
      <Sidebar />
      <div className="flex-1 min-w-0 animate-rise">
        <TopBar />

        {/* KPI row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-5">
          <KpiCard icon={Wallet} label="Revenue" value="$284.2K" delta="12.4%" positive spark={sparkA} color="hsl(252 95% 68%)" />
          <KpiCard icon={Users} label="Customers" value="9,481" delta="3.1%" positive spark={sparkC} color="hsl(190 90% 60%)" />
          <KpiCard icon={ShoppingBag} label="Avg. Order" value="$128.40" delta="2.8%" positive={false} spark={sparkB} color="hsl(320 85% 70%)" />
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-4 lg:row-span-2">
            <AIAssistant />
          </div>
          <div className="lg:col-span-5">
            <TotalSale />
          </div>
          <div className="lg:col-span-3 grid grid-rows-2 gap-5">
            <AgeDonut />
            <CreditRate />
          </div>
          <div className="lg:col-span-8">
            <RevenueTrend />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Index;
