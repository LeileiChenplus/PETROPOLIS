import React, { useState, useEffect } from 'react';
import { 
  Dog, Cat, Shield, Map, Heart, Search, Camera, 
  Settings, Users, Activity, Bird, Waves, Globe,
  MoreVertical, Share2, MessageCircle, PawPrint, 
  PlusCircle, Thermometer, Calendar, Info, 
  TrendingUp, Wallet, ShieldCheck, Zap, 
  Navigation, Crosshair, Droplets, RefreshCcw, Wifi,
  AlertTriangle, Bell
} from 'lucide-react';

// --- 模拟数据 ---
const PET_PROFILES = [
  { id: 'p1', name: '大福', species: '柴犬', level: 12, energy: 85, territory: '奥森公园', avatar: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=200' },
  { id: 'p2', name: '宙斯', species: '豹纹守宫', level: 5, energy: 40, territory: '书房岩石区', avatar: 'https://images.unsplash.com/photo-1505325087595-51d0859542a2?auto=format&fit=crop&q=80&w=200' }
];

const MOCK_POSTS = [
  {
    id: 1,
    author: "大福 (柴犬)",
    role: "资深拆家家",
    content: "今天占领了奥森公园的长椅区，附近的柯基们注意了，这里现在归‘柴柴组’管！",
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=600",
    stats: { sniffs: 124, barks: 12, coins: 50 },
    time: "2小时前",
    type: "dog",
    isTerritoryMark: true
  },
  {
    id: 2,
    author: "雪影 (雪豹)",
    role: "野性守护者",
    content: "今日气温-15度，非常舒适。我的代理人刚刚通过数字方舟帮我升级了GPS项圈，追踪精度已达米级。",
    image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80&w=600",
    stats: { sniffs: 3402, barks: 89, coins: 1200 },
    time: "刚刚",
    type: "wild",
    live: true
  }
];

const App = () => {
  const [activeTab, setActiveTab] = useState('plaza');
  const [isAgentMode, setIsAgentMode] = useState(false);
  const [selectedPet, setSelectedPet] = useState(PET_PROFILES[0]);
  const [notification, setNotification] = useState(null);
  const [coins, setCoins] = useState(1250);
  const [isSyncing, setIsSyncing] = useState(false);

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2500);
  };

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      showToast("项圈数据同步成功：消耗 120 能量，获得 20 宠粮币");
    }, 1500);
  };

  // --- 头部组件 ---
  const Header = () => (
    <div className={`sticky top-0 z-50 transition-all duration-500 p-4 flex justify-between items-center border-b ${isAgentMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white/90 backdrop-blur-md border-orange-100'}`}>
      <div className="flex items-center gap-2">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg transition-transform ${isAgentMode ? 'bg-indigo-600 rotate-12' : 'bg-orange-500'}`}>
          <PawPrint size={24} />
        </div>
        <div>
          <h1 className="text-lg font-black tracking-tight">PETROPOLIS</h1>
          <p className="text-[9px] opacity-60 uppercase font-bold">{isAgentMode ? '代理人终端' : '宠物视点'}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${isAgentMode ? 'bg-slate-800 text-indigo-400' : 'bg-orange-50 text-orange-600'}`}>
          <Wallet size={14} />
          {coins}
        </div>
        <button 
          onClick={() => setIsAgentMode(!isAgentMode)}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isAgentMode ? 'bg-indigo-500 shadow-indigo-500/50 shadow-lg' : 'bg-gray-100 text-gray-400'}`}
        >
          {isAgentMode ? <Settings size={20}/> : <ShieldCheck size={20}/>}
        </button>
      </div>
    </div>
  );

  // --- 宠物选择器 ---
  const PetSelector = () => (
    <div className={`p-4 flex gap-4 overflow-x-auto no-scrollbar transition-colors ${isAgentMode ? 'bg-slate-800' : 'bg-white'}`}>
      {PET_PROFILES.map(pet => (
        <button 
          key={pet.id}
          onClick={() => setSelectedPet(pet)}
          className={`relative flex-shrink-0 flex flex-col items-center gap-1 transition-all ${selectedPet.id === pet.id ? 'scale-110' : 'opacity-40 grayscale'}`}
        >
          <div className={`w-14 h-14 rounded-2xl overflow-hidden border-2 ${selectedPet.id === pet.id ? (isAgentMode ? 'border-indigo-400' : 'border-orange-500') : 'border-transparent'}`}>
            <img src={pet.avatar} className="w-full h-full object-cover" alt={pet.name} />
          </div>
          <span className={`text-[10px] font-bold ${isAgentMode ? 'text-white' : 'text-gray-700'}`}>{pet.name}</span>
        </button>
      ))}
      <button className="flex-shrink-0 w-14 h-14 rounded-2xl border-2 border-dashed border-gray-400/30 flex items-center justify-center text-gray-400 hover:border-gray-400 transition-colors">
        <PlusCircle size={24} />
      </button>
    </div>
  );

  // --- 社交广场 ---
  const Plaza = () => (
    <div className="pb-24 animate-in fade-in duration-700">
      <div className="p-4 bg-orange-50/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp size={16} className="text-orange-500" />
          <span className="text-xs font-bold text-gray-600">实时热议：#拆家艺术家 #全球云养豹</span>
        </div>
      </div>

      {MOCK_POSTS.map(post => (
        <div key={post.id} className="p-4 border-b border-gray-50 bg-white">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl overflow-hidden relative">
                <img src={post.image} className="w-full h-full object-cover" alt={post.author} />
                {post.live && <div className="absolute top-1 left-1 bg-red-500 text-[8px] text-white px-1 rounded font-bold">直播中</div>}
              </div>
              <div>
                <h3 className="font-black text-gray-900 flex items-center gap-1">
                  {post.author}
                  {post.isTerritoryMark && <Navigation size={12} className="text-blue-500 fill-blue-500" />}
                </h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{post.role} • {post.time}</p>
              </div>
            </div>
            <button className="text-gray-300"><MoreVertical size={20}/></button>
          </div>
          <p className="text-sm text-gray-800 mb-4 leading-relaxed">{post.content}</p>
          <div className="rounded-3xl overflow-hidden shadow-xl mb-4 group cursor-pointer">
            <img src={post.image} className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105" alt="Post content" />
          </div>
          <div className="flex justify-between items-center bg-gray-50 p-3 rounded-2xl">
            <div className="flex gap-4">
              <button onClick={() => showToast("你嗅了嗅它的气味")} className="flex items-center gap-1.5 text-gray-600 hover:text-orange-500 transition-colors">
                <PawPrint size={18} />
                <span className="text-[10px] font-black">{post.stats.sniffs} 嗅过</span>
              </button>
              <button className="flex items-center gap-1.5 text-gray-600 hover:text-blue-500 transition-colors">
                <MessageCircle size={18} />
                <span className="text-[10px] font-black">{post.stats.barks} 吠叫</span>
              </button>
            </div>
            <div className="flex items-center gap-1 text-amber-600 font-bold text-xs bg-amber-100 px-2 py-1 rounded-lg">
              <Zap size={14} fill="currentColor" />
              +{post.stats.coins}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // --- 代理人管理终端 ---
  const AgentDashboard = () => (
    <div className="p-4 bg-slate-900 min-h-screen text-white pb-24 animate-in slide-in-from-right duration-500">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
           <div className={`p-2 rounded-xl transition-all ${isSyncing ? 'animate-spin bg-indigo-500/20' : 'bg-slate-800'}`}>
              <RefreshCcw size={18} className="text-indigo-400" />
           </div>
           <div>
              <p className="text-xs font-bold">硬件同步状态</p>
              <p className="text-[10px] text-slate-500 flex items-center gap-1"><Wifi size={10}/> PetLink 项圈已连接</p>
           </div>
        </div>
        <button 
          onClick={handleSync}
          disabled={isSyncing}
          className="bg-indigo-600 active:scale-95 px-4 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-50 shadow-lg shadow-indigo-600/20"
        >
          {isSyncing ? "读取数据..." : "立即同步"}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-800 p-4 rounded-3xl border border-slate-700">
          <p className="text-slate-400 text-[10px] font-bold uppercase mb-1">生理健康值</p>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-black text-green-400">98</span>
            <span className="text-[10px] text-slate-500 mb-1">/ 100</span>
          </div>
          <div className="w-full bg-slate-700 h-1.5 rounded-full mt-2">
            <div className="bg-green-400 h-full rounded-full w-[98%]"></div>
          </div>
        </div>
        <div className="bg-slate-800 p-4 rounded-3xl border border-slate-700">
          <p className="text-slate-400 text-[10px] font-bold uppercase mb-1">社交影响力</p>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-black text-blue-400">Top 5%</span>
          </div>
          <div className="w-full bg-slate-700 h-1.5 rounded-full mt-2">
            <div className="bg-blue-400 h-full rounded-full w-[85%]"></div>
          </div>
        </div>
      </div>

      <div className="bg-orange-500/10 border border-orange-500/30 p-5 rounded-3xl mb-6 border-l-4 border-l-orange-500">
        <h3 className="font-bold flex items-center gap-2 mb-2 text-orange-500">
          <AlertTriangle size={18} /> AI 实时健康预警
        </h3>
        <p className="text-xs text-orange-100/80 leading-relaxed">
          根据传感器数据，{selectedPet.name} 今日活动量激增 40%，体表温度略微升高。建议增加 20% 饮水量，并进入静息模式。
        </p>
      </div>

      <div className="bg-indigo-900/40 border border-indigo-500/30 p-5 rounded-3xl mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold">AI 行为代理分析</h3>
            <p className="text-xs text-indigo-300">本周心理画像映射</p>
          </div>
          <Activity className="text-indigo-400" />
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-[10px] w-12 text-slate-400 font-bold">支配性</span>
            <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
               <div className="h-full bg-indigo-500 w-[72%]"></div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] w-12 text-slate-400 font-bold">友好度</span>
            <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
               <div className="h-full bg-emerald-500 w-[88%]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // --- 数字方舟 (野生动物) ---
  const DigitalWild = () => (
    <div className="p-4 space-y-6 pb-24 bg-emerald-950 min-h-screen text-white animate-in zoom-in duration-500">
      <div className="relative h-64 rounded-[2.5rem] overflow-hidden shadow-2xl border-2 border-emerald-500/20">
        <img src="https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="Wild Animal" />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent"></div>
        <div className="absolute top-4 right-4 bg-red-600 text-[10px] font-black px-2 py-1 rounded animate-pulse">实时追踪</div>
        <div className="absolute bottom-6 left-6">
          <h2 className="text-3xl font-black mb-1">雪影 (雪豹)</h2>
          <div className="flex items-center gap-2 text-xs text-emerald-300">
            <Globe size={14} /> 天山自然保护区 · 4200m
          </div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-[2rem]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold">数字守护计划进度</h3>
          <span className="text-emerald-400 font-black">82%</span>
        </div>
        <div className="w-full bg-white/10 h-2.5 rounded-full mb-6">
          <div className="bg-gradient-to-r from-emerald-500 to-green-300 h-full rounded-full w-[82%] shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
        </div>
        <button 
          onClick={() => {
            setCoins(c => c - 100);
            showToast("成功捐赠 100 宠粮币，感谢你的守护！");
          }}
          className="w-full bg-emerald-500 hover:bg-emerald-400 text-white py-3 rounded-2xl text-sm font-black transition-all active:scale-95 shadow-lg shadow-emerald-900/20"
        >
          参与众筹守护 (-100 Kibble)
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 p-4 rounded-3xl border border-white/5 flex flex-col items-center">
          <Crosshair className="text-red-400 mb-2" />
          <p className="text-[10px] text-emerald-300 uppercase font-bold tracking-widest">今日巡护</p>
          <p className="text-xl font-black">14.2 km</p>
        </div>
        <div className="bg-white/5 p-4 rounded-3xl border border-white/5 flex flex-col items-center">
          <Droplets className="text-blue-400 mb-2" />
          <p className="text-[10px] text-emerald-300 uppercase font-bold tracking-widest">健康评级</p>
          <p className="text-xl font-black">优 A+</p>
        </div>
      </div>
    </div>
  );

  // --- 领地地图 ---
  const TerritoryMap = () => (
    <div className="h-full w-full bg-slate-900 relative overflow-hidden flex items-center justify-center">
      {/* 动态网格背景 */}
      <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 opacity-10">
        {Array.from({length: 100}).map((_, i) => (
          <div key={i} className="border border-indigo-500"></div>
        ))}
      </div>
      
      {/* 扫描动画 */}
      <div className="absolute w-[400px] h-[400px] border border-indigo-500/30 rounded-full animate-ping"></div>
      
      <div className="relative z-10 text-center">
        <div className="w-24 h-24 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-indigo-500/40 relative">
          <Navigation className="text-indigo-400 animate-pulse" size={40} />
          <div className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">12</div>
        </div>
        <h2 className="text-white text-xl font-black">气味领地扫描中</h2>
        <p className="text-slate-400 text-xs mt-2">奥森公园 · 柴柴组领地范围内</p>
      </div>

      <div className="absolute bottom-32 left-4 right-4 bg-slate-800/80 backdrop-blur-xl p-4 rounded-3xl border border-slate-700 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-600">
            <img src="https://i.pravatar.cc/100?img=33" alt="Neighbor" />
          </div>
          <div>
            <p className="text-xs font-black text-white">拉布拉多·布鲁</p>
            <p className="text-[10px] text-slate-400 italic">正在请求“嗅一嗅”权限</p>
          </div>
        </div>
        <button onClick={() => showToast("已同意‘嗅一嗅’请求")} className="bg-orange-500 text-white text-[10px] px-3 py-1.5 rounded-xl font-black hover:bg-orange-400 transition-colors">
           回应
        </button>
      </div>
    </div>
  );

  // --- 导航栏 ---
  const Nav = () => (
    <div className={`fixed bottom-0 left-0 right-0 border-t px-6 py-4 flex justify-between items-center z-50 transition-colors ${isAgentMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'}`}>
      {[
        { id: 'plaza', icon: Users, label: '广场' },
        { id: 'map', icon: Map, label: '领地' },
        { id: 'camera', icon: Camera, special: true },
        { id: 'ark', icon: Shield, label: '方舟' },
        { id: 'wild', icon: Globe, label: '荒野' }
      ].map((item) => (
        item.special ? (
          <div key={item.id} className="relative -top-8">
            <button 
              onClick={() => showToast("AI 宠物口吻：‘什么时候吃罐罐？’")}
              className="bg-gradient-to-tr from-orange-500 to-amber-400 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl ring-4 ring-white active:scale-90 transition-transform"
            >
              <Camera size={28} />
            </button>
          </div>
        ) : (
          <button 
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 transition-all ${activeTab === item.id ? (isAgentMode ? 'text-indigo-400 scale-110' : 'text-orange-500 scale-110') : 'text-gray-400 hover:text-gray-600'}`}
          >
            <item.icon size={22} strokeWidth={activeTab === item.id ? 3 : 2} />
            <span className="text-[10px] font-black">{item.label}</span>
          </button>
        )
      ))}
    </div>
  );

  return (
    <div className={`max-w-md mx-auto h-screen font-sans flex flex-col relative overflow-hidden shadow-2xl transition-all duration-500 ${isAgentMode ? 'bg-slate-900' : 'bg-white'}`}>
      <Header />
      <PetSelector />
      
      <main className="flex-1 overflow-y-auto no-scrollbar">
        {activeTab === 'plaza' && <Plaza />}
        {activeTab === 'ark' && <AgentDashboard />}
        {activeTab === 'wild' && <DigitalWild />}
        {activeTab === 'map' && <TerritoryMap />}
      </main>

      <Nav />

      {/* 全局通知 */}
      {notification && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-6 py-3 rounded-2xl text-xs font-bold animate-in fade-in zoom-in slide-in-from-top-4 z-[100] shadow-2xl flex items-center gap-2">
            <Bell size={14} className="animate-bounce" />
            {notification}
        </div>
      )}
    </div>
  );
};

export default App;