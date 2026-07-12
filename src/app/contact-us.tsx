import { router } from 'expo-router';
import { useState } from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function ContactUsScreen() {
  const [message, setMessage] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4B2E2A" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>⬅️</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contact Us</Text>
        <View style={{ width: 30 }} />
      </View>

      <View style={styles.formContainer}>
        <TextInput 
          style={styles.emailInput}
          placeholder="Enter Your Email"
          placeholderTextColor="#C5B4A6"
          editable={false}
          value="user@coffee.com"
        />

        <TextInput 
          style={styles.textArea}
          multiline
          numberOfLines={6}
          placeholder="How can we help?"
          placeholderTextColor="#C5B4A6"
          value={message}
          onChangeText={setMessage}
        />
      </View>

      {/* Send Button */}
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={() => { alert('Message sent!'); router.back(); }}>
          <Text style={styles.actionButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#C8B6A6' },
  header: {
    height: 60,
    backgroundColor: '#4B2E2A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: { padding: 6 },
  backText: { fontSize: 18, color: '#FFF' },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: '700' },
  formContainer: { padding: 24 },
  emailInput: { backgroundColor: '#F5EEE8', height: 50, borderRadius: 15, paddingHorizontal: 16, marginBottom: 15, color: '#4B2E2A' },
  textArea: { backgroundColor: '#F5EEE8', borderRadius: 15, padding: 16, height: 150, textAlignVertical: 'top', color: '#4B2E2A' },
  footerContainer: { position: 'absolute', bottom: 30, left: 24, right: 24 },
  actionButton: { backgroundColor: '#4B2E2A', height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' },
  actionButtonText: { color: '#FFF', fontSize: 15, fontWeight: '700' },
});