import { Colors, Spacing } from '@/constants/theme';
import { router } from 'expo-router';
import React from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const FinalProfileReviewScreen: React.FC = () => {
  const insets = useSafeAreaInsets();

  const handleEditSection = (section: string) => {
    Alert.alert('Edit Section', `Edit ${section} functionality to be implemented`);
  };

  const handleAddSkill = () => {
    Alert.alert('Add Skill', 'Add skill functionality to be implemented');
  };

  const handleGenerateQR = () => {
    router.push('/(student)/qr-generation' as any);
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/(auth)/role-selection');
    }
  };

  const ExperienceItem: React.FC<{
    icon: string;
    title: string;
    company: string;
    period: string;
    description: string;
  }> = ({ icon, title, company, period, description }) => (
    <View style={styles.experienceItem}>
      <View style={styles.experienceIconContainer}>
        <Text style={styles.experienceIcon}>{icon}</Text>
      </View>
      <View style={styles.experienceContent}>
        <Text style={styles.experienceTitle}>{title}</Text>
        <Text style={styles.experienceCompany}>{company} • {period}</Text>
        <Text style={styles.experienceDescription}>{description}</Text>
      </View>
    </View>
  );

  const SkillTag: React.FC<{ skill: string; variant?: 'primary' | 'tertiary' }> = ({ 
    skill, 
    variant = 'primary' 
  }) => (
    <View
      style={[
        styles.skillTag,
        variant === 'primary' && styles.skillTagPrimary,
        variant === 'tertiary' && styles.skillTagTertiary,
      ]}
    >
      <Text
        style={[
          styles.skillTagText,
          variant === 'primary' && styles.skillTagTextPrimary,
          variant === 'tertiary' && styles.skillTagTextTertiary,
        ]}
      >
        {skill}
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerLeft}>
          <View style={styles.profilePhoto}>
            <Image
              source={require('../../assets/images/icon.png')}
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.brandName}>Zero-Paper</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Text style={styles.notificationIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 140 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.profileCard}>
          <View style={styles.completionBadge}>
            <Text style={styles.completionText}>95% Complete</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Alex Rivers</Text>
            <Text style={styles.profileTitle}>
              Computer Science Senior @ Stanford University
            </Text>
            <View style={styles.verificationRow}>
              <Text style={styles.verificationIcon}>✓</Text>
              <Text style={styles.verificationText}>Verified Student ID</Text>
            </View>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '95%' }]} />
          </View>
        </View>

        {/* Experience Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Experience</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => handleEditSection('Experience')}
              activeOpacity={0.7}
            >
              <Text style={styles.editIcon}>✏️</Text>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.sectionCard}>
            <ExperienceItem
              icon="🏢"
              title="Software Engineering Intern"
              company="Google"
              period="Jun 2023 – Aug 2023"
              description="Developed high-concurrency microservices for Google Cloud Platform using Go and Kubernetes."
            />
            <ExperienceItem
              icon="🏛️"
              title="Full Stack Developer"
              company="Stanford Research Lab"
              period="2022 – Present"
              description="Built data visualization dashboards for climate change research using React and D3.js."
            />
          </View>
        </View>

        {/* Education Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Education</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => handleEditSection('Education')}
              activeOpacity={0.7}
            >
              <Text style={styles.editIcon}>✏️</Text>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.sectionCard}>
            <View style={styles.educationItem}>
              <View style={styles.educationIconContainer}>
                <Text style={styles.educationIcon}>🎓</Text>
              </View>
              <View style={styles.educationContent}>
                <Text style={styles.educationTitle}>Stanford University</Text>
                <Text style={styles.educationDetails}>
                  B.S. in Computer Science • GPA: 3.9/4.0
                </Text>
                <View style={styles.educationTags}>
                  <View style={styles.educationTag}>
                    <Text style={styles.educationTagText}>Dean's List</Text>
                  </View>
                  <View style={styles.educationTag}>
                    <Text style={styles.educationTagText}>ACM President</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Skills Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Technical Arsenal</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleAddSkill}
              activeOpacity={0.7}
            >
              <Text style={styles.editIcon}>➕</Text>
              <Text style={styles.editButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.skillsGrid}>
            <View style={styles.skillCard}>
              <Text style={styles.skillCategory}>Languages</Text>
              <View style={styles.skillTagsContainer}>
                <SkillTag skill="PYTHON" variant="primary" />
                <SkillTag skill="TS/JS" variant="primary" />
                <SkillTag skill="RUST" variant="primary" />
              </View>
            </View>
            <View style={styles.skillCard}>
              <Text style={styles.skillCategory}>Cloud & Tools</Text>
              <View style={styles.skillTagsContainer}>
                <SkillTag skill="AWS" variant="tertiary" />
                <SkillTag skill="DOCKER" variant="tertiary" />
              </View>
            </View>
          </View>
        </View>

        {/* Portfolio Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Portfolio</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => handleEditSection('Portfolio')}
              activeOpacity={0.7}
            >
              <Text style={styles.editIcon}>✏️</Text>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.portfolioCard}>
            <View style={styles.portfolioImageContainer}>
              <Image
                source={require('../../assets/images/tutorial-web.png')}
                style={styles.projectImage}
              />
              <View style={styles.portfolioOverlay} />
              <View style={styles.portfolioTitleContainer}>
                <Text style={styles.portfolioTitle}>NeuroMap AI Dashboard</Text>
              </View>
            </View>
            <View style={styles.portfolioDescription}>
              <Text style={styles.portfolioDescriptionText}>
                Real-time neural network visualization tool for diagnosing latency bottlenecks in
                distributed systems. (Open Source)
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Generate QR Button */}
      <View style={[styles.bottomActionContainer, { paddingBottom: insets.bottom + Spacing.four }]}>
        <TouchableOpacity
          style={styles.generateQRButton}
          onPress={handleGenerateQR}
          activeOpacity={0.8}
        >
          <Text style={styles.qrIcon}>📱</Text>
          <Text style={styles.generateQRButtonText}>Generate QR Code</Text>
        </TouchableOpacity>
      </View>
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  profilePhoto: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.light.secondaryFixed,
    borderWidth: 1,
    borderColor: Colors.light.outlineVariant,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  brandName: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.light.secondary,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationIcon: {
    fontSize: 24,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.five,
  },
  profileCard: {
    backgroundColor: Colors.light.surfaceContainerLowest,
    borderRadius: 24,
    padding: Spacing.six,
    borderWidth: 1,
    borderColor: Colors.light.outlineVariant,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: Spacing.six,
    position: 'relative',
    overflow: 'hidden',
  },
  completionBadge: {
    position: 'absolute',
    top: Spacing.four,
    right: Spacing.four,
    backgroundColor: Colors.light.secondaryContainer,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: 20,
  },
  completionText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.light.onSecondaryContainer,
  },
  profileInfo: {
    marginBottom: Spacing.six,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.light.onSurface,
    marginBottom: Spacing.two,
  },
  profileTitle: {
    fontSize: 16,
    color: Colors.light.onSurfaceVariant,
    marginBottom: Spacing.two,
  },
  verificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    marginTop: Spacing.two,
  },
  verificationIcon: {
    fontSize: 16,
    color: Colors.light.secondary,
  },
  verificationText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.onSurfaceVariant,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.light.surfaceContainer,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.light.secondaryContainer,
    borderRadius: 4,
  },
  section: {
    marginBottom: Spacing.six,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.four,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.light.onSurface,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: 20,
    backgroundColor: Colors.light.secondaryFixed,
  },
  editIcon: {
    fontSize: 14,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.secondary,
  },
  sectionCard: {
    backgroundColor: Colors.light.surfaceContainerLowest,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.light.outlineVariant,
    overflow: 'hidden',
  },
  experienceItem: {
    flexDirection: 'row',
    gap: Spacing.four,
    padding: Spacing.four,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.outlineVariant,
  },
  experienceIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: Colors.light.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  experienceIcon: {
    fontSize: 24,
  },
  experienceContent: {
    flex: 1,
  },
  experienceTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.onSurface,
    marginBottom: Spacing.one,
  },
  experienceCompany: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.light.onSurfaceVariant,
    marginBottom: Spacing.two,
  },
  experienceDescription: {
    fontSize: 14,
    color: Colors.light.onSurfaceVariant,
    lineHeight: 20,
  },
  educationItem: {
    flexDirection: 'row',
    gap: Spacing.four,
    padding: Spacing.four,
  },
  educationIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: Colors.light.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  educationIcon: {
    fontSize: 24,
  },
  educationContent: {
    flex: 1,
  },
  educationTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.onSurface,
    marginBottom: Spacing.one,
  },
  educationDetails: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.light.onSurfaceVariant,
    marginBottom: Spacing.three,
  },
  educationTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  educationTag: {
    backgroundColor: Colors.light.surfaceContainerHigh,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: 20,
  },
  educationTagText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.light.onSurfaceVariant,
  },
  skillsGrid: {
    flexDirection: 'row',
    gap: Spacing.four,
  },
  skillCard: {
    flex: 1,
    backgroundColor: Colors.light.surfaceContainerLowest,
    borderRadius: 24,
    padding: Spacing.four,
    borderWidth: 1,
    borderColor: Colors.light.outlineVariant,
  },
  skillCategory: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.light.onPrimaryContainer,
    marginBottom: Spacing.two,
  },
  skillTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.one,
  },
  skillTag: {
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    borderRadius: 6,
  },
  skillTagPrimary: {
    backgroundColor: 'rgba(0, 81, 213, 0.1)',
  },
  skillTagTertiary: {
    backgroundColor: Colors.light.tertiaryFixed,
  },
  skillTagText: {
    fontSize: 11,
    fontWeight: '700',
  },
  skillTagTextPrimary: {
    color: Colors.light.secondary,
  },
  skillTagTextTertiary: {
    color: Colors.light.onTertiaryFixed,
  },
  portfolioCard: {
    backgroundColor: Colors.light.surfaceContainerLowest,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.light.outlineVariant,
    overflow: 'hidden',
  },
  portfolioImageContainer: {
    height: 128,
    position: 'relative',
  },
  portfolioImage: {
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  portfolioOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  portfolioTitleContainer: {
    position: 'absolute',
    bottom: Spacing.three,
    left: Spacing.four,
  },
  portfolioTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.onSecondary,
  },
  portfolioDescription: {
    padding: Spacing.four,
  },
  portfolioDescriptionText: {
    fontSize: 14,
    color: Colors.light.onSurfaceVariant,
    lineHeight: 20,
  },
  bottomActionContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.five,
    paddingTop: Spacing.six,
  },
  generateQRButton: {
    backgroundColor: Colors.light.secondary,
    height: 56,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 8,
  },
  qrIcon: {
    fontSize: 24,
  },
  generateQRButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.light.onSecondary,
    letterSpacing: -0.5,
  },
});

export default FinalProfileReviewScreen;
