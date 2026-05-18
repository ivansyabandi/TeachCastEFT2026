import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Ticket, 
  ChevronRight, 
  ArrowLeft, 
  LayoutDashboard, 
  Search, 
  Plus, 
  CheckCircle2, 
  AlertCircle, 
  Info,
  ChevronDown,
  Monitor,
  Clock,
  User,
  Hash,
  ShieldCheck,
  Lock,
  Unlock,
  Users
} from 'lucide-react';
import { ref, onValue, push, set, get, query, orderByChild } from 'firebase/database';
import { db } from './firebase';

// Constants from original code
const ALL_CODES = [
  "EFT-A1B2-C3D4","EFT-E5F6-G7H8","EFT-I9J0-K1L2","EFT-M3N4-O5P6","EFT-Q7R8-S9T0",
  "EFT-U1V2-W3X4","EFT-Y5Z6-A7B8","EFT-C9D0-E1F2","EFT-G3H4-I5J6","EFT-K7L8-M9N0",
  "EFT-O1P2-Q3R4","EFT-S5T6-U7V8","EFT-W9X0-Y1Z2","EFT-A3B4-C5D6","EFT-E7F8-G9H0",
  "EFT-I1J2-K3L4","EFT-M5N6-O7P8","EFT-Q9R0-S1T2","EFT-U3V4-W5X6","EFT-Y7Z8-A9B0",
  "EFT-C1D2-E3F4","EFT-G5H6-I7J8","EFT-K9L0-M1N2","EFT-O3P4-Q5R6","EFT-S7T8-U9V0",
  "EFT-W1X2-Y3Z4","EFT-A5B6-C7D8","EFT-E9F0-G1H2","EFT-I3J4-K5L6","EFT-M7N8-O9P0",
  "EFT-Q1R2-S3T4","EFT-U5V6-W7X8","EFT-Y9Z0-A1B2","EFT-C3D4-E5F6","EFT-G7H8-I9J0",
  "EFT-K1L2-M3N4","EFT-O5P6-Q7R8","EFT-S9T0-U1V2","EFT-W3X4-Y5Z6","EFT-A7B8-C9D0",
  "EFT-E1F2-G3H4","EFT-I5J6-K7L8","EFT-M9N0-O1P2","EFT-Q3R4-S5T6","EFT-U7V8-W9X0",
  "EFT-Y1Z2-A3B4","EFT-C5D6-E7F8","EFT-G9H0-I1J2","EFT-K3L4-M5N6","EFT-O7P8-Q9R0"
];
const ADMIN_PW = "#AdminEFT2026";
const CAMPUSES = [
  "Universitas Gadjah Mada",
  "Universitas Indonesia",
  "Universitas Brawijaya",
  "Universitas Diponegoro",
  "Universitas Islam Negeri Sunan Kalijaga",
  "Lainnya"
];

// Helper functions
const nameKey = (n: string) => n.toLowerCase().replace(/\s+/g, ' ').trim().replace(/[.#$\[\]]/g, '_');
const initials = (name: string) => name.split(' ').slice(0, 2).map(w => w[0]?.toUpperCase() || '').join('');

type Page = 'home' | 'redeem' | 'leaderboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  return (
    <div className="min-h-screen bg-[#FDFCF9] text-slate-900 font-sans selection:bg-indigo-100 italic-selection:text-indigo-600">
      <AnimatePresence mode="wait">
        {currentPage === 'home' && <Home key="home" onNavigate={setCurrentPage} />}
        {currentPage === 'redeem' && <Redeem key="redeem" onNavigate={setCurrentPage} />}
        {currentPage === 'leaderboard' && <Leaderboard key="leaderboard" onNavigate={setCurrentPage} />}
      </AnimatePresence>
    </div>
  );
}

// --- Home Page ---
function Home({ onNavigate }: { onNavigate: (p: Page) => void, key?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden"
    >
      {/* Background Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-50 rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-amber-50 rounded-full blur-3xl opacity-60" />

      <div className="relative z-10 text-center max-w-2xl">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full shadow-sm mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500">Official Portal 2026</span>
        </motion.div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-slate-950 mb-6"
        >
          English <br/>
          <span className="text-indigo-600 italic font-serif">Fluency</span> <br/>
          Test
        </motion.h1>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-slate-500 font-light mb-12 max-w-sm mx-auto leading-relaxed"
        >
          Measure your English proficiency and compete with peers in the EFT 2026 challenge.
        </motion.p>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button 
            onClick={() => onNavigate('redeem')}
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-950 text-white rounded-2xl font-semibold shadow-xl shadow-slate-200 hover:bg-slate-900 active:scale-95 transition-all"
          >
            <Ticket className="w-5 h-5" />
            Redeem Code
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={() => onNavigate('leaderboard')}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-950 border border-slate-200 rounded-2xl font-semibold shadow-sm hover:border-indigo-200 hover:bg-indigo-50 transition-all active:scale-95"
          >
            <Trophy className="w-5 h-5 text-indigo-500" />
            Leaderboard
          </button>
        </motion.div>
      </div>

      <footer className="absolute bottom-8 text-center">
        <p className="text-[11px] font-medium text-slate-400 tracking-wider uppercase">
          Teach Cast <span className="mx-2 text-indigo-300">×</span> GIK UGM
        </p>
      </footer>
    </motion.div>
  );
}

// --- Redeem Page ---
function Redeem({ onNavigate }: { onNavigate: (p: Page) => void, key?: string }) {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ type: 'success' | 'error' | 'info'; title: string; code: string; msg: string } | null>(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [adminStats, setAdminStats] = useState({ total: 0, used: 0, left: 0 });
  const [logs, setLogs] = useState<any[]>([]);
  const [remainingCodes, setRemainingCodes] = useState<string[]>([]);
  const [pwError, setPwError] = useState(false);

  const handleRedeem = async () => {
    if (!name.trim()) {
      setResult({ type: 'error', title: 'Name Required', code: '', msg: 'Please enter your full name first.' });
      return;
    }

    setIsLoading(true);
    const key = nameKey(name);
    
    try {
      const claimedSnap = await get(ref(db, `claimed/${key}`));
      if (claimedSnap.exists()) {
        setResult({ 
          type: 'info', 
          title: 'Already Redeemed', 
          code: claimedSnap.val().code, 
          msg: 'You have already redeemed a code. Here it is above.' 
        });
        setIsLoading(false);
        return;
      }

      const usedSnap = await get(ref(db, 'used'));
      const usedList = usedSnap.exists() ? Object.values(usedSnap.val() as Record<string, string>) : [];
      const available = ALL_CODES.filter(c => !usedList.includes(c));

      if (available.length === 0) {
        setResult({ type: 'error', title: 'Out of Codes', code: '', msg: 'All codes have been used. Please contact the organizer.' });
        setIsLoading(false);
        return;
      }

      const code = available[0];
      const now = new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' });

      await set(ref(db, `claimed/${key}`), { code, time: now });
      await push(ref(db, 'used'), code);
      await push(ref(db, 'log'), { name, code, time: now });

      setResult({ 
        type: 'success', 
        title: 'Success!', 
        code, 
        msg: 'Keep this code safe. Use it to access the English Fluency Test.' 
      });
    } catch (err: any) {
      setResult({ type: 'error', title: 'Error', code: '', msg: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminUnlock = () => {
    if (adminPassword === ADMIN_PW) {
      setIsAdminUnlocked(true);
      setPwError(false);
      loadAdminData();
    } else {
      setPwError(true);
      setAdminPassword('');
    }
  };

  const loadAdminData = async () => {
    try {
      const [logSnap, usedSnap] = await Promise.all([
        get(ref(db, 'log')),
        get(ref(db, 'used'))
      ]);

      const logData = logSnap.exists() ? Object.values(logSnap.val()).reverse() : [];
      const usedData = usedSnap.exists() ? Object.values(usedSnap.val() as Record<string, string>) : [];
      const remaining = ALL_CODES.filter(c => !usedData.includes(c));

      setLogs(logData);
      setRemainingCodes(remaining);
      setAdminStats({
        total: ALL_CODES.length,
        used: usedData.length,
        left: remaining.length
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-slate-50"
    >
      <nav className="sticky top-0 bg-white/80 backdrop-blur-lg border-b border-slate-200 z-50">
        <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => onNavigate('home')} className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">EFT</div>
            <span className="font-semibold text-sm group-hover:text-indigo-600 transition-colors">Portal Home</span>
          </button>
          <button 
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>
      </nav>

      <div className="max-w-md mx-auto px-6 py-12">
        <header className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950 mb-2">Redeem Code</h2>
          <p className="text-sm text-slate-500">Enter your name to receive your unique EFT access voucher.</p>
        </header>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 mb-6">
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Andi Wijaya"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-11 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all text-sm"
                />
              </div>
            </div>

            <button 
              onClick={handleRedeem}
              disabled={isLoading}
              className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl hover:bg-indigo-700 active:scale-95 transition-all shadow-lg shadow-indigo-100 disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : 'Get My Code'}
            </button>

            <AnimatePresence>
              {result && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-6 rounded-2xl border ${
                    result.type === 'success' ? 'bg-emerald-50 border-emerald-100' : 
                    result.type === 'info' ? 'bg-indigo-50 border-indigo-100' :
                    'bg-rose-50 border-rose-100'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    {result.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> :
                     result.type === 'info' ? <Info className="w-5 h-5 text-indigo-600" /> :
                     <AlertCircle className="w-5 h-5 text-rose-600" />}
                    <h4 className={`text-sm font-bold ${
                      result.type === 'success' ? 'text-emerald-950' : 
                      result.type === 'info' ? 'text-indigo-950' :
                      'text-rose-950'
                    }`}>{result.title}</h4>
                  </div>
                  {result.code && (
                    <div className="bg-white/60 p-4 rounded-xl font-mono text-xl font-bold tracking-wider text-slate-950 mb-3 text-center border border-white">
                      {result.code}
                    </div>
                  )}
                  <p className="text-xs text-slate-600 leading-relaxed text-center italic">{result.msg}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="text-center">
          <button 
            onClick={() => setShowAdmin(!showAdmin)}
            className="text-[11px] font-semibold text-slate-400 hover:text-slate-600 transition-colors inline-flex items-center gap-1"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Admin Panel
          </button>
        </div>

        {showAdmin && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden"
          >
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-500">Security Gate</span>
              <button onClick={() => setShowAdmin(false)} className="text-slate-400 hover:text-slate-600 text-lg">×</button>
            </div>
            
            <div className="p-8">
              {!isAdminUnlocked ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Password</label>
                    <input 
                      type="password" 
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAdminUnlock()}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-500/10 focus:border-slate-400 transition-all"
                    />
                    {pwError && <p className="text-[10px] text-rose-500 font-bold mt-2">Incorrect credentials. Access denied.</p>}
                  </div>
                  <button onClick={handleAdminUnlock} className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-950 transition-all flex items-center justify-center gap-2">
                    <Lock className="w-4 h-4" /> Unlock
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Total', value: adminStats.total, color: 'text-slate-500' },
                      { label: 'Used', value: adminStats.used, color: 'text-indigo-600' },
                      { label: 'Left', value: adminStats.left, color: 'text-emerald-600' }
                    ].map(s => (
                      <div key={s.label} className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-100">
                        <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5" /> Recent Activity
                    </h5>
                    <div className="border border-slate-100 rounded-2xl overflow-hidden">
                      <table className="w-full text-[11px]">
                        <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-widest border-b border-slate-100">
                          <tr>
                            <td className="px-4 py-3">User</td>
                            <td className="px-4 py-3">Code</td>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {logs.slice(0, 10).map((l, i) => (
                            <tr key={i}>
                              <td className="px-4 py-3 font-semibold text-slate-700">{l.name}</td>
                              <td className="px-4 py-3 font-mono text-slate-400">{l.code}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <button 
                    onClick={() => { setIsAdminUnlocked(false); setAdminPassword(''); }}
                    className="w-full py-3 rounded-xl border border-rose-100 text-rose-500 font-bold text-xs hover:bg-rose-50 transition-colors"
                  >
                    Logout Admin
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// --- Leaderboard Page ---
function Leaderboard({ onNavigate }: { onNavigate: (p: Page) => void, key?: string }) {
  const [entries, setEntries] = useState<any[]>([]);
  const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', username: '', campus: '', email: '', score: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const scoresRef = ref(db, 'eft_scores');
    const unsub = onValue(scoresRef, (snap) => {
      const data: any[] = [];
      snap.forEach((child) => {
        data.push({ id: child.key, ...child.val() });
      });
      setEntries(data.sort((a, b) => b.score - a.score));
    });
    return () => unsub();
  }, []);

  const filteredData = filter === 'all' ? entries : entries.filter(e => e.campus === filter);
  const top3 = filteredData.slice(0, 3);
  const rest = filteredData.slice(3);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.campus || !formData.score) return;

    setIsSubmitting(true);
    try {
      await push(ref(db, 'eft_scores'), {
        ...formData,
        score: parseInt(formData.score, 10),
        createdAt: Date.now()
      });
      setIsModalOpen(false);
      setFormData({ name: '', username: '', campus: '', email: '', score: '' });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white"
    >
      <nav className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-slate-100 z-50">
        <div className="max-w-screen-xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full">
              <Trophy className="w-3.5 h-3.5 text-indigo-600" />
              <span className="text-[10px] font-bold text-indigo-700 tracking-wider uppercase">Live Leaderboard</span>
            </div>
            <h3 className="font-bold text-lg hidden md:block">EFT rankings 2026</h3>
          </div>
          <div className="flex items-center gap-3">
             <button 
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Score</span>
            </button>
            <button 
              onClick={() => onNavigate('home')}
              className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-screen-md mx-auto px-6 py-12">
        <header className="text-center mb-16">
          <motion.h2 
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
            className="text-5xl font-bold tracking-tight text-slate-950 mb-4"
          >
            Campus <span className="text-indigo-600 italic">Glory</span>
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 font-light"
          >
            The official ranking of the most fluent English speakers across top universities.
          </motion.p>
        </header>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
          <div className="relative group w-full sm:w-auto">
            <Monitor className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400 pointer-events-none" />
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="appearance-none w-full sm:w-64 bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-10 py-3 text-xs font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 cursor-pointer transition-all"
            >
              <option value="all">Global Ranking (All Campuses)</option>
              {CAMPUSES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
            <Users className="w-4 h-4" />
            <span>{filteredData.length} Total Contenders</span>
          </div>
        </div>

        {/* Podium */}
        <section className="mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-end justify-center">
            {/* 2nd Place */}
            {top3[1] && <PodiumCard entry={top3[1]} rank={2} medal="🥈" color="border-slate-200" />}
            {/* 1st Place */}
            {top3[0] && <PodiumCard entry={top3[0]} rank={1} medal="🥇" color="border-indigo-400" featured />}
            {/* 3rd Place */}
            {top3[2] && <PodiumCard entry={top3[2]} rank={3} medal="🥉" color="border-amber-200" />}
            
            {top3.length === 0 && (
              <div className="col-span-full py-20 text-center text-slate-400 border-2 border-dashed border-slate-100 rounded-3xl">
                Be the first to claim the throne.
              </div>
            )}
          </div>
        </section>

        {/* The Rest */}
        {rest.length > 0 && (
          <section>
            <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-100 pb-4">Top Challengers</h5>
            <div className="space-y-4">
              {rest.map((e, i) => (
                <div key={e.id} className="group flex items-center gap-6 p-5 bg-white border border-slate-100 rounded-2xl hover:border-indigo-100 hover:shadow-lg hover:shadow-indigo-50/50 transition-all">
                  <span className="w-8 shrink-0 font-mono text-xs font-bold text-slate-300">#{i + 4}</span>
                  <div className="w-12 h-12 shrink-0 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 group-hover:bg-indigo-50 group-hover:border-indigo-100 group-hover:text-indigo-600 transition-colors">
                    {initials(e.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h6 className="font-bold text-sm text-slate-900 truncate">{e.name}</h6>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">{e.campus}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-lg font-bold text-slate-900">{e.score}</div>
                    <div className="text-[9px] font-bold text-indigo-500 uppercase">PTS</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-10">
                <header className="mb-8">
                  <h2 className="text-3xl font-bold tracking-tight mb-2">Submit Result</h2>
                  <p className="text-sm text-slate-500 font-light">Join the leaderboard by entering your verified EFT results.</p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Full Name" icon={<User />} placeholder="Andi Wijaya" value={formData.name} onChange={v => setFormData({...formData, name: v})} />
                    <Field label="Username" icon={<LayoutDashboard />} placeholder="SAIB - Andi" value={formData.username} onChange={v => setFormData({...formData, username: v})} />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Campus</label>
                      <select 
                        required
                        value={formData.campus}
                        onChange={e => setFormData({...formData, campus: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 text-sm font-medium"
                      >
                        <option value="" disabled>Select your university</option>
                        {CAMPUSES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <Field label="Email Address" icon={<ArrowLeft className="rotate-[135deg]" />} type="email" placeholder="andi@student.id" value={formData.email} onChange={v => setFormData({...formData, email: v})} />
                    <Field label="Verified EFT Score" icon={<Hash />} type="number" placeholder="0 - 990" value={formData.score} onChange={v => setFormData({...formData, score: v})} />
                  </div>

                  <button 
                    disabled={isSubmitting}
                    className="w-full bg-slate-950 text-white font-bold py-5 rounded-[1.5rem] hover:bg-slate-900 active:scale-95 transition-all shadow-xl shadow-slate-200 disabled:opacity-50 mt-4"
                  >
                    {isSubmitting ? 'Syncing with Database...' : 'Register Score'}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function PodiumCard({ entry, rank, medal, color, featured }: { entry: any, rank: number, medal: string, color: string, featured?: boolean }) {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: rank * 0.1 }}
      className={`relative bg-white border-2 ${color} rounded-[2rem] p-8 text-center transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-100 ${featured ? 'sm:pb-12 shadow-xl shadow-indigo-50 order-first sm:order-none' : 'order-2 shadow-sm'}`}
    >
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-2xl border-2 border-inherit flex items-center justify-center text-xl shadow-lg z-10">
        {medal}
      </div>
      <div className={`mx-auto mb-6 rounded-full flex items-center justify-center font-bold border-2 ${featured ? 'w-24 h-24 text-2xl bg-indigo-50 border-indigo-100 text-indigo-600' : 'w-16 h-16 text-lg bg-slate-50 border-slate-100 text-slate-400'}`}>
        {initials(entry.name)}
      </div>
      <div className="space-y-1 mb-6">
        <h4 className="font-bold text-slate-950 truncate px-2">{entry.name}</h4>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{entry.campus}</p>
      </div>
      <div className="inline-flex items-end gap-1">
        <span className={`font-mono font-black ${featured ? 'text-5xl text-indigo-600' : 'text-3xl text-slate-900'}`}>{entry.score}</span>
        <span className="text-[10px] font-black text-slate-300 pb-1">XP</span>
      </div>
    </motion.div>
  );
}

function Field({ label, icon, placeholder, value, onChange, type = "text" }: any) {
  return (
    <div>
      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">{label}</label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 scale-90">
          {icon}
        </div>
        <input 
          required
          type={type} 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-11 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all text-sm font-medium"
        />
      </div>
    </div>
  );
}
