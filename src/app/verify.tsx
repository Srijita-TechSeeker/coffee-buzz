import { router } from 'expo-router';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function VerifyScreen() {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Verify Your Number
      </Text>

      <Text style={styles.subtitle}>
        Enter the 4-digit code sent to
      </Text>

      <Text style={styles.phone}>
        +91 XXXXX XXXXX
      </Text>

      {/* OTP Boxes */}
      <View style={styles.otpContainer}>
        <TextInput style={styles.otpBox} maxLength={1} keyboardType="number-pad" />
        <TextInput style={styles.otpBox} maxLength={1} keyboardType="number-pad" />
        <TextInput style={styles.otpBox} maxLength={1} keyboardType="number-pad" />
        <TextInput style={styles.otpBox} maxLength={1} keyboardType="number-pad" />
      </View>

      <Text style={styles.resend}>
        Didn't receive code?
      </Text>

      <TouchableOpacity>
        <Text style={styles.resendLink}>
          Resend OTP
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace('/home')}
      >
        <Text style={styles.buttonText}>
          Verify
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
    paddingHorizontal: 25,
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#5A3B32',
    marginBottom: 15,
  },

  subtitle: {
    fontSize: 15,
    color: '#777',
  },

  phone: {
    fontSize: 17,
    fontWeight: '600',
    color: '#5A3B32',
    marginTop: 8,
    marginBottom: 40,
  },

  otpContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },

  otpBox: {
    width: 60,
    height: 60,
    marginHorizontal: 6,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
  },

  resend: {
    color: '#888',
    marginBottom: 8,
  },

  resendLink: {
    color: '#5A3B32',
    fontWeight: '700',
    textDecorationLine: 'underline',
    marginBottom: 40,
  },

  button: {
    width: '100%',
    height: 55,
    backgroundColor: '#5A3B32',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
});