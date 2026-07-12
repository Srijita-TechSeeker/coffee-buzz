import * as Location from 'expo-location';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function PaymentScreen() {
  const { cartItems, clearCart } = useCart();
  const { placeOrder } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'upi' | 'cash'>('card');
  
  // Address States for Location Tracking
  const [address, setAddress] = useState('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  // Auto-fetch location when screen mounts
  useEffect(() => {
    fetchCurrentLocation();
  }, []);

  const fetchCurrentLocation = async () => {
    setIsLoadingLocation(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setIsLoadingLocation(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // 1. Mobile Strategy: Attempt native device geocoding
      try {
        let reverseGeocode = await Location.reverseGeocodeAsync({ latitude, longitude });
        if (reverseGeocode && reverseGeocode.length > 0) {
          const currentAddress = reverseGeocode[0];
          const formattedAddress = `${currentAddress.name || ''}, ${currentAddress.street || ''}, ${currentAddress.city || ''}, ${currentAddress.postalCode || ''}`;
          setAddress(formattedAddress.replace(/^,\s*,?/, '').trim());
          setIsLoadingLocation(false);
          return;
        }
      } catch (e) {
        console.log("Native geocoding skipped, falling back to web geocoder...");
      }

      // 2. Browser Fallback Strategy: Use OpenStreetMap API for web browser execution
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
      const data = await response.json();
      if (data && data.display_name) {
        setAddress(data.display_name);
      } else {
        setAddress(`Coordinates: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
      }

    } catch (error) {
      console.log('Location gathering bypassed:', error);
    } finally {
      setIsLoadingLocation(false);
    }
  };

  // Safe numerical parser to crush NaN currency format crashes completely
  const parsePrice = (priceVal: any): number => {
    if (typeof priceVal === 'number') return priceVal;
    if (!priceVal) return 0;
    const cleanedPrice = String(priceVal).replace(/[^\d.]/g, '');
    const parsed = parseFloat(cleanedPrice);
    return isNaN(parsed) ? 0 : parsed;
  };

  const totalItemsCount = cartItems.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);
  const computedTotalPrice = cartItems.reduce((sum: number, item: any) => sum + (parsePrice(item.price) * (item.quantity || 1)), 0);

  const handleConfirmPayment = async () => {
    if (!address.trim()) {
      if (typeof window !== 'undefined') {
        alert('Please provide a destination delivery address first! 📍');
      } else {
        Alert.alert('Address Missing', 'Please provide a destination delivery address first! 📍');
      }
      return;
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty! ☕');
      router.replace('/home');
      return;
    }

    setIsProcessing(true);

    try {
      const itemsToOrder = cartItems.map((item: any) => ({
        id: item.id || String(Math.random()),
        name: item.name || 'Delicious Coffee',
        price: parsePrice(item.price), 
        quantity: item.quantity || 1,
        image: item.image || 'https://images.unsplash.com/photo-1536227661368-deef57acf708?q=80&w=870',
      }));

      // Commit items, grand total, and live location address to persistence
      await placeOrder(itemsToOrder, computedTotalPrice, address);
      clearCart();

      alert('Payment Successful! Your order has been placed. 🎉');
      
      // Safe Web Routing: URL-encode the address string so characters like spaces and commas don't break in the browser
      const secureEncodedAddress = encodeURIComponent(address.trim());

      router.replace({
        pathname: '/track-order',
        params: {
          title: itemsToOrder[0]?.name || 'Coffee Order',
          price: `₹${computedTotalPrice.toFixed(2)}`,
          date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          deliveryAddress: secureEncodedAddress
        }
      });
    } catch (error) {
      alert('Something went wrong processing your order storage.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSafeBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/home');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4B2E2A" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleSafeBack}>
          <Text style={styles.backText}>⬅️</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout Payment</Text>
        <View style={{ width: 30 }} />
      </View>

      <View style={styles.contentContainer}>
        {/* Delivery Address Field Input Group */}
        <View style={styles.addressContainer}>
          <View style={styles.addressHeaderRow}>
            <Text style={styles.sectionTitle}>Delivery Location Address</Text>
            <TouchableOpacity onPress={fetchCurrentLocation} disabled={isLoadingLocation}>
              <Text style={styles.locationGpsButton}>
                {isLoadingLocation ? '🔄 Fetching...' : '📍 Use Current GPS'}
              </Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.addressInput}
            placeholder="Enter complete building number, floor or street address..."
            placeholderTextColor="#8D7B70"
            value={address}
            onChangeText={setAddress}
            multiline
          />
        </View>

        {/* Bill Breakdown Element */}
        <View style={styles.billCard}>
          <Text style={styles.billHeader}>Order Total Summary</Text>
          <View style={styles.divider} />
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Total Selected Items:</Text>
            <Text style={styles.billValue}>{totalItemsCount}</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Grand Total Amount:</Text>
            <Text style={styles.totalAmountValue}>₹{computedTotalPrice.toFixed(2)}</Text>
          </View>
        </View>

        {/* Payment Methods Check Box Container */}
        <Text style={styles.sectionTitle}>Select Payment Method</Text>

        <TouchableOpacity 
          style={[styles.methodOption, selectedMethod === 'card' && styles.selectedMethodOption]}
          onPress={() => setSelectedMethod('card')}
        >
          <Text style={styles.methodIcon}>💳</Text>
          <Text style={styles.methodText}>Credit / Debit Card</Text>
          <View style={[styles.radioCircle, selectedMethod === 'card' && styles.radioCircleActive]} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.methodOption, selectedMethod === 'upi' && styles.selectedMethodOption]}
          onPress={() => setSelectedMethod('upi')}
        >
          <Text style={styles.methodIcon}>📱</Text>
          <Text style={styles.methodText}>UPI / Net Banking</Text>
          <View style={[styles.radioCircle, selectedMethod === 'upi' && styles.radioCircleActive]} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.methodOption, selectedMethod === 'cash' && styles.selectedMethodOption]}
          onPress={() => setSelectedMethod('cash')}
        >
          <Text style={styles.methodIcon}>💵</Text>
          <Text style={styles.methodText}>Cash on Delivery</Text>
          <View style={[styles.radioCircle, selectedMethod === 'cash' && styles.radioCircleActive]} />
        </TouchableOpacity>
      </View>

      {/* Bottom Footer Button Panel */}
      <View style={styles.footerContainer}>
        <TouchableOpacity 
          style={[styles.payButton, isProcessing && styles.disabledButton]} 
          onPress={handleConfirmPayment}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={styles.payButtonText}>Pay Now • ₹{computedTotalPrice.toFixed(2)}</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#C8B6A6' },
  header: {
    height: 60,
    backgroundColor: '#4B2E2A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: { padding: 6 },
  backText: { fontSize: 18, color: '#FFF' },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: '700' },
  contentContainer: { padding: 24 },
  addressContainer: { marginBottom: 20 },
  addressHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  locationGpsButton: { fontSize: 13, color: '#4B2E2A', fontWeight: '700', textDecorationLine: 'underline' },
  addressInput: {
    backgroundColor: '#F5EEE8',
    borderRadius: 15,
    padding: 12,
    fontSize: 14,
    color: '#4B2E2A',
    minHeight: 60,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#EADBC8',
  },
  billCard: { backgroundColor: '#F5EEE8', borderRadius: 20, padding: 20, marginBottom: 20 },
  billHeader: { fontSize: 16, fontWeight: '700', color: '#4B2E2A', marginBottom: 10 },
  divider: { height: 1, backgroundColor: '#EADBC8', marginBottom: 15 },
  billRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  billLabel: { fontSize: 14, color: '#5A3B32', fontWeight: '500' },
  billValue: { fontSize: 14, fontWeight: '600', color: '#4B2E2A' },
  totalAmountValue: { fontSize: 18, fontWeight: '800', color: '#6F4E37' },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#4B2E2A', marginBottom: 10 },
  methodOption: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5EEE8', padding: 14, borderRadius: 15, marginBottom: 10 },
  selectedMethodOption: { borderWidth: 1.5, borderColor: '#4B2E2A' },
  methodIcon: { fontSize: 20, marginRight: 12 },
  methodText: { flex: 1, fontSize: 14, fontWeight: '600', color: '#4B2E2A' },
  radioCircle: { width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: '#C5B4A6' },
  radioCircleActive: { borderColor: '#4B2E2A', backgroundColor: '#4B2E2A' },
  footerContainer: { paddingHorizontal: 24, marginTop: 10, marginBottom: 24 },
  payButton: { backgroundColor: '#4B2E2A', height: 52, borderRadius: 26, justifyContent: 'center', alignItems: 'center' },
  disabledButton: { opacity: 0.7 },
  payButtonText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
});