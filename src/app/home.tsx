import { router } from 'expo-router';
import { useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useCart } from '../context/CartContext';

// Calculate screen width to make the layout sliding accurate across both web and mobile windows
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = 320; 
const CARD_MARGIN = 15;
const SNAP_INTERVAL = CARD_WIDTH + CARD_MARGIN;

export default function HomeScreen() {
  const [activeSlide, setActiveSlide] = useState(0);
  const { cartItems } = useCart(); 

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good Morning!</Text>
          <Text style={styles.subGreeting}>
            Let's start with a fresh coffee ☕
          </Text>
        </View>

        <TouchableOpacity
          style={styles.notificationContainer}
          onPress={() => router.push('/notification')}
        >
          <Text style={styles.notification}>🔔</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Search */}
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => router.push('/search')}
        >
          <Text style={styles.searchText}>
            🔍 Search coffee, latte, cappuccino...
          </Text>
        </TouchableOpacity>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Our Menu</Text>

        <View style={styles.menuRow}>
          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => router.push({ pathname: '/category', params: { type: 'Hot' } })}
          >
            <View style={styles.categoryCircle}>
              <Text style={styles.menuEmoji}>☕</Text>
            </View>
            <Text style={styles.menuText}>Hot Coffee</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => router.push({ pathname: '/category', params: { type: 'Cold' } })}
          >
            <View style={styles.categoryCircle}>
              <Text style={styles.menuEmoji}>🧊</Text>
            </View>
            <Text style={styles.menuText}>Cold Brew</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => router.push({ pathname: '/category', params: { type: 'Drinks' } })}
          >
            <View style={styles.categoryCircle}>
              <Text style={styles.menuEmoji}>🥤</Text>
            </View>
            <Text style={styles.menuText}>Drinks</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => router.push({ pathname: '/category', params: { type: 'Snacks' } })}
          >
            <View style={styles.categoryCircle}>
              <Text style={styles.menuEmoji}>🥐</Text>
            </View>
            <Text style={styles.menuText}>Snacks</Text>
          </TouchableOpacity>
        </View>

        {/* Offers */}
        <Text style={styles.sectionTitle}>
          Today's Special Offer
        </Text>

        {/* FIXED SLIDER: Added contentContainerStyle, snapToInterval, and layout configurations */}
        <ScrollView
          horizontal
          pagingEnabled={false} // Turn off standard full page snap to prevent layout locking
          snapToInterval={SNAP_INTERVAL} // Snap exactly element by element
          snapToAlignment="start"
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          onScroll={(event) => {
            const currentXOffset = event.nativeEvent.contentOffset.x;
            const slide = Math.round(currentXOffset / SNAP_INTERVAL);
            if (slide >= 0 && slide <= 2 && slide !== activeSlide) {
              setActiveSlide(slide);
            }
          }}
          scrollEventThrottle={16}
        >
          <View style={styles.offerCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.offerTitle}>
                Premium Cappuccino
              </Text>
              <Text style={styles.offerDesc}>
                Fresh roasted beans with creamy milk foam.
              </Text>
              <Text style={styles.offerPrice}>
                ₹149
              </Text>
              <TouchableOpacity
                style={styles.buyButton}
                onPress={() =>
                  router.push({
                    pathname: '/details',
                    params: {
                      name: 'Premium Cappuccino',
                      price: '₹149',
                      image:
                        'https://images.unsplash.com/photo-1587080413959-06b859fb107d?q=80&w=592&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    },
                  })
                }
              >
                <Text style={styles.buyText}>Buy Now</Text>
              </TouchableOpacity>
            </View>

            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1587080413959-06b859fb107d?q=80&w=592&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              }}
              style={styles.offerImage}
            />
          </View>

          <View style={styles.offerCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.offerTitle}>
                Caramel Latte
              </Text>
              <Text style={styles.offerDesc}>
                Sweet caramel blended with espresso.
              </Text>
              <Text style={styles.offerPrice}>
                ₹179
              </Text>
              <TouchableOpacity
                style={styles.buyButton}
                onPress={() =>
                  router.push({
                    pathname: '/details',
                    params: {
                      name: 'Caramel Latte',
                      price: '₹169',
                      image:
                        'https://images.unsplash.com/photo-1534687941688-651ccaafbff8?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    },
                  })
                }
              >
                <Text style={styles.buyText}>Buy Now</Text>
              </TouchableOpacity>
            </View>

            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1534687941688-651ccaafbff8?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              }}
              style={styles.offerImage}
            />
          </View>

          <View style={styles.offerCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.offerTitle}>
                Mocha Delight
              </Text>
              <Text style={styles.offerDesc}>
                Chocolate and coffee in perfect harmony.
              </Text>
              <Text style={styles.offerPrice}>
                ₹199
              </Text>
              <TouchableOpacity
                style={styles.buyButton}
                onPress={() =>
                  router.push({
                    pathname: '/details',
                    params: {
                      name: 'Mocha Delight',
                      price: '₹179',
                      image:
                        'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800',
                    },
                  })
                }
              >
                <Text style={styles.buyText}>Buy Now</Text>
              </TouchableOpacity>
            </View>

            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800',
              }}
              style={styles.offerImage}
            />
          </View>
        </ScrollView>

        {/* Dots */}
        <View style={styles.offerDots}>
          <View style={activeSlide === 0 ? styles.activeOfferDot : styles.offerDot} />
          <View style={activeSlide === 1 ? styles.activeOfferDot : styles.offerDot} />
          <View style={activeSlide === 2 ? styles.activeOfferDot : styles.offerDot} />
        </View>

        {/* Best Seller */}
        <Text style={styles.sectionTitle}>Best Seller</Text>

        <View style={styles.productsGrid}>
          {/* Cappuccino */}
          <TouchableOpacity
            style={styles.productCard}
            onPress={() =>
              router.push({
                pathname: '/details',
                params: {
                  name: 'Cappuccino',
                  price: '₹120',
                  image: 'https://images.unsplash.com/photo-1710173472469-9d28e977914c?q=80&w=616',
                },
              })
            }
          >
            <View>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1710173472469-9d28e977914c?q=80&w=616' }}
                style={styles.productImage}
              />
              <TouchableOpacity
                style={styles.plusButton}
                onPress={() =>
                  router.push({
                    pathname: '/details',
                    params: {
                      name: 'Cappuccino',
                      price: '₹120',
                      image: 'https://images.unsplash.com/photo-1710173472469-9d28e977914c?q=80&w=616',
                    },
                  })
                }
              >
                <Text style={styles.plusText}>+</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.productName}>Cappuccino</Text>
            <Text style={styles.productPrice}>₹120</Text>
          </TouchableOpacity>

          {/* Americano */}
          <TouchableOpacity
            style={styles.productCard}
            onPress={() =>
              router.push({
                pathname: '/details',
                params: {
                  name: 'Americano',
                  price: '₹110',
                  image: 'https://images.unsplash.com/photo-1536227661368-deef57acf708?q=80&w=870',
                },
              })
            }
          >
            <View>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1536227661368-deef57acf708?q=80&w=870' }}
                style={styles.productImage}
              />
              <TouchableOpacity
                style={styles.plusButton}
                onPress={() =>
                  router.push({
                    pathname: '/details',
                    params: {
                      name: 'Americano',
                      price: '₹110',
                      image: 'https://images.unsplash.com/photo-1536227661368-deef57acf708?q=80&w=870',
                    },
                  })
                }
              >
                <Text style={styles.plusText}>+</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.productName}>Americano</Text>
            <Text style={styles.productPrice}>₹110</Text>
          </TouchableOpacity>

          {/* Latte */}
          <TouchableOpacity
            style={styles.productCard}
            onPress={() =>
              router.push({
                pathname: '/details',
                params: {
                  name: 'Latte',
                  price: '₹130',
                  image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800',
                },
              })
            }
          >
            <View>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800' }}
                style={styles.productImage}
              />
              <TouchableOpacity
                style={styles.plusButton}
                onPress={() =>
                  router.push({
                    pathname: '/details',
                    params: {
                      name: 'Latte',
                      price: '₹130',
                      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800',
                    },
                  })
                }
              >
                <Text style={styles.plusText}>+</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.productName}>Latte</Text>
            <Text style={styles.productPrice}>₹140</Text>
          </TouchableOpacity>

          {/* Espresso */}
          <TouchableOpacity
            style={styles.productCard}
            onPress={() =>
              router.push({
                pathname: '/details',
                params: {
                  name: 'Espresso',
                  price: '₹100',
                  image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800',
                },
              })
            }
          >
            <View>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800' }}
                style={styles.productImage}
              />
              <TouchableOpacity
                style={styles.plusButton}
                onPress={() =>
                  router.push({
                    pathname: '/details',
                    params: {
                      name: 'Espresso',
                      price: '₹100',
                      image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800',
                    },
                  })
                }
              >
                <Text style={styles.plusText}>+</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.productName}>Espresso</Text>
            <Text style={styles.productPrice}>₹99</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.bottomBar}>
        <View style={styles.activeNavContainer}>
          <Text style={styles.activeNav}>🏠</Text>
        </View>

        <TouchableOpacity onPress={() => router.push('/menu')}>
          <Text style={styles.nav}>☕</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/cart')} style={styles.cartNavContainer}>
          <Text style={styles.nav}>🛒</Text>
          {cartItems.length > 0 && (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{cartItems.length}</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/profile')}>
          <Text style={styles.nav}>👤</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5EEE8',
    paddingTop: 55,
  },
  header: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#4B2E2A',
  },
  subGreeting: {
    color: '#8D7B70',
    marginTop: 4,
  },
  notificationContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  notification: {
    fontSize: 22,
  },
  searchBar: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
  },
  searchText: {
    color: '#999',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4B2E2A',
    marginHorizontal: 20,
    marginBottom: 15,
    marginTop: 5,
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 25,
  },
  menuItem: {
    alignItems: 'center',
  },
  categoryCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    elevation: 2,
  },
  menuEmoji: {
    fontSize: 26,
  },
  menuText: {
    fontSize: 12,
    color: '#4B2E2A',
  },
  offerCard: {
    width: CARD_WIDTH,
    backgroundColor: '#6F4E37',
    borderRadius: 25,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: CARD_MARGIN,
  },
  offerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  offerDesc: {
    color: '#F5E6D3',
    marginTop: 8,
    width: 140,
  },
  offerPrice: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 10,
  },
  offerImage: {
    width: 95,
    height: 95,
    borderRadius: 50,
  },
  buyButton: {
    marginTop: 12,
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
  },
  buyText: {
    color: '#6F4E37',
    fontWeight: '700',
  },
  offerDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 20,
  },
  activeOfferDot: {
    width: 22,
    height: 8,
    borderRadius: 10,
    backgroundColor: '#6F4E37',
    marginHorizontal: 4,
  },
  offerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D7CCC8',
    marginHorizontal: 4,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  productCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 12,
    marginBottom: 15,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 15,
  },
  plusButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#6F4E37',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  productName: {
    marginTop: 10,
    fontWeight: '700',
    color: '#4B2E2A',
  },
  productPrice: {
    marginTop: 5,
    color: '#8B5E3C',
    fontWeight: '700',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 15,
    left: 20,
    right: 20,
    height: 65,
    backgroundColor: '#5A3B32',
    borderRadius: 35,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  activeNavContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeNav: {
    fontSize: 22,
    color: '#fff',
  },
  nav: {
    fontSize: 22,
    color: '#D7CCC8',
  },
  cartNavContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeContainer: {
    position: 'absolute',
    right: -10,
    top: -6,
    backgroundColor: '#E53935',
    borderRadius: 9,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
  },
});