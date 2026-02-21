
export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: FoodCategory;
  stock: number;
  imageUrl: string;
}

export enum FoodCategory {
  DOSA = 'Dosa',
  BIRYANI = 'Biryani',
  SNACKS = 'Snacks',
  DRINKS = 'Drinks',
  MEALS = 'Meals'
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
}

export interface OrderItem {
  itemId: string;
  quantity: number;
  priceAtTime: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'Completed' | 'Pending' | 'Cancelled';
  date: string;
}

export interface RevenueData {
  date: string;
  amount: number;
}

export interface AIInsight {
  summary: string;
  suggestions: string[];
  trendingItems: string[];
}
