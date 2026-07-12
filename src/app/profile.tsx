import { router } from 'expo-router';
import {
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function ProfileHubScreen() {
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4B2E2A" />

      {/* Main Header Banner */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/home')}>
          <Text style={styles.backText}>⬅️</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 30 }} />
      </View>

      {/* Centered User Account Summary Row */}
      <View style={styles.userSummary}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400' }}
          style={styles.avatar}
        />
        <Text style={styles.userName}>{user?.fullName || 'Srijita'}</Text>
        <Text style={styles.userEmail}>{user?.email || 'srijita@example.com'}</Text>
      </View>

      {/* Navigation Options List Item Block matching the Screenshot Flow */}
      <View style={styles.menuList}>
        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/edit-profile')}>
          <Text style={styles.menuText}>1. Edit Profile</Text>
          <Text style={styles.arrowIcon}>➡️</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/order-history')}>
          <Text style={styles.menuText}>2. Order History</Text>
          <Text style={styles.arrowIcon}>➡️</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/contact-us')}>
          <Text style={styles.menuText}>3. Contact Us</Text>
          <Text style={styles.arrowIcon}>➡️</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/terms')}>
          <Text style={styles.menuText}>4. Terms & Conditions</Text>
          <Text style={styles.arrowIcon}>➡️</Text>
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
  userSummary: { alignItems: 'center', marginTop: 30, marginBottom: 20 },
  avatar: { width: 90, height: 90, borderRadius: 45, borderWidth: 3, borderColor: '#4B2E2A', marginBottom: 10 },
  userName: { fontSize: 20, fontWeight: '700', color: '#4B2E2A' },
  userEmail: { fontSize: 14, color: '#5A3B32', marginTop: 2 },
  menuList: { paddingHorizontal: 20, marginTop: 10 },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5EEE8',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 12,
    elevation: 1,
  },
  menuText: { fontSize: 15, fontWeight: '600', color: '#4B2E2A' },
  arrowIcon: { fontSize: 14, color: '#4B2E2A' },
});