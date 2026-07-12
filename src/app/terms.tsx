import { router } from 'expo-router';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function TermsScreen() {
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>
          Terms & Conditions
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        <Text style={styles.paragraph}>
          Welcome to CoffeeBuzz.
        </Text>

        <Text style={styles.paragraph}>
          By using this application you agree to comply with all
          applicable laws and regulations.
        </Text>

        <Text style={styles.paragraph}>
          We may collect information such as your name,
          mobile number and preferences to improve your
          experience and provide personalized coffee
          recommendations.
        </Text>

        <Text style={styles.paragraph}>
          Reward points, offers and promotions are subject
          to change without prior notice.
        </Text>

        <Text style={styles.paragraph}>
          Your data is protected according to our Privacy
          Policy and will never be sold to third parties.
        </Text>

        <Text style={styles.paragraph}>
          Continued use of CoffeeBuzz means you accept
          these terms and future updates.
        </Text>

      </ScrollView>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.back()}
      >
        <Text style={styles.buttonText}>
          I Agree
        </Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5EEE8',
  },

  header: {
    paddingTop: 20,
    paddingBottom: 15,
    alignItems: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#5A3B32',
  },

  content: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },

  paragraph: {
    fontSize: 15,
    color: '#555',
    lineHeight: 26,
    marginBottom: 18,
  },

  button: {
    margin: 20,
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