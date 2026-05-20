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

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubLink: string;
  liveDemoLink: string;
}

interface Experience {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  teamSize: string;
}

const ProjectsExperienceScreen: React.FC = () => {
  const insets = useSafeAreaInsets();

  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'SaaS Recruitment Engine',
      description: 'Developed a high-performance matching algorithm for students and enterprise recruiters using React and Node.js.',
      technologies: ['React', 'Tailwind', 'Redis'],
      githubLink: '',
      liveDemoLink: '',
    },
    {
      id: '2',
      title: 'Zero-Paper Verification',
      description: 'A secure digital ID verification system leveraging QR technology for instant academic credential validation.',
      technologies: ['Python', 'OpenCV', 'AWS'],
      githubLink: '',
      liveDemoLink: '',
    },
  ]);

  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: '1',
      role: 'Software Engineering Intern',
      company: 'CloudTech Solutions',
      startDate: 'June 2023',
      endDate: 'Present',
      description: 'Optimized database queries reducing latency by 40%. Collaborated with UI/UX teams to implement accessible design patterns.',
      teamSize: '5',
    },
    {
      id: '2',
      role: 'Junior Web Developer',
      company: 'StartUp Lab',
      startDate: 'Jan 2022',
      endDate: 'May 2023',
      description: 'Maintained client websites and integrated RESTful APIs for dynamic content management.',
      teamSize: '3',
    },
  ]);

  const [showAddProject, setShowAddProject] = useState(false);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '',
    description: '',
    technologies: [],
    githubLink: '',
    liveDemoLink: '',
  });

  const [newTech, setNewTech] = useState('');

  const handleAddTech = () => {
    if (newTech.trim()) {
      setNewProject({
        ...newProject,
        technologies: [...(newProject.technologies || []), newTech.trim()],
      });
      setNewTech('');
    }
  };

  const handleRemoveTech = (index: number) => {
    setNewProject({
      ...newProject,
      technologies: newProject.technologies?.filter((_, i) => i !== index) || [],
    });
  };

  const handleAddProject = () => {
    if (newProject.title && newProject.description) {
      const project: Project = {
        id: Date.now().toString(),
        title: newProject.title,
        description: newProject.description,
        technologies: newProject.technologies || [],
        githubLink: newProject.githubLink || '',
        liveDemoLink: newProject.liveDemoLink || '',
      };
      setProjects([...projects, project]);
      setNewProject({
        title: '',
        description: '',
        technologies: [],
        githubLink: '',
        liveDemoLink: '',
      });
      setShowAddProject(false);
    } else {
      Alert.alert('Error', 'Please fill in project title and description.');
    }
  };

  const handleSaveDraft = () => {
    Alert.alert('Draft Saved', 'Your projects and experience have been saved as a draft.');
  };

  const handleContinue = () => {
    router.push('/(student)/resume-upload');
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/(auth)/role-selection');
    }
  };

  const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
    <View style={styles.projectCard}>
      <View style={styles.projectCardHeader}>
        <View style={styles.projectIcon}>
          <Text style={styles.projectIconText}>💻</Text>
        </View>
        <View style={styles.projectLinks}>
          <TouchableOpacity style={styles.projectLink}>
            <Text style={styles.projectLinkIcon}>🔗</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.projectLink}>
            <Text style={styles.projectLinkIcon}>⌨️</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.projectTitle}>{project.title}</Text>
      <Text style={styles.projectDescription} numberOfLines={3}>
        {project.description}
      </Text>
      <View style={styles.techTags}>
        {project.technologies.map((tech, index) => (
          <View key={index} style={styles.techTag}>
            <Text style={styles.techTagText}>{tech}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const ExperienceItem: React.FC<{ experience: Experience; isFirst: boolean }> = ({ experience, isFirst }) => (
    <View style={styles.experienceItem}>
      <View style={[styles.experienceDot, isFirst && styles.experienceDotActive]} />
      <View style={styles.experienceContent}>
        <Text style={styles.experienceRole}>{experience.role}</Text>
        <Text style={styles.experienceCompany}>
          {experience.company} • {experience.startDate} - {experience.endDate}
        </Text>
        <Text style={styles.experienceDescription}>{experience.description}</Text>
        <View style={styles.experienceMeta}>
          <Text style={styles.experienceMetaLabel}>Team Size:</Text>
          <Text style={styles.experienceMetaValue}>{experience.teamSize}</Text>
        </View>
      </View>
    </View>
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
        {/* Welcome & Progress Section */}
        <View style={styles.welcomeSection}>
          <View style={styles.welcomeHeader}>
            <View>
              <Text style={styles.title}>Projects & Experience</Text>
              <Text style={styles.subtitle}>
                Showcase your professional journey and technical expertise to recruiters.
              </Text>
            </View>
            <View style={styles.profileStrengthCard}>
              <View style={styles.strengthHeader}>
                <Text style={styles.strengthLabel}>Profile Strength</Text>
                <Text style={styles.strengthValue}>85%</Text>
              </View>
              <View style={styles.strengthBar}>
                <View style={[styles.strengthFill, { width: '85%' }]} />
              </View>
            </View>
          </View>
        </View>

        {/* Key Projects Section */}
        <View style={styles.projectsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Key Projects</Text>
            <TouchableOpacity
              onPress={() => setShowAddProject(!showAddProject)}
              style={styles.addButton}
              activeOpacity={0.8}
            >
              <Text style={styles.addIcon}>+</Text>
              <Text style={styles.addButtonText}>Add New Project</Text>
            </TouchableOpacity>
          </View>

          {/* Add Project Form */}
          {showAddProject && (
            <View style={styles.addProjectForm}>
              <Input
                label="Project Title"
                placeholder="Enter project title"
                value={newProject.title}
                onChangeText={(text) => setNewProject({ ...newProject, title: text })}
              />
              <Input
                label="Description"
                placeholder="Describe your project"
                value={newProject.description}
                onChangeText={(text) => setNewProject({ ...newProject, description: text })}
                multiline
              />
              <View style={styles.techInputContainer}>
                <Text style={styles.label}>Technologies</Text>
                <View style={styles.techInputRow}>
                  <TextInput
                    style={styles.techInput}
                    placeholder="Add technology (e.g., React)"
                    value={newTech}
                    onChangeText={setNewTech}
                    onSubmitEditing={handleAddTech}
                  />
                  <TouchableOpacity onPress={handleAddTech} style={styles.techAddButton}>
                    <Text style={styles.techAddButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.techTags}>
                  {newProject.technologies?.map((tech, index) => (
                    <View key={index} style={styles.techTag}>
                      <Text style={styles.techTagText}>{tech}</Text>
                      <TouchableOpacity onPress={() => handleRemoveTech(index)}>
                        <Text style={styles.techTagRemove}>✕</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </View>
              <Input
                label="GitHub Link"
                placeholder="https://github.com/..."
                value={newProject.githubLink}
                onChangeText={(text) => setNewProject({ ...newProject, githubLink: text })}
                keyboardType="url"
              />
              <Input
                label="Live Demo Link"
                placeholder="https://..."
                value={newProject.liveDemoLink}
                onChangeText={(text) => setNewProject({ ...newProject, liveDemoLink: text })}
                keyboardType="url"
              />
              <TouchableOpacity onPress={handleAddProject} style={styles.saveProjectButton}>
                <Text style={styles.saveProjectButtonText}>Save Project</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Project Cards Grid */}
          <View style={styles.projectsGrid}>
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </View>
        </View>

        {/* Work Experience Section */}
        <View style={styles.experienceSection}>
          <Text style={styles.sectionTitle}>Work Experience</Text>
          <View style={styles.experienceCard}>
            <View style={styles.experienceCardHeader}>
              <Text style={styles.experienceCardIcon}>💼</Text>
              <Text style={styles.experienceCardTitle}>Work Experience</Text>
            </View>
            <View style={styles.experienceList}>
              {experiences.map((experience, index) => (
                <ExperienceItem key={experience.id} experience={experience} isFirst={index === 0} />
              ))}
            </View>
          </View>
        </View>

        {/* Tech Stack Summary */}
        <View style={styles.techStackSection}>
          <Text style={styles.sectionTitle}>Tech Stack</Text>
          <View style={styles.techStackCard}>
            <View style={styles.techStackRow}>
              <Text style={styles.techStackLabel}>Frontend</Text>
              <View style={styles.techStackBadges}>
                <View style={styles.techBadge}>
                  <Text style={styles.techBadgeText}>R</Text>
                </View>
                <View style={styles.techBadge}>
                  <Text style={styles.techBadgeText}>V</Text>
                </View>
                <View style={styles.techBadge}>
                  <Text style={styles.techBadgeText}>T</Text>
                </View>
              </View>
            </View>
            <View style={styles.techStackRow}>
              <Text style={styles.techStackLabel}>Backend</Text>
              <View style={styles.techStackBadges}>
                <View style={styles.techBadge}>
                  <Text style={styles.techBadgeText}>N</Text>
                </View>
                <View style={styles.techBadge}>
                  <Text style={styles.techBadgeText}>P</Text>
                </View>
                <View style={styles.techBadge}>
                  <Text style={styles.techBadgeText}>G</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Actions */}
      <View style={[styles.bottomActions, { paddingBottom: insets.bottom + Spacing.four }]}>
        <TouchableOpacity
          onPress={handleSaveDraft}
          style={styles.saveDraftButton}
          activeOpacity={0.8}
        >
          <Text style={styles.saveDraftButtonText}>Save Draft</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleContinue}
          style={styles.continueButton}
          activeOpacity={0.8}
        >
          <Text style={styles.continueButtonText}>Save & Continue</Text>
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  profilePhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInitials: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.onSurface,
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
  welcomeSection: {
    marginBottom: Spacing.six,
  },
  welcomeHeader: {
    gap: Spacing.four,
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
  profileStrengthCard: {
    backgroundColor: Colors.light.surfaceContainer,
    padding: Spacing.four,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.outlineVariant,
  },
  strengthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.two,
  },
  strengthLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.onSurface,
  },
  strengthValue: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.light.secondary,
  },
  strengthBar: {
    height: 8,
    backgroundColor: Colors.light.surfaceContainerHigh,
    borderRadius: 4,
    overflow: 'hidden',
  },
  strengthFill: {
    height: '100%',
    backgroundColor: Colors.light.secondary,
    borderRadius: 4,
  },
  projectsSection: {
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
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    backgroundColor: Colors.light.secondary,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    borderRadius: 8,
  },
  addIcon: {
    fontSize: 20,
    color: Colors.light.onSecondary,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.onSecondary,
  },
  addProjectForm: {
    backgroundColor: Colors.light.surfaceContainerLowest,
    borderRadius: 16,
    padding: Spacing.four,
    borderWidth: 1,
    borderColor: Colors.light.outlineVariant,
    marginBottom: Spacing.four,
  },
  techInputContainer: {
    marginBottom: Spacing.four,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.onSurfaceVariant,
    marginBottom: Spacing.one,
    paddingHorizontal: Spacing.one,
  },
  techInputRow: {
    flexDirection: 'row',
    gap: Spacing.two,
    marginBottom: Spacing.two,
  },
  techInput: {
    flex: 1,
    backgroundColor: Colors.light.surfaceContainerLow,
    borderRadius: 8,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    fontSize: 16,
    color: Colors.light.onSurface,
  },
  techAddButton: {
    width: 48,
    backgroundColor: Colors.light.secondary,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  techAddButtonText: {
    fontSize: 20,
    color: Colors.light.onSecondary,
  },
  techTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  techTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    backgroundColor: Colors.light.surfaceContainerHigh,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: 16,
  },
  techTagText: {
    fontSize: 12,
    color: Colors.light.onSurface,
  },
  techTagRemove: {
    fontSize: 12,
    color: Colors.light.onSurfaceVariant,
  },
  saveProjectButton: {
    backgroundColor: Colors.light.secondary,
    paddingVertical: Spacing.three,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveProjectButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.onSecondary,
  },
  projectsGrid: {
    gap: Spacing.four,
  },
  projectCard: {
    backgroundColor: Colors.light.surfaceContainerLowest,
    borderRadius: 24,
    padding: Spacing.four,
    borderWidth: 1,
    borderColor: Colors.light.outlineVariant,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 2,
  },
  projectCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.four,
  },
  projectIcon: {
    width: 48,
    height: 48,
    backgroundColor: Colors.light.secondaryContainer,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  projectIconText: {
    fontSize: 24,
  },
  projectLinks: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  projectLink: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  projectLinkIcon: {
    fontSize: 20,
  },
  projectTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.light.onSurface,
    marginBottom: Spacing.two,
  },
  projectDescription: {
    fontSize: 14,
    color: Colors.light.onSurfaceVariant,
    marginBottom: Spacing.six,
    lineHeight: 20,
  },
  experienceSection: {
    marginBottom: Spacing.six,
  },
  experienceCard: {
    backgroundColor: Colors.light.primaryContainer,
    borderRadius: 24,
    padding: Spacing.four,
    overflow: 'hidden',
  },
  experienceCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    marginBottom: Spacing.six,
  },
  experienceCardIcon: {
    fontSize: 24,
  },
  experienceCardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.light.onSecondaryContainer,
  },
  experienceList: {
    gap: Spacing.four,
  },
  experienceItem: {
    flexDirection: 'row',
    gap: Spacing.three,
    marginBottom: Spacing.four,
  },
  experienceDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.light.surfaceContainerHigh,
    marginTop: 4,
  },
  experienceDotActive: {
    backgroundColor: Colors.light.secondary,
  },
  experienceContent: {
    flex: 1,
  },
  experienceRole: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.onSecondaryContainer,
    marginBottom: Spacing.one,
  },
  experienceCompany: {
    fontSize: 14,
    color: Colors.light.onPrimaryContainer,
    marginBottom: Spacing.two,
  },
  experienceDescription: {
    fontSize: 14,
    color: 'rgba(13, 28, 50, 0.8)',
    marginBottom: Spacing.two,
    lineHeight: 20,
  },
  experienceMeta: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  experienceMetaLabel: {
    fontSize: 12,
    color: 'rgba(13, 28, 50, 0.8)',
  },
  experienceMetaValue: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.light.onPrimaryContainer,
  },
  techStackSection: {
    marginBottom: Spacing.six,
  },
  techStackCard: {
    backgroundColor: Colors.light.surfaceContainer,
    borderRadius: 24,
    padding: Spacing.four,
    borderWidth: 1,
    borderColor: Colors.light.outlineVariant,
  },
  techStackRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.four,
  },
  techStackLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.onSurface,
  },
  techStackBadges: {
    flexDirection: 'row',
  },
  techBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.light.surfaceContainerHigh,
    borderWidth: 2,
    borderColor: Colors.light.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -8,
  },
  techBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.light.onSurface,
  },
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(247, 249, 251, 0.8)',
    paddingHorizontal: Spacing.five,
    paddingTop: Spacing.four,
    borderTopWidth: 1,
    borderTopColor: Colors.light.outlineVariant,
    flexDirection: 'row',
    gap: Spacing.four,
  },
  saveDraftButton: {
    flex: 1,
    height: 56,
    borderWidth: 2,
    borderColor: Colors.light.secondary,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveDraftButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.secondary,
  },
  continueButton: {
    flex: 2,
    height: 56,
    backgroundColor: Colors.light.secondary,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  continueButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.onSecondary,
  },
});

export default ProjectsExperienceScreen;
