import { router, useLocalSearchParams } from 'expo-router';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function TrackOrderScreen() {
  const { user } = useAuth();
  const params = useLocalSearchParams();

  const itemTitle = params.title || 'Your Coffee Order';
  const itemPrice = params.price || '₹0.00';
  const orderIdNumber = params.id || 'ID #CB-873912';
  
  // Safe URL Decoder: Clean extraction that handles strings perfectly on the web
  const getDecodedAddress = () => {
    if (!params.deliveryAddress) return '942, Moga Street, 23D, Coffee Hub Complex';
    try {
      return decodeURIComponent(String(params.deliveryAddress));
    } catch (e) {
      return String(params.deliveryAddress);
    }
  };

  const deliveryLocation = getDecodedAddress();
  const realOrderTime = params.date ? String(params.date) : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Dynamic 25-minute delivery window helper
  const calculateDeliveryEstimate = (timeStr: string) => {
    try {
      const [time, modifier] = timeStr.split(' ');
      let [hours, minutes] = time.split(':').map(Number);
      
      if (modifier === 'PM' && hours < 12) hours += 12;
      if (modifier === 'AM' && hours === 12) hours = 0;

      const dateObj = new Date();
      dateObj.setHours(hours);
      dateObj.setMinutes(minutes + 25); 

      return dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return 'In 25 Mins';
    }
  };

  const estimatedDeliveryTime = calculateDeliveryEstimate(realOrderTime);

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

      {/* Header Container */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleSafeBack}>
          <Text style={styles.backText}>⬅️</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Track Order</Text>
        <View style={{ width: 30 }} />
      </View>

      <View style={styles.cardContainer}>
        <Text style={styles.estimationTitle}>Estimated Delivery Time for {itemTitle}</Text>
        <Text style={styles.estimationTime}>{estimatedDeliveryTime}</Text>

        {/* Live Tracking Milestones Diagram */}
        <View style={styles.statusBox}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
            <Text style={styles.statusHeaderTitle}>Track Status</Text>
            <Text style={styles.orderId}>{orderIdNumber}</Text>
          </View>
          
          <View style={styles.stepRow}>
            <Text style={styles.stepDotActive}>🟢</Text>
            <Text style={styles.stepTextActive}>Order Placed ({realOrderTime})</Text>
          </View>
          <View style={styles.stepRow}>
            <Text style={styles.stepDotActive}>🟢</Text>
            <Text style={styles.stepTextActive}>Preparing your brew ({itemPrice})</Text>
          </View>
          <View style={styles.stepRow}>
            <Text style={styles.stepDotPending}>⚪</Text>
            <Text style={styles.stepTextPending}>Out for Delivery</Text>
          </View>
        </View>

        {/* Delivery Address Information Box */}
        <View style={styles.addressBox}>
          <Text style={styles.addressTitle}>Delivery Details</Text>
          <Text style={styles.customerName}>Recipient: {user?.fullName || 'Valued Customer'}</Text>
          <Text style={styles.addressText} numberOfLines={3}>📍 {deliveryLocation}</Text>
          <Text style={styles.phoneText}>📞 {user?.phoneNo || '+91 98765 43210'}</Text>
        </View>
      </View>

      {/* Navigation Return Button Panel footer anchor */}
      <View style={styles.footerContainer}>
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => router.replace('/home')}
        >
          <Text style={styles.actionButtonText}>Back to Home</Text>
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
  cardContainer: { padding: 24, alignItems: 'center' },
  estimationTitle: { fontSize: 14, color: '#4B2E2A', fontWeight: '600', textAlign: 'center' },
  estimationTime: { fontSize: 26, fontWeight: '800', color: '#4B2E2A', marginVertical: 8 },
  statusBox: { backgroundColor: '#F5EEE8', borderRadius: 20, width: '100%', padding: 20, marginTop: 15 },
  statusHeaderTitle: { fontSize: 14, fontWeight: '700', color: '#4B2E2A' },
  orderId: { fontSize: 12, color: '#8D7B70', fontWeight: '600' },
  stepRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  stepDotActive: { fontSize: 14, marginRight: 10 },
  stepDotPending: { fontSize: 14, marginRight: 10, opacity: 0.4 },
  stepTextActive: { fontSize: 14, color: '#4B2E2A', fontWeight: '600' },
  stepTextPending: { fontSize: 14, color: '#8D7B70' },
  addressBox: { backgroundColor: '#F5EEE8', borderRadius: 20, width: '100%', padding: 20, marginTop: 15 },
  addressTitle: { fontSize: 14, fontWeight: '700', color: '#4B2E2A', marginBottom: 6 },
  customerName: { fontSize: 13, fontWeight: '600', color: '#4B2E2A', marginBottom: 4 },
  addressText: { fontSize: 13, color: '#5A3B32', lineHeight: 18 },
  phoneText: { fontSize: 13, color: '#4B2E2A', fontWeight: '600', marginTop: 6 },
  footerContainer: { paddingHorizontal: 24, marginTop: 20, marginBottom: 24, width: '100%' },
  actionButton: { backgroundColor: '#4B2E2A', height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' },
  actionButtonText: { color: '#FFF', fontSize: 15, fontWeight: '700' },
});