
import React, { useState, useEffect, useCallback } from 'react';
import { FoodItem, FoodCategory, Customer, Order, RevenueData, AIInsight } from './types';
import { INITIAL_FOOD_ITEMS, INITIAL_CUSTOMERS, MOCK_ORDERS } from './constants';
import StoreFront from './components/StoreFront';
import AdminDashboard from './components/AdminDashboard';
import InventoryManager from './components/InventoryManager';
import CustomerList from './components/CustomerList';
import { getGeminiInsights } from './services/geminiService';

const App: React.FC = () => {
  const [view, setView] = useState<'customer' | 'admin'>('customer');
  const [adminSubView, setAdminSubView] = useState<'dashboard' | 'inventory' | 'customers'>('dashboard');
  const [items, setItems] = useState<FoodItem[]>(INITIAL_FOOD_ITEMS);
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [cart, setCart] = useState<{item: FoodItem, qty: number}[]>([]);
  const [aiInsight, setAiInsight] = useState<AIInsight | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);

  // Derive revenue data
  const revenueData: RevenueData[] = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().split('T')[0];
    const dayTotal = orders
      .filter(o => o.date === dateStr)
      .reduce((sum, o) => sum + o.totalAmount, 0);
    return { date: dateStr, amount: dayTotal };
  });

  const handleRefreshAI = useCallback(async () => {
    setLoadingAI(true);
    const insights = await getGeminiInsights(items, orders);
    setAiInsight(insights);
    setLoadingAI(false);
  }, [items, orders]);

  useEffect(() => {
    // Initial fetch of AI insights
    handleRefreshAI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddToCart = (item: FoodItem) => {
    setCart(prev => {
      const existing = prev.find(c => c.item.id === item.id);
      if (existing) {
        return prev.map(c => c.item.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      }
      return [...prev, { item, qty: 1 }];
    });
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    const total = cart.reduce((sum, c) => sum + (c.item.price * c.qty), 0);
    const today = new Date().toISOString().split('T')[0];
    
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      customerId: 'c1', // Mocking current user
      customerName: 'Rahul Kumar',
      items: cart.map(c => ({ itemId: c.item.id, quantity: c.qty, priceAtTime: c.item.price })),
      totalAmount: total,
      status: 'Completed',
      date: today
    };

    // Update orders
    setOrders(prev => [newOrder, ...prev]);
    
    // Update inventory
    setItems(prev => prev.map(i => {
      const cartItem = cart.find(c => c.item.id === i.id);
      return cartItem ? { ...i, stock: i.stock - cartItem.qty } : i;
    }));

    // Update customer stats
    setCustomers(prev => prev.map(c => 
      c.id === 'c1' ? { ...c, totalOrders: c.totalOrders + 1, totalSpent: c.totalSpent + total } : c
    ));

    setCart([]);
    alert("Order Placed Successfully! (Simulated)");
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      {/* Sidebar for Desktop / Header for Mobile */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 z-50 px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white font-black text-xl italic">F</div>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Fast Chennai</span>
          </div>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setView('customer')}
              className={`text-sm font-bold transition-all ${view === 'customer' ? 'text-orange-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Shop
            </button>
            <button 
              onClick={() => setView('admin')}
              className={`text-sm font-bold transition-all ${view === 'admin' ? 'text-orange-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Management
            </button>
            
            {view === 'customer' && cart.length > 0 && (
              <button 
                onClick={handleCheckout}
                className="bg-orange-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg hover:shadow-orange-200 animate-bounce"
              >
                Checkout (₹{cart.reduce((s, c) => s + c.item.price * c.qty, 0)})
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 pt-24 pb-12">
        {view === 'customer' ? (
          <StoreFront items={items} onAddToCart={handleAddToCart} />
        ) : (
          <div className="flex flex-col md:flex-row gap-8">
            {/* Admin Side Nav */}
            <aside className="w-full md:w-64 space-y-2">
              <button 
                onClick={() => setAdminSubView('dashboard')}
                className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all ${adminSubView === 'dashboard' ? 'bg-orange-50 text-orange-600 border border-orange-100' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                📊 Dashboard
              </button>
              <button 
                onClick={() => setAdminSubView('inventory')}
                className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all ${adminSubView === 'inventory' ? 'bg-orange-50 text-orange-600 border border-orange-100' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                📦 Inventory
              </button>
              <button 
                onClick={() => setAdminSubView('customers')}
                className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all ${adminSubView === 'customers' ? 'bg-orange-50 text-orange-600 border border-orange-100' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                👥 Customers
              </button>
            </aside>

            {/* Admin Content Area */}
            <div className="flex-1">
              {adminSubView === 'dashboard' && (
                <AdminDashboard 
                  orders={orders} 
                  revenueData={revenueData} 
                  aiInsight={aiInsight} 
                  items={items}
                  loadingAI={loadingAI}
                  onRefreshAI={handleRefreshAI}
                />
              )}
              {adminSubView === 'inventory' && (
                <InventoryManager 
                  items={items} 
                  onUpdateItem={(updated) => setItems(prev => prev.map(i => i.id === updated.id ? updated : i))}
                  onAddItem={(newItem) => setItems(prev => [...prev, { ...newItem, id: `item-${Date.now()}` } as FoodItem])}
                  onDeleteItem={(id) => setItems(prev => prev.filter(i => i.id !== id))}
                />
              )}
              {adminSubView === 'customers' && (
                <CustomerList customers={customers} />
              )}
            </div>
          </div>
        )}
      </main>

      {/* Floating Action Bar (Mobile Only) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-4 flex justify-around shadow-xl z-50">
        <button onClick={() => setView('customer')} className={`flex flex-col items-center gap-1 ${view === 'customer' ? 'text-orange-600' : 'text-slate-400'}`}>
          <span className="text-xl">🏠</span>
          <span className="text-[10px] font-bold uppercase">Shop</span>
        </button>
        <button onClick={() => setView('admin')} className={`flex flex-col items-center gap-1 ${view === 'admin' ? 'text-orange-600' : 'text-slate-400'}`}>
          <span className="text-xl">🛠️</span>
          <span className="text-[10px] font-bold uppercase">Admin</span>
        </button>
      </div>
    </div>
  );
};

export default App;
