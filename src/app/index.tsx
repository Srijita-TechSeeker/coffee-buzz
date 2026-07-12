import { router } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import Splash from './splash';

export default function Index() {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }).start(() => {
        router.replace('/onboarding1');
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View
      style={{
        flex: 1,
        opacity,
      }}
    >
      <Splash />
    </Animated.View>
  );
}