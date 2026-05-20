import { Input } from '@/components/Input';
import { Colors, Spacing } from '@/constants/theme';
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
  gender: string;
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
  city: string;
  state: string;
  linkedInUrl: string;
  githubUrl: string;
  portfolioUrl: string;
}

const StudentBasicDetailsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    phoneNumber: '',
    email: '',
    city: '',
    state: '',
    linkedInUrl: '',
    githubUrl: '',
    portfolioUrl: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveAndContinue = () => {
    if (validateForm()) {
      router.push('/(student)/skills-interests' as any);
    } else {
      Alert.alert('Validation Error', 'Please fill in all required fields.');
    }
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/(auth)/role-selection');
    }
  };

  const handleCancel = () => {
    Alert.alert(
      'Cancel',
      'Are you sure you want to cancel? Your changes will be lost.',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', style: 'destructive', onPress: () => {} },
      ]
    );
  };

  const handlePhotoUpload = () => {
    Alert.alert('Photo Upload', 'Photo upload functionality to be implemented');
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
        <View style={styles.profilePhoto}>
          <Text style={styles.profileInitials}>AR</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressStep}>
            <View style={[styles.stepCircle, styles.stepActive]}>
              <Text style={[styles.stepNumber, styles.stepNumberActive]}>1</Text>
            </View>
            <Text style={[styles.stepLabel, styles.stepLabelActive]}>Basic Info</Text>
          </View>
          <View style={styles.progressLine}>
            <View style={[styles.progressLineFill, styles.progressLineFillActive]} />
          </View>
          <View style={styles.progressStep}>
            <View style={styles.stepCircle}>
              <Text style={styles.stepNumber}>2</Text>
            </View>
            <Text style={styles.stepLabel}>Education</Text>
          </View>
          <View style={styles.progressLine} />
          <View style={styles.progressStep}>
            <View style={styles.stepCircle}>
              <Text style={styles.stepNumber}>3</Text>
            </View>
            <Text style={styles.stepLabel}>Verify</Text>
          </View>
        </View>

        {/* Header Content */}
        <View style={styles.headerSection}>
          <Text style={styles.title}>Build Your Digital Identity</Text>
          <Text style={styles.subtitle}>
            We'll use these details to match you with top-tier enterprise recruiters. Make sure
            everything is up to date.
          </Text>
        </View>

        {/* Photo Upload Area */}
        <View style={styles.photoUploadCard}>
          <TouchableOpacity style={styles.photoUploadArea} onPress={handlePhotoUpload}>
            <View style={styles.photoPlaceholder}>
              <Text style={styles.photoIcon}>📷</Text>
            </View>
            <View style={styles.editBadge}>
              <Text style={styles.editIcon}>✏️</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.photoLabel}>Profile Photo</Text>
          <Text style={styles.photoHelper}>PNG, JPG up to 5MB</Text>
        </View>

        {/* Identity Grid */}
        <View style={styles.row}>
          <View style={styles.halfField}>
            <Input
              label="First Name"
              placeholder="e.g. Alex"
              value={formData.firstName}
              onChangeText={(text) => handleInputChange('firstName', text)}
              error={errors.firstName}
            />
          </View>
          <View style={styles.halfField}>
            <Input
              label="Last Name"
              placeholder="e.g. Rivers"
              value={formData.lastName}
              onChangeText={(text) => handleInputChange('lastName', text)}
              error={errors.lastName}
            />
          </View>
        </View>

        {/* Demographics Grid */}
        <View style={styles.row}>
          <View style={styles.halfField}>
            <Text style={styles.label}>Gender</Text>
            <View style={[styles.inputContainer, errors.gender && styles.inputError]}>
              <TextInput
                style={styles.input}
                placeholder="Select Gender"
                value={formData.gender}
                onChangeText={(text) => handleInputChange('gender', text)}
                placeholderTextColor={Colors.light.onSurfaceVariant}
              />
            </View>
            {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}
          </View>
          <View style={styles.halfField}>
            <Input
              label="Date of Birth"
              placeholder="YYYY-MM-DD"
              value={formData.dateOfBirth}
              onChangeText={(text) => handleInputChange('dateOfBirth', text)}
              error={errors.dateOfBirth}
            />
          </View>
        </View>

        {/* Contact Details Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Contact Details</Text>
          <View style={styles.sectionDivider} />

          <Input
            label="Phone Number"
            placeholder="+1 (555) 000-0000"
            value={formData.phoneNumber}
            onChangeText={(text) => handleInputChange('phoneNumber', text)}
            keyboardType="phone-pad"
            error={errors.phoneNumber}
            icon={<Text style={styles.inputIcon}>📞</Text>}
          />

          <Input
            label="Email Address"
            placeholder="alex.rivers@university.edu"
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
            icon={<Text style={styles.inputIcon}>✉️</Text>}
          />

          <View style={styles.row}>
            <View style={styles.halfField}>
              <Input
                label="City"
                placeholder="San Francisco"
                value={formData.city}
                onChangeText={(text) => handleInputChange('city', text)}
                error={errors.city}
              />
            </View>
            <View style={styles.halfField}>
              <Input
                label="State"
                placeholder="CA"
                value={formData.state}
                onChangeText={(text) => handleInputChange('state', text)}
                error={errors.state}
              />
            </View>
          </View>
        </View>

        {/* Professional Links Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Professional Links</Text>
          <View style={styles.sectionDivider} />

          <Input
            label="LinkedIn URL"
            placeholder="linkedin.com/in/username"
            value={formData.linkedInUrl}
            onChangeText={(text) => handleInputChange('linkedInUrl', text)}
            keyboardType="url"
            autoCapitalize="none"
            icon={<Text style={styles.inputIcon}>💼</Text>}
          />

          <Input
            label="GitHub URL"
            placeholder="github.com/username"
            value={formData.githubUrl}
            onChangeText={(text) => handleInputChange('githubUrl', text)}
            keyboardType="url"
            autoCapitalize="none"
            icon={<Text style={styles.inputIcon}>💻</Text>}
          />

          <Input
            label="Portfolio URL"
            placeholder="portfolio-site.com"
            value={formData.portfolioUrl}
            onChangeText={(text) => handleInputChange('portfolioUrl', text)}
            keyboardType="url"
            autoCapitalize="none"
            icon={<Text style={styles.inputIcon}>🌐</Text>}
          />
        </View>
      </ScrollView>

      {/* Sticky Bottom Action Container */}
      <View style={[styles.bottomActionContainer, { paddingBottom: insets.bottom + Spacing.four }]}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel} activeOpacity={0.8}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSaveAndContinue}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>Save & Continue</Text>
          <Text style={styles.saveButtonIcon}>→</Text>
        </TouchableOpacity>
      </View>
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
    justifyContent: 'space-between',
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
  },
  backIcon: {
    fontSize: 20,
    color: Colors.light.onSurfaceVariant,
  },
  brandName: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.light.secondary,
  },
  profilePhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.secondary,
    borderWidth: 2,
    borderColor: Colors.light.outlineVariant,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInitials: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.onSecondary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.five,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.six,
    paddingHorizontal: Spacing.two,
  },
  progressStep: {
    alignItems: 'center',
    gap: Spacing.two,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.light.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepActive: {
    backgroundColor: Colors.light.secondary,
  },
  stepNumber: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.light.onSurfaceVariant,
  },
  stepNumberActive: {
    color: Colors.light.onSecondary,
  },
  stepLabel: {
    fontSize: 12,
    color: Colors.light.onSurfaceVariant,
  },
  stepLabelActive: {
    fontWeight: '600',
    color: Colors.light.secondary,
  },
  progressLine: {
    flex: 1,
    height: 2,
    marginHorizontal: Spacing.four,
    backgroundColor: Colors.light.outlineVariant,
  },
  progressLineFill: {
    width: '0%',
    height: '100%',
    backgroundColor: Colors.light.secondary,
  },
  progressLineFillActive: {
    width: '100%',
  },
  headerSection: {
    marginBottom: Spacing.six,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.light.onSurface,
    marginBottom: Spacing.two,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.onSurfaceVariant,
    lineHeight: 24,
  },
  photoUploadCard: {
    backgroundColor: Colors.light.surfaceContainerLowest,
    borderRadius: 16,
    padding: Spacing.four,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.light.outlineVariant,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 2,
    marginBottom: Spacing.six,
  },
  photoUploadArea: {
    position: 'relative',
  },
  photoPlaceholder: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.light.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.light.outlineVariant,
    borderStyle: 'dashed',
  },
  photoIcon: {
    fontSize: 40,
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.light.secondary,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  editIcon: {
    fontSize: 14,
  },
  photoLabel: {
    marginTop: Spacing.four,
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.onSurface,
  },
  photoHelper: {
    fontSize: 14,
    color: Colors.light.onSurfaceVariant,
    marginTop: Spacing.one,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.three,
    marginBottom: Spacing.six,
  },
  halfField: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.onSurfaceVariant,
    marginBottom: Spacing.one,
    paddingHorizontal: Spacing.one,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.surfaceContainerLow,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  inputError: {
    borderColor: Colors.light.error,
  },
  input: {
    flex: 1,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
    fontSize: 16,
    color: Colors.light.onSurface,
    minHeight: 48,
  },
  errorText: {
    fontSize: 12,
    color: Colors.light.error,
    marginTop: Spacing.one,
    paddingHorizontal: Spacing.one,
  },
  inputIcon: {
    fontSize: 20,
    marginRight: Spacing.two,
  },
  sectionCard: {
    backgroundColor: Colors.light.surfaceContainerLowest,
    borderRadius: 16,
    padding: Spacing.four,
    borderWidth: 1,
    borderColor: Colors.light.outlineVariant,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 2,
    marginBottom: Spacing.six,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.light.onSurface,
    marginBottom: Spacing.two,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: Colors.light.outlineVariant,
    marginBottom: Spacing.four,
  },
  bottomActionContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: Spacing.five,
    paddingTop: Spacing.six,
    borderTopWidth: 1,
    borderTopColor: Colors.light.outlineVariant,
    flexDirection: 'row',
    gap: Spacing.four,
  },
  cancelButton: {
    flex: 1,
    height: 56,
    backgroundColor: Colors.light.surfaceContainerHigh,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.onSurfaceVariant,
  },
  saveButton: {
    flex: 2,
    height: 56,
    backgroundColor: Colors.light.secondary,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.onSecondary,
  },
  saveButtonIcon: {
    fontSize: 20,
    color: Colors.light.onSecondary,
  },
});

export default StudentBasicDetailsScreen;
