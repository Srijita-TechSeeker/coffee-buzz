import { router } from 'expo-router';
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function Onboarding3() {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Background Decorations */}
      <View style={styles.topCircle} />
      <View style={styles.bottomCircle} />

      {/* Skip */}
      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => router.replace('/login')}
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Image */}
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1000',
        }}
        style={styles.image}
      />

      {/* Title */}
      <Text style={styles.title}>
        Order Ahead & Earn Rewards
      </Text>

      {/* Description */}
      <Text style={styles.description}>
        Skip the queue, customize your coffee,
        {'\n'}
        collect reward points and enjoy exclusive
        {'\n'}
        CoffeeBuzz member benefits.
      </Text>

      {/* Dots */}
      <View style={styles.dotsContainer}>
        <View style={styles.inactiveDot} />
        <View style={styles.inactiveDot} />
        <View style={styles.activeDot} />
      </View>

      {/* Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace('/login')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#5B4037',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
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
    width: width,
    height: width,
    borderRadius: width,
    backgroundColor: 'rgba(255,255,255,0.04)',
    bottom: -width * 0.4,
    left: -width * 0.3,
  },

  skipButton: {
    position: 'absolute',
    top: 60,
    right: 25,
    zIndex: 10,
  },

  skipText: {
    color: '#F5E8DC',
    fontSize: 16,
    fontWeight: '600',
  },

  image: {
    width: 240,
    height: 240,
    borderRadius: 120,
    marginBottom: 35,
    marginTop: 40,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 18,
  },

  description: {
    color: '#D8C3B0',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 35,
    paddingHorizontal: 10,
  },

  dotsContainer: {
    flexDirection: 'row',
    marginBottom: 40,
  },

  inactiveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#A58D7B',
    marginHorizontal: 5,
  },

  activeDot: {
    width: 28,
    height: 8,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 5,
  },

  button: {
    width: width * 0.7,
    height: 58,
    borderRadius: 30,
    backgroundColor: '#F5E8DC',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },

  buttonText: {
    color: '#4B2E2A',
    fontSize: 18,
    fontWeight: '700',
  },
});