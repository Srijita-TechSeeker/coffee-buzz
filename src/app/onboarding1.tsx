import { router } from 'expo-router';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function Onboarding1() {
  return (
    <SafeAreaView style={styles.container}>

      {/* Background Decorations */}
      <View style={styles.topCircle} />
      <View style={styles.bottomCircle} />

      {/* Skip */}
      <TouchableOpacity style={styles.skipBtn}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Coffee Image */}
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
        }}
        style={styles.image}
      />

      {/* Title */}
      <Text style={styles.title}>
        Welcome to Coffee Buzz!
      </Text>

      {/* Description */}
      <Text style={styles.description}>
        Discover your perfect coffee blend and
        enjoy handcrafted brews every day.
      </Text>

      {/* Progress Dots */}
      <View style={styles.dots}>
        <View style={styles.activeDot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>

      {/* Next Button */}
      <TouchableOpacity
  style={styles.skipBtn}
  onPress={() => router.push('/onboarding2')}
>
  <Text style={styles.skipText}>Skip</Text>
</TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: '#5B4037',
  alignItems: 'center',
  paddingHorizontal: 24,
  paddingTop: 60,
},

  topCircle: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width,
    backgroundColor: 'rgba(255,255,255,0.05)',
    top: -width * 0.3,
    right: -width * 0.2,
  },

  bottomCircle: {
    position: 'absolute',
    width: width * 0.9,
    height: width * 0.9,
    borderRadius: width,
    backgroundColor: 'rgba(255,255,255,0.04)',
    bottom: -width * 0.4,
    left: -width * 0.3,
  },

  skipBtn: {
    position: 'absolute',
    top: 60,
    right: 25,
  },

  skipText: {
    color: '#F5E6D3',
    fontSize: 16,
    fontWeight: '500',
  },

  

  title: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 15,
  },
  image: {
  width: 260,
  height: 260,
  borderRadius: 130,
  marginBottom: 30,
},

  description: {
    color: '#D7CCC8',
    textAlign: 'center',
    lineHeight: 26,
    fontSize: 16,
    marginBottom: 40,
    paddingHorizontal: 10,
  },

  dots: {
    flexDirection: 'row',
    marginTop: 10,
  marginBottom: 120,
  },

  activeDot: {
    width: 28,
    height: 8,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 4,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#A1887F',
    marginHorizontal: 4,
  },

  nextButton: {
    position: 'absolute',
    bottom: 50,
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: '#F5E6D3',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },

  arrow: {
    fontSize: 28,
    color: '#4E342E',
    fontWeight: 'bold',
  },
});