import { router } from "expo-router";
import { useRef, useState } from "react";
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

const hotCoffee = [
  {
    name: "Latte",
    price: "₹130",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800",
    desc: "Creamy espresso blended with steamed milk and soft foam.",
  },
  {
    name: "Espresso",
    price: "₹100",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800",
    desc: "Rich and strong espresso made from freshly roasted beans.",
  },
  {
    name: "Cappuccino",
    price: "₹120",
    image: "https://images.unsplash.com/photo-1710173472469-9d28e977914c?q=80&w=616",
    desc: "Classic cappuccino with creamy milk foam and espresso.",
  },
  {
    name: "Mocha",
    price: "₹150",
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800",
    desc: "Smooth espresso mixed with rich chocolate and steamed milk.",
  },
];

const coldCoffee = [
  {
    name: "Cold Brew",
    price: "₹160",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600",
    desc: "Slow brewed coffee served chilled over ice for a smooth taste.",
  },
  {
    name: "Iced Latte",
    price: "₹150",
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600",
    desc: "Espresso with chilled milk served over ice.",
  },
  {
    name: "Iced Americano",
    price: "₹140",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600",
    desc: "Fresh espresso poured over ice with cold water.",
  },
];

const drinks = [
  {
    name: "Chocolate Shake",
    price: "₹180",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600",
    desc: "Creamy chocolate shake topped with whipped cream.",
  },
  {
    name: "Lemon Tea",
    price: "₹90",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600",
    desc: "Refreshing lemon tea with a light citrus flavor.",
  },
  {
    name: "Mango Smoothie",
    price: "₹170",
    image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=600",
    desc: "Fresh mango smoothie blended with creamy yogurt.",
  },
];

const snacks = [
  {
    name: "Croissant",
    price: "₹90",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600",
    desc: "Fresh buttery croissant baked daily.",
  },
  {
    name: "Chocolate Muffin",
    price: "₹80",
    image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600",
    desc: "Soft chocolate muffin with chocolate chips.",
  },
];

export default function MenuScreen() {
  const [selected, setSelected] = useState("Hot");
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  let data = hotCoffee;
  if (selected === "Cold") data = coldCoffee;
  if (selected === "Drinks") data = drinks;
  if (selected === "Snacks") data = snacks;

  const coffee = data[currentIndex] || data[0] || {};

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Menu</Text>
      </View>

      {/* Search Bar */}
      <TouchableOpacity
        style={styles.searchBar}
        onPress={() =>
          router.push({
            pathname: "/search",
            params: { from: "menu" },
          })
        }
      >
        <Text style={styles.searchEmoji}>🔍</Text>
        <Text style={styles.searchPlaceholder}>Search Coffee...</Text>
      </TouchableOpacity>

      <ScrollView 
        style={styles.scroll} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Giant Dark Brown Arced Header Background */}
        <View style={styles.giantArcBackground}>
          <View style={styles.categoryRowContainer}>
            
            <TouchableOpacity
              style={[styles.categoryItem, { marginTop: 40 }]}
              onPress={() => {
                setSelected("Hot");
                setCurrentIndex(0);
                scrollRef.current?.scrollTo({ x: 0, animated: false });
              }}
            >
              <View style={[styles.categoryCircle, selected === "Hot" && styles.activeCategoryCircle]}>
                <Text style={styles.categoryEmoji}>☕</Text>
              </View>
              <Text style={styles.categoryText}>Hot Coffee</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.categoryItem, { marginTop: 5 }]}
              onPress={() => {
                setSelected("Cold");
                setCurrentIndex(0);
                scrollRef.current?.scrollTo({ x: 0, animated: false });
              }}
            >
              <View style={[styles.categoryCircle, selected === "Cold" && styles.activeCategoryCircle]}>
                <Text style={styles.categoryEmoji}>🧋</Text>
              </View>
              <Text style={styles.categoryText}>Cold Coffee</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.categoryItem, { marginTop: 5 }]}
              onPress={() => {
                setSelected("Drinks");
                setCurrentIndex(0);
                scrollRef.current?.scrollTo({ x: 0, animated: false });
              }}
            >
              <View style={[styles.categoryCircle, selected === "Drinks" && styles.activeCategoryCircle]}>
                <Text style={styles.categoryEmoji}>🥤</Text>
              </View>
              <Text style={styles.categoryText}>Drinks</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.categoryItem, { marginTop: 40 }]}
              onPress={() => {
                setSelected("Snacks");
                setCurrentIndex(0);
                scrollRef.current?.scrollTo({ x: 0, animated: false });
              }}
            >
              <View style={[styles.categoryCircle, selected === "Snacks" && styles.activeCategoryCircle]}>
                <Text style={styles.categoryEmoji}>🥐</Text>
              </View>
              <Text style={styles.categoryText}>Snacks</Text>
            </TouchableOpacity>

          </View>
        </View>

        {/* Coffee Carousel */}
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToInterval={SCREEN_WIDTH}
          decelerationRate="fast"
          scrollEventThrottle={16}
          onScroll={(event) => {
            const offsetX = event.nativeEvent.contentOffset.x;
            const index = Math.round(offsetX / SCREEN_WIDTH);
            
            if (index !== currentIndex && index >= 0 && index < data.length) {
              setCurrentIndex(index);
            }
          }}
        >
          {data.map((item, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.9}
              style={styles.sliderItem}
              onPress={() =>
                router.push({
                  pathname: "/details",
                  params: {
                    name: item.name,
                    price: item.price,
                    image: item.image,
                  },
                })
              }
            >
              <Image source={{ uri: item.image }} style={styles.mainCoffeeImage} />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Product Details Section */}
        <View style={styles.detailsContainer}>
          <Text style={styles.productName}>{coffee.name}</Text>
          <Text style={styles.productDesc}>{coffee.desc}</Text>
          <Text style={styles.productPrice}>{coffee.price}</Text>

          <View style={styles.dotRow}>
            {data.map((_, index) => (
              <View
                key={index}
                style={currentIndex === index ? styles.activeDot : styles.dot}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Corrected Bottom Navigation Bar */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNavBg}>
          {/* First Button: Fixed to Home Shortcut */}
          <TouchableOpacity 
            style={styles.navButton} 
            onPress={() => router.push('/home')}
            activeOpacity={0.7}
          >
            <Text style={styles.navIcon}>🏠</Text>
          </TouchableOpacity>
          
          {/* Middle Floating Button: Stays Menu (Current Screen indicator) */}
          <View style={styles.centerNavWrapper}>
            <TouchableOpacity 
              style={styles.centerNavButton} 
              activeOpacity={1}
            >
              <Text style={styles.centerNavIcon}>☕</Text>
            </TouchableOpacity>
          </View>

          {/* Last Button: Stays Cart Shortcut */}
          <TouchableOpacity 
            style={styles.navButton} 
            onPress={() => router.push('/cart')}
            activeOpacity={0.7}
          >
            <Text style={styles.navIcon}>🛒</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C5B4A5",
  },
  header: {
    height: 100,
    backgroundColor: "#4E3629",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 40,
    zIndex: 10,
  },
  headerTitle: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "600",
  },
  searchBar: {
    marginTop: 15,
    marginBottom: 15,
    marginHorizontal: 20,
    height: 55,
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  searchEmoji: {
    fontSize: 20,
  },
  searchPlaceholder: {
    marginLeft: 12,
    fontSize: 16,
    color: "#888",
    fontWeight: "500",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  giantArcBackground: {
    width: SCREEN_WIDTH * 1.6,
    height: SCREEN_WIDTH * 1.2,
    borderRadius: (SCREEN_WIDTH * 1.6) / 2,
    backgroundColor: "#4E3629",
    alignSelf: "center",
    marginTop: -SCREEN_WIDTH * 0.55,
    justifyContent: "flex-end",
    alignItems: "center",
    overflow: "hidden",
    paddingBottom: 35,
  },
  categoryRowContainer: {
    width: SCREEN_WIDTH,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    paddingHorizontal: 10,
  },
  categoryItem: {
    alignItems: "center",
    width: 75,
  },
  categoryCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  activeCategoryCircle: {
    backgroundColor: "#FFF",
  },
  categoryEmoji: {
    fontSize: 22,
  },
  categoryText: {
    color: "#D2C4B9",
    fontSize: 11,
    fontWeight: "500",
    textAlign: "center",
  },
  mainCoffeeImage: {
    width: 220,
    height: 220,
    resizeMode: "contain",
  },
  detailsContainer: {
    alignItems: "center",
    paddingHorizontal: 30,
    marginTop: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2E1E16",
    textAlign: "center",
  },
  productDesc: {
    fontSize: 14,
    color: "#5E4D44",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 20,
  },
  productPrice: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2E1E16",
    marginTop: 12,
  },
  dotRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  bottomNavContainer: {
    position: "absolute",
    bottom: 25,
    left: 20,
    right: 20,
    zIndex: 20,
  },
  bottomNavBg: {
    backgroundColor: "#4E3629",
    height: 70,
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  navButton: {
    padding: 10,
  },
  navIcon: {
    fontSize: 24,
    color: "#FFF",
  },
  centerNavWrapper: {
    top: -25,
    alignItems: "center",
    justifyContent: "center",
  },
  centerNavButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: "#C5B4A5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  centerNavIcon: {
    fontSize: 24,
  },
  sliderItem: {
    width: SCREEN_WIDTH,
    justifyContent: "center",
    alignItems: "center",
    height: 250,
  },
  activeDot: {
    width: 22,
    height: 8,
    borderRadius: 10,
    backgroundColor: "#6F4E37",
    marginHorizontal: 5,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D7CCC8",
    marginHorizontal: 5,
  }, 
});