import { useState } from 'react'
import { Newspaper, Wallet, Trophy, Activity, User, MessageSquare } from 'lucide-react'
import { MarketList } from './components/MarketList'
import PriceChart from './components/PriceChart'
import { NewsFeed } from './components/NewsFeed'
import { WhaleList } from './components/WhaleList'
import { TopHolders } from './components/TopHolders'
import { PriceMovement } from './components/PriceMovement'
import { TimeframeSelector } from './components/TimeframeSelector'
import { SearchBar } from './components/SearchBar'
import DebateFloor from './components/DebateFloor'
import UserDashboard from './components/UserDashboard'
import { useMarketStore } from './stores/marketStore'

function App() {
    const { selectedMarket } = useMarketStore()
    const [activeTab, setActiveTab] = useState<'news' | 'whales' | 'holders' | 'stats' | 'debate'>('news')
    const [activeView, setActiveView] = useState<'markets' | 'user'>('markets')

    return (
        <div className="min-h-screen bg-surface-950 font-sans selection:bg-primary-500/30 selection:text-primary-200">
            <div className="energy-wave" />

            {/* Header */}
            <header className="glass border-b border-primary-500/20 sticky top-0 z-50">
                <div className="max-w-[1920px] mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-primary-500 shadow-[0_0_15px_rgba(34,197,94,0.4)]">
                            <Activity className="w-6 h-6 text-black" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white tracking-widest font-digital glow-text-green uppercase">
                                Symoria Prediction
                            </h1>
                            <p className="text-xs text-primary-400/70 font-digital uppercase tracking-tighter">
                                Next-Gen Intelligence Engine
                            </p>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col md:flex-row items-center justify-end gap-3 w-full">
                        <div className="flex items-center gap-1 bg-black/40 border border-primary-500/20 rounded-xl p-1">
                            <button
                                onClick={() => setActiveView('markets')}
                                className={`px-4 py-1.5 text-[10px] font-digital uppercase tracking-wider rounded-lg transition-all duration-300 ${activeView === 'markets'
                                    ? 'bg-primary-500 text-black glow-green'
                                    : 'text-surface-400 hover:text-primary-400'
                                    }`}
                            >
                                Terminal
                            </button>
                            <button
                                onClick={() => setActiveView('user')}
                                className={`px-4 py-1.5 text-[10px] font-digital uppercase tracking-wider rounded-lg transition-all duration-300 flex items-center gap-1 ${activeView === 'user'
                                    ? 'bg-primary-500 text-black glow-green'
                                    : 'text-surface-400 hover:text-primary-400'
                                    }`}
                            >
                                <User className="w-3 h-3" />
                                Research Lab
                            </button>
                        </div>
                        {activeView === 'markets' && <SearchBar />}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-[1920px] mx-auto p-4">
                {activeView === 'markets' ? (
                    <div className="grid grid-cols-12 gap-4 lg:gap-6">
                        {/* Sidebar - Market List */}
                        <aside className="col-span-12 lg:col-span-3 xl:col-span-3">
                            <div className="glass-card rounded-2xl p-4 sticky top-24">
                                <div className="flex items-center gap-2 mb-4">
                                    <Activity className="w-5 h-5 text-primary-400 glow-text-green" />
                                    <h2 className="text-sm font-digital uppercase tracking-wider text-white">Market Index</h2>
                                </div>
                                <MarketList />
                            </div>
                        </aside>

                        {/* Main Content Area */}
                        <div className="col-span-12 lg:col-span-9 xl:col-span-9 space-y-4 lg:space-y-6">
                            {/* Chart Section */}
                            <section className="glass-card rounded-2xl p-4 lg:p-6">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                                    <div className="flex-1 min-w-0">
                                        <h2 className="font-semibold text-white truncate">
                                            {selectedMarket?.title || 'Select a market'}
                                        </h2>
                                        {selectedMarket && (
                                            <div className="flex items-center gap-3 text-sm text-surface-200">
                                                <p>
                                                    Current: <span className="text-white font-medium">{selectedMarket.yes_percentage.toFixed(2)}%</span> Yes
                                                </p>
                                                <span className="text-surface-600">•</span>
                                                <p>
                                                    Vol: <span className="text-white font-medium">
                                                        {new Intl.NumberFormat('en-US', {
                                                            style: 'currency',
                                                            currency: 'USD',
                                                            maximumFractionDigits: 0,
                                                        }).format(selectedMarket.volume_24h)}
                                                    </span>
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    <TimeframeSelector />
                                </div>
                                <PriceChart />
                            </section>

                            {/* News & Whales Section */}
                            <section className="glass-card rounded-2xl p-4 lg:p-6">
                                <div className="flex items-center gap-4 mb-4 border-b border-primary-500/10 pb-2 overflow-x-auto scrollbar-hide">
                                    <button
                                        onClick={() => setActiveTab('news')}
                                        className={`flex items-center gap-2 px-2 py-1 relative transition-colors whitespace-nowrap ${activeTab === 'news' ? 'text-white' : 'text-surface-400 hover:text-surface-200'
                                            }`}
                                    >
                                        <Newspaper className={`w-5 h-5 ${activeTab === 'news' ? 'text-accent-400' : 'opacity-70'}`} />
                                        <span className="font-semibold">Related News</span>
                                        {activeTab === 'news' && (
                                            <div className="absolute -bottom-[9px] left-0 right-0 h-0.5 bg-accent-400 rounded-full" />
                                        )}
                                    </button>

                                    <div className="w-px h-4 bg-white/10 shrink-0" />

                                    <button
                                        onClick={() => setActiveTab('whales')}
                                        className={`flex items-center gap-2 px-2 py-1 relative transition-colors whitespace-nowrap ${activeTab === 'whales' ? 'text-white' : 'text-surface-400 hover:text-surface-200'
                                            }`}
                                    >
                                        <Wallet className={`w-5 h-5 ${activeTab === 'whales' ? 'text-emerald-400' : 'opacity-70'}`} />
                                        <span className="font-semibold">Recent Large Orders</span>
                                        {activeTab === 'whales' && (
                                            <div className="absolute -bottom-[9px] left-0 right-0 h-0.5 bg-emerald-400 rounded-full" />
                                        )}
                                    </button>

                                    <div className="w-px h-4 bg-white/10 shrink-0" />

                                    <button
                                        onClick={() => setActiveTab('holders')}
                                        className={`flex items-center gap-2 px-2 py-1 relative transition-colors whitespace-nowrap ${activeTab === 'holders' ? 'text-white' : 'text-surface-400 hover:text-surface-200'
                                            }`}
                                    >
                                        <Trophy className={`w-5 h-5 ${activeTab === 'holders' ? 'text-primary-400' : 'opacity-70'}`} />
                                        <span className="text-xs font-digital uppercase tracking-wider">Top Holders</span>
                                        {activeTab === 'holders' && (
                                            <div className="absolute -bottom-[9px] left-0 right-0 h-0.5 bg-primary-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] rounded-full" />
                                        )}
                                    </button>

                                    <div className="w-px h-4 bg-white/10 shrink-0" />

                                    <button
                                        onClick={() => setActiveTab('stats')}
                                        className={`flex items-center gap-2 px-2 py-1 relative transition-colors whitespace-nowrap ${activeTab === 'stats' ? 'text-white' : 'text-surface-400 hover:text-surface-200'
                                            }`}
                                    >
                                        <Activity className={`w-5 h-5 ${activeTab === 'stats' ? 'text-purple-400' : 'opacity-70'}`} />
                                        <span className="font-semibold">Price Analysis</span>
                                        {activeTab === 'stats' && (
                                            <div className="absolute -bottom-[9px] left-0 right-0 h-0.5 bg-purple-400 rounded-full" />
                                        )}
                                    </button>

                                    <div className="w-px h-4 bg-white/10 shrink-0" />

                                    <button
                                        onClick={() => setActiveTab('debate')}
                                        className={`flex items-center gap-2 px-2 py-1 relative transition-colors whitespace-nowrap ${activeTab === 'debate' ? 'text-white' : 'text-surface-400 hover:text-surface-200'
                                            }`}
                                    >
                                        <MessageSquare className={`w-5 h-5 ${activeTab === 'debate' ? 'text-blue-400' : 'opacity-70'}`} />
                                        <span className="font-semibold">Debate Floor</span>
                                        {activeTab === 'debate' && (
                                            <div className="absolute -bottom-[9px] left-0 right-0 h-0.5 bg-blue-400 rounded-full" />
                                        )}
                                    </button>
                                </div>

                                {activeTab === 'news' && <NewsFeed />}
                                {activeTab === 'whales' && <WhaleList />}
                                {activeTab === 'holders' && <TopHolders />}
                                {activeTab === 'stats' && <PriceMovement />}
                                {activeTab === 'debate' && <DebateFloor marketId={selectedMarket?.id || null} />}
                            </section>
                        </div>
                    </div>
                ) : (
                    <UserDashboard />
                )}
            </main>

            {/* Footer */}
            <footer className="glass border-t border-primary-500/20 mt-8">
                <div className="max-w-[1920px] mx-auto px-4 py-8 flex flex-col items-center gap-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Activity className="w-4 h-4 text-primary-500" />
                        <span className="text-sm font-digital uppercase tracking-[0.2em] text-white">Symoria Prediction</span>
                    </div>
                    <p className="text-[10px] font-digital text-primary-400/50 uppercase tracking-tighter text-center">
                        Synthesized through Matrix-01 Intelligence Engine • Powering next-gen prediction analytics
                    </p>
                    <div className="text-[10px] text-surface-500 flex items-center gap-4 mt-2">
                        <span>DATA_SOURCE: POLYMARKET</span>
                        <span>NEWS_FEED: NEWSAPI</span>
                        <span>VERSION: 0.1.0-ALPHA</span>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default App
