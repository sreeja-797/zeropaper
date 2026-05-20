import { Card } from '@/components/Card';
import { Colors, Spacing } from '@/constants/theme';
import { router } from 'expo-router';
import React, { useState } from 'react';
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

interface Project {
  title: string;
  description: string;
  technologies: string[];
}

interface Education {
  institution: string;
  degree: string;
  gpa: string;
  period: string;
}

const CandidateProfileViewScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [isInterested, setIsInterested] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const candidateData = {
    name: 'Alex Rivers',
    title: 'Computer Science Senior @ Stanford University',
    location: 'Palo Alto, CA',
    email: 'a.rivers@stanford.edu',
    verified: true,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKnC8J-RuEnTyGffHAsyEoW0uwsARJAf5nsciaffjDLfStjib63Xtu2u3rpUBskpeiwXjOROgWt3OdYBJJ4r861mQDk7NW6Z7k32o8uDF2tf9T2pdC3TsNIoqYbyOwlZuI50hLVV14P1b20M39wDa1YMgAKeus9ZM54K6a_iP6_gD_P3_BCb9K3Pt5GO75KoYpmw-rS-0U0hHUG4KhOAmkc8jglNphQvpCAkT24lqK8Y-lneP19y8R6gZ9w9o1wbgSpAMrmyxXZYXa',
    skills: ['Python', 'React', 'AWS', 'Machine Learning'],
    moreSkillsCount: 4,
    education: {
      institution: 'Stanford University',
      degree: 'B.S. Computer Science • GPA 3.92',
      period: 'Sep 2020 — Jun 2024',
    },
    projects: [
      {
        title: 'NeuroFlow AI Engine',
        description: 'Developed a real-time neural network visualization tool using WebGL and PyTorch. Reduced inference latency by 24% through custom kernel optimization.',
        technologies: ['React', 'Three.js', 'Python'],
      },
      {
        title: 'EcoTrack Mobile App',
        description: 'A carbon footprint tracking application used by over 5,000 campus students. Integrated with Stripe for carbon offset micro-transactions.',
        technologies: ['React Native', 'Node.js'],
      },
    ],
    traits: ['Leadership', 'Public Speaking', 'Agile Scrum', 'Remote Ready'],
    resume: 'alex_rivers_resume.pdf',
    viewVelocity: 'High (42/wk)',
    viewPercentage: 85,
    note: 'Alex is looking for Full-Stack or AI-specific roles for Summer 2024.',
  };

  const handleMarkInterested = () => {
    setIsInterested(!isInterested);
    if (!isInterested) {
      Alert.alert('Marked Interested', 'You have marked this candidate as interested.');
    }
  };

  const handleSaveCandidate = () => {
    setIsSaved(!isSaved);
    Alert.alert(
      isSaved ? 'Removed from Saved' : 'Candidate Saved',
      isSaved ? 'Candidate removed from your saved list.' : 'Candidate added to your saved list.'
    );
  };

  const handleDownloadResume = () => {
    Alert.alert('Download Resume', 'Resume download started.');
  };

  const handleContactCandidate = () => {
    Alert.alert('Contact Candidate', 'Opening conversation with candidate...');
  };

  const handleShare = () => {
    Alert.alert('Share Profile', 'Share profile link copied to clipboard.');
  };

  const handleMoreOptions = () => {
    Alert.alert('More Options', 'Additional options menu.');
  };

  const handleAddNotes = () => {
    Alert.alert('Add Notes', 'Open notes editor for this candidate.');
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/(recruiter)/dashboard');
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Candidate Profile</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton} onPress={handleShare}>
            <Text style={styles.iconText}>📤</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleMoreOptions}>
            <Text style={styles.iconText}>⋮</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 140 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <Card style={styles.profileCard} padding={Spacing.four}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: candidateData.avatar }}
                style={styles.avatar}
                resizeMode="cover"
              />
              <View style={styles.avatarBorder} />
            </View>
            <View style={styles.profileInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.name}>{candidateData.name}</Text>
                {candidateData.verified && (
                  <View style={styles.verifiedBadge}>
                    <Text style={styles.verifiedIcon}>✓</Text>
                    <Text style={styles.verifiedText}>Verified Student ID</Text>
                  </View>
                )}
              </View>
              <Text style={styles.title}>{candidateData.title}</Text>
              <View style={styles.contactRow}>
                <View style={styles.contactItem}>
                  <Text style={styles.contactIcon}>📍</Text>
                  <Text style={styles.contactText}>{candidateData.location}</Text>
                </View>
                <View style={styles.contactItem}>
                  <Text style={styles.contactIcon}>✉️</Text>
                  <Text style={styles.contactText}>{candidateData.email}</Text>
                </View>
              </View>
              <View style={styles.skillsContainer}>
                {candidateData.skills.map((skill, index) => (
                  <View key={index} style={styles.skillChip}>
                    <Text style={styles.skillText}>{skill}</Text>
                  </View>
                ))}
                <View style={[styles.skillChip, styles.moreSkillsChip]}>
                  <Text style={styles.moreSkillsText}>+{candidateData.moreSkillsCount} more</Text>
                </View>
              </View>
            </View>
          </View>
        </Card>

        {/* Education Section */}
        <Card style={styles.sectionCard} padding={Spacing.four}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>🎓</Text>
            <Text style={styles.sectionTitle}>Education</Text>
          </View>
          <View style={styles.educationItem}>
            <View style={styles.educationIcon}>
              <Text style={styles.educationIconText}>🏛️</Text>
            </View>
            <View style={styles.educationDetails}>
              <Text style={styles.educationInstitution}>{candidateData.education.institution}</Text>
              <Text style={styles.educationDegree}>{candidateData.education.degree}</Text>
              <Text style={styles.educationPeriod}>{candidateData.education.period}</Text>
            </View>
          </View>
        </Card>

        {/* Projects Section */}
        <Card style={styles.sectionCard} padding={Spacing.four}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>📁</Text>
            <Text style={styles.sectionTitle}>Featured Projects</Text>
          </View>
          <View style={styles.projectsContainer}>
            {candidateData.projects.map((project, index) => (
              <View key={index}>
                <TouchableOpacity style={styles.projectItem}>
                  <Text style={styles.projectTitle}>{project.title}</Text>
                  <Text style={styles.projectDescription}>{project.description}</Text>
                  <View style={styles.projectTech}>
                    {project.technologies.map((tech, techIndex) => (
                      <Text key={techIndex} style={styles.techText}>
                        {tech}
                      </Text>
                    ))}
                  </View>
                </TouchableOpacity>
                {index < candidateData.projects.length - 1 && <View style={styles.divider} />}
              </View>
            ))}
          </View>
        </Card>

        {/* Recruitment Assets */}
        <Card style={styles.sectionCard} padding={Spacing.four}>
          <Text style={styles.sidebarTitle}>Recruitment Assets</Text>
          <TouchableOpacity
            style={styles.resumeLink}
            onPress={handleDownloadResume}
            activeOpacity={0.7}
          >
            <View style={styles.resumeContent}>
              <Text style={styles.resumeIcon}>📄</Text>
              <Text style={styles.resumeText}>{candidateData.resume}</Text>
            </View>
            <Text style={styles.downloadIcon}>⬇️</Text>
          </TouchableOpacity>
          <View style={styles.statsContainer}>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Profile View Velocity</Text>
              <Text style={styles.statValue}>{candidateData.viewVelocity}</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${candidateData.viewPercentage}%` }]} />
            </View>
            <Text style={styles.statNote}>
              Top 5% candidate in the San Francisco region this week.
            </Text>
          </View>
        </Card>

        {/* Candidate Traits */}
        <Card style={styles.sectionCard} padding={Spacing.four}>
          <Text style={styles.sidebarTitle}>Candidate Traits</Text>
          <View style={styles.traitsContainer}>
            {candidateData.traits.map((trait, index) => (
              <View key={index} style={styles.traitChip}>
                <Text style={styles.traitText}>{trait}</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* Quick Note */}
        <View style={styles.noteCard}>
          <Text style={styles.noteText}>
            <Text style={styles.noteIcon}>💡</Text> {candidateData.note}
          </Text>
        </View>

        {/* Add Notes Button */}
        <TouchableOpacity
          style={styles.addNotesButton}
          onPress={handleAddNotes}
          activeOpacity={0.7}
        >
          <Text style={styles.addNotesIcon}>📝</Text>
          <Text style={styles.addNotesText}>Add Notes</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Sticky Bottom Action Bar */}
      <View style={[styles.bottomActions, { paddingBottom: insets.bottom + Spacing.four }]}>
        <View style={styles.actionButtonsRow}>
          <TouchableOpacity
            style={[styles.actionButton, styles.saveButton]}
            onPress={handleSaveCandidate}
            activeOpacity={0.8}
          >
            <Text style={styles.actionButtonIcon}>🔖</Text>
            <Text style={styles.actionButtonText}>Save Candidate</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.actionButton,
              styles.interestButton,
              isInterested && styles.interestButtonActive,
            ]}
            onPress={handleMarkInterested}
            activeOpacity={0.8}
          >
            <Text style={[styles.actionButtonIcon, isInterested && styles.actionButtonIconActive]}>
              {isInterested ? '⭐' : '☆'}
            </Text>
            <Text style={[styles.actionButtonText, isInterested && styles.actionButtonTextActive]}>
              {isInterested ? 'Interested' : 'Mark Interested'}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.contactButton}
          onPress={handleContactCandidate}
          activeOpacity={0.8}
        >
          <Text style={styles.contactButtonIcon}>💬</Text>
          <Text style={styles.contactButtonText}>Contact Candidate</Text>
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
    backgroundColor: 'rgba(247, 249, 251, 0.8)',
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
  headerActions: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 20,
    color: Colors.light.onSurfaceVariant,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.five,
    paddingTop: Spacing.four,
  },
  profileCard: {
    marginBottom: Spacing.four,
  },
  profileHeader: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: Spacing.four,
  },
  avatarContainer: {
    position: 'relative',
    width: 96,
    height: 96,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 48,
  },
  avatarBorder: {
    position: 'absolute',
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    borderRadius: 52,
    borderWidth: 4,
    borderColor: Colors.light.secondaryFixed,
  },
  profileInfo: {
    alignItems: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: Spacing.two,
    marginBottom: Spacing.one,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.light.onSurface,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.secondaryFixed,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: 20,
    gap: Spacing.one,
  },
  verifiedIcon: {
    fontSize: 14,
    color: Colors.light.onSecondaryFixedVariant,
    fontWeight: '700',
  },
  verifiedText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.light.onSecondaryFixedVariant,
  },
  title: {
    fontSize: 16,
    color: Colors.light.onSurfaceVariant,
    textAlign: 'center',
    marginBottom: Spacing.one,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: Spacing.three,
    marginBottom: Spacing.four,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  contactIcon: {
    fontSize: 16,
  },
  contactText: {
    fontSize: 14,
    color: Colors.light.onSurfaceVariant,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: Spacing.two,
  },
  skillChip: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    backgroundColor: Colors.light.surfaceContainer,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.light.outlineVariant,
  },
  skillText: {
    fontSize: 12,
    color: Colors.light.onSurfaceVariant,
    fontWeight: '500',
  },
  moreSkillsChip: {
    backgroundColor: Colors.light.secondaryContainer,
    borderColor: Colors.light.secondaryContainer,
  },
  moreSkillsText: {
    fontSize: 12,
    color: Colors.light.onSecondaryContainer,
    fontWeight: '500',
  },
  sectionCard: {
    marginBottom: Spacing.four,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    marginBottom: Spacing.three,
  },
  sectionIcon: {
    fontSize: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.light.secondary,
  },
  educationItem: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  educationIcon: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: Colors.light.surfaceContainer,
    borderWidth: 1,
    borderColor: Colors.light.outlineVariant,
    alignItems: 'center',
    justifyContent: 'center',
  },
  educationIconText: {
    fontSize: 24,
  },
  educationDetails: {
    flex: 1,
  },
  educationInstitution: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.onSurface,
    marginBottom: Spacing.half,
  },
  educationDegree: {
    fontSize: 14,
    color: Colors.light.onSurfaceVariant,
    marginBottom: Spacing.half,
  },
  educationPeriod: {
    fontSize: 12,
    color: Colors.light.onPrimaryContainer,
  },
  projectsContainer: {
    gap: Spacing.four,
  },
  projectItem: {
    gap: Spacing.two,
  },
  projectTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.onSurface,
  },
  projectDescription: {
    fontSize: 14,
    color: Colors.light.onSurfaceVariant,
    lineHeight: 20,
  },
  projectTech: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  techText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.light.secondary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.light.outlineVariant,
  },
  sidebarTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.onSurface,
    marginBottom: Spacing.three,
  },
  resumeLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.three,
    backgroundColor: Colors.light.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.light.outlineVariant,
    marginBottom: Spacing.four,
  },
  resumeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  resumeIcon: {
    fontSize: 20,
  },
  resumeText: {
    fontSize: 14,
    color: Colors.light.onSurface,
  },
  downloadIcon: {
    fontSize: 20,
    color: Colors.light.onSurfaceVariant,
  },
  statsContainer: {
    gap: Spacing.two,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: Colors.light.onSurfaceVariant,
  },
  statValue: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.light.secondary,
  },
  progressBar: {
    height: 6,
    backgroundColor: Colors.light.surfaceContainerHigh,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.light.secondary,
    borderRadius: 3,
  },
  statNote: {
    fontSize: 11,
    color: Colors.light.onPrimaryContainer,
    fontStyle: 'italic',
  },
  traitsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  traitChip: {
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    backgroundColor: Colors.light.tertiaryFixed,
    borderRadius: 16,
  },
  traitText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.light.onTertiaryFixed,
  },
  noteCard: {
    backgroundColor: Colors.light.secondaryFixed,
    padding: Spacing.three,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.secondaryFixedDim,
    marginBottom: Spacing.four,
  },
  noteText: {
    fontSize: 12,
    color: Colors.light.onSecondaryFixed,
  },
  noteIcon: {
    fontSize: 18,
  },
  addNotesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    padding: Spacing.three,
    backgroundColor: Colors.light.surfaceContainerLowest,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.outlineVariant,
    marginBottom: Spacing.four,
  },
  addNotesIcon: {
    fontSize: 20,
  },
  addNotesText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.onSurfaceVariant,
  },
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(247, 249, 251, 0.9)',
    paddingHorizontal: Spacing.five,
    paddingTop: Spacing.four,
    borderTopWidth: 1,
    borderTopColor: Colors.light.outlineVariant,
    gap: Spacing.three,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  actionButton: {
    flex: 1,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    borderRadius: 24,
    borderWidth: 2,
  },
  saveButton: {
    borderColor: Colors.light.secondary,
    backgroundColor: 'transparent',
  },
  interestButton: {
    borderColor: Colors.light.outlineVariant,
    backgroundColor: Colors.light.surface,
  },
  interestButtonActive: {
    borderColor: Colors.light.tertiaryFixed,
    backgroundColor: Colors.light.tertiaryFixed,
  },
  actionButtonIcon: {
    fontSize: 20,
  },
  actionButtonIconActive: {
    color: Colors.light.onTertiaryFixed,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.secondary,
  },
  actionButtonTextActive: {
    color: Colors.light.onTertiaryFixed,
  },
  contactButton: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    backgroundColor: Colors.light.secondary,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  contactButtonIcon: {
    fontSize: 20,
  },
  contactButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.onSecondary,
  },
  rejectButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.error,
  },
});

export default CandidateProfileViewScreen;
