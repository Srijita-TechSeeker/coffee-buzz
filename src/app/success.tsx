import { router } from 'expo-router';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function SuccessScreen() {
  return (
    <View style={styles.container}>

      <Text style={styles.icon}>✅</Text>

      <Text style={styles.title}>
        Order Successful!
      </Text>

      <Text style={styles.message}>
        Your coffee order has been placed successfully.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace('/home')}
      >
        <Text style={styles.buttonText}>
          Back To Home
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5EEE8',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },

  icon: {
    fontSize: 80,
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#4B2E2A',
  },

  message: {
    marginTop: 15,
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
  },

  button: {
    marginTop: 35,
    backgroundColor: '#6F4E37',
    paddingHorizontal: 40,
    height: 55,
    borderRadius: 28,
    justifyContent: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});