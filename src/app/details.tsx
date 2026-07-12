import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useCart } from '../context/CartContext';

export default function DetailsScreen() {
  const params = useLocalSearchParams();
  
  const name = Array.isArray(params.name) ? params.name[0] : params.name || 'Coffee';
  const price = Array.isArray(params.price) ? params.price[0] : params.price || '₹0';
  const image = Array.isArray(params.image) ? params.image[0] : params.image || '';

  const [selectedSize, setSelectedSize] = useState('Large');
  
  // Custom State for the Pop-up banner notification
  const [showPopup, setShowPopup] = useState(false);
  
  const { addToCart, clearCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      name: String(name),
      price: String(price),
      image: String(image),
      size: selectedSize,
    });

    // Trigger the custom visual popup banner instantly
    setShowPopup(true);

    // Automatically hide the pop-up notification banner after 2.5 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 2500);
  };

  const handleBuyNow = () => {
    clearCart();
    addToCart({
      name: String(name),
      price: String(price),
      image: String(image),
      size: selectedSize,
    });
    router.push('/payment');
  };

  return (
    <View style={styles.container}>
      {/* 🌟 CUSTOM BULLETPROOF POPUP BANNER */}
      {showPopup && (
        <View style={styles.popupBanner}>
          <Text style={styles.popupText}>
            ☕ Added to Cart: {name} ({selectedSize})!
          </Text>
        </View>
      )}

      {/* Back button overlay */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.rating}>⭐ 4.8 (1.2k Reviews)</Text>

        <Text style={styles.description}>
          Crafted from premium roasted coffee beans and blended perfectly for a rich, smooth and aromatic coffee experience.
        </Text>

        <Text style={styles.sectionTitle}>Select Size</Text>
        <View style={styles.sizeRow}>
          {['Small', 'Medium', 'Large'].map((size) => (
            <TouchableOpacity
              key={size}
              style={selectedSize === size ? styles.activeSize : styles.sizeButton}
              onPress={() => setSelectedSize(size)}
            >
              <Text style={selectedSize === size ? styles.activeText : styles.normalText}>
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.price}>{price}</Text>
        <Text style={styles.sizeDisplayLabel}>Size: {selectedSize}</Text>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
            <Text style={styles.buyNowText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5EEE8' },
  
  // Styling rules for the custom pop-up banner layout component
  popupBanner: {
    position: 'absolute',
    top: 55,
    left: 20,
    right: 20,
    backgroundColor: '#4B2E2A',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 25,
    zIndex: 999,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  popupText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },

  backButton: { position: 'absolute', top: 50, left: 20, zIndex: 10, backgroundColor: '#FFFFFF', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', elevation: 4 },
  backButtonText: { fontSize: 20, color: '#4B2E2A', fontWeight: 'bold' },
  image: { width: '100%', height: 320 },
  content: { flex: 1, padding: 24 },
  title: { fontSize: 30, fontWeight: '700', color: '#4B2E2A' },
  rating: { marginTop: 8, color: '#8B5E3C', fontSize: 15 },
  description: { marginTop: 18, color: '#666', lineHeight: 24, fontSize: 15 },
  sectionTitle: { marginTop: 28, marginBottom: 15, fontSize: 18, fontWeight: '700', color: '#4B2E2A' },
  sizeRow: { flexDirection: 'row', justifyContent: 'space-between' },
  sizeButton: { backgroundColor: '#FFFFFF', borderRadius: 25, paddingVertical: 12, paddingHorizontal: 22, borderWidth: 1, borderColor: '#DDD' },
  activeSize: { backgroundColor: '#6F4E37', borderRadius: 25, paddingVertical: 12, paddingHorizontal: 22 },
  normalText: { color: '#4B2E2A', fontWeight: '600' },
  activeText: { color: '#FFFFFF', fontWeight: '700' },
  price: { marginTop: 35, fontSize: 32, fontWeight: '700', color: '#6F4E37' },
  sizeDisplayLabel: { marginTop: 10, color: '#8B5E3C', fontSize: 16, fontWeight: '600' },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 'auto', marginBottom: 20 },
  addToCartButton: { flex: 1, borderWidth: 2, borderColor: '#6F4E37', height: 54, borderRadius: 27, justifyContent: 'center', alignItems: 'center', marginRight: 8 },
  addToCartText: { color: '#6F4E37', fontSize: 16, fontWeight: '700' },
  buyNowButton: { flex: 1, backgroundColor: '#6F4E37', height: 54, borderRadius: 27, justifyContent: 'center', alignItems: 'center', marginLeft: 8 },
  buyNowText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});