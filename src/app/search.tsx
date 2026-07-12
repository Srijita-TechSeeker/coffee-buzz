import { router } from 'expo-router';
import { useState } from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const coffeeData = [
  {
    id: '1',
    name: 'Cappuccino',
    price: '₹120',
    image:
      'https://images.unsplash.com/photo-1710173472469-9d28e977914c?q=80&w=616',
  },
  {
    id: '2',
    name: 'Americano',
    price: '₹110',
    image:
      'https://images.unsplash.com/photo-1536227661368-deef57acf708?q=80&w=870',
  },
  {
    id: '3',
    name: 'Latte',
    price: '₹130',
    image:
      'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800',
  },
  {
    id: '4',
    name: 'Espresso',
    price: '₹100',
    image:
      'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800',
  },
];

export default function SearchScreen() {
  const [search, setSearch] = useState('');

  const filtered = coffeeData.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>

      
      <View style={styles.header}>

  <TouchableOpacity onPress={() => router.back()}>
    <Text style={styles.backArrow}>←</Text>
  </TouchableOpacity>

  <Text style={styles.heading}>
    Search Coffee
  </Text>

</View>

      <TextInput
        placeholder="Search Cappuccino, Latte..."
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
             <TouchableOpacity
    style={styles.card}
    onPress={() =>
      router.push({
        pathname: '/details',
        params: {
          name: item.name,
          price: item.price,
          image: item.image,
        },
      })
    }
  > 
  <Text
      style={{
        fontSize: 22,
        color: '#6F4E37',
        fontWeight: 'bold',
      }}
    >
      →
    </Text>
  </TouchableOpacity>

            <Image
              source={{ uri: item.image }}
              style={styles.image}
            />

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>
                {item.name}
              </Text>

              <Text style={styles.price}>
                {item.price}
              </Text>
            </View>

          </View>
        )}
      />

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

  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#4B2E2A',
    marginBottom: 20,
  },

  searchInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    height: 55,
    paddingHorizontal: 18,
    marginBottom: 20,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 12,
    marginBottom: 15,
    alignItems: 'center',
  },

  image: {
    width: 75,
    height: 75,
    borderRadius: 15,
    marginRight: 15,
  },

  name: {
    fontSize: 17,
    fontWeight: '700',
    color: '#4B2E2A',
  },

  price: {
    marginTop: 5,
    color: '#8B5E3C',
    fontWeight: '700',
  },
  header: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 20,
},

backArrow: {
  fontSize: 28,
  color: '#4B2E2A',
  marginRight: 15,
  fontWeight: '600',
},


});