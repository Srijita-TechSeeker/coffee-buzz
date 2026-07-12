import { router } from 'expo-router';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function OrderHistoryScreen() {
  const { orders } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4B2E2A" />

      {/* Header Row */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>⬅️</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order History</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {orders.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No orders placed yet! ☕</Text>
          </View>
        ) : (
          orders.map((order) => {
            // Display first item info as primary graphic representation
            const primaryItem = order.items[0];
            const itemTotalCount = order.items.reduce((sum, item) => sum + item.quantity, 0);

            return (
              <View key={order.id} style={styles.orderCard}>
                <Image
                  source={{ uri: primaryItem?.image || 'https://images.unsplash.com/photo-1536227661368-deef57acf708?q=80&w=870' }}
                  style={styles.itemImage}
                />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemTitle}>
                    {primaryItem?.name}{itemTotalCount > 1 ? ` + ${itemTotalCount - 1} more` : ''}
                  </Text>
                  <Text style={styles.itemSubText}>Order ID: {order.id}</Text>
                  <Text style={styles.itemPrice}>
                    {itemTotalCount} {itemTotalCount === 1 ? 'Item' : 'Items'} — {order.date} • <Text style={styles.boldPrice}>₹{order.totalPrice}</Text>
                  </Text>
                </View>

                {/* Track individual order action button row */}
                <TouchableOpacity 
                  style={styles.trackBadge}
                  onPress={() => router.push({
                    pathname: '/track-order',
                    params: { 
                      title: primaryItem?.name,
                      price: `₹${order.totalPrice}`,
                      id: order.id
                    }
                  })}
                >
                  <Text style={styles.trackBadgeText}>Track</Text>
                </TouchableOpacity>
              </View>
            );
          })
        )}
      </ScrollView>
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
  contentContainer: { padding: 20 },
  emptyContainer: { alignItems: 'center', marginTop: 40 },
  emptyText: { color: '#4B2E2A', fontSize: 16, fontWeight: '600' },
  orderCard: {
    backgroundColor: '#F5EEE8',
    borderRadius: 20,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
  },
  itemImage: { width: 60, height: 60, borderRadius: 12 },
  itemDetails: { flex: 1, marginLeft: 15, marginRight: 10 },
  itemTitle: { fontSize: 15, fontWeight: '700', color: '#4B2E2A' },
  itemSubText: { fontSize: 11, color: '#8D7B70', marginVertical: 2 },
  itemPrice: { fontSize: 12, color: '#4B2E2A' },
  boldPrice: { fontWeight: '700', color: '#6F4E37' },
  trackBadge: { backgroundColor: '#4B2E2A', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 15 },
  trackBadgeText: { color: '#FFF', fontSize: 12, fontWeight: '700' },
});