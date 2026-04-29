import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
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

/* ---------------- mock data ---------------- */
const salesData = [
  { m: "Feb", v: 42 }, { m: "Mar", v: 58 }, { m: "Apr", v: 64 },
  { m: "May", v: 51 }, { m: "Jun", v: 96 }, { m: "Jul", v: 72 },
  { m: "Aug", v: 68 },
];
const revenueData = Array.from({ length: 28 }, (_, i) => ({
  x: i,
  a: 30 + Math.sin(i / 2.4) * 14 + i * 1.4,
  b: 22 + Math.cos(i / 3) * 9 + i * 1.0,
}));
const ageData = [
  { name: "0-18",  value: 22, fill: "hsl(var(--chart-2))" },
  { name: "18-24", value: 38, fill: "hsl(var(--chart-3))" },
  { name: "24-36", value: 40, fill: "hsl(var(--chart-1))" },
];
const creditData = [{ name: "score", value: 80, fill: "url(#creditGrad)" }];
const sparkA = Array.from({ length: 20 }, (_, i) => ({ x: i, y: 30 + Math.sin(i / 2) * 10 + i }));
const sparkB = Array.from({ length: 20 }, (_, i) => ({ x: i, y: 60 - Math.cos(i / 2) * 8 - i * 0.6 }));
const sparkC = Array.from({ length: 20 }, (_, i) => ({ x: i, y: 20 + Math.sin(i / 1.5) * 6 + i * 0.8 }));

const navItems = [
  { icon: LayoutGrid, label: "Overview", active: true },
  { icon: TrendingUp, label: "Analytics" },
  { icon: ShoppingBag, label: "Products" },
  { icon: Users, label: "Customers" },
  { icon: Calendar, label: "Calendar" },
  { icon: Settings, label: "Settings" },
];

/* ---------------- primitives ---------------- */
const ease = [0.22, 1, 0.36, 1] as const;

const Reveal = ({ children, delay = 0, className = "" }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, ease, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const Counter = ({ to, prefix = "", suffix = "", decimals = 0 }: { to: number; prefix?: string; suffix?: string; decimals?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 18 });
  const text = useTransform(spring, (v) => `${prefix}${v.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`);
  useEffect(() => { if (inView) mv.set(to); }, [inView, to, mv]);
  return <motion.span ref={ref}>{text}</motion.span>;
};

const Card = ({ children, className = "", delay = 0, glow = false }: any) => (
  <motion.section
    initial={{ opacity: 0, y: 20, scale: 0.985 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.7, ease, delay }}
    whileHover={{ y: -3 }}
    className={`glass-card group relative ${glow ? "hover:shadow-glow" : ""} ${className}`}
  >
    {/* subtle grid texture overlay */}
    <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none mix-blend-screen" aria-hidden>
      <defs>
        <pattern id={`p-${Math.random()}`} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </pattern>
      </defs>
    </svg>
    {/* hover sheen */}
    <span className="absolute -inset-px rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      style={{ background: "radial-gradient(600px circle at var(--mx,50%) var(--my,50%), hsl(var(--primary)/0.10), transparent 40%)" }} />
    {children}
  </motion.section>
);

/* ---------------- sidebar ---------------- */
const Sidebar = () => (
  <motion.aside
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.7, ease }}
    className="hidden md:flex flex-col items-center gap-5 py-6 px-3 glass-card w-[78px] shrink-0 self-start sticky top-5"
  >
    <motion.div
      whileHover={{ rotate: 12, scale: 1.06 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="w-11 h-11 rounded-2xl bg-gradient-primary grid place-items-center shadow-soft ring-soft"
    >
      <Sparkles className="w-5 h-5 text-primary-foreground" />
    </motion.div>
    <div className="w-8 h-px bg-border/80" />
    <nav className="flex flex-col gap-2">
      {navItems.map((Item, i) => (
        <motion.button
          key={i}
          aria-label={Item.label}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className={`group/n relative w-11 h-11 rounded-2xl grid place-items-center transition-colors ${
            Item.active ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
          }`}
        >
          {Item.active && (
            <motion.span
              layoutId="navActive"
              className="absolute -left-[14px] top-1/2 -translate-y-1/2 h-6 w-[3px] rounded-r-full bg-gradient-primary"
            />
          )}
          <Item.icon className="w-[18px] h-[18px]" />
        </motion.button>
      ))}
    </nav>
    <div className="mt-auto flex flex-col items-center gap-3">
      <div className="w-8 h-px bg-border/80" />
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        aria-label="logout"
        className="w-11 h-11 rounded-2xl grid place-items-center text-muted-foreground hover:text-foreground"
      >
        <LogOut className="w-[18px] h-[18px]" />
      </motion.button>
    </div>
  </motion.aside>
);

/* ---------------- topbar ---------------- */
const TopBar = () => (
  <header className="flex items-center justify-between mb-7 gap-4 flex-wrap">
    <Reveal>
      <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-2">
        <span className="relative flex w-2 h-2">
          <span className="absolute inset-0 rounded-full bg-success animate-ping opacity-75" />
          <span className="relative w-2 h-2 rounded-full bg-success" />
        </span>
        Live · Q3 2025
      </div>
      <h1 className="text-[28px] md:text-[36px] leading-[1.05] font-display font-semibold tracking-tight">
        Product Sales <span className="text-gradient">Intelligence</span>
      </h1>
    </Reveal>

    <Reveal delay={0.1}>
      <div className="flex items-center gap-3">
        <div className="hidden lg:flex items-center gap-2 glass-card px-4 h-11 rounded-full text-xs text-muted-foreground">
          <Search className="w-4 h-4" />
          <span>Search anything</span>
          <span className="ml-2 px-1.5 py-0.5 rounded-md border border-border/80 font-mono text-[10px] flex items-center gap-1">
            <Command className="w-3 h-3" /> K
          </span>
        </div>
        {[CalendarDays, MessageSquare, Bell].map((Icon, i) => (
          <motion.button
            key={i}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="action"
            className="relative w-11 h-11 rounded-full glass-card grid place-items-center text-muted-foreground hover:text-foreground"
          >
            <Icon className="w-[16px] h-[16px]" />
            {Icon === Bell && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gradient-primary ring-2 ring-background" />
            )}
          </motion.button>
        ))}
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-primary blur-md opacity-50 animate-pulse-glow" />
          <div className="relative w-11 h-11 rounded-full bg-gradient-violet grid place-items-center text-sm font-semibold text-primary-foreground ring-1 ring-white/20">
            MA
          </div>
        </div>
      </div>
    </Reveal>
  </header>
);

/* ---------------- KPI ---------------- */
const KpiCard = ({
  icon: Icon, label, value, raw, prefix, suffix, delta, positive, spark, color, delay,
}: any) => (
  <Card delay={delay} className="p-5">
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-3">
        <motion.div
          whileHover={{ rotate: 8 }}
          className="w-10 h-10 rounded-2xl bg-secondary grid place-items-center text-muted-foreground"
        >
          <Icon className="w-[16px] h-[16px]" />
        </motion.div>
        <div>
          <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
          <p className="text-[26px] font-display font-semibold tracking-tight leading-none mt-1.5">
            <Counter to={raw} prefix={prefix} suffix={suffix} decimals={value.includes(".") ? 2 : 0} />
          </p>
        </div>
      </div>
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: delay + 0.4, duration: 0.5, ease }}
        className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-full ${
          positive ? "bg-success/15 text-[hsl(var(--success))]" : "bg-destructive/15 text-[hsl(var(--destructive))]"
        }`}
      >
        {positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {delta}
      </motion.span>
    </div>
    <div className="h-14 -mx-1 mt-3">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={spark} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`spark-${label}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.5} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="y"
            stroke={color}
            strokeWidth={2}
            fill={`url(#spark-${label})`}
            isAnimationActive
            animationDuration={1400}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </Card>
);

/* ---------------- AI Assistant ---------------- */
const AIAssistant = ({ delay = 0 }: { delay?: number }) => (
  <Card delay={delay} className="p-7 flex flex-col h-full min-h-[520px]">
    {/* aurora */}
    <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-primary/25 blur-[100px] pointer-events-none" />
    <div className="absolute -bottom-32 -right-20 w-80 h-80 rounded-full bg-accent/20 blur-[100px] pointer-events-none" />

    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="relative flex w-2 h-2">
          <span className="absolute inset-0 rounded-full bg-success animate-ping opacity-75" />
          <span className="relative w-2 h-2 rounded-full bg-success" />
        </span>
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">AI · Online</span>
      </div>
      <span className="text-[11px] font-mono text-muted-foreground">v4.2</span>
    </div>

    <h2 className="text-2xl font-display font-semibold mt-3">Assistant</h2>

    <div className="relative my-5 flex-1 grid place-items-center min-h-[240px]">
      {/* concentric rings */}
      {[1, 2, 3].map((r) => (
        <motion.div
          key={r}
          className="absolute rounded-full border border-white/5"
          style={{ width: 180 + r * 36, height: 180 + r * 36 }}
          animate={{ rotate: r % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 30 + r * 8, repeat: Infinity, ease: "linear" }}
        />
      ))}
      {/* glow */}
      <div className="absolute w-60 h-60 rounded-full bg-primary/25 blur-3xl animate-pulse-glow" />
      {/* conic sweep */}
      <motion.div
        className="absolute w-56 h-56 rounded-full"
        style={{ background: "conic-gradient(from 0deg, transparent 0deg, hsl(var(--primary)/0.45) 60deg, transparent 120deg)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      {/* orb */}
      <motion.div
        animate={{ y: [0, -10, 0], scale: [1, 1.03, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-44 h-44 rounded-full overflow-hidden ring-1 ring-white/10 shadow-[0_0_60px_hsl(var(--primary)/0.5)]"
      >
        <img src={aiOrb} alt="AI assistant" width={1024} height={1024} className="w-full h-full object-cover scale-110" />
      </motion.div>
      {/* particles */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/80"
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{
            x: Math.cos((i / 6) * Math.PI * 2) * 110,
            y: Math.sin((i / 6) * Math.PI * 2) * 110,
            opacity: [0, 1, 0],
          }}
          transition={{ duration: 3, delay: i * 0.4, repeat: Infinity, ease: "easeOut" }}
        />
      ))}
    </div>

    <p className="text-[15px] leading-relaxed text-muted-foreground">
      <span className="text-foreground font-medium">Analyze product sales</span> over the last year.
      Compare revenue, quality, sales and brand — instantly.
    </p>

    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="mt-5 group/btn relative overflow-hidden rounded-2xl bg-gradient-primary text-primary-foreground font-semibold py-3.5 shadow-soft"
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4" />
        Try it now
      </span>
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
    </motion.button>
  </Card>
);

/* ---------------- Total Sale ---------------- */
const TotalSale = ({ delay = 0 }: { delay?: number }) => {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <Card delay={delay} className="p-6 flex flex-col">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-secondary grid place-items-center text-muted-foreground">
            <BarChart3 className="w-[16px] h-[16px]" />
          </div>
          <div>
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">Total sale</p>
            <p className="text-[28px] font-display font-semibold tracking-tight leading-none mt-1.5">
              <Counter to={90744} />
            </p>
          </div>
        </div>
        <motion.button whileHover={{ scale: 1.08, rotate: 10 }} aria-label="open"
          className="w-9 h-9 rounded-full border border-border grid place-items-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition">
          <ArrowUpRight className="w-4 h-4" />
        </motion.button>
      </div>

      <div className="h-[260px] mt-5 -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={salesData} barSize={28} onMouseMove={(s: any) => setHover(s?.activeTooltipIndex ?? null)} onMouseLeave={() => setHover(null)}>
            <defs>
              <linearGradient id="barActive" x1="0" y1="0" x2="0" y2="1">
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
            <Bar dataKey="v" radius={[10, 10, 10, 10]} animationDuration={1200} animationEasing="ease-out">
              {salesData.map((d, i) => {
                const isPeak = i === 4;
                const isHover = hover === i;
                return (
                  <Cell
                    key={i}
                    fill={isHover ? "url(#barActive)" : isPeak ? "url(#hatch)" : "hsl(var(--secondary))"}
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground mt-3">
        <span>PEAK · JUN</span>
        <span className="text-[hsl(var(--success))]">▲ 96 units</span>
      </div>
    </Card>
  );
};

/* ---------------- Age Donut ---------------- */
const AgeDonut = ({ delay = 0 }: { delay?: number }) => (
  <Card delay={delay} className="p-5 flex flex-col">
    <div className="flex items-center justify-between mb-2">
      <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">Age groups</p>
      <span className="text-[10px] font-mono text-muted-foreground">100%</span>
    </div>
    <div className="flex-1 flex items-center gap-3 min-h-[140px]">
      <div className="w-[120px] h-[120px] shrink-0 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={ageData}
              dataKey="value"
              innerRadius={36}
              outerRadius={56}
              paddingAngle={4}
              stroke="none"
              cornerRadius={4}
              animationDuration={1200}
              animationEasing="ease-out"
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 grid place-items-center pointer-events-none">
          <div className="text-center">
            <p className="text-[9px] font-mono text-muted-foreground leading-none uppercase tracking-wider">Total</p>
            <p className="text-base font-display font-semibold leading-tight mt-0.5">
              <Counter to={12.4} suffix="k" decimals={1} />
            </p>
          </div>
        </div>
      </div>
      <ul className="flex-1 min-w-0 space-y-2 text-[11px]">
        {ageData.map((d, i) => (
          <motion.li
            key={d.name}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + 0.4 + i * 0.1, duration: 0.5, ease }}
            className="flex items-center justify-between gap-2 whitespace-nowrap"
          >
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: d.fill, boxShadow: `0 0 10px ${d.fill}` }} />
              <span className="text-muted-foreground">{d.name}</span>
            </span>
            <span className="font-mono text-foreground">{d.value}%</span>
          </motion.li>
        ))}
      </ul>
    </div>
  </Card>
);

/* ---------------- Credit ---------------- */
const CreditRate = ({ delay = 0 }: { delay?: number }) => (
  <Card delay={delay} className="p-5 flex flex-col">
    <div className="flex items-center justify-between">
      <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">Credit rate</p>
      <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground font-mono">Apr</span>
    </div>
    <div className="relative flex-1 grid place-items-center min-h-[160px]">
      <div className="w-full h-40">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart innerRadius="78%" outerRadius="100%" data={creditData}
            startAngle={210} endAngle={-30}>
            <defs>
              <linearGradient id="creditGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="hsl(var(--chart-2))" />
                <stop offset="100%" stopColor="hsl(var(--chart-1))" />
              </linearGradient>
            </defs>
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar
              dataKey="value"
              cornerRadius={20}
              background={{ fill: "hsl(var(--secondary))" }}
              animationDuration={1400}
              animationEasing="ease-out"
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-3">
        <p className="text-[34px] font-display font-semibold leading-none">
          <Counter to={803} />
        </p>
        <p className="text-[10px] font-mono text-[hsl(var(--success))] mt-1.5 tracking-[0.2em]">EXCELLENT</p>
      </div>
    </div>
  </Card>
);

/* ---------------- Revenue Trend ---------------- */
const RevenueTrend = ({ delay = 0 }: { delay?: number }) => {
  const [range, setRange] = useState("1M");
  return (
    <Card delay={delay} className="p-6 flex flex-col">
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
        <div className="flex items-center gap-1 p-1 rounded-full bg-secondary/60">
          {["1D", "1W", "1M", "1Y"].map((t) => (
            <button
              key={t}
              onClick={() => setRange(t)}
              className="relative text-[11px] font-mono px-3 h-7 rounded-full transition-colors"
            >
              {range === t && (
                <motion.span
                  layoutId="rangePill"
                  className="absolute inset-0 rounded-full bg-gradient-primary"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className={`relative ${range === t ? "text-primary-foreground" : "text-muted-foreground"}`}>{t}</span>
            </button>
          ))}
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

      <div className="h-[280px] mt-4 relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueData} margin={{ top: 12, right: 12, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity={0.6} />
                <stop offset="100%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
              </linearGradient>
              <pattern id="areaHatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="8" stroke="hsl(var(--chart-1))" strokeWidth="2" strokeOpacity="0.4" />
              </pattern>
            </defs>
            <XAxis dataKey="x" hide />
            <YAxis hide />
            <Tooltip contentStyle={{ background: "hsl(var(--card-elevated))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }} />
            <Area type="monotone" dataKey="a" stroke="hsl(var(--chart-1))" strokeWidth={2.4}
              fill="url(#areaGrad)" animationDuration={1600} animationEasing="ease-out" />
            <Area type="monotone" dataKey="a" stroke="transparent" fill="url(#areaHatch)" animationDuration={1600} />
            <Line type="monotone" dataKey="b" stroke="hsl(var(--muted-foreground))" strokeWidth={1.4}
              dot={false} strokeDasharray="4 4" animationDuration={1600} />
          </AreaChart>
        </ResponsiveContainer>
        <span className="absolute top-1 left-1 text-[10px] font-mono text-muted-foreground">2025</span>
        <span className="absolute bottom-1 left-1 text-[10px] font-mono text-muted-foreground">2024</span>
      </div>

      <div className="mt-5 flex items-center gap-4">
        <span className="text-[10px] font-mono text-muted-foreground">JAN</span>
        <div className="flex-1 h-1.5 rounded-full bg-secondary relative">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "66%" }}
            transition={{ duration: 1.4, ease, delay: delay + 0.4 }}
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-primary"
          />
          <motion.div
            initial={{ left: "0%", opacity: 0 }}
            animate={{ left: "66%", opacity: 1 }}
            transition={{ duration: 1.4, ease, delay: delay + 0.4 }}
            className="absolute -top-1.5 -translate-x-1/2 flex flex-col items-center"
          >
            <div className="w-4 h-4 rounded-full bg-foreground ring-4 ring-background shadow-[0_0_0_1px_hsl(var(--primary))]" />
            <span className="mt-1 text-[10px] font-mono text-foreground bg-secondary px-1.5 py-0.5 rounded">15 Jun</span>
          </motion.div>
        </div>
        <span className="text-[10px] font-mono text-muted-foreground">DEC</span>
      </div>
    </Card>
  );
};

/* ---------------- page ---------------- */
const Index = () => {
  // pointer tracking on cards for sheen
  useEffect(() => {
    const handler = (e: PointerEvent) => {
      document.querySelectorAll<HTMLElement>(".glass-card").forEach((el) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    };
    window.addEventListener("pointermove", handler);
    return () => window.removeEventListener("pointermove", handler);
  }, []);

  return (
    <main className="min-h-screen p-3 md:p-5 flex gap-5">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <TopBar />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
          <KpiCard delay={0.05} icon={Wallet} label="Revenue" value="284200" raw={284200} prefix="$" suffix="" delta="12.4%" positive spark={sparkA} color="hsl(252, 95%, 68%)" />
          <KpiCard delay={0.15} icon={Users} label="Customers" value="9481" raw={9481} prefix="" suffix="" delta="3.1%" positive spark={sparkC} color="hsl(190, 90%, 60%)" />
          <KpiCard delay={0.25} icon={ShoppingBag} label="Avg. Order" value="128.40" raw={128.4} prefix="$" suffix="" delta="2.8%" positive={false} spark={sparkB} color="hsl(320, 85%, 70%)" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 auto-rows-min">
          <div className="lg:col-span-4 lg:row-span-2">
            <AIAssistant delay={0.3} />
          </div>
          <div className="lg:col-span-5">
            <TotalSale delay={0.35} />
          </div>
          <div className="lg:col-span-3 grid grid-rows-2 gap-5">
            <AgeDonut delay={0.4} />
            <CreditRate delay={0.45} />
          </div>
          <div className="lg:col-span-8">
            <RevenueTrend delay={0.5} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Index;
