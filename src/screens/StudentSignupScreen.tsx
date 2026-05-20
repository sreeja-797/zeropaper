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
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface FormData {
  firstName: string;
  lastName: string;
  college: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  college?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const StudentSignupScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { signup } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    college: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.college.trim()) {
      newErrors.college = 'College name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Invalid email format';
      }
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBack = () => {
    router.replace('/(auth)/student-login');
  };

  const handleSignup = async () => {
    if (!termsAccepted) {
      Alert.alert('Terms Required', 'Please accept the Terms of Service to continue.');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const result = await signup({
        email: formData.email,
        password: formData.password,
        role: 'student',
        name: `${formData.firstName} ${formData.lastName}`,
      });

      if (!result.success) {
        Alert.alert('Signup Failed', result.error || 'An error occurred during signup');
      } else {
        router.replace('/(auth)/student-login');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { paddingTop: insets.top }]}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.brandName}>Zero-Paper</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + Spacing.four }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.title}>Join the Future of Talent</Text>
          <Text style={styles.subtitle}>
            Create your student profile and start verifying your credentials instantly.
          </Text>
        </View>

        {/* Form */}
        <View style={styles.formCard}>
          {/* Name Fields */}
          <View style={styles.row}>
            <View style={styles.halfField}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Alex"
                value={formData.firstName}
                onChangeText={(text) => setFormData({ ...formData, firstName: text })}
              />
            </View>
            <View style={styles.halfField}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Rivers"
                value={formData.lastName}
                onChangeText={(text) => setFormData({ ...formData, lastName: text })}
              />
            </View>
          </View>

          {/* College */}
          <View style={styles.field}>
            <Text style={styles.label}>College Name</Text>
            <View style={styles.inputWithIcon}>
              <Text style={styles.inputIcon}>🎓</Text>
              <TextInput
                style={styles.inputWithIconText}
                placeholder="Search your university..."
                value={formData.college}
                onChangeText={(text) => setFormData({ ...formData, college: text })}
              />
            </View>
          </View>

          {/* Email */}
          <View style={styles.field}>
            <Text style={styles.label}>Student Email</Text>
            <TextInput
              style={styles.input}
              placeholder="alex.rivers@university.edu"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Text style={styles.helperText}>
              Use your institutional email for faster verification.
            </Text>
          </View>

          {/* Password Fields */}
          <View style={styles.row}>
            <View style={styles.halfField}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                value={formData.password}
                onChangeText={(text) => setFormData({ ...formData, password: text })}
                secureTextEntry
              />
            </View>
            <View style={styles.halfField}>
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                secureTextEntry
              />
            </View>
          </View>

          {/* Terms */}
          <TouchableOpacity
            style={styles.termsContainer}
            onPress={() => setTermsAccepted(!termsAccepted)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, termsAccepted && styles.checkboxChecked]}>
              {termsAccepted && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.termsText}>
              I agree to the Terms of Service and Privacy Policy, including the digital
              verification of my student credentials.
            </Text>
          </TouchableOpacity>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.submitButton, !termsAccepted && styles.submitButtonDisabled]}
            onPress={handleSignup}
            disabled={!termsAccepted}
            activeOpacity={0.8}
          >
            <Text style={styles.submitButtonText}>Create Account</Text>
            <Text style={styles.submitButtonIcon}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Security Badges */}
        <View style={styles.badgesContainer}>
          <View style={styles.badge}>
            <Text style={styles.badgeIcon}>🔒</Text>
            <Text style={styles.badgeText}>Secure Data Encryption</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeIcon}>🏆</Text>
            <Text style={styles.badgeText}>Official University Partner</Text>
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
    alignItems: 'center',
    paddingHorizontal: Spacing.five,
    paddingVertical: Spacing.three,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.three,
  },
  backIcon: {
    fontSize: 20,
    color: Colors.light.secondary,
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
  welcomeSection: {
    marginBottom: Spacing.six,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.light.onSurface,
    marginBottom: Spacing.two,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.onSurfaceVariant,
    lineHeight: 24,
  },
  formCard: {
    backgroundColor: Colors.light.surfaceContainerLowest,
    borderRadius: 16,
    padding: Spacing.four,
    borderWidth: 1,
    borderColor: Colors.light.outlineVariant,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: Spacing.six,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  halfField: {
    flex: 1,
  },
  field: {
    marginBottom: Spacing.four,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.onSurfaceVariant,
    marginBottom: Spacing.one,
    paddingHorizontal: 4,
  },
  input: {
    backgroundColor: Colors.light.surfaceContainerLow,
    borderRadius: 8,
    height: 48,
    paddingHorizontal: Spacing.four,
    fontSize: 16,
    color: Colors.light.onSurface,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.surfaceContainerLow,
    borderRadius: 8,
    height: 48,
    paddingHorizontal: Spacing.four,
  },
  inputIcon: {
    fontSize: 20,
    marginRight: Spacing.two,
  },
  inputWithIconText: {
    flex: 1,
    fontSize: 16,
    color: Colors.light.onSurface,
  },
  helperText: {
    fontSize: 10,
    color: Colors.light.onPrimaryContainer,
    marginTop: Spacing.one,
    paddingHorizontal: 4,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.three,
    paddingVertical: Spacing.two,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.light.outlineVariant,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: Colors.light.secondary,
    borderColor: Colors.light.secondary,
  },
  checkmark: {
    color: Colors.light.onSecondary,
    fontSize: 14,
    fontWeight: '700',
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: Colors.light.onSurfaceVariant,
    lineHeight: 20,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    backgroundColor: Colors.light.secondary,
    borderRadius: 12,
    height: 56,
    marginTop: Spacing.two,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: Colors.light.onSecondary,
    fontSize: 16,
    fontWeight: '600',
  },
  submitButtonIcon: {
    color: Colors.light.onSecondary,
    fontSize: 20,
  },
  badgesContainer: {
    flexDirection: 'row',
    gap: Spacing.four,
  },
  badge: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    padding: Spacing.three,
    backgroundColor: Colors.light.surfaceContainer,
    borderRadius: 8,
  },
  badgeIcon: {
    fontSize: 20,
  },
  badgeText: {
    fontSize: 12,
    color: Colors.light.onSurfaceVariant,
  },
});

export default StudentSignupScreen;
