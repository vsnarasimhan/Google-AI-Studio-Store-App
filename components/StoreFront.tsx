
import React, { useState } from 'react';
import { FoodItem, FoodCategory } from '../types';

interface StoreFrontProps {
  items: FoodItem[];
  onAddToCart: (item: FoodItem) => void;
}

const StoreFront: React.FC<StoreFrontProps> = ({ items, onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState<FoodCategory | 'All'>('All');

  const filteredItems = activeCategory === 'All' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  const categories = ['All', ...Object.values(FoodCategory)];

  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="relative h-64 md:h-80 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center text-center px-4">
        <img 
          src="https://picsum.photos/seed/chennai-food/1200/600" 
          alt="Hero" 
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />
        <div className="relative z-10 text-white space-y-2">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Fast Chennai</h1>
          <p className="text-lg md:text-xl font-light opacity-90">Authentic Flavors, Lightning Fast</p>
        </div>
      </header>

      <div className="flex overflow-x-auto pb-4 gap-4 no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat as any)}
            className={`px-6 py-2 rounded-full whitespace-nowrap transition-all duration-300 font-medium ${
              activeCategory === cat 
                ? 'bg-orange-500 text-white shadow-lg scale-105' 
                : 'bg-white text-slate-600 hover:bg-orange-50 border border-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 group transition-all duration-300 hover:shadow-xl">
            <div className="h-48 relative overflow-hidden">
              <img 
                src={item.imageUrl} 
                alt={item.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-orange-600 shadow-sm">
                {item.category}
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-slate-800">{item.name}</h3>
                <span className="text-lg font-bold text-orange-600">₹{item.price}</span>
              </div>
              <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">{item.description}</p>
              <div className="flex items-center justify-between pt-2">
                <span className={`text-xs font-semibold px-2 py-1 rounded-md ${
                  item.stock > 10 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {item.stock > 0 ? `${item.stock} in stock` : 'Out of stock'}
                </span>
                <button
                  disabled={item.stock === 0}
                  onClick={() => onAddToCart(item)}
                  className={`px-4 py-2 rounded-xl transition-all font-semibold ${
                    item.stock > 0 
                      ? 'bg-slate-900 text-white hover:bg-slate-800 active:scale-95' 
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreFront;
