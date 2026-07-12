import { router } from 'expo-router';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const notifications = [
  {
    id: 1,
    title: 'Order Updated',
    desc: 'Your order is ready for pickup.',
    time: '20 min ago',
  },
  {
    id: 2,
    title: 'Your Order Is Ready!',
    desc: 'You can collect your coffee now.',
    time: '25 min ago',
  },
  {
    id: 3,
    title: 'Promotion Alert',
    desc: 'Buy 1 Get 1 Free on Cappuccino.',
    time: '2 hrs ago',
  },
  {
    id: 4,
    title: 'Flash Sale 50% Off',
    desc: 'Special discount for premium members.',
    time: '3 hrs ago',
  },
  {
    id: 5,
    title: 'New Arrival',
    desc: 'Try our new Hazelnut Latte.',
    time: '1 day ago',
  },
];

export default function NotificationScreen() {
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Notification</Text>

        <View style={{ width: 20 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {notifications.map(item => (
          <View key={item.id} style={styles.card}>

            <View style={styles.iconContainer}>
              <Text style={styles.icon}>☕</Text>
            </View>

            <View style={styles.content}>
              <Text style={styles.cardTitle}>
                {item.title}
              </Text>

              <Text style={styles.cardDesc}>
                {item.desc}
              </Text>
            </View>

            <Text style={styles.time}>
              {item.time}
            </Text>

          </View>
        ))}
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5EEE8',
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },

  back: {
    fontSize: 24,
    color: '#4B2E2A',
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#4B2E2A',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 15,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 22,
    backgroundColor: '#F5EEE8',
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    fontSize: 20,
  },

  content: {
    flex: 1,
    marginLeft: 12,
  },

  cardTitle: {
    fontWeight: '700',
    color: '#4B2E2A',
    marginBottom: 3,
  },

  cardDesc: {
    color: '#8D7B70',
    fontSize: 13,
  },

  time: {
    color: '#999',
    fontSize: 11,
  },
});