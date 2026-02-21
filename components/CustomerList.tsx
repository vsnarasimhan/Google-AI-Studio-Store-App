
import React from 'react';
import { Customer } from '../types';

interface CustomerListProps {
  customers: Customer[];
}

const CustomerList: React.FC<CustomerListProps> = ({ customers }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Customer Database</h2>
        <p className="text-slate-500">Monitor loyal patrons and their purchase habits</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Customer</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Join Date</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Orders</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Total Spent</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Contact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {customers.map(customer => (
                <tr key={customer.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-700">{customer.name}</p>
                        <p className="text-xs text-slate-400">ID: {customer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-sm">
                    {new Date(customer.joinDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-700">{customer.totalOrders}</td>
                  <td className="px-6 py-4 font-bold text-green-600">₹{customer.totalSpent.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col text-xs text-slate-500">
                      <span>{customer.email}</span>
                      <span>{customer.phone}</span>
                    </div>
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

export default CustomerList;
