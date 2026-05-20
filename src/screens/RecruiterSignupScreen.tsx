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

interface SignupData {
  companyName: string;
  recruiterName: string;
  designation: string;
  officialEmail: string;
  password: string;
}

const RecruiterSignupScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { signup } = useAuth();
  const [signupData, setSignupData] = useState<SignupData>({
    companyName: '',
    recruiterName: '',
    designation: '',
    officialEmail: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof SignupData, string>>>({});

  const handleFieldChange = (field: keyof SignupData, value: string) => {
    setSignupData({ ...signupData, [field]: value });
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof SignupData, string>> = {};

    if (!signupData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!signupData.recruiterName.trim()) {
      newErrors.recruiterName = 'Recruiter name is required';
    }

    if (!signupData.designation.trim()) {
      newErrors.designation = 'Designation is required';
    }

    if (!signupData.officialEmail.trim()) {
      newErrors.officialEmail = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(signupData.officialEmail)) {
        newErrors.officialEmail = 'Invalid email format';
      }
    }

    if (!signupData.password) {
      newErrors.password = 'Password is required';
    } else if (signupData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const result = await signup({
        email: signupData.officialEmail,
        password: signupData.password,
        role: 'recruiter',
        companyName: signupData.companyName,
        recruiterName: signupData.recruiterName,
        designation: signupData.designation,
      });

      if (!result.success) {
        Alert.alert('Signup Failed', result.error || 'An error occurred during signup');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = () => {
    router.push('/(auth)/recruiter-login');
  };

  const handleTerms = () => {
    Alert.alert('Coming Soon', 'Terms of Service will be available soon.');
  };

  const handlePrivacy = () => {
    Alert.alert('Coming Soon', 'Privacy Policy will be available soon.');
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { paddingTop: insets.top }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.brandName}>Zero-Paper</Text>
        <TouchableOpacity onPress={handleSignIn}>
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + Spacing.four }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Recruiter Signup</Text>
          <Text style={styles.heroSubtitle}>
            Join Zero-Paper to start verifying and hiring students with digital IDs.
          </Text>
        </View>

        {/* Signup Form */}
        <View style={styles.formContainer}>
          <Input
            label="Company Name"
            placeholder="e.g. Acme Corporation"
            value={signupData.companyName}
            onChangeText={(text) => handleFieldChange('companyName', text)}
            error={errors.companyName}
          />

          <Input
            label="Recruiter Name"
            placeholder="Your full name"
            value={signupData.recruiterName}
            onChangeText={(text) => handleFieldChange('recruiterName', text)}
            error={errors.recruiterName}
          />

          <Input
            label="Designation"
            placeholder="e.g. Talent Acquisition Lead"
            value={signupData.designation}
            onChangeText={(text) => handleFieldChange('designation', text)}
            error={errors.designation}
          />

          <Input
            label="Official Email"
            placeholder="name@company.com"
            value={signupData.officialEmail}
            onChangeText={(text) => handleFieldChange('officialEmail', text)}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.officialEmail}
          />

          <View style={styles.passwordContainer}>
            <Input
              label="Password"
              placeholder="Min. 8 characters"
              value={signupData.password}
              onChangeText={(text) => handleFieldChange('password', text)}
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

          <Button
            title="Create Recruiter Account"
            onPress={handleSignup}
            loading={loading}
            fullWidth
            style={styles.signupButton}
          />

          {/* Terms and Privacy */}
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By signing up, you agree to our{' '}
              <Text style={styles.termsLink} onPress={handleTerms}>
                Terms of Service
              </Text>{' '}
              and{' '}
              <Text style={styles.termsLink} onPress={handlePrivacy}>
                Privacy Policy
              </Text>
              .
            </Text>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>10k+</Text>
            <Text style={styles.statLabel}>Students</Text>
          </View>
          <View style={[styles.statItem, styles.statItemBorder]}>
            <Text style={styles.statValue}>100%</Text>
            <Text style={styles.statLabel}>Paperless</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>50ms</Text>
            <Text style={styles.statLabel}>Verification</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 Zero-Paper Recruitment. All rights reserved.</Text>
          <View style={styles.footerLinks}>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Support</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.footerLink}>API Docs</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Trust Center</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.five,
    paddingVertical: Spacing.three,
  },
  brandName: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.light.secondary,
  },
  signInText: {
    fontSize: 14,
    fontWeight: '600',
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
    fontSize: 14,
    color: Colors.light.onSurfaceVariant,
    lineHeight: 20,
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
  signupButton: {
    marginTop: Spacing.four,
  },
  termsContainer: {
    marginTop: Spacing.four,
    alignItems: 'center',
  },
  termsText: {
    fontSize: 12,
    color: Colors.light.onSurfaceVariant,
    textAlign: 'center',
  },
  termsLink: {
    color: Colors.light.secondary,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: Spacing.six,
    marginBottom: Spacing.six,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statItemBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: Colors.light.outlineVariant,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.light.secondary,
    marginBottom: Spacing.one,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.light.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
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
    textAlign: 'center',
  },
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.four,
  },
  footerLink: {
    fontSize: 12,
    color: Colors.light.onSurfaceVariant,
  },
});

export default RecruiterSignupScreen;
