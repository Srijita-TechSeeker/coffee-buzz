import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';

export interface UserProfile {
  fullName: string;
  phoneNo: string;
  email: string;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  totalPrice: number;
}

interface AuthContextType {
  user: UserProfile | null;
  orders: Order[];
  login: (userData: UserProfile) => Promise<void>;
  updateProfile: (updatedData: UserProfile) => Promise<void>;
  placeOrder: (items: OrderItem[], total: number) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const setItem = async (key: string, value: string) => {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value);
    } else {
      await AsyncStorage.setItem(key, value);
    }
  };

  const getItem = async (key: string) => {
    return Platform.OS === 'web' ? localStorage.getItem(key) : await AsyncStorage.getItem(key);
  };

  useEffect(() => {
    async function loadStoredData() {
      try {
        const storedUser = await getItem('@user_profile');
        if (storedUser) setUser(JSON.parse(storedUser));

        const storedOrders = await getItem('@user_orders');
        if (storedOrders) setOrders(JSON.parse(storedOrders));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadStoredData();
  }, []);

  const login = async (userData: UserProfile) => {
    await setItem('@user_profile', JSON.stringify(userData));
    setUser(userData);
  };

  const updateProfile = async (updatedData: UserProfile) => {
    await setItem('@user_profile', JSON.stringify(updatedData));
    setUser(updatedData); 
  };

  const placeOrder = async (items: OrderItem[], total: number) => {
    const newOrder: Order = {
      id: `CB-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      items: items,
      totalPrice: total,
    };
    
    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    await setItem('@user_orders', JSON.stringify(updatedOrders));
  };

  return (
    <AuthContext.Provider value={{ user, orders, login, updateProfile, placeOrder, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}