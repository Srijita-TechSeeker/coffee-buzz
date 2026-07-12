import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function EditProfileFormScreen() {
  const { user, updateProfile, loading } = useAuth();
  const [fullName, setFullName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user) {
      setFullName(user.fullName);
      setPhoneNo(user.phoneNo);
      setEmail(user.email);
    }
  }, [user]);

  const handleSave = async () => {
    if (!fullName.trim() || !phoneNo.trim() || !email.trim()) {
      alert('Fields cannot be blank! ☕');
      return;
    }
    await updateProfile({ fullName, phoneNo, email });
    alert('Changes saved successfully! 🎉');
    router.back();
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#4B2E2A" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4B2E2A" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>⬅️</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400' }}
          style={styles.avatar}
        />
        <View style={styles.cameraBadge}><Text style={{ fontSize: 12 }}>📷</Text></View>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Full Name</Text>
          <TextInput style={styles.input} value={fullName} onChangeText={setFullName} placeholderTextColor="#C5B4A6" />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Phone No.</Text>
          <TextInput style={styles.input} value={phoneNo} onChangeText={setPhoneNo} keyboardType="phone-pad" placeholderTextColor="#C5B4A6" />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" placeholderTextColor="#C5B4A6" />
        </View>
      </View>

      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.deleteButton} onPress={() => alert('Account clearance activated.')}>
          <Text style={styles.deleteButtonText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#C8B6A6' },
  header: { height: 60, backgroundColor: '#4B2E2A', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  backButton: { padding: 6 },
  backText: { fontSize: 18, color: '#FFF' },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: '700' },
  saveText: { color: '#EADBC8', fontSize: 16, fontWeight: '600' },
  avatarContainer: { alignItems: 'center', marginTop: 35, marginBottom: 25, position: 'relative', alignSelf: 'center' },
  avatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: '#4B2E2A' },
  cameraBadge: { position: 'absolute', bottom: 0, right: 4, backgroundColor: '#4B2E2A', width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center', borderWidth: 1.5, borderColor: '#FFF' },
  formContainer: { paddingHorizontal: 24, marginTop: 10 },
  inputWrapper: { marginBottom: 20 },
  inputLabel: { fontSize: 14, fontWeight: '600', color: '#4B2E2A', marginBottom: 6, paddingLeft: 4 },
  input: { backgroundColor: '#F5EEE8', height: 52, borderRadius: 15, paddingHorizontal: 16, fontSize: 15, color: '#4B2E2A', fontWeight: '500' },
  footerContainer: { position: 'absolute', bottom: 30, left: 24, right: 24 },
  deleteButton: { backgroundColor: '#4B2E2A', height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' },
  deleteButtonText: { color: '#FFF', fontSize: 15, fontWeight: '700' },
});