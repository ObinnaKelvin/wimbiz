import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScreenId } from '../types';
import {
  AdminUser,
  AdminDashboardData,
  ClientAnonymousRecord,
  QuestionAnalyticsItem,
  getStoredAdminUser,
  loginAdmin,
  clearAdminSession,
  fetchAdminDashboardStats,
  fetchAdminRecords,
  downloadExcelResponses,
  seedDemoRecordsOnServer,
  reconnectDatabase,
} from '../utils/adminApi';
import {
  Lock,
  Unlock,
  ShieldCheck,
  Download,
  Users,
  CheckCircle2,
  Activity,
  Heart,
  Calendar,
  Database,
  RefreshCw,
  LogOut,
  Search,
  ChevronRight,
  ChevronDown,
  BarChart3,
  Table as TableIcon,
  Sparkles,
  ArrowLeft,
  AlertTriangle,
  FileSpreadsheet,
  Stethoscope,
  Info,
} from 'lucide-react';

interface AdminDashboardScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const AdminDashboardScreen: React.FC<AdminDashboardScreenProps> = ({ onNavigate }) => {
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(() => getStoredAdminUser());
  const [email, setEmail] = useState('admin@iwosan.com');
  const [password, setPassword] = useState('IwosanAdmin2026!');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Dashboard Data State
  const [stats, setStats] = useState<AdminDashboardData | null>(null);
  const [records, setRecords] = useState<ClientAnonymousRecord[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [activeTab, setActiveTab] = useState<'analytics' | 'responses'>('analytics');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [exporting, setExporting] = useState(false);
  const [reconnecting, setReconnecting] = useState(false);

  // Load dashboard data when authenticated
  const loadData = async () => {
    setLoadingData(true);
    try {
      const [statsData, recordsData] = await Promise.all([
        fetchAdminDashboardStats(),
        fetchAdminRecords(),
      ]);
      if (statsData) setStats(statsData);
      if (recordsData) setRecords(recordsData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleReconnectDb = async () => {
    setReconnecting(true);
    try {
      await reconnectDatabase();
      await loadData();
    } catch (e) {
      console.error(e);
    } finally {
      setReconnecting(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      loadData();
    }
  }, [currentUser]);

  // Handle Login
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);

    const result = await loginAdmin(email, password);
    setLoginLoading(false);

    if (result.success && result.user) {
      setCurrentUser(result.user);
    } else {
      setLoginError(result.error || 'Invalid credentials. Access restricted to authorized clinical staff.');
    }
  };

  const handleLogout = () => {
    clearAdminSession();
    setCurrentUser(null);
  };

  const handleExportExcel = async () => {
    setExporting(true);
    try {
      await downloadExcelResponses(records);
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => setExporting(false), 800);
    }
  };

  const handleSeedDemoData = async () => {
    setLoadingData(true);
    await seedDemoRecordsOnServer();
    await loadData();
  };

  // If not logged in, render the secure Admin Staff Login Card
  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto pt-4 pb-20 px-4 text-left space-y-6">
        {/* Back Link */}
        <button
          onClick={() => onNavigate('welcome')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to App</span>
        </button>

        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-lg space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-emerald-400 flex items-center justify-center shadow-xs">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-widest block">
                Clinical Staff Portal
              </span>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                Administrator Login
              </h2>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Restricted to authorized Iwosan Lagoon clinical & research staff. Access aggregate conference metrics, anonymous questionnaire response analytics, and Excel exports.
          </p>

          {loginError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-800 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4 pt-1">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Admin Staff Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@iwosan.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 transition"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Admin Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 transition"
              />
            </div>

            {/* Convenience Pre-configured Credentials Tip for Staff */}
            <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-[11px] text-emerald-900 space-y-1">
              <span className="font-bold flex items-center gap-1.5 text-emerald-800">
                <Info className="w-3.5 h-3.5" />
                Staff Access Credentials
              </span>
              <p className="text-[11px] text-emerald-800/90 leading-tight">
                Use your staff admin email or the default clinic credentials:
                <br />
                Email: <span className="font-mono font-bold">admin@iwosan.com</span> (or <span className="font-mono font-bold">okereobinna11@gmail.com</span>)
                <br />
                Password: <span className="font-mono font-bold">IwosanAdmin2026!</span> (or <span className="font-mono font-bold">wimbiz</span>)
              </p>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
            >
              {loginLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <Unlock className="w-4 h-4" />
                  <span>Sign In to Admin Dashboard</span>
                </>
              )}
            </button>
          </form>

          <div className="text-[11px] text-slate-400 text-center pt-1">
            Iwosan Lagoon Hospitals & WIMBIZ Health Initiative
          </div>
        </div>
      </div>
    );
  }

  // Filtered records for Responses table
  const filteredRecords = records.filter((r) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      r.id.toLowerCase().includes(q) ||
      (r.ageBand && r.ageBand.toLowerCase().includes(q)) ||
      (r.timestamp && r.timestamp.toLowerCase().includes(q))
    );
  });

  // Filtered Question Analytics
  const questionAnalyticsList: QuestionAnalyticsItem[] = stats?.questionAnalytics
    ? (Object.values(stats.questionAnalytics) as QuestionAnalyticsItem[])
    : [];

  const filteredQuestions = questionAnalyticsList.filter((item) => {
    if (categoryFilter === 'all') return true;
    if (categoryFilter === 'menstrual') return item.questionId.startsWith('q2049');
    if (categoryFilter === 'fertility') return item.questionId.startsWith('q2050');
    if (categoryFilter === 'midlife') return item.questionId.startsWith('q40');
    if (categoryFilter === 'breast') return item.questionId.startsWith('q_breast') || item.questionId.startsWith('q_last_mam') || item.questionId.startsWith('q_cervical') || item.questionId.startsWith('q_hpv');
    if (categoryFilter === 'bone') return item.questionId.startsWith('q_bone') || item.questionId.startsWith('q_height') || item.questionId.startsWith('q_osteop') || item.questionId.startsWith('q_stairs') || item.questionId.startsWith('q_strength');
    if (categoryFilter === 'mental') return item.questionId.startsWith('phq') || item.questionId.startsWith('q_current_mood') || item.questionId.startsWith('q_anxious') || item.questionId.startsWith('q_stress') || item.questionId.startsWith('q_lonely') || item.questionId.startsWith('q_self_harm');
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto pt-2 pb-24 px-3 sm:px-4 text-left space-y-6">
      {/* Top Admin Bar */}
      <div className="bg-slate-900 text-white rounded-3xl p-4 sm:p-5 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-black tracking-tight leading-tight">
                Administrator Dashboard
              </h2>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Staff Verified
              </span>
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Logged in: <span className="font-semibold text-white">{currentUser.email}</span> · {currentUser.hospital}
            </p>
          </div>
        </div>

        {/* Database & Action Controls */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* MongoDB Connection Status Pill */}
          <div
            title={stats?.databaseStatus.uriMasked || 'MongoDB Status'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 text-[11px] font-bold border border-slate-700"
          >
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              {stats?.databaseStatus.isConnected ? 'MongoDB: Connected' : 'Storage: Active (Ready for Mongo)'}
            </span>
          </div>

          <button
            onClick={loadData}
            title="Refresh Data"
            disabled={loadingData}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loadingData ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={handleLogout}
            title="Sign Out"
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900 border border-rose-800 text-rose-200 text-xs font-bold transition cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Database Connection Status Card */}
      {stats?.databaseStatus && (
        <div className={`p-4 rounded-2xl border text-xs leading-relaxed flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
          stats.databaseStatus.isConnected
            ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
            : 'bg-amber-50/80 border-amber-200 text-amber-950'
        }`}>
          <div className="flex items-start gap-2.5">
            <Database className={`w-4 h-4 mt-0.5 shrink-0 ${
              stats.databaseStatus.isConnected ? 'text-emerald-600' : 'text-amber-600'
            }`} />
            <div>
              <div className="font-bold flex items-center gap-2">
                <span>{stats.databaseStatus.isConnected ? 'MongoDB Atlas Connected' : 'Database Status: Local Resilient Storage Active'}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                  stats.databaseStatus.isConnected
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {stats.databaseStatus.isConnected ? 'Atlas Online' : 'Local Fallback'}
                </span>
              </div>
              <p className="text-[11px] mt-0.5 text-slate-600">
                {stats.databaseStatus.isConnected ? (
                  <>Database: <span className="font-mono font-semibold">{stats.databaseStatus.dbName}</span> · Collection: <span className="font-mono font-semibold">{stats.databaseStatus.collectionName || 'anonymous_health_records'}</span></>
                ) : (
                  <>Configured Cluster: <span className="font-mono text-slate-700">{stats.databaseStatus.uriMasked}</span>. In MongoDB Atlas &gt; <strong>Network Access</strong>, ensure <span className="font-mono bg-amber-100/70 px-1 py-0.5 rounded font-bold">0.0.0.0/0</span> is permitted so the cloud environment can connect.</>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
            <button
              onClick={handleReconnectDb}
              disabled={reconnecting}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${reconnecting ? 'animate-spin' : ''}`} />
              <span>{reconnecting ? 'Connecting...' : 'Test / Reconnect'}</span>
            </button>
          </div>
        </div>
      )}

      {/* KPI METRIC COUNTER CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Total App Users Count */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs space-y-1"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-extrabold uppercase tracking-wider">
              Total App Users
            </span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {stats?.totalParticipants ?? records.length}
          </div>
          <p className="text-[11px] text-slate-500 font-medium">
            People used the app so far
          </p>
        </motion.div>

        {/* Completed Health Checks */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs space-y-1"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-extrabold uppercase tracking-wider">
              Completed Checks
            </span>
            <CheckCircle2 className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {stats?.completedChecks ?? records.filter((r) => r.completedCheck).length}
          </div>
          <p className="text-[11px] text-slate-500 font-medium">
            {stats?.completionRate ?? 100}% completion rate
          </p>
        </motion.div>

        {/* Average Vitals Baseline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs space-y-1"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-extrabold uppercase tracking-wider">
              Average Blood Pressure
            </span>
            <Activity className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {stats?.avgSystolic ? `${stats.avgSystolic} mmHg` : '120 mmHg'}
          </div>
          <p className="text-[11px] text-slate-500 font-medium">
            Avg BMI: {stats?.avgBmi ?? '23.4'} kg/m²
          </p>
        </motion.div>

        {/* Safety Care Pathway Flags */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs space-y-1"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-extrabold uppercase tracking-wider">
              Safety Support
            </span>
            <Heart className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {stats?.safetyTriggerCount ?? 0}
          </div>
          <p className="text-[11px] text-slate-500 font-medium">
            Immediate care protocols initiated
          </p>
        </motion.div>
      </div>

      {/* ACTION BAR: EXCEL EXPORT & VIEW SWITCHER */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-emerald-600" />
            <span>Question Percentage Charts</span>
          </button>

          <button
            onClick={() => setActiveTab('responses')}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'responses'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TableIcon className="w-4 h-4 text-sky-600" />
            <span>Responses (Columns & Rows)</span>
          </button>
        </div>

        {/* Export to Excel Primary CTA Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportExcel}
            disabled={exporting}
            className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>{exporting ? 'Generating Excel...' : 'Export to Excel (.xlsx)'}</span>
          </button>

          {records.length === 0 && (
            <button
              onClick={handleSeedDemoData}
              className="px-3.5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
            >
              Seed Sample Data
            </button>
          )}
        </div>
      </div>

      {/* TAB 1: VISUAL CHARTS (PERCENTAGES OF PEOPLE WHO ANSWERED EACH QUESTION) */}
      {activeTab === 'analytics' && (
        <div className="space-y-4">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-bold">
            {[
              { id: 'all', label: 'All Questions' },
              { id: 'menstrual', label: 'Menstrual (20-49)' },
              { id: 'fertility', label: 'Fertility & Pregnancy' },
              { id: 'midlife', label: 'Perimenopause (40-49)' },
              { id: 'breast', label: 'Breast & Gynaecology' },
              { id: 'bone', label: 'Bone & Mobility' },
              { id: 'mental', label: 'Mental Wellbeing' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-3 py-1.5 rounded-full whitespace-nowrap transition cursor-pointer border ${
                  categoryFilter === cat.id
                    ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Question Analytics Cards List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredQuestions.map((q) => {
              const totalAnswers = q.totalResponders;

              return (
                <motion.div
                  key={q.questionId}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs space-y-3.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                        {q.questionId}
                      </span>
                      <span className="text-[11px] font-extrabold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md shrink-0">
                        {totalAnswers} Responders
                      </span>
                    </div>

                    <h3 className="text-sm font-black text-slate-900 leading-snug mt-1">
                      {q.title}
                    </h3>
                  </div>

                  {/* Percentage Bars for Each Option */}
                  <div className="space-y-2 pt-1">
                    {q.options.length === 0 ? (
                      <div className="text-xs text-slate-400 py-3 text-center italic">
                        No recorded responses for this demographic yet
                      </div>
                    ) : (
                      q.options.map((opt) => (
                        <div key={opt.optionId} className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-slate-700 truncate pr-2">
                              {opt.label}
                            </span>
                            <span className="font-black text-slate-900 shrink-0">
                              {opt.percentage}% <span className="font-normal text-[11px] text-slate-500">({opt.count})</span>
                            </span>
                          </div>

                          {/* Graphical Visual Bar */}
                          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${opt.percentage}%` }}
                              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                              className={`h-full rounded-full ${
                                opt.optionId === 'yes' || opt.optionId.includes('good') || opt.optionId.includes('within_year') || opt.optionId.includes('regular')
                                  ? 'bg-emerald-500'
                                  : opt.optionId === 'often' || opt.optionId.includes('severe') || opt.optionId.includes('frequent') || opt.optionId.includes('heavy')
                                  ? 'bg-rose-500'
                                  : 'bg-sky-500'
                              }`}
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: OVERALL RESPONSES IN COLUMNS AND ROWS (TABLE + EXPORT) */}
      {activeTab === 'responses' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden space-y-3 p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-black text-slate-900">
                Participant Records Database
              </h3>
              <p className="text-[11px] text-slate-500">
                Total {filteredRecords.length} records · Arranged in columns & rows exportable to Excel
              </p>
            </div>

            {/* Search filter */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ID, date, age..."
                className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Interactive Responsive Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-100 max-h-[500px]">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="sticky top-0 bg-slate-900 text-white z-10 text-[11px] uppercase tracking-wider font-extrabold">
                <tr>
                  <th className="py-3 px-3.5">ID</th>
                  <th className="py-3 px-3.5">Timestamp</th>
                  <th className="py-3 px-3.5">Category</th>
                  <th className="py-3 px-3.5">Age Band</th>
                  <th className="py-3 px-3.5">BP (mmHg)</th>
                  <th className="py-3 px-3.5">Glucose</th>
                  <th className="py-3 px-3.5">BMI</th>
                  <th className="py-3 px-3.5">Check Status</th>
                  <th className="py-3 px-3.5">Period Status</th>
                  <th className="py-3 px-3.5">Mammogram</th>
                  <th className="py-3 px-3.5">Mood</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="py-8 text-center text-slate-400 italic">
                      No matching records found.
                    </td>
                  </tr>
                ) : (
                  filteredRecords.map((r, idx) => (
                    <tr key={r.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                      <td className="py-2.5 px-3.5 font-bold text-slate-900">{r.id}</td>
                      <td className="py-2.5 px-3.5 whitespace-nowrap text-slate-500 text-[11px]">
                        {r.timestamp ? new Date(r.timestamp).toLocaleDateString('en-GB') : 'N/A'}
                      </td>
                      <td className="py-2.5 px-3.5 font-semibold text-slate-800 whitespace-nowrap">
                        {r.answers?.['q0_occupation'] ? ({
                          full_time: 'Full-Time Employee',
                          part_time: 'Part-Time Employee',
                          self_employed: 'Self-Employed Woman',
                          freelancer: 'Freelancer',
                          contract_worker: 'Contract Worker',
                          casual_worker: 'Casual Worker',
                          unemployed_professional: 'Unemployed Professional',
                          job_seeker: 'Job Seeker',
                          retired_professional: 'Retired Professional',
                          student: 'Student',
                          stay_at_home: 'Stay-at-Home Woman',
                        }[r.answers['q0_occupation']] || r.answers['q0_occupation']) : '—'}
                      </td>
                      <td className="py-2.5 px-3.5 font-semibold text-emerald-800">
                        {r.ageBand || r.answers?.['q1_age'] || 'N/A'}
                      </td>
                      <td className="py-2.5 px-3.5 whitespace-nowrap">
                        {r.numbers?.systolic ? `${r.numbers.systolic}/${r.numbers.diastolic}` : '—'}
                      </td>
                      <td className="py-2.5 px-3.5">
                        {r.numbers?.bloodSugar ? `${r.numbers.bloodSugar} ${r.numbers.sugarUnit || 'mg/dL'}` : '—'}
                      </td>
                      <td className="py-2.5 px-3.5 font-bold">
                        {r.bmi ? `${r.bmi}` : '—'}
                      </td>
                      <td className="py-2.5 px-3.5">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          r.completedCheck ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {r.completedCheck ? 'Completed' : 'In-Progress'}
                        </span>
                      </td>
                      <td className="py-2.5 px-3.5 truncate max-w-[120px]">
                        {r.answers?.['q2049_periods_regular'] || r.answers?.['q40_periods_irregular'] || 'N/A'}
                      </td>
                      <td className="py-2.5 px-3.5 truncate max-w-[120px]">
                        {r.answers?.['q_last_mammogram'] || 'N/A'}
                      </td>
                      <td className="py-2.5 px-3.5 capitalize">
                        {r.answers?.['phq2_depressed'] || r.answers?.['phq1_interest'] || r.answers?.['q_current_mood'] || 'N/A'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
            <span>Click "Export to Excel (.xlsx)" to download complete dataset with all questions mapped as individual columns.</span>
          </div>
        </div>
      )}

      {/* Return to App Button */}
      <div className="text-center pt-2">
        <button
          onClick={() => onNavigate('welcome')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 transition cursor-pointer shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit Admin Portal & Return to Patient View</span>
        </button>
      </div>
    </div>
  );
};
