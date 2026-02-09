// Helper to record a visit
async function recordVisit() {
  try {
    // Get country code from a more accurate free geolocation API (ipinfo.io)
  const geo = await fetch('https://ipinfo.io/json?token=YOUR_IPINFO_TOKEN').then(r => r.json());
    console.log('Geo API response:', geo); // Log for debugging
    const country = geo.country || 'XX';
    const page = window.location.pathname;
    const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    await fetch('https://arti-analytics.onrender.com/api/visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ country, timestamp, page })
    });
  } catch (e) {
    // Ignore errors
  }
}
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Globe, Eye, TrendingUp, Clock, BarChart3 } from "lucide-react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';


// Fetch and aggregate real analytics data from backend with Basic Auth
const fetchAnalyticsData = async (username, password) => {
  const auth = 'Basic ' + btoa(`${username}:${password}`);
  const res = await fetch('https://arti-analytics.onrender.com/api/visits', {
    headers: { Authorization: auth }
  });
  if (res.status === 401) throw new Error('unauthorized');
  if (!res.ok) {
    const err = await res.text();
    throw new Error('Backend error: ' + err);
  }
  const visits = await res.json();

  // Country code to name mapping
  const countryNames = {
    XK: 'Kosovo',
    AL: 'Albania',
    AD: 'Andorra',
    AT: 'Austria',
    BY: 'Belarus',
    BE: 'Belgium',
    BA: 'Bosnia and Herzegovina',
    BG: 'Bulgaria',
    HR: 'Croatia',
    CY: 'Cyprus',
    CZ: 'Czechia',
    DK: 'Denmark',
    EE: 'Estonia',
    FI: 'Finland',
    FR: 'France',
    DE: 'Germany',
    GR: 'Greece',
    HU: 'Hungary',
    IS: 'Iceland',
    IE: 'Ireland',
    IT: 'Italy',
    LV: 'Latvia',
    LI: 'Liechtenstein',
    LT: 'Lithuania',
    LU: 'Luxembourg',
    MT: 'Malta',
    MD: 'Moldova',
    MC: 'Monaco',
    ME: 'Montenegro',
    NL: 'Netherlands',
    MK: 'North Macedonia',
    NO: 'Norway',
    PL: 'Poland',
    PT: 'Portugal',
    RO: 'Romania',
    RU: 'Russia',
    SM: 'San Marino',
    RS: 'Serbia',
    SK: 'Slovakia',
    SI: 'Slovenia',
    ES: 'Spain',
    SE: 'Sweden',
    CH: 'Switzerland',
    TR: 'Turkey',
    UA: 'Ukraine',
    GB: 'United Kingdom',
    VA: 'Vatican City',
    CN: 'China',
    IN: 'India',
    JP: 'Japan',
    KR: 'South Korea',
    MX: 'Mexico',
    US: 'United States',
    CA: 'Canada',
    AU: 'Australia',
    // fallback
    XX: 'Unknown',
  };
  // Aggregate by country
  const countryMap = {};
  visits.forEach(v => {
    const code = v.country || 'XX';
    const name = countryNames[code] || code;
    if (!countryMap[code]) countryMap[code] = { name, visits: 0, code };
    countryMap[code].visits += 1;
  });
  let countries = Object.values(countryMap);
  const totalVisits = visits.length;
  countries = countries.map(c => ({ ...c, percentage: ((c.visits / totalVisits) * 100).toFixed(1) }));
  countries.sort((a, b) => b.visits - a.visits);

  // Hourly data (last 24h)
  const now = new Date();
  const hourlyData = Array.from({ length: 24 }, (_, i) => {
    const hour = (now.getHours() - (23 - i) + 24) % 24;
    const label = `${hour.toString().padStart(2, '0')}:00`;
    const count = visits.filter(v => {
      const d = new Date(v.timestamp);
      return d.getHours() === hour && (now - d) < 24 * 60 * 60 * 1000;
    }).length;
    return { hour, visits: count, label };
  });

  // Weekly data (last 7 days)
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const weeklyData = Array.from({ length: 7 }, (_, i) => {
    const dayIdx = (now.getDay() - (6 - i) + 7) % 7;
    const day = days[dayIdx];
    const count = visits.filter(v => {
      const d = new Date(v.timestamp);
      return d.getDay() === dayIdx && (now - d) < 7 * 24 * 60 * 60 * 1000;
    }).length;
    return { day, visits: count, uniqueVisitors: count };
  });

  // Monthly data (last 30 days)
  const monthlyData = Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    const date = new Date(now.getTime() - (29 - i) * 24 * 60 * 60 * 1000);
    const count = visits.filter(v => {
      const d = new Date(v.timestamp);
      return d.toDateString() === date.toDateString();
    }).length;
    return { day, visits: count, pageViews: count };
  });

  return { countries, hourlyData, weeklyData, monthlyData };
};

const timePeriods = [
  { id: 'hour', label: 'Past Hour', duration: '1h' },
  { id: 'day', label: 'Past Day', duration: '24h' },
  { id: 'week', label: 'Past Week', duration: '7d' },
  { id: 'month', label: 'Past Month', duration: '30d' },
  { id: 'year', label: 'Past Year', duration: '1y' },
  { id: 'all', label: 'All Time', duration: '∞' }
];

const COLORS = ['#7C3AED', '#D32F2F', '#F44336', '#EF5350', '#FFCDD2', '#FFEBEE', '#FAFAFA', '#E0E0E0'];


export default function AnalyticsDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [data, setData] = useState({ countries: [], hourlyData: [], weeklyData: [], monthlyData: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [auth, setAuth] = useState(() => {
    const saved = localStorage.getItem('analyticsAuth');
    return saved ? JSON.parse(saved) : null;
  });
  const [error, setError] = useState(null);

  // Record visit on first mount only (does not require auth)
  useEffect(() => {
    recordVisit();
    // eslint-disable-next-line
  }, []);

  // Fetch real data when period changes or on mount
  useEffect(() => {
    if (!auth) return;
    setIsLoading(true);
    fetchAnalyticsData(auth.username, auth.password)
      .then(d => {
        setData(d);
        setIsLoading(false);
        setError(null);
      })
      .catch(e => {
        if (e.message === 'unauthorized') {
          setAuth(null);
          localStorage.removeItem('analyticsAuth');
        } else {
          setError(e.message);
        }
        setIsLoading(false);
      });
  }, [selectedPeriod, auth]);

  // Calculate total stats
  const totalVisits = data.countries.reduce((sum, country) => sum + country.visits, 0);
  const totalCountries = data.countries.length - 1; // Exclude "Others"
  const avgVisitsPerDay = Math.floor(totalVisits / 7);
  const growthRate = 12.5; // Mock growth rate


  if (!auth) {
    return <AnalyticsLogin onLogin={setAuth} error={error} />;
  }

  // Log out handler
  function handleLogout() {
    setAuth(null);
    localStorage.removeItem('analyticsAuth');
  }

  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <Lines />
      {/* Log out button top right */}
      <div className="absolute top-6 right-8 z-50">
        <button
          onClick={handleLogout}
          className="bg-[#7C3AED] text-white px-4 py-2 rounded shadow hover:bg-[#D32F2F] font-bold transition"
        >
          Log Out
        </button>
      </div>
      <div className="relative mx-auto max-w-7xl px-6 py-12">
        {/* Container boundary lines */}
        <div className="pointer-events-none absolute inset-0">
          <AnimatedLineSide side="left" className="top-0 h-full w-px bg-white/10" />
          <AnimatedLineSide side="right" className="top-0 h-full w-px bg-white/10" />
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-8 h-8 text-[#7C3AED]" />
            <h1 className="text-[clamp(2rem,5vw,3rem)] font-extrabold uppercase tracking-[-0.02em] text-[#e7e6e3]">
              Analytics
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xl">*</span>
            <AnimatedLineHorizontal className="h-px flex-1 bg-white/10" delay={400} />
            <span className="text-[10px] uppercase tracking-widest text-[#7C3AED]">Portfolio Statistics</span>
          </div>
        </motion.div>

        {/* Time Period Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2">
            {timePeriods.map((period, index) => (
              <motion.div
                key={period.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.05, ease: "easeOut" }}
              >
                <button
                  onClick={() => setSelectedPeriod(period.id)}
                  className={`
                    inline-flex items-center px-4 py-2.5 font-medium border border-[#7C3AED] 
                    transition-all duration-300 ease-out hover:scale-105 focus:scale-105 focus:outline-none 
                    focus:ring-2 focus:ring-[#7C3AED] focus:ring-offset-2 ring-offset-black 
                    relative overflow-hidden group
                    ${selectedPeriod === period.id 
                      ? 'bg-[#7C3AED] text-white' 
                      : 'bg-transparent text-[#7C3AED] hover:bg-black hover:text-white'
                    }
                  `}
                  style={{ borderRadius: 0 }}
                >
                  <Clock className="w-4 h-4 mr-2" />
                  {period.label}
                  <span className="ml-2 text-[10px] px-2 py-1 bg-white/10 text-white uppercase tracking-wider">
                    {period.duration}
                  </span>
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <StatsCard
            icon={<Eye className="w-6 h-6" />}
            title="Total Visits"
            value={totalVisits.toLocaleString()}
            change={`+${growthRate}%`}
            delay={0.2}
          />
          <StatsCard
            icon={<Globe className="w-6 h-6" />}
            title="Countries"
            value={totalCountries}
            change="+3 new"
            delay={0.25}
          />
          <StatsCard
            icon={<TrendingUp className="w-6 h-6" />}
            title="Daily Average"
            value={avgVisitsPerDay.toLocaleString()}
            change="+8.2%"
            delay={0.3}
          />
          <StatsCard
            icon={<BarChart3 className="w-6 h-6" />}
            title="Growth Rate"
            value={`${growthRate}%`}
            change="This month"
            delay={0.35}
          />
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Visits Over Time */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <ChartCard
              title="Visits Over Time"
              subtitle={`${selectedPeriod === 'week' ? 'Past 7 Days' : 'Hourly Breakdown'}`}
              isLoading={isLoading}
            >
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={selectedPeriod === 'week' ? data.weeklyData : data.hourlyData}>
                  <defs>
                    <linearGradient id="visitGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis 
                    dataKey={selectedPeriod === 'week' ? 'day' : 'label'} 
                    stroke="#zinc-400"
                    fontSize={12}
                  />
                  <YAxis stroke="#zinc-400" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#232324', 
                      border: '1px solid #333',
                      borderRadius: '6px',
                      color: '#fff',
                      boxShadow: '0 2px 12px 0 #0008'
                    }}
                    itemStyle={{ color: '#fff' }}
                    labelStyle={{ color: '#fff', fontWeight: 600 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="visits" 
                    stroke="#7C3AED" 
                    strokeWidth={2}
                    fill="url(#visitGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>
          </motion.div>

          {/* Countries Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          >
            <ChartCard
              title="Visitors by Country"
              subtitle="Geographic distribution"
              isLoading={isLoading}
            >
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data.countries}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="visits"
                    label={({ name, percentage }) => `${percentage}%`}
                    labelLine={false}
                  >
                    {data.countries.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#232324', 
                      border: '1px solid #333',
                      borderRadius: '6px',
                      color: '#fff',
                      boxShadow: '0 2px 12px 0 #0008'
                    }}
                    itemStyle={{ color: '#fff' }}
                    labelStyle={{ color: '#fff', fontWeight: 600 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
          </motion.div>

          {/* Country List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          >
            <ChartCard
              title="Top Countries"
              subtitle="Detailed breakdown"
              isLoading={isLoading}
            >
              <div className="space-y-4">
                {data.countries.slice(0, 6).map((country, index) => (
                  <motion.div
                    key={country.code}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.05, ease: "easeOut" }}
                    className="relative flex items-center justify-between p-3 bg-white/5 transition-all duration-300 border-l-2 border-[#7C3AED] group overflow-hidden"
                  >
                    <div className="relative z-10 flex items-center gap-3">
                      <div className="w-8 h-6 bg-zinc-700 flex items-center justify-center text-xs font-medium border border-zinc-600">
                        {country.code}
                      </div>
                      <span className="font-medium">{country.name}</span>
                    </div>
                    <div className="relative z-10 text-right">
                      <div className="font-semibold">{country.visits.toLocaleString()}</div>
                      <div className="text-sm text-zinc-400">{country.percentage}%</div>
                    </div>
                    <div className="absolute right-0 top-0 h-full w-0 transition-all duration-300"></div>
                  </motion.div>
                ))}
              </div>
            </ChartCard>
          </motion.div>

          {/* Performance Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
          >
            <ChartCard
              title="Performance Metrics"
              subtitle="Page views vs visits"
              isLoading={isLoading}
            >
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.monthlyData.slice(-7)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis 
                    dataKey="day" 
                    stroke="#zinc-400"
                    fontSize={12}
                  />
                  <YAxis stroke="#zinc-400" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#232324', 
                      border: '1px solid #333',
                      borderRadius: '6px',
                      color: '#fff',
                      boxShadow: '0 2px 12px 0 #0008'
                    }}
                    itemStyle={{ color: '#fff' }}
                    labelStyle={{ color: '#fff', fontWeight: 600 }}
                  />
                  <Bar dataKey="visits" fill="#7C3AED" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="pageViews" fill="#D32F2F" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Minimal login form for analytics auth
function AnalyticsLogin({ onLogin, error }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setLocalError(null);
    try {
      // Try to fetch with credentials
      await fetchAnalyticsData(username, password);
      localStorage.setItem('analyticsAuth', JSON.stringify({ username, password }));
      onLogin({ username, password });
    } catch (err) {
      setLocalError('Unauthorized: Invalid credentials');
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-zinc-100">
      <form onSubmit={handleSubmit} className="bg-white/5 p-8 rounded shadow-lg w-full max-w-xs flex flex-col gap-4 border border-white/10">
        <h2 className="text-xl font-bold mb-2 text-center">Analytics Login</h2>
        <input
          className="p-2 rounded bg-zinc-900 border border-zinc-700 text-zinc-100 focus:outline-none"
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          autoFocus
        />
        <input
          className="p-2 rounded bg-zinc-900 border border-zinc-700 text-zinc-100 focus:outline-none"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          className="bg-[#7C3AED] text-white font-bold py-2 rounded transition"
          type="submit"
          disabled={submitting}
        >
          {submitting ? 'Signing in...' : 'Sign In'}
        </button>
        {(localError || error) && <div className="text-red-400 text-sm text-center">{localError || error}</div>}
      </form>
    </div>
  );
}

function Lines() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <motion.div className="absolute left-2 right-2 top-2 bottom-[50px]">
        <motion.span
          className="absolute left-0 right-0 -bottom-12 h-px bg-white/10"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeInOut" }}
          style={{ transformOrigin: "left" }}
        />
      </motion.div>

      <motion.span
        className="absolute top-0 bottom-0 left-10 w-px bg-white/10"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 0.9, ease: "easeInOut" }}
        style={{ transformOrigin: "top" }}
      />
      
      <motion.span
        className="absolute top-0 bottom-0 right-10 w-px bg-white/10"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 1.6, ease: "easeInOut" }}
        style={{ transformOrigin: "top" }}
      />
    </div>
  );
}

function useStaggeredReveal(initial = false) {
  const [on, setOn] = useState(initial);
  const timer = useRef(null);
  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);
  const reveal = (delay = 0) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOn(true), delay);
  };
  return [on, reveal];
}

function AnimatedLineSide({ side = 'left', className = '' }) {
  const [visible, reveal] = useStaggeredReveal(false);
  useEffect(() => {
    reveal(side === 'left' ? 1400 : 1800);
  }, [side]);

  return (
    <motion.span 
      className={`${className} absolute ${side}-0`}
      initial={{ scaleY: 0 }}
      animate={{ scaleY: visible ? 1 : 0 }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
      style={{ transformOrigin: "top" }}
      aria-hidden 
    />
  );
}

function AnimatedLineHorizontal({ className = '', delay = 300 }) {
  return (
    <motion.div 
      className={className}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.45, delay: delay / 1000, ease: "easeInOut" }}
      style={{ transformOrigin: "left" }}
      aria-hidden 
    />
  );
}

function StatsCard({ icon, title, value, change, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#7C3AED] to-[#8B1515] opacity-20 blur transition duration-300"></div>
        <div className="relative p-6 bg-white/5 border border-white/10 transition-all duration-300 border-l-4 border-l-[#7C3AED] backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="text-[#7C3AED]">
              {icon}
            </div>
            <span className="px-2 py-1 bg-green-500/20 text-green-400 border-none text-xs uppercase tracking-wider">
              {change}
            </span>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-white">{value}</div>
            <div className="text-sm text-zinc-400 mt-1">{title}</div>
          </div>
          <div className="absolute top-0 right-0 w-0 h-full transition-all duration-300"></div>
        </div>
      </div>
    </motion.div>
  );
}

function ChartCard({ title, subtitle, children, isLoading }) {
  return (
    <div className="relative group">
      {/* Animated border effect */}
  <div className="absolute -inset-1 bg-gradient-to-r from-[#7C3AED] via-transparent to-[#7C3AED] opacity-0 transition duration-500"></div>
      
  <div className="relative p-6 bg-white/5 border border-white/10 transition-all duration-300 backdrop-blur-sm">
        {/* Grid lines overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-6 left-0 right-0 h-px bg-white/5"></div>
          <div className="absolute left-6 top-0 bottom-0 w-px bg-white/5"></div>
        </div>
        
        <div className="relative z-10">
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <span className="text-sm">*</span>
              <h3 className="text-lg font-semibold text-white uppercase tracking-wide">{title}</h3>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <div className="h-px flex-1 bg-white/10"></div>
              <p className="text-[10px] text-zinc-400 uppercase tracking-widest">{subtitle}</p>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex items-center justify-center h-[300px]">
              <div className="relative">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-white/20"></div>
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#7C3AED] absolute top-0 left-0"></div>
              </div>
            </div>
          ) : (
            <div className="relative">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}