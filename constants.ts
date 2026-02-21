
import { FoodItem, FoodCategory, Customer, Order } from './types';

export const INITIAL_FOOD_ITEMS: FoodItem[] = [
  {
    id: '1',
    name: 'Ghee Podi Dosa',
    description: 'Crispy rice crepe with clarified butter and spicy lentil powder.',
    price: 120,
    category: FoodCategory.DOSA,
    stock: 50,
    imageUrl: 'https://picsum.photos/seed/dosa/400/300'
  },
  {
    id: '2',
    name: 'Chennai Chicken Biryani',
    description: 'Fragrant basmati rice cooked with succulent chicken and spices.',
    price: 280,
    category: FoodCategory.BIRYANI,
    stock: 30,
    imageUrl: 'https://picsum.photos/seed/biryani/400/300'
  },
  {
    id: '3',
    name: 'Medhu Vada (2pcs)',
    description: 'Deep-fried savory lentil doughnuts served with chutney.',
    price: 60,
    category: FoodCategory.SNACKS,
    stock: 100,
    imageUrl: 'https://picsum.photos/seed/vada/400/300'
  },
  {
    id: '4',
    name: 'Masala Chai',
    description: 'Authentic Indian spiced tea with milk.',
    price: 40,
    category: FoodCategory.DRINKS,
    stock: 200,
    imageUrl: 'https://picsum.photos/seed/chai/400/300'
  },
  {
    id: '5',
    name: 'Full South Indian Meals',
    description: 'Complete platter with rice, sambar, rasam, and varied curries.',
    price: 180,
    category: FoodCategory.MEALS,
    stock: 20,
    imageUrl: 'https://picsum.photos/seed/meals/400/300'
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'c1',
    name: 'Rahul Kumar',
    email: 'rahul@example.com',
    phone: '9876543210',
    joinDate: '2023-10-01',
    totalOrders: 5,
    totalSpent: 1250
  },
  {
    id: 'c2',
    name: 'Priya Mani',
    email: 'priya@example.com',
    phone: '9876543211',
    joinDate: '2023-11-15',
    totalOrders: 3,
    totalSpent: 850
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord1',
    customerId: 'c1',
    customerName: 'Rahul Kumar',
    items: [{ itemId: '1', quantity: 2, priceAtTime: 120 }],
    totalAmount: 240,
    status: 'Completed',
    date: '2024-05-10'
  },
  {
    id: 'ord2',
    customerId: 'c2',
    customerName: 'Priya Mani',
    items: [{ itemId: '2', quantity: 1, priceAtTime: 280 }],
    totalAmount: 280,
    status: 'Completed',
    date: '2024-05-11'
  }
];
