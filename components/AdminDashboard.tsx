
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { RevenueData, AIInsight, Order, FoodItem } from '../types';

interface AdminDashboardProps {
  orders: Order[];
  revenueData: RevenueData[];
  aiInsight: AIInsight | null;
  items: FoodItem[];
  loadingAI: boolean;
  onRefreshAI: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  orders, 
  revenueData, 
  aiInsight, 
  items, 
  loadingAI,
  onRefreshAI 
}) => {
  const totalRevenue = revenueData.reduce((acc, curr) => acc + curr.amount, 0);
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : 0;
  
  const lowStockItems = items.filter(item => item.stock < 10);

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Business Overview</h2>
          <p className="text-slate-500">Track your performance and AI-driven growth</p>
        </div>
        <button 
          onClick={onRefreshAI}
          disabled={loadingAI}
          className="bg-orange-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-orange-700 transition-colors flex items-center gap-2 shadow-lg disabled:opacity-50"
        >
          {loadingAI ? 'Analyzing...' : 'Refresh AI Insights'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Total Revenue</p>
          <p className="text-3xl font-bold text-slate-800 mt-1">₹{totalRevenue.toLocaleString()}</p>
          <div className="mt-4 flex items-center text-green-500 text-sm font-semibold">
            <span>↑ 12% vs last month</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Total Orders</p>
          <p className="text-3xl font-bold text-slate-800 mt-1">{totalOrders}</p>
          <div className="mt-4 flex items-center text-blue-500 text-sm font-semibold">
            <span>Steady activity</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Avg Order Value</p>
          <p className="text-3xl font-bold text-slate-800 mt-1">₹{avgOrderValue}</p>
          <div className="mt-4 flex items-center text-orange-500 text-sm font-semibold">
            <span>Optimization target: ₹250</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm min-h-[400px]">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Revenue Trend</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="amount" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="text-orange-500">✨</span> Gemini AI Insights
          </h3>
          {aiInsight ? (
            <div className="space-y-6">
              <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                <p className="text-orange-900 leading-relaxed font-medium">{aiInsight.summary}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Recommendations</p>
                <ul className="space-y-2">
                  {aiInsight.suggestions.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-700 text-sm">
                      <span className="text-orange-500 mt-1">•</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Trending Now</p>
                <div className="flex flex-wrap gap-2">
                  {aiInsight.trendingItems.map((item, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-semibold">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center py-20 text-slate-400">
              <p>Click "Refresh AI Insights" to generate business analytics</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <h3 className="text-lg font-bold text-slate-800 mb-6">Critical Alerts</h3>
        <div className="space-y-4">
          {lowStockItems.length > 0 ? (
            lowStockItems.map(item => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-red-50 border border-red-100 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-red-600 font-bold">!</div>
                  <div>
                    <p className="font-bold text-red-900">{item.name}</p>
                    <p className="text-xs text-red-600">Stock is running critically low ({item.stock} left)</p>
                  </div>
                </div>
                <button className="text-sm font-bold text-red-700 hover:underline">Restock Now</button>
              </div>
            ))
          ) : (
            <p className="text-center py-4 text-slate-500">No critical alerts at this time.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
