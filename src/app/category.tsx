import { router, useLocalSearchParams } from 'expo-router';
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useCart } from '../context/CartContext';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 50) / 2;

const menuData: Record<string, Array<{ name: string; price: string; image: string; desc: string }>> = {
  Hot: [
    { name: "Latte", price: "₹130", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800", desc: "Creamy espresso blended with milk." },
    { name: "Espresso", price: "₹100", image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800", desc: "Rich and strong espresso shots." },
    { name: "Cappuccino", price: "₹120", image: "https://images.unsplash.com/photo-1710173472469-9d28e977914c?q=80&w=616", desc: "Classic foam topped cappuccino." },
    { name: "Mocha", price: "₹150", image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800", desc: "Smooth espresso mixed with chocolate." },
  ],
  Cold: [
    { name: "Cold Brew", price: "₹160", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600", desc: "Slow brewed chilled over ice." },
    { name: "Iced Latte", price: "₹150", image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600", desc: "Espresso with cold milk over ice." },
    { name: "Iced Americano", price: "₹140", image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600", desc: "Fresh espresso poured over ice." },
  ],
  Drinks: [
    { name: "Chocolate Shake", price: "₹180", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600", desc: "Creamy chocolate thick shake." },
    { name: "Lemon Tea", price: "₹90", image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600", desc: "Refreshing lemon iced tea twist." },
    { name: "Mango Smoothie", price: "₹170", image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=600", desc: "Fresh mango blended with yogurt." },
  ],
  Snacks: [
    { name: "Croissant", price: "₹90", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600", desc: "Fresh flaky buttery croissant." },
    { name: "Chocolate Muffin", price: "₹80", image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600", desc: "Soft double chocolate chip muffin." },
  ],
};

export default function CategoryScreen() {
  const searchParams = useLocalSearchParams();
  const { addToCart } = useCart();

  // Safely extract parameter string with fallbacks to avoid undefined property rendering crashes
  const categoryName = (searchParams && typeof searchParams.type === 'string') ? searchParams.type : 'Hot';
  const displayItems = menuData[categoryName] || [];

  const getHeaderTitle = (cat: string) => {
    if (cat === 'Hot') return 'Hot Coffee';
    if (cat === 'Cold') return 'Cold Brews';
    return cat;
  };

  return (
    <View style={styles.container}>
      {/* Structural Header Layout Wrapper */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backArrow}>⬅️</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{getHeaderTitle(categoryName)}</Text>
        <View style={styles.placeholderSpacer} /> 
      </View>

      {/* Grid Content Scroller */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.gridContainer}>
        {displayItems.map((item, index) => (
          <View key={index} style={styles.productCard}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push({
                pathname: '/details',
                params: { name: item.name, price: item.price, image: item.image }
              })}
            >
              <Image source={{ uri: item.image }} style={styles.productImage} />
            </TouchableOpacity>

            <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.productDesc} numberOfLines={1}>{item.desc}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>

            <View style={styles.cardActions}>
              <TouchableOpacity 
                style={styles.cartButton}
                onPress={() => addToCart({ name: item.name, price: item.price, image: item.image, size: 'Large' })}
              >
                <Text style={styles.cartButtonText}>+ Cart</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.buyButton}
                onPress={() => router.push({
                  pathname: '/details',
                  params: { name: item.name, price: item.price, image: item.image }
                })}
              >
                <Text style={styles.buyButtonText}>Buy</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5EEE8',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
    width: '100%',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  backArrow: {
    fontSize: 18,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#4B2E2A',
  },
  placeholderSpacer: { 
    width: 40,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 18,
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  productCard: {
    width: CARD_WIDTH,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  productImage: {
    width: '100%',
    height: 115,
    borderRadius: 15,
    backgroundColor: '#F9F9F9',
  },
  productName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#4B2E2A',
    marginTop: 8,
  },
  productDesc: {
    fontSize: 11,
    color: '#8D7B70',
    marginTop: 2,
  },
  productPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: '#6F4E37',
    marginTop: 6,
    marginBottom: 8,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
  },
  cartButton: {
    flex: 1.2,
    borderWidth: 1,
    borderColor: '#6F4E37',
    paddingVertical: 6,
    borderRadius: 10,
    alignItems: 'center',
  },
  cartButtonText: {
    color: '#6F4E37',
    fontSize: 11,
    fontWeight: '700',
  },
  buyButton: {
    flex: 1,
    backgroundColor: '#6F4E37',
    paddingVertical: 6,
    borderRadius: 10,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '700',
  },
});