import { Colors, Spacing } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const SplashScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [progress, setProgress] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const { checkAuth, isLoading } = useAuth();

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Progress bar animation
    let progressValue = 0;
    const progressInterval = setInterval(() => {
      progressValue += 2;
      if (progressValue <= 100) {
        setProgress(progressValue);
      } else {
        clearInterval(progressInterval);
      }
    }, 30);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    // Navigate after loading completes
    if (progress >= 100 && !isLoading) {
      const timer = setTimeout(() => {
        router.replace('/(auth)/role-selection');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [progress, isLoading]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Background decorative elements */}
      <View style={styles.backgroundBlob1} />
      <View style={styles.backgroundBlob2} />

      {/* Main content */}
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoIcon}>📄</Text>
          </View>
          <Text style={styles.brandName}>Zero-Paper</Text>
        </View>

        {/* Tagline */}
        <Text style={styles.tagline}>Paperless Campus Recruitment</Text>

        {/* Loading indicator */}
        <View style={styles.loadingContainer}>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.statusText}>Initializing...</Text>
        </View>
      </Animated.View>

      {/* Bottom text */}
      <View style={[styles.bottomText, { paddingBottom: insets.bottom }]}>
        <Text style={styles.versionText}>v1.0.0</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundBlob1: {
    position: 'absolute',
    top: -height * 0.2,
    left: -width * 0.3,
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: Colors.light.secondary,
    opacity: 0.1,
  },
  backgroundBlob2: {
    position: 'absolute',
    bottom: -height * 0.2,
    right: -width * 0.3,
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    backgroundColor: Colors.light.tertiaryFixed,
    opacity: 0.15,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.five,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: Spacing.four,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: Colors.light.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.three,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  logoIcon: {
    fontSize: 40,
  },
  brandName: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.light.onPrimary,
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 16,
    color: Colors.light.onPrimaryContainer,
    marginBottom: Spacing.six,
    textAlign: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 200,
  },
  progressBarBackground: {
    width: '100%',
    height: 4,
    backgroundColor: Colors.light.surfaceContainerHigh,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: Spacing.two,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.light.tertiaryFixed,
    borderRadius: 2,
  },
  statusText: {
    fontSize: 12,
    color: Colors.light.onPrimaryContainer,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  bottomText: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
  },
  versionText: {
    fontSize: 12,
    color: Colors.light.onPrimaryContainer,
    opacity: 0.6,
  },
});

export default SplashScreen;
