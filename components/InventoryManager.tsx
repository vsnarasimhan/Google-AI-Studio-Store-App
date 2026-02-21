
import React, { useState } from 'react';
import { FoodItem, FoodCategory } from '../types';

interface InventoryManagerProps {
  items: FoodItem[];
  onUpdateItem: (item: FoodItem) => void;
  onAddItem: (item: Partial<FoodItem>) => void;
  onDeleteItem: (id: string) => void;
}

const InventoryManager: React.FC<InventoryManagerProps> = ({ items, onUpdateItem, onAddItem, onDeleteItem }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState<Partial<FoodItem>>({
    name: '',
    price: 0,
    stock: 0,
    category: FoodCategory.DOSA,
    description: '',
    imageUrl: 'https://picsum.photos/seed/new-food/400/300'
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddItem(newItem);
    setIsAdding(false);
    setNewItem({ name: '', price: 0, stock: 0, category: FoodCategory.DOSA, description: '', imageUrl: 'https://picsum.photos/seed/new-food/400/300' });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Inventory Management</h2>
          <p className="text-slate-500">Manage your menu and stock levels</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-slate-900 text-white px-5 py-2 rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center gap-2"
        >
          {isAdding ? 'Cancel' : '+ Add New Item'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAddSubmit} className="bg-white p-6 rounded-2xl border-2 border-orange-100 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase">Item Name</label>
              <input 
                required
                type="text" 
                value={newItem.name} 
                onChange={e => setNewItem({...newItem, name: e.target.value})}
                className="w-full bg-slate-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase">Category</label>
              <select 
                value={newItem.category} 
                onChange={e => setNewItem({...newItem, category: e.target.value as FoodCategory})}
                className="w-full bg-slate-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-orange-500"
              >
                {Object.values(FoodCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase">Price (₹)</label>
              <input 
                required
                type="number" 
                value={newItem.price} 
                onChange={e => setNewItem({...newItem, price: Number(e.target.value)})}
                className="w-full bg-slate-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase">Initial Stock</label>
              <input 
                required
                type="number" 
                value={newItem.stock} 
                onChange={e => setNewItem({...newItem, stock: Number(e.target.value)})}
                className="w-full bg-slate-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase">Description</label>
            <textarea 
              value={newItem.description} 
              onChange={e => setNewItem({...newItem, description: e.target.value})}
              className="w-full bg-slate-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-orange-500 h-24"
            />
          </div>
          <button type="submit" className="w-full bg-orange-600 text-white font-bold py-3 rounded-xl hover:bg-orange-700 transition-colors">
            Confirm and Add to Menu
          </button>
        </form>
      )}

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Item</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Price</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Stock</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map(item => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={item.imageUrl} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                      <span className="font-bold text-slate-700">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-slate-100 px-2 py-1 rounded text-xs font-medium text-slate-600">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-700">₹{item.price}</td>
                  <td className="px-6 py-4">
                    <input 
                      type="number" 
                      value={item.stock} 
                      onChange={e => onUpdateItem({ ...item, stock: Number(e.target.value) })}
                      className="w-20 bg-transparent border-b border-slate-200 focus:border-orange-500 focus:outline-none py-1"
                    />
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button 
                      onClick={() => onDeleteItem(item.id)}
                      className="text-red-500 hover:text-red-700 text-sm font-bold p-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InventoryManager;
