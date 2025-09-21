import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Globe, Eye, TrendingUp, Clock, BarChart3 } from "lucide-react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Mock data - in production this would come from your analytics backend
const generateMockData = () => {
  const countries = [
    { name: 'United States', visits: 1247, percentage: 31.2, code: 'US' },
    { name: 'Germany', visits: 892, percentage: 22.3, code: 'DE' },
    { name: 'United Kingdom', visits: 634, percentage: 15.8, code: 'GB' },
    { name: 'France', visits: 423, percentage: 10.6, code: 'FR' },
    { name: 'Canada', visits: 321, percentage: 8.0, code: 'CA' },
    { name: 'Netherlands', visits: 245, percentage: 6.1, code: 'NL' },
    { name: 'Australia', visits: 167, percentage: 4.2, code: 'AU' },
    { name: 'Others', visits: 71, percentage: 1.8, code: 'XX' }
  ];

  const hourlyData = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    visits: Math.floor(Math.random() * 50) + 10,
    label: `${i.toString().padStart(2, '0')}:00`
  }));

  const weeklyData = Array.from({ length: 7 }, (_, i) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    visits: Math.floor(Math.random() * 200) + 50,
    uniqueVisitors: Math.floor(Math.random() * 150) + 30
  }));

  const monthlyData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    visits: Math.floor(Math.random() * 100) + 20,
    pageViews: Math.floor(Math.random() * 150) + 40
  }));

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

const COLORS = ['#B71C1C', '#D32F2F', '#F44336', '#EF5350', '#FFCDD2', '#FFEBEE', '#FAFAFA', '#E0E0E0'];

export default function AnalyticsDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [data, setData] = useState(generateMockData());
  const [isLoading, setIsLoading] = useState(false);

  // Simulate data loading when period changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setData(generateMockData());
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [selectedPeriod]);

  // Calculate total stats
  const totalVisits = data.countries.reduce((sum, country) => sum + country.visits, 0);
  const totalCountries = data.countries.length - 1; // Exclude "Others"
  const avgVisitsPerDay = Math.floor(totalVisits / 7);
  const growthRate = 12.5; // Mock growth rate

  return (
    <div className="min-h-screen bg-[#18191A] text-zinc-100">
      <Lines />
      
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
            <BarChart3 className="w-8 h-8 text-[#B71C1C]" />
            <h1 className="text-[clamp(2rem,5vw,3rem)] font-extrabold uppercase tracking-[-0.02em] text-[#e7e6e3]">
              Analytics
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xl">*</span>
            <AnimatedLineHorizontal className="h-px flex-1 bg-white/10" delay={400} />
            <span className="text-[10px] uppercase tracking-widest text-[#B71C1C]">Portfolio Statistics</span>
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
                    inline-flex items-center px-4 py-2.5 font-medium border border-[#B71C1C] 
                    transition-all duration-300 ease-out hover:scale-105 focus:scale-105 focus:outline-none 
                    focus:ring-2 focus:ring-[#B71C1C] focus:ring-offset-2 ring-offset-[#18191A] 
                    relative overflow-hidden group
                    ${selectedPeriod === period.id 
                      ? 'bg-[#B71C1C] text-white hover:bg-[#8B1515]' 
                      : 'bg-transparent text-[#B71C1C] hover:bg-black hover:text-white'
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
                      <stop offset="5%" stopColor="#B71C1C" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#B71C1C" stopOpacity={0}/>
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
                      backgroundColor: '#18191A', 
                      border: '1px solid #B71C1C',
                      borderRadius: '0px',
                      color: '#zinc-100'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="visits" 
                    stroke="#B71C1C" 
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
                      backgroundColor: '#18191A', 
                      border: '1px solid #B71C1C',
                      borderRadius: '0px',
                      color: '#zinc-100'
                    }} 
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
                    className="relative flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 transition-all duration-300 border-l-2 border-[#B71C1C] group overflow-hidden"
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
                    <div className="absolute right-0 top-0 h-full w-0 bg-[#B71C1C]/10 transition-all duration-300 group-hover:w-full"></div>
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
                      backgroundColor: '#18191A', 
                      border: '1px solid #B71C1C',
                      borderRadius: '0px',
                      color: '#zinc-100'
                    }} 
                  />
                  <Bar dataKey="visits" fill="#B71C1C" radius={[2, 2, 0, 0]} />
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
        <div className="absolute -inset-1 bg-gradient-to-r from-[#B71C1C] to-[#8B1515] opacity-20 blur group-hover:opacity-30 transition duration-300"></div>
        <div className="relative p-6 bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 border-l-4 border-l-[#B71C1C] backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="text-[#B71C1C]">
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
          <div className="absolute top-0 right-0 w-0 h-full bg-[#B71C1C]/10 transition-all duration-300 group-hover:w-full"></div>
        </div>
      </div>
    </motion.div>
  );
}

function ChartCard({ title, subtitle, children, isLoading }) {
  return (
    <div className="relative group">
      {/* Animated border effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#B71C1C] via-transparent to-[#B71C1C] opacity-0 group-hover:opacity-20 transition duration-500"></div>
      
      <div className="relative p-6 bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
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
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#B71C1C] absolute top-0 left-0"></div>
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