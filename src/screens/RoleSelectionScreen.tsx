import { Colors, Spacing } from '@/constants/theme';
import { router } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const RoleSelectionScreen: React.FC = () => {
  const insets = useSafeAreaInsets();

  const handleStudentSelect = () => {
    router.push('/(auth)/student-login');
  };

  const handleRecruiterSelect = () => {
    router.push('/(auth)/recruiter-login');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.logo}>
            <Text style={styles.logoIcon}>📄</Text>
          </View>
          <Text style={styles.brandName}>Zero-Paper</Text>
        </View>
        <TouchableOpacity style={styles.helpButton}>
          <Text style={styles.helpIcon}>?</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + Spacing.four }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <View style={styles.illustration}>
            <Text style={styles.illustrationIcon}>🎓</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Choose your path</Text>
        <Text style={styles.subtitle}>
          Select how you want to use Zero-Paper
        </Text>

        {/* Role Cards */}
        <View style={styles.cardsContainer}>
          {/* Student Card */}
          <TouchableOpacity
            style={styles.roleCard}
            onPress={handleStudentSelect}
            activeOpacity={0.8}
          >
            <View style={styles.cardIconContainer}>
              <Text style={styles.cardIcon}>👨‍🎓</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Student</Text>
              <Text style={styles.cardDescription}>
                Create your digital profile, upload resume, and get discovered by recruiters
              </Text>
            </View>
            <View style={styles.cardArrow}>
              <Text style={styles.arrowIcon}>→</Text>
            </View>
          </TouchableOpacity>

          {/* Recruiter Card */}
          <TouchableOpacity
            style={styles.roleCard}
            onPress={handleRecruiterSelect}
            activeOpacity={0.8}
          >
            <View style={styles.cardIconContainer}>
              <Text style={styles.cardIcon}>💼</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Recruiter</Text>
              <Text style={styles.cardDescription}>
                Scan student QR codes, view verified profiles, and hire top talent
              </Text>
            </View>
            <View style={styles.cardArrow}>
              <Text style={styles.arrowIcon}>→</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Already have an account?{' '}
            <Text style={styles.footerLink}>Log in</Text>
          </Text>
        </View>
      </ScrollView>
    </View>
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
  headerContent: {
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
    fontSize: 16,
  },
  brandName: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.light.secondary,
  },
  helpButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  helpIcon: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.onSurfaceVariant,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.five,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginVertical: Spacing.six,
  },
  illustration: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.light.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationIcon: {
    fontSize: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.light.onSurface,
    textAlign: 'center',
    marginBottom: Spacing.two,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.onSurfaceVariant,
    textAlign: 'center',
    marginBottom: Spacing.six,
  },
  cardsContainer: {
    gap: Spacing.four,
    marginBottom: Spacing.six,
  },
  roleCard: {
    flexDirection: 'row',
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
  },
  cardIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: Colors.light.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.three,
  },
  cardIcon: {
    fontSize: 28,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.onSurface,
    marginBottom: Spacing.one,
  },
  cardDescription: {
    fontSize: 14,
    color: Colors.light.onSurfaceVariant,
    lineHeight: 20,
  },
  cardArrow: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Spacing.two,
  },
  arrowIcon: {
    fontSize: 20,
    color: Colors.light.secondary,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    marginTop: Spacing.four,
  },
  footerText: {
    fontSize: 14,
    color: Colors.light.onSurfaceVariant,
  },
  footerLink: {
    color: Colors.light.secondary,
    fontWeight: '600',
  },
});

export default RoleSelectionScreen;
