import {
  LayoutGrid, TrendingUp, Search, Calendar, Settings, LogOut, Zap,
  Bell, MessageSquare, CalendarDays, ArrowUpRight, BarChart3,
} from "lucide-react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell,
  AreaChart, Area, LineChart, Line, PieChart, Pie,
  RadialBarChart, RadialBar, PolarAngleAxis,
} from "recharts";
import aiOrb from "@/assets/ai-orb.jpg";

const salesData = [
  { m: "Feb", v: 42 }, { m: "Mar", v: 58 }, { m: "Apr", v: 64 },
  { m: "May", v: 51 }, { m: "Jun", v: 96 }, { m: "Jul", v: 72 },
  { m: "Aug", v: 68 },
];

const revenueData = Array.from({ length: 14 }, (_, i) => ({
  x: i,
  a: 30 + Math.sin(i / 2) * 12 + i * 2,
  b: 22 + Math.cos(i / 3) * 8 + i * 1.5,
}));

const ageData = [
  { name: "0-18", value: 22, fill: "hsl(var(--chart-2))" },
  { name: "18-24", value: 38, fill: "hsl(var(--chart-3))" },
  { name: "24-36", value: 40, fill: "hsl(var(--chart-1))" },
];

const creditData = [{ name: "score", value: 80, fill: "url(#creditGrad)" }];

const navItems = [
  { icon: LayoutGrid, active: true },
  { icon: TrendingUp },
  { icon: Search },
  { icon: Calendar },
  { icon: Settings },
];

const Sidebar = () => (
  <aside className="flex flex-col items-center gap-6 py-6 px-4 glass-card rounded-3xl">
    <div className="w-11 h-11 rounded-2xl bg-gradient-primary grid place-items-center shadow-soft">
      <Zap className="w-5 h-5 text-primary-foreground" />
    </div>
    <div className="w-8 h-px bg-border" />
    <nav className="flex flex-col gap-3">
      {navItems.map((Item, i) => (
        <button
          key={i}
          aria-label="nav"
          className={`w-11 h-11 rounded-xl grid place-items-center transition-all ${
            Item.active
              ? "bg-secondary text-foreground shadow-soft"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
          }`}
        >
          <Item.icon className="w-5 h-5" />
        </button>
      ))}
    </nav>
    <div className="mt-auto flex flex-col items-center gap-3">
      <div className="w-8 h-px bg-border" />
      <button aria-label="logout" className="w-11 h-11 rounded-xl grid place-items-center text-muted-foreground hover:text-foreground">
        <LogOut className="w-5 h-5" />
      </button>
    </div>
  </aside>
);

const TopBar = () => (
  <header className="flex items-center justify-between mb-6">
    <div>
      <h1 className="text-3xl md:text-4xl font-display font-semibold tracking-tight">
        Product Sales <span className="text-gradient">Dashboard</span>
      </h1>
      <p className="text-sm text-muted-foreground mt-1">Welcome back — here's what's moving today.</p>
    </div>
    <div className="flex items-center gap-3">
      {[CalendarDays, MessageSquare, Bell].map((Icon, i) => (
        <button key={i} className="w-11 h-11 rounded-full glass-card grid place-items-center text-muted-foreground hover:text-foreground transition">
          <Icon className="w-4 h-4" />
        </button>
      ))}
      <div className="w-11 h-11 rounded-full bg-gradient-violet grid place-items-center text-sm font-semibold text-primary-foreground ring-2 ring-border">
        MA
      </div>
    </div>
  </header>
);

const AIAssistant = () => (
  <section className="glass-card p-8 flex flex-col row-span-2 relative overflow-hidden">
    <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
    <h2 className="text-2xl font-display font-semibold relative z-10">AI Assistant</h2>

    <div className="relative my-6 flex-1 grid place-items-center">
      <div className="absolute inset-0 m-auto w-72 h-72 rounded-full bg-primary/15 blur-3xl animate-pulse-glow" />
      <div className="relative w-72 h-72 rounded-full overflow-hidden ring-1 ring-border/60 animate-float">
        <img src={aiOrb} alt="AI assistant orb" width={576} height={576} className="w-full h-full object-cover" />
      </div>
      <button className="absolute bottom-4 px-7 py-2.5 rounded-full bg-gradient-primary text-primary-foreground text-sm font-semibold shadow-soft hover:scale-[1.03] transition">
        Try Now
      </button>
    </div>

    <p className="text-xl md:text-2xl font-display leading-snug">
      Analyze product sales over last year.{" "}
      <span className="text-muted-foreground">Compare revenue, quality, sales and brand.</span>
    </p>
  </section>
);

const TotalSale = () => (
  <section className="glass-card p-6 col-span-2">
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-secondary grid place-items-center">
          <BarChart3 className="w-4 h-4 text-muted-foreground" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Total sale</p>
          <p className="text-3xl font-display font-semibold tracking-tight">
            90,<span className="text-muted-foreground">744</span>
          </p>
        </div>
      </div>
      <button aria-label="open" className="w-9 h-9 rounded-full border border-border grid place-items-center text-muted-foreground hover:text-foreground">
        <ArrowUpRight className="w-4 h-4" />
      </button>
    </div>

    <div className="h-44 mt-4">
      <ResponsiveContainer>
        <BarChart data={salesData} barSize={28}>
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
          <Bar dataKey="v" radius={[12, 12, 12, 12]}>
            {salesData.map((d, i) => (
              <Cell key={i} fill={i === 4 ? "url(#hatch)" : "hsl(var(--secondary))"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  </section>
);

const AgeDonut = () => (
  <section className="glass-card p-5">
    <div className="h-40 relative">
      <ResponsiveContainer>
        <PieChart>
          <Pie data={ageData} dataKey="value" innerRadius={42} outerRadius={64}
            paddingAngle={3} stroke="none" />
        </PieChart>
      </ResponsiveContainer>
      <span className="absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">24-36</span>
      <span className="absolute bottom-6 left-1 text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">0-18</span>
      <span className="absolute bottom-2 right-4 text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">18-24</span>
    </div>
  </section>
);

const CreditRate = () => (
  <section className="glass-card p-5 flex flex-col">
    <p className="text-sm text-muted-foreground text-center">Credit rate</p>
    <div className="relative flex-1 grid place-items-center">
      <div className="w-full h-32">
        <ResponsiveContainer>
          <RadialBarChart innerRadius="75%" outerRadius="100%" data={creditData}
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
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-gradient-primary text-primary-foreground mb-1">Apr</span>
        <p className="text-3xl font-display font-semibold">803</p>
      </div>
    </div>
  </section>
);

const RevenueTrend = () => (
  <section className="glass-card p-6 col-span-3">
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-secondary grid place-items-center">
          <TrendingUp className="w-4 h-4 text-muted-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-display font-semibold">Revenue trend</h3>
          <p className="text-xs text-muted-foreground">Summary statistics</p>
        </div>
      </div>
      <button aria-label="expand" className="w-9 h-9 rounded-full border border-border grid place-items-center text-muted-foreground hover:text-foreground">
        <ArrowUpRight className="w-4 h-4" />
      </button>
    </div>

    <div className="flex flex-wrap gap-x-8 gap-y-2 mt-5 text-sm">
      {[["1.2", "Min"], ["5.33", "Max"], ["2.43", "Avg"], ["1", "Day"], ["1", "Week"]].map(([n, l]) => (
        <div key={l} className="flex items-baseline gap-1.5">
          <span className="font-display font-semibold text-foreground">{n}</span>
          <span className="text-muted-foreground text-xs">{l}</span>
        </div>
      ))}
    </div>

    <div className="h-52 mt-3 relative">
      <ResponsiveContainer>
        <AreaChart data={revenueData}>
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity={0.6} />
              <stop offset="100%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
            </linearGradient>
            <pattern id="areaHatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="8" stroke="hsl(var(--chart-1))" strokeWidth="3" strokeOpacity="0.45" />
            </pattern>
          </defs>
          <XAxis dataKey="x" hide />
          <YAxis hide />
          <Tooltip contentStyle={{ background: "hsl(var(--card-elevated))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }} />
          <Area type="monotone" dataKey="a" stroke="hsl(var(--chart-1))" strokeWidth={2}
            fill="url(#areaHatch)" dot={{ r: 3, fill: "hsl(var(--background))", stroke: "hsl(var(--chart-1))", strokeWidth: 2 }} />
          <Line type="monotone" dataKey="b" stroke="hsl(var(--muted-foreground))" strokeWidth={1.5}
            strokeDasharray="0" dot={{ r: 2, fill: "hsl(var(--muted-foreground))" }} />
        </AreaChart>
      </ResponsiveContainer>
      <span className="absolute top-1 left-1 text-[10px] text-muted-foreground">2025</span>
      <span className="absolute bottom-1 left-1 text-[10px] text-muted-foreground">2024</span>
    </div>

    <div className="mt-3 flex items-center gap-3">
      <div className="flex-1 h-1.5 rounded-full bg-secondary relative">
        <div className="absolute inset-y-0 left-0 w-2/3 rounded-full bg-gradient-primary" />
        <div className="absolute -top-1 left-2/3 w-3.5 h-3.5 rounded-full bg-foreground -translate-x-1/2 ring-2 ring-background" />
      </div>
      <span className="text-xs text-muted-foreground">15 Jun</span>
    </div>
  </section>
);

const Index = () => {
  return (
    <main className="min-h-screen p-4 md:p-6 flex gap-6">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <TopBar />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 auto-rows-min">
          <div className="lg:col-span-1 lg:row-span-2">
            <AIAssistant />
          </div>
          <div className="lg:col-span-2"><TotalSale /></div>
          <div className="lg:col-span-1 grid grid-rows-2 gap-6">
            <AgeDonut />
            <CreditRate />
          </div>
          <div className="lg:col-span-3"><RevenueTrend /></div>
        </div>
      </div>
    </main>
  );
};

export default Index;
