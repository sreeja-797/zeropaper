import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Colors, Spacing } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const StudentLoginScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = 'Invalid email format';
      }
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    router.push('/(student)/basic-details');
  };

  const handleGoogleLogin = () => {
    Alert.alert('Coming Soon', 'Google login will be available soon.');
  };

  const handleLinkedInLogin = () => {
    Alert.alert('Coming Soon', 'LinkedIn login will be available soon.');
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/(auth)/role-selection');
    }
  };

  const handleSignup = () => {
    router.push('/(auth)/student-signup');
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { paddingTop: insets.top }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Student Login</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + Spacing.four }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroLogo}>
            <Text style={styles.heroLogoIcon}>📄</Text>
          </View>
          <Text style={styles.heroTitle}>Welcome Back</Text>
          <Text style={styles.heroSubtitle}>
            Sign in to access your digital profile
          </Text>
        </View>

        {/* Login Form */}
        <View style={styles.formContainer}>
          <Input
            label="University Email"
            placeholder="student@university.edu"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
          />

          <View style={styles.passwordContainer}>
            <Input
              label="Password"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              error={errors.password}
            />
            <TouchableOpacity
              style={styles.visibilityToggle}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text style={styles.visibilityIcon}>
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formOptions}>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                {rememberMe && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.checkboxLabel}>Remember me</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          <Button
            title="Sign In"
            onPress={handleLogin}
            loading={loading}
            fullWidth
            style={styles.loginButton}
          />
        </View>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Or continue with</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Social Login */}
        <View style={styles.socialLoginContainer}>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={handleGoogleLogin}
          >
            <Text style={styles.socialIcon}>G</Text>
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={handleLinkedInLogin}
          >
            <Text style={styles.socialIcon}>in</Text>
            <Text style={styles.socialButtonText}>LinkedIn</Text>
          </TouchableOpacity>
        </View>

        {/* Sign Up Link */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>
            Don't have an account?{' '}
            <Text style={styles.signupLink} onPress={handleSignup}>Sign up</Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.five,
    paddingVertical: Spacing.three,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: Colors.light.secondary,
    fontWeight: '600',
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    color: Colors.light.secondary,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.five,
  },
  heroSection: {
    alignItems: 'center',
    marginVertical: Spacing.six,
  },
  heroLogo: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: Colors.light.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.four,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  heroLogoIcon: {
    fontSize: 40,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.light.onSurface,
    marginBottom: Spacing.two,
  },
  heroSubtitle: {
    fontSize: 16,
    color: Colors.light.onSurfaceVariant,
    textAlign: 'center',
  },
  formContainer: {
    marginBottom: Spacing.six,
  },
  passwordContainer: {
    position: 'relative',
  },
  visibilityToggle: {
    position: 'absolute',
    right: Spacing.four,
    top: 48,
  },
  visibilityIcon: {
    fontSize: 20,
  },
  formOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.four,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.light.outlineVariant,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: Colors.light.secondary,
    borderColor: Colors.light.secondary,
  },
  checkmark: {
    fontSize: 14,
    color: Colors.light.onSecondary,
    fontWeight: '600',
  },
  checkboxLabel: {
    fontSize: 14,
    color: Colors.light.onSurfaceVariant,
  },
  forgotPassword: {
    fontSize: 14,
    color: Colors.light.secondary,
    fontWeight: '500',
  },
  loginButton: {
    marginTop: Spacing.two,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.six,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.light.outlineVariant,
  },
  dividerText: {
    paddingHorizontal: Spacing.three,
    fontSize: 12,
    color: Colors.light.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    gap: Spacing.three,
    marginBottom: Spacing.six,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.outlineVariant,
    backgroundColor: Colors.light.surfaceContainerLowest,
    gap: Spacing.two,
  },
  socialIcon: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.light.onSurface,
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.onSurface,
  },
  signupContainer: {
    alignItems: 'center',
  },
  signupText: {
    fontSize: 14,
    color: Colors.light.onSurfaceVariant,
  },
  signupLink: {
    color: Colors.light.secondary,
    fontWeight: '600',
  },
});

export default StudentLoginScreen;
