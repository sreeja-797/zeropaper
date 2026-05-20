import { Colors, Spacing } from '@/constants/theme';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
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

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface Skill {
  id: string;
  name: string;
}

interface Role {
  id: string;
  name: string;
  selected: boolean;
}

const SkillsInterestsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');

  const [technicalSkills, setTechnicalSkills] = useState<Skill[]>([
    { id: '1', name: 'React.js' },
    { id: '2', name: 'TypeScript' },
    { id: '3', name: 'Tailwind CSS' },
  ]);

  const [softSkills, setSoftSkills] = useState<Skill[]>([
    { id: '1', name: 'Leadership' },
    { id: '2', name: 'Public Speaking' },
  ]);

  const [preferredRoles, setPreferredRoles] = useState<Role[]>([
    { id: '1', name: 'Product Designer', selected: true },
    { id: '2', name: 'UX Researcher', selected: true },
  ]);

  const removeTechnicalSkill = (id: string) => {
    setTechnicalSkills(technicalSkills.filter(skill => skill.id !== id));
  };

  const removeSoftSkill = (id: string) => {
    setSoftSkills(softSkills.filter(skill => skill.id !== id));
  };

  const addTechnicalSkill = () => {
    if (searchQuery.trim()) {
      const newSkill: Skill = {
        id: Date.now().toString(),
        name: searchQuery.trim(),
      };
      setTechnicalSkills([...technicalSkills, newSkill]);
      setSearchQuery('');
    }
  };

  const addSoftSkill = () => {
    Alert.alert('Add Soft Skill', 'Soft skill selection modal to be implemented');
  };

  const toggleRole = (id: string) => {
    setPreferredRoles(
      preferredRoles.map(role =>
        role.id === id ? { ...role, selected: !role.selected } : role
      )
    );
  };


  const handleContinue = () => {
    router.push('/(student)/education-details' as any);
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/(auth)/role-selection');
    }
  };

  const handleUploadCertificate = () => {
    Alert.alert('Upload Certificate', 'Certificate upload functionality to be implemented');
  };

  const handleBrowseRoles = () => {
    Alert.alert('Browse Roles', 'Role browser modal to be implemented');
  };

  const SkillChip: React.FC<{ skill: Skill; onRemove: (id: string) => void }> = ({ skill, onRemove }) => (
    <View style={styles.chip}>
      <Text style={styles.chipText}>{skill.name}</Text>
      <TouchableOpacity onPress={() => onRemove(skill.id)} style={styles.chipRemove}>
        <Text style={styles.chipRemoveIcon}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  const AddChip: React.FC<{ onPress: () => void; label: string }> = ({ onPress, label }) => (
    <TouchableOpacity onPress={onPress} style={styles.addChip}>
      <Text style={styles.addChipIcon}>+</Text>
      <Text style={styles.addChipText}>{label}</Text>
    </TouchableOpacity>
  );

  const RoleItem: React.FC<{ role: Role; onToggle: (id: string) => void }> = ({ role, onToggle }) => (
    <TouchableOpacity
      onPress={() => onToggle(role.id)}
      style={[styles.roleItem, role.selected && styles.roleItemSelected]}
      activeOpacity={0.7}
    >
      <Text style={[styles.roleItemText, role.selected && styles.roleItemTextSelected]}>
        {role.name}
      </Text>
      <Text style={[styles.roleCheckIcon, role.selected && styles.roleCheckIconSelected]}>
        {role.selected ? '✓' : '○'}
      </Text>
    </TouchableOpacity>
  );

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
        <View style={styles.headerLeft}>
          <View style={styles.profilePhoto}>
            <Text style={styles.profileInitials}>AR</Text>
          </View>
          <Text style={styles.brandName}>Zero-Paper</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Text style={styles.notificationIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section & Progress Indicator */}
        <View style={styles.headerSection}>
          <View style={styles.headerSectionTop}>
            <View>
              <Text style={styles.title}>Skills & Expertise</Text>
              <Text style={styles.subtitle}>
                Help recruiters find you by detailing your strengths.
              </Text>
            </View>
            <Text style={styles.stepIndicator}>Step 3 of 4</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '75%' }]} />
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search skills (e.g., Python, Project Management, Figma)"
            placeholderTextColor={Colors.light.onSurfaceVariant}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={addTechnicalSkill}
          />
        </View>

        {/* Technical Skills Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>💻</Text>
            <Text style={styles.sectionTitle}>Technical Skills</Text>
          </View>
          <View style={styles.chipsContainer}>
            {technicalSkills.map(skill => (
              <SkillChip key={skill.id} skill={skill} onRemove={removeTechnicalSkill} />
            ))}
            <AddChip onPress={addTechnicalSkill} label="Add Tech Skill" />
          </View>
        </View>

        {/* Soft Skills Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>👥</Text>
            <Text style={styles.sectionTitle}>Soft Skills</Text>
          </View>
          <View style={styles.chipsContainer}>
            {softSkills.map(skill => (
              <SkillChip key={skill.id} skill={skill} onRemove={removeSoftSkill} />
            ))}
            <AddChip onPress={addSoftSkill} label="Add Soft Skill" />
          </View>
        </View>

        {/* Career Interests Grid */}
        <View style={styles.gridContainer}>
          {/* Preferred Roles */}
          <View style={styles.gridCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionIcon}>💼</Text>
              <Text style={styles.sectionTitle}>Preferred Roles</Text>
            </View>
            <View style={styles.rolesContainer}>
              {preferredRoles.map(role => (
                <RoleItem key={role.id} role={role} onToggle={toggleRole} />
              ))}
              <TouchableOpacity
                onPress={handleBrowseRoles}
                style={styles.browseButton}
                activeOpacity={0.7}
              >
                <Text style={styles.browseButtonText}>Browse All Roles</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Certifications */}
          <View style={styles.gridCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionIcon}>✓</Text>
              <Text style={styles.sectionTitle}>Certifications</Text>
            </View>
            <View style={styles.certificationContent}>
              <Text style={styles.certificationIcon}>🎓</Text>
              <Text style={styles.certificationText}>
                Boost your profile credibility by 40% with verified certificates.
              </Text>
              <TouchableOpacity
                onPress={handleUploadCertificate}
                style={styles.uploadButton}
                activeOpacity={0.8}
              >
                <Text style={styles.uploadButtonText}>Upload Certificate</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={[styles.bottomActionBar, { paddingBottom: insets.bottom + Spacing.four }]}>
        <TouchableOpacity
          onPress={handleContinue}
          style={styles.continueButton}
          activeOpacity={0.8}
        >
          <Text style={styles.continueButtonText}>Continue to Preferences</Text>
          <Text style={styles.continueButtonIcon}>→</Text>
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
    paddingHorizontal: Spacing.four,
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
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.secondary,
    borderWidth: 2,
    borderColor: Colors.light.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInitials: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.onSecondary,
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
    paddingHorizontal: Spacing.four,
  },
  headerSection: {
    marginBottom: Spacing.six,
  },
  headerSectionTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: Spacing.three,
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
  },
  stepIndicator: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.secondary,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.light.surfaceContainer,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.light.secondary,
    borderRadius: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.surfaceContainerLow,
    borderRadius: 12,
    marginBottom: Spacing.five,
  },
  searchIcon: {
    fontSize: 20,
    marginLeft: Spacing.four,
    marginRight: Spacing.two,
  },
  searchInput: {
    flex: 1,
    paddingVertical: Spacing.four,
    paddingRight: Spacing.four,
    fontSize: 16,
    color: Colors.light.onSurface,
  },
  sectionCard: {
    backgroundColor: Colors.light.surfaceContainerLowest,
    borderRadius: 24,
    padding: Spacing.three,
    borderWidth: 1,
    borderColor: Colors.light.outlineVariant,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: Spacing.five,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    marginBottom: Spacing.four,
  },
  sectionIcon: {
    fontSize: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.light.onSurface,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.secondaryContainer,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    borderRadius: 20,
    gap: Spacing.two,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.onSecondaryContainer,
  },
  chipRemove: {
    padding: Spacing.one,
  },
  chipRemoveIcon: {
    fontSize: 14,
    color: Colors.light.onSecondaryContainer,
  },
  addChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.light.outlineVariant,
    borderStyle: 'dashed',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    borderRadius: 20,
    gap: Spacing.two,
  },
  addChipIcon: {
    fontSize: 18,
    color: Colors.light.onSurfaceVariant,
  },
  addChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.onSurfaceVariant,
  },
  gridContainer: {
    flexDirection: 'column',
    gap: Spacing.three,
    marginBottom: Spacing.five,
  },
  gridCard: {
    backgroundColor: Colors.light.surfaceContainerLowest,
    borderRadius: 24,
    padding: Spacing.three,
    borderWidth: 1,
    borderColor: Colors.light.outlineVariant,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  rolesContainer: {
    gap: Spacing.three,
  },
  roleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.light.surfaceContainerLow,
    padding: Spacing.three,
    borderRadius: 12,
  },
  roleItemSelected: {
    backgroundColor: Colors.light.secondaryContainer,
  },
  roleItemText: {
    fontSize: 16,
    color: Colors.light.onSurface,
  },
  roleItemTextSelected: {
    color: Colors.light.onSecondaryContainer,
  },
  roleCheckIcon: {
    fontSize: 20,
    color: Colors.light.onSurfaceVariant,
  },
  roleCheckIconSelected: {
    color: Colors.light.secondary,
  },
  browseButton: {
    paddingVertical: Spacing.three,
    borderWidth: 1,
    borderColor: Colors.light.secondary,
    borderRadius: 12,
    alignItems: 'center',
  },
  browseButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.secondary,
  },
  certificationContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.four,
  },
  certificationIcon: {
    fontSize: 48,
    marginBottom: Spacing.three,
  },
  certificationText: {
    fontSize: 14,
    color: Colors.light.onSurfaceVariant,
    textAlign: 'center',
    marginBottom: Spacing.four,
  },
  uploadButton: {
    backgroundColor: Colors.light.secondary,
    paddingHorizontal: Spacing.six,
    paddingVertical: Spacing.two,
    borderRadius: 20,
  },
  uploadButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.onSecondary,
  },
  bottomActionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(247, 249, 251, 0.8)',
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
    borderTopWidth: 1,
    borderTopColor: Colors.light.outlineVariant,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    backgroundColor: Colors.light.secondary,
    paddingVertical: Spacing.four,
    paddingHorizontal: Spacing.six,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  continueButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.onSecondary,
  },
  continueButtonIcon: {
    fontSize: 20,
    color: Colors.light.onSecondary,
  },
});

export default SkillsInterestsScreen;
