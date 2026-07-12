import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Splash() {
  return (
    <View style={styles.container}>
      <View style={styles.topBlob} />
      <View style={styles.bottomBlob} />

      <Image
        source={require('../../assets/decorations/leaf-top-left.jpg')}
        style={styles.leafTop}
        resizeMode="contain"
      />

      <Image
        source={require('../../assets/decorations/cup-top-right.jpg')}
        style={styles.cupTop}
        resizeMode="contain"
      />

      <Image
        source={require('../../assets/decorations/french-press-sketch.jpg')}
        style={styles.frenchPress}
        resizeMode="contain"
      />

      <Image
        source={require('../../assets/decorations/Coffee-Beans-Realistic.jpg')}
        style={styles.beansBottom}
        resizeMode="contain"
      />

      <Image
        source={require('../../assets/decorations/Single-Coffee-Bean-Outline.jpg')}
        style={styles.bean1}
        resizeMode="contain"
      />

      <Image
        source={require('../../assets/decorations/Single-Coffee-Bean-Outline.jpg')}
        style={styles.bean2}
        resizeMode="contain"
      />

      <Image
        source={require('../../assets/decorations/Single-Coffee-Bean-Outline.jpg')}
        style={styles.bean3}
        resizeMode="contain"
      />

      <Image
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/924/924514.png',
        }}
        style={styles.logo}
      />

      <Text style={styles.title}>CoffeeBuzz</Text>

      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <View style={styles.dot} />
      </View>

      <Text style={styles.subtitle}>
        The best grain, the finest roast,{'\n'}
        the powerful flavor.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8F6',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  topBlob: {
    position: 'absolute',
    top: -height * 0.12,
    left: -width * 0.25,
    width: width * 1.1,
    height: height * 0.28,
    backgroundColor: '#F4E8DC',
    borderBottomRightRadius: 180,
  },

  bottomBlob: {
    position: 'absolute',
    bottom: -height * 0.12,
    right: -width * 0.25,
    width: width * 1.1,
    height: height * 0.28,
    backgroundColor: '#F4E8DC',
    borderTopLeftRadius: 180,
  },

  leafTop: {
    position: 'absolute',
    top: height * 0.07,
    left: width * 0.05,
    width: width * 0.45,
    height: width * 0.45,
    opacity: 0.3,
  },

  cupTop: {
    position: 'absolute',
    top: height * 0.08,
    right: width * 0.06,
    width: width * 0.22,
    height: width * 0.22,
    opacity: 0.3,
  },

  frenchPress: {
    position: 'absolute',
    bottom: height * 0.08,
    left: width * 0.05,
    width: width * 0.25,
    height: width * 0.25,
    opacity: 0.3,
  },

  beansBottom: {
    position: 'absolute',
    bottom: height * 0.03,
    right: width * 0.03,
    width: width * 0.35,
    height: width * 0.25,
  },

  bean1: {
    position: 'absolute',
    top: height * 0.24,
    left: width * 0.42,
    width: 30,
    height: 30,
    opacity: 0.35,
  },

  bean2: {
    position: 'absolute',
    top: height * 0.30,
    left: width * 0.30,
    width: 35,
    height: 35,
    opacity: 0.35,
  },

  bean3: {
    position: 'absolute',
    top: height * 0.25,
    right: width * 0.35,
    width: 30,
    height: 30,
    opacity: 0.35,
  },

  logo: {
    width: width * 0.35,
    height: width * 0.35,
    marginBottom: 10,
  },

  title: {
    fontSize: width * 0.12,
    fontWeight: 'bold',
    color: '#4B2618',
  },

  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },

  line: {
    width: width * 0.18,
    height: 6,
    borderRadius: 10,
    backgroundColor: '#D7B28C',
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D7B28C',
    marginLeft: 8,
  },

  subtitle: {
    textAlign: 'center',
    color: '#666',
    fontSize: width * 0.045,
    lineHeight: 28,
    paddingHorizontal: 30,
  },
});