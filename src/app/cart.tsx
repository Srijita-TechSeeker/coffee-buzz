import { router } from 'expo-router';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useCart } from '../context/CartContext';

export default function CartScreen() {
  const { cartItems, removeFromCart, addToCart, clearCart } = useCart();

  const total = cartItems.reduce((sum, item) => {
    const num = parseInt(item.price.replace('₹', ''), 10);
    return sum + (isNaN(num) ? 0 : num);
  }, 0);

  const handleProceedAll = () => {
    router.push('/payment');
  };

  const handleItemBuyNow = (item: typeof cartItems[0]) => {
    clearCart();
    addToCart(item);
    router.push('/payment');
  };

  return (
    <View style={styles.container}>
      {/* Header Row with Back Button */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.heading}>My Cart ({cartItems.length})</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {cartItems.length === 0 ? (
          <Text style={styles.emptyText}>Your cart is empty ☕</Text>
        ) : (
          cartItems.map((item, index) => (
            <View key={index} style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              
              <View style={styles.info}>
                <View style={styles.titleRow}>
                  <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                  
                  <TouchableOpacity 
                    style={styles.deleteButton} 
                    onPress={() => removeFromCart(index)}
                  >
                    <Text style={styles.deleteText}>🗑️</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.size}>Size: {item.size}</Text>
                
                <View style={styles.itemFooter}>
                  <Text style={styles.price}>{item.price}</Text>
                  
                  <TouchableOpacity 
                    style={styles.itemBuyNowBtn} 
                    onPress={() => handleItemBuyNow(item)}
                  >
                    <Text style={styles.itemBuyNowText}>Buy Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {cartItems.length > 0 && (
        <>
          <View style={styles.totalBox}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.total}>₹{total}</Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleProceedAll}>
            <Text style={styles.buttonText}>Proceed To Payment</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F5EEE8', 
    padding: 20, 
    paddingTop: 50 
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 10,
  },
  backButton: {
    backgroundColor: '#FFFFFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginRight: 15,
  },
  backButtonText: {
    fontSize: 20,
    color: '#4B2E2A',
    fontWeight: 'bold',
  },
  heading: { 
    fontSize: 28, 
    fontWeight: '700', 
    color: '#4B2E2A',
    flex: 1,
  },
  emptyText: { textAlign: 'center', marginTop: 100, fontSize: 18, color: '#8B5E3C' },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3,
  },
  image: { width: 90, height: 90, borderRadius: 18 },
  info: { marginLeft: 15, flex: 1 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 18, fontWeight: '700', color: '#4B2E2A', flex: 1, marginRight: 5 },
  deleteButton: { padding: 4 },
  deleteText: { fontSize: 18 },
  size: { marginTop: 2, color: '#8B5E3C', fontSize: 13 },
  itemFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  price: { color: '#6F4E37', fontSize: 18, fontWeight: '700' },
  itemBuyNowBtn: { backgroundColor: '#6F4E37', paddingVertical: 6, paddingHorizontal: 14, borderRadius: 15 },
  itemBuyNowText: { color: '#FFF', fontSize: 12, fontWeight: '700' },
  totalBox: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginBottom: 15 },
  totalLabel: { fontSize: 18, color: '#4B2E2A', fontWeight: '600' },
  total: { fontSize: 24, fontWeight: '700', color: '#6F4E37' },
  button: { backgroundColor: '#6F4E37', height: 58, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  buttonText: { color: '#FFFFFF', fontSize: 17, fontWeight: '700' },
});