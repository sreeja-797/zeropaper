import { router } from 'expo-router';
import { useEffect } from 'react';

export default function HomeScreen() {
  useEffect(() => {
    // Navigate to splash screen on app start
    router.replace('/(auth)/splash');
  }, []);

  return null;
}
