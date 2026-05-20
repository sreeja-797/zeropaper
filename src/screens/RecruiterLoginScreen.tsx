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
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const RecruiterLoginScreen: React.FC = () => {
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

    router.push('/(recruiter)/dashboard');
  };

  const handleGoogleLogin = () => {
    Alert.alert('Coming Soon', 'Google login will be available soon.');
  };

  const handleSSOLogin = () => {
    Alert.alert('Coming Soon', 'SSO login will be available soon.');
  };

  const handleForgotPassword = () => {
    Alert.alert('Coming Soon', 'Password reset will be available soon.');
  };

  const handleRequestDemo = () => {
    Alert.alert('Coming Soon', 'Demo request will be available soon.');
  };

  const handleSignup = () => {
    router.push('/(auth)/recruiter-signup');
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { paddingTop: insets.top }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoIcon}>📄</Text>
          </View>
          <Text style={styles.brandName}>Zero-Paper</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + Spacing.four }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Recruiter Login</Text>
          <Text style={styles.heroSubtitle}>
            Access your enterprise dashboard
          </Text>
        </View>

        {/* Login Form */}
        <View style={styles.formContainer}>
          <Input
            label="Company Email"
            placeholder="alex.rivers@enterprise.com"
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
              <Text style={styles.checkboxLabel}>Remember this device</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleForgotPassword}>
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
            onPress={handleSSOLogin}
          >
            <Text style={styles.socialIcon}>🏢</Text>
            <Text style={styles.socialButtonText}>SSO</Text>
          </TouchableOpacity>
        </View>

        {/* Request Demo Link */}
        <View style={styles.demoContainer}>
          <Text style={styles.demoText}>
            Don't have an enterprise account?{' '}
            <Text style={styles.demoLink} onPress={handleSignup}>Sign Up</Text>
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 Zero-Paper Inc. All rights reserved.</Text>
          <View style={styles.footerLinks}>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Security Standards</Text>
            </TouchableOpacity>
          </View>
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
    paddingHorizontal: Spacing.five,
    paddingVertical: Spacing.three,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.light.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIcon: {
    fontSize: 18,
  },
  brandName: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.light.secondary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.five,
  },
  heroSection: {
    marginVertical: Spacing.six,
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
  demoContainer: {
    alignItems: 'center',
    marginBottom: Spacing.six,
  },
  demoText: {
    fontSize: 14,
    color: Colors.light.onSurfaceVariant,
  },
  demoLink: {
    color: Colors.light.secondary,
    fontWeight: '600',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: Colors.light.outlineVariant,
    paddingTop: Spacing.four,
    paddingBottom: Spacing.four,
  },
  footerText: {
    fontSize: 12,
    color: Colors.light.onSurfaceVariant,
    marginBottom: Spacing.three,
  },
  footerLinks: {
    flexDirection: 'row',
    gap: Spacing.four,
  },
  footerLink: {
    fontSize: 12,
    color: Colors.light.onSurfaceVariant,
  },
});

export default RecruiterLoginScreen;
