import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Book, 
  ChevronRight, 
  Search, 
  Home, 
  Info, 
  Activity, 
  Stethoscope, 
  AlertTriangle, 
  ShieldAlert, 
  Baby, 
  ArrowLeft,
  Loader2,
  Menu,
  X
} from 'lucide-react';
import { WEEKS, Week, Drug } from './constants';
import { getMedicationDetails, MedicationInfo } from './services/geminiService';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'week' | 'drug'>('home');
  const [selectedWeek, setSelectedWeek] = useState<Week | null>(null);
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);
  const [drugInfo, setDrugInfo] = useState<MedicationInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleWeekSelect = (week: Week) => {
    setSelectedWeek(week);
    setCurrentView('week');
    setIsSidebarOpen(false);
  };

  const handleDrugSelect = async (drug: Drug) => {
    setSelectedDrug(drug);
    setCurrentView('drug');
    setIsLoading(true);
    setDrugInfo(null);
    try {
      const info = await getMedicationDetails(drug.name);
      setDrugInfo(info);
    } catch (error) {
      console.error("Error fetching drug details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredWeeks = WEEKS.filter(w => 
    w.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.drugs.some(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const allDrugs = WEEKS.flatMap(w => w.drugs.map(d => ({ ...d, weekId: w.id })));
  const filteredDrugs = allDrugs.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-slate-900 font-sans flex">
      {/* Sidebar for Desktop */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-bottom border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-600 rounded-lg text-white">
                <Book size={24} />
              </div>
              <h1 className="font-bold text-xl tracking-tight">Vademécum</h1>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Buscar fármaco..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            <button 
              onClick={() => { setCurrentView('home'); setIsSidebarOpen(false); }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                currentView === 'home' ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50"
              )}
            >
              <Home size={18} />
              Inicio
            </button>
            
            <div className="pt-4 pb-2 px-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Semanas</span>
            </div>

            {WEEKS.map((week) => (
              <button 
                key={week.id}
                onClick={() => handleWeekSelect(week)}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                  selectedWeek?.id === week.id && currentView !== 'home' ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    selectedWeek?.id === week.id ? "bg-indigo-600" : "bg-slate-300"
                  )} />
                  {week.title}
                </div>
                <ChevronRight size={14} opacity={0.5} />
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-100">
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs text-slate-500 leading-relaxed">
                Información farmacológica actualizada para estudiantes y profesionales de la salud.
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-indigo-600 rounded-lg text-white">
              <Book size={20} />
            </div>
            <span className="font-bold text-lg">Vademécum</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
          <AnimatePresence mode="wait">
            {currentView === 'home' && (
              <motion.div 
                key="home"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl mx-auto"
              >
                <div className="mb-12">
                  <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                    Bienvenidos a mi <span className="text-indigo-600">vademécum</span>
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                    Aquí encontrarás información de todos los fármacos organizado por semanas.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {WEEKS.map((week, idx) => (
                    <motion.button
                      key={week.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => handleWeekSelect(week)}
                      className="group bg-white p-6 rounded-3xl border border-slate-200 hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/10 transition-all text-left"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-wider">
                          {week.title}
                        </div>
                        <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                          <ChevronRight size={20} />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{week.description}</h3>
                      <p className="text-sm text-slate-500">{week.drugs.length} medicamentos listados</p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {currentView === 'week' && selectedWeek && (
              <motion.div 
                key="week"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-4xl mx-auto"
              >
                <button 
                  onClick={() => setCurrentView('home')}
                  className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-8 transition-colors group"
                >
                  <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                  Volver al inicio
                </button>

                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">{selectedWeek.title}</h2>
                  <p className="text-lg text-slate-500">{selectedWeek.description}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedWeek.drugs.map((drug, idx) => (
                    <motion.button
                      key={drug.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.03 }}
                      onClick={() => handleDrugSelect(drug)}
                      className="flex items-center justify-between p-5 bg-white rounded-2xl border border-slate-200 hover:border-indigo-500 hover:shadow-lg transition-all text-left"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                          <Stethoscope size={20} />
                        </div>
                        <span className="font-semibold text-slate-800">{drug.name}</span>
                      </div>
                      <ChevronRight size={18} className="text-slate-300" />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {currentView === 'drug' && selectedDrug && (
              <motion.div 
                key="drug"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-5xl mx-auto pb-20"
              >
                <button 
                  onClick={() => setCurrentView('week')}
                  className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-8 transition-colors group"
                >
                  <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                  Volver a {selectedWeek?.title}
                </button>

                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-200">
                    <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
                    <p className="text-slate-500 font-medium">Consultando información farmacológica...</p>
                  </div>
                ) : drugInfo ? (
                  <div className="space-y-8">
                    <header className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm">
                      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                          <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm uppercase tracking-widest mb-4">
                            <Activity size={16} />
                            Ficha Farmacológica
                          </div>
                          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                            {drugInfo.genericName}
                          </h2>
                          <div className="flex flex-wrap gap-2">
                            {drugInfo.commercialNames.map(name => (
                              <span key={name} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
                                {name}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2 space-y-8">
                        <Section 
                          icon={<Info className="text-blue-500" />} 
                          title="Mecanismo de Acción" 
                          content={drugInfo.mechanismOfAction} 
                        />
                        <Section 
                          icon={<Activity className="text-emerald-500" />} 
                          title="Dosis y Administración" 
                          content={drugInfo.dosageAndAdministration} 
                        />
                        <Section 
                          icon={<Stethoscope className="text-indigo-500" />} 
                          title="Indicaciones" 
                          content={drugInfo.indications} 
                        />
                        <Section 
                          icon={<AlertTriangle className="text-amber-500" />} 
                          title="Efectos Adversos" 
                          content={drugInfo.adverseEffects} 
                        />
                      </div>

                      <div className="space-y-8">
                        <Section 
                          icon={<ShieldAlert className="text-rose-500" />} 
                          title="Contraindicaciones" 
                          content={drugInfo.contraindications} 
                          compact
                        />
                        <Section 
                          icon={<Baby className="text-purple-500" />} 
                          title="Embarazo y Lactancia" 
                          content={drugInfo.pregnancyAndLactation} 
                          compact
                        />
                        <Section 
                          icon={<AlertTriangle className="text-orange-500" />} 
                          title="Interacciones" 
                          content={drugInfo.interactions} 
                          compact
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-12 bg-white rounded-3xl border border-rose-200 text-center">
                    <AlertTriangle className="mx-auto text-rose-500 mb-4" size={48} />
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Error al cargar datos</h3>
                    <p className="text-slate-500">No pudimos obtener la información del medicamento. Por favor, intenta de nuevo.</p>
                    <button 
                      onClick={() => handleDrugSelect(selectedDrug)}
                      className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
                    >
                      Reintentar
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function Section({ icon, title, content, compact = false }: { icon: React.ReactNode, title: string, content: string, compact?: boolean }) {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50 flex items-center gap-3">
        {icon}
        <h3 className="font-bold text-slate-800">{title}</h3>
      </div>
      <div className={cn("p-6 text-slate-600 leading-relaxed", compact ? "text-sm" : "text-base")}>
        {content}
      </div>
    </motion.section>
  );
}
