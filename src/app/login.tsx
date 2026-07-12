import { router } from 'expo-router';
import { useState } from 'react'; // Added to track inputs
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '../context/AuthContext'; // Import the real Auth Hook

export default function LoginScreen() {
  // 1. Create states to capture the input data dynamically
  const [fullName, setFullName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const { login } = useAuth(); // 2. Extract the persistent save function

  const handleNext = async () => {
    if (!fullName.trim() || !phoneNo.trim()) {
      alert('Please enter your details to continue! ☕');
      return;
    }

    try {
      // 3. Save the actual user data to disk storage
      await login({
        fullName: fullName,
        phoneNo: phoneNo,
        email: `${fullName.toLowerCase().replace(/\s+/g, '')}@coffee.com`, // Smart default email fallback
      });

      // Move on to your verification step with data safely locked in
      router.push('/verify');
    } catch (error) {
      console.error("Failed to save login data", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          }}
          style={styles.topImage}
        />
      </View>

      <View style={styles.wave1} />
      <View style={styles.wave2} />

      {/* Header */}
      <Text style={styles.welcome}>Welcome!</Text>

      {/* Card */}
      <View style={styles.card}>
        <Text style={styles.label}>
          What's Your Mobile Number?
        </Text>

        {/* Bound to fullName state */}
        <TextInput
          placeholder="Full Name"
          placeholderTextColor="#999"
          value={fullName}
          onChangeText={setFullName}
          style={styles.input}
        />

        {/* Bound to phoneNo state */}
        <TextInput
          placeholder="Phone Number"
          placeholderTextColor="#999"
          keyboardType="phone-pad"
          value={phoneNo}
          onChangeText={setPhoneNo}
          style={styles.input}
        />

        <Text style={styles.terms}>
          By continuing, you agree to our{' '}
          <Text
            style={styles.termsLink}
            onPress={() => router.push('/terms')}
          >
            Terms & Conditions
          </Text>
        </Text>

        {/* Triggering the handleNext pipeline */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNext}
        >
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5EEE8',
    alignItems: 'center',
  },
  topSection: {
    width: '100%',
    height: 300,
    overflow: 'hidden',
    borderBottomLeftRadius: 120,
    borderBottomRightRadius: 120,
  },
  topImage: {
    width: '100%',
    height: '100%',
  },
  wave1: {
    position: 'absolute',
    top: 250,
    left: -50,
    width: 180,
    height: 100,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    backgroundColor: '#7A5A4A',
  },
  wave2: {
    position: 'absolute',
    top: 250,
    right: -50,
    width: 180,
    height: 100,
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
    backgroundColor: '#8B6A58',
  },
  welcome: {
    marginTop: -10,
    fontSize: 34,
    fontWeight: '900',
    color: '#ee9090',
    zIndex: 20,
  },
  card: {
    marginTop: 40,
    width: '88%',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 25,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 6,
  },
  label: {
    textAlign: 'center',
    fontSize: 16,
    color: '#4B2E2A',
    marginBottom: 25,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#F7F3EF',
    height: 52,
    borderRadius: 15,
    paddingHorizontal: 16,
    marginBottom: 15,
    fontSize: 15,
    color: '#4B2E2A',
  },
  terms: {
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
    marginTop: 10,
    marginBottom: 35,
  },
  termsLink: {
    color: '#5A3B32',
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: '#5A3B32',
    height: 55,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});