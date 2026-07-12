import { router } from 'expo-router';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function Onboarding2() {
  return (
    <View style={styles.container}>

      {/* Skip */}
      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => router.push('/onboarding3')}
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Coffee Image */}
      <Image
        source={{
          uri: 'https://plus.unsplash.com/premium_photo-1675435644687-562e8042b9db?q=80&w=1498&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        }}
        style={styles.coffeeImage}
      />

      {/* Title */}
      <Text style={styles.title}>
        Personalize Your Experience
      </Text>

      {/* Description */}
      <Text style={styles.description}>
        Set your preferred roast, favorite drinks,
        and taste profile to receive personalized
        coffee recommendations.
      </Text>

      {/* Dots */}
      <View style={styles.dotsContainer}>
        <View style={styles.inactiveDot} />
        <View style={styles.activeDot} />
        <View style={styles.inactiveDot} />
      </View>

      {/* Next Button */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => router.push('/onboarding3')}
      >
        <Text style={styles.arrow}>→</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4B2E2A',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },

  skipButton: {
    position: 'absolute',
    top: 60,
    right: 25,
  },

  skipText: {
    color: '#F5E8DC',
    fontSize: 16,
  },

  coffeeImage: {
    width: 240,
    height: 240,
    borderRadius: 120,
    marginBottom: 40,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },

  description: {
    color: '#D8C3B0',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 26,
    paddingHorizontal: 10,
  },

  dotsContainer: {
    flexDirection: 'row',
    marginTop: 35,
    marginBottom: 70,
  },

  inactiveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#A58D7B',
    marginHorizontal: 5,
  },

  activeDot: {
    width: 22,
    height: 8,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 5,
  },

  nextButton: {
    width: 55,
    height: 55,
    borderRadius: 27,
    backgroundColor: '#F5E8DC',
    justifyContent: 'center',
    alignItems: 'center',
  },

  arrow: {
    fontSize: 24,
    color: '#4B2E2A',
    fontWeight: 'bold',
  },
});