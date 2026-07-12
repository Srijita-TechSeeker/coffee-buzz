import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext'; // 1. Ensure this import is here
import { CartProvider } from '../context/CartContext';

export default function Layout() {
  return (
    <AuthProvider> {/* 2. This MUST be the outermost wrapper element */}
      <CartProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="splash" />
          <Stack.Screen name="onboarding1" />
          <Stack.Screen name="onboarding2" />
          <Stack.Screen name="onboarding3" />
          <Stack.Screen name="login" />
          <Stack.Screen name="home" />
          <Stack.Screen name="menu" />
          <Stack.Screen name="details" />
          <Stack.Screen name="cart" />
          <Stack.Screen name="payment" />
          <Stack.Screen name="profile" />
          <Stack.Screen name="edit-profile" />
          <Stack.Screen name="order-history" /> {/* New Screen */}
          <Stack.Screen name="track-order" />    {/* New Screen */}
          <Stack.Screen name="contact-us" />     {/* New Screen */}
          <Stack.Screen name="terms" />          {/* New Screen */}
        </Stack>
      </CartProvider>
    </AuthProvider>
  );
}