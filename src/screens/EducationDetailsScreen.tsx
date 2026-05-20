import { Input } from '@/components/Input';
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
const isSmallScreen = SCREEN_WIDTH < 375;

interface EducationData {
  institutionName: string;
  degree: string;
  branch: string;
  cgpa: string;
  semester: string;
  startYear: string;
  endYear: string;
}

interface IntermediateData {
  collegeName: string;
  percentage: string;
  board: string;
}

interface SchoolingData {
  schoolName: string;
}

const EducationDetailsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [screenWidth, setScreenWidth] = useState(SCREEN_WIDTH);

  React.useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenWidth(window.width);
    });
    return () => subscription?.remove();
  }, []);

  const isSmall = screenWidth < 375;
  const timelinePadding = isSmall ? 40 : 50;

  const [universityExpanded, setUniversityExpanded] = useState(true);
  const [intermediateExpanded, setIntermediateExpanded] = useState(false);
  const [schoolingExpanded, setSchoolingExpanded] = useState(false);

  const [universityData, setUniversityData] = useState<EducationData>({
    institutionName: 'Silicon Valley Institute of Technology',
    degree: 'Bachelor of Tech',
    branch: 'Computer Science',
    cgpa: '',
    semester: '7th Semester',
    startYear: '2020',
    endYear: '2024',
  });

  const [intermediateData, setIntermediateData] = useState<IntermediateData>({
    collegeName: '',
    percentage: '',
    board: '',
  });

  const [schoolingData, setSchoolingData] = useState<SchoolingData>({
    schoolName: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof EducationData, string>>>({});

  const handleUniversityChange = (field: keyof EducationData, value: string) => {
    setUniversityData({ ...universityData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const handleIntermediateChange = (field: keyof IntermediateData, value: string) => {
    setIntermediateData({ ...intermediateData, [field]: value });
  };

  const handleSchoolingChange = (field: keyof SchoolingData, value: string) => {
    setSchoolingData({ ...schoolingData, [field]: value });
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof EducationData, string>> = {};

    if (!universityData.institutionName.trim()) {
      newErrors.institutionName = 'Institution name is required';
    }
    if (!universityData.degree.trim()) {
      newErrors.degree = 'Degree is required';
    }
    if (!universityData.branch.trim()) {
      newErrors.branch = 'Branch is required';
    }
    if (!universityData.cgpa.trim()) {
      newErrors.cgpa = 'CGPA is required';
    }
    if (!universityData.startYear.trim()) {
      newErrors.startYear = 'Start year is required';
    }
    if (!universityData.endYear.trim()) {
      newErrors.endYear = 'End year is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveDraft = () => {
    Alert.alert('Draft Saved', 'Your education details have been saved as a draft.');
  };

  const handleContinue = () => {
    if (validateForm()) {
      router.push('/(student)/projects-experience');
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

  const TimelineSection: React.FC<{
    icon: string;
    title: string;
    subtitle: string;
    expanded: boolean;
    onToggle: () => void;
    isActive: boolean;
    children: React.ReactNode;
  }> = ({ icon, title, subtitle, expanded, onToggle, isActive, children }) => (
    <View style={styles.timelineSection}>
      <View style={[styles.timelineDot, { left: isSmall ? -32 : -40 }, isActive && styles.timelineDotActive]}>
        <Text style={[styles.timelineDotIcon, isActive && styles.timelineDotIconActive]}>
          {icon}
        </Text>
      </View>
      <View
        style={[
          styles.timelineCard,
          isActive && styles.timelineCardActive,
          !isActive && styles.timelineCardInactive,
        ]}
      >
        <TouchableOpacity onPress={onToggle} style={[styles.timelineCardHeader, { padding: isSmall ? Spacing.two : Spacing.three, minHeight: isSmall ? 48 : 56 }]}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.timelineCardTitle, isSmall && styles.timelineCardTitleSmall]}>{title}</Text>
            <Text
              style={[
                styles.timelineCardSubtitle,
                isActive && styles.timelineCardSubtitleActive,
                isSmall && styles.timelineCardSubtitleSmall,
              ]}
            >
              {subtitle}
            </Text>
          </View>
          <Text style={[styles.expandIcon, expanded && styles.expandIconRotated]}>▼</Text>
        </TouchableOpacity>
        {expanded && <View style={[styles.timelineCardContent, { paddingHorizontal: isSmall ? Spacing.two : Spacing.three, paddingBottom: isSmall ? Spacing.two : Spacing.three }]}>{children}</View>}
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
        <Text style={[styles.brandName, isSmall && styles.brandNameSmall]}>Zero-Paper</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.notificationButton}>
            <Text style={styles.notificationIcon}>🔔</Text>
          </TouchableOpacity>
          <View style={styles.profilePhoto}>
            <Text style={styles.profileInitials}>AR</Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingHorizontal: isSmall ? Spacing.three : Spacing.four, paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress Header */}
        <View style={[styles.progressCard, { padding: isSmall ? Spacing.two : Spacing.three }]}>
          <View style={styles.progressHeader}>
            <Text style={[styles.progressTitle, isSmall && styles.progressTitleSmall]}>Education Details</Text>
            <View style={styles.stepBadge}>
              <Text style={styles.stepBadgeText}>Step 2 of 4</Text>
            </View>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '50%' }]} />
          </View>
          <Text style={[styles.progressSubtitle, isSmall && styles.progressSubtitleSmall]}>
            Fill in your academic background to build your verified profile.
          </Text>
        </View>

        {/* Timeline Section */}
        <View style={[styles.timeline, { paddingLeft: timelinePadding }]}>
          {/* University Section */}
          <TimelineSection
            icon="🎓"
            title="University"
            subtitle="Ongoing • Graduation 2024"
            expanded={universityExpanded}
            onToggle={() => setUniversityExpanded(!universityExpanded)}
            isActive={true}
          >
            <Input
              label="Institution Name"
              value={universityData.institutionName}
              onChangeText={(text) => handleUniversityChange('institutionName', text)}
              error={errors.institutionName}
            />
            <View style={styles.row}>
              <View style={styles.halfField}>
                <Input
                  label="Degree"
                  value={universityData.degree}
                  onChangeText={(text) => handleUniversityChange('degree', text)}
                  error={errors.degree}
                />
              </View>
              <View style={styles.halfField}>
                <Input
                  label="Branch"
                  value={universityData.branch}
                  onChangeText={(text) => handleUniversityChange('branch', text)}
                  error={errors.branch}
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.halfField}>
                <Input
                  label="Current CGPA"
                  placeholder="e.g. 8.5"
                  value={universityData.cgpa}
                  onChangeText={(text) => handleUniversityChange('cgpa', text)}
                  error={errors.cgpa}
                  keyboardType="decimal-pad"
                />
              </View>
              <View style={styles.halfField}>
                <Text style={styles.label}>Semester</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    value={universityData.semester}
                    onChangeText={(text) => handleUniversityChange('semester', text)}
                  />
                </View>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.halfField}>
                <Input
                  label="Start Year"
                  value={universityData.startYear}
                  onChangeText={(text) => handleUniversityChange('startYear', text)}
                  error={errors.startYear}
                  keyboardType="number-pad"
                  maxLength={4}
                />
              </View>
              <View style={styles.halfField}>
                <Input
                  label="End Year"
                  value={universityData.endYear}
                  onChangeText={(text) => handleUniversityChange('endYear', text)}
                  error={errors.endYear}
                  keyboardType="number-pad"
                  maxLength={4}
                />
              </View>
            </View>
          </TimelineSection>

          {/* Intermediate Section */}
          <TimelineSection
            icon="📚"
            title="Intermediate / Diploma"
            subtitle="MPC • Completed 2020"
            expanded={intermediateExpanded}
            onToggle={() => setIntermediateExpanded(!intermediateExpanded)}
            isActive={false}
          >
            <Input
              label="Junior College Name"
              placeholder="Enter college name"
              value={intermediateData.collegeName}
              onChangeText={(text) => handleIntermediateChange('collegeName', text)}
            />
            <View style={styles.row}>
              <View style={styles.halfField}>
                <Input
                  label="Percentage/CGPA"
                  placeholder="e.g. 96%"
                  value={intermediateData.percentage}
                  onChangeText={(text) => handleIntermediateChange('percentage', text)}
                  keyboardType="decimal-pad"
                />
              </View>
              <View style={styles.halfField}>
                <Input
                  label="Board"
                  placeholder="e.g. CBSE"
                  value={intermediateData.board}
                  onChangeText={(text) => handleIntermediateChange('board', text)}
                />
              </View>
            </View>
          </TimelineSection>

          {/* Schooling Section */}
          <TimelineSection
            icon="📖"
            title="Schooling (10th)"
            subtitle="Completed 2018"
            expanded={schoolingExpanded}
            onToggle={() => setSchoolingExpanded(!schoolingExpanded)}
            isActive={false}
          >
            <Input
              label="School Name"
              placeholder="Enter school name"
              value={schoolingData.schoolName}
              onChangeText={(text) => handleSchoolingChange('schoolName', text)}
            />
          </TimelineSection>
        </View>
      </ScrollView>

      {/* Sticky Bottom Actions */}
      <View style={[styles.bottomActions, { paddingHorizontal: isSmall ? Spacing.three : Spacing.four, paddingTop: isSmall ? Spacing.three : Spacing.four, gap: isSmall ? Spacing.two : Spacing.three, paddingBottom: insets.bottom + Spacing.four }]}>
        <TouchableOpacity
          onPress={handleSaveDraft}
          style={[styles.saveDraftButton, { height: isSmall ? 44 : 48 }]}
          activeOpacity={0.8}
        >
          <Text style={[styles.saveDraftButtonText, isSmall && styles.saveDraftButtonTextSmall]}>Save Draft</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleContinue}
          style={[styles.continueButton, { height: isSmall ? 44 : 48 }]}
          activeOpacity={0.8}
        >
          <Text style={[styles.continueButtonText, isSmall && styles.continueButtonTextSmall]}>Continue to Skills</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
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
  brandNameSmall: {
    fontSize: 16,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.four,
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
  profilePhoto: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.light.secondaryContainer,
    borderWidth: 1,
    borderColor: Colors.light.outlineVariant,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInitials: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.light.onSurface,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.four,
  },
  progressCard: {
    backgroundColor: Colors.light.surfaceContainerLowest,
    borderRadius: 12,
    padding: Spacing.three,
    borderWidth: 1,
    borderColor: Colors.light.outlineVariant,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: Spacing.four,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.three,
  },
  progressTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.light.onSurface,
  },
  progressTitleSmall: {
    fontSize: 16,
  },
  stepBadge: {
    backgroundColor: Colors.light.secondaryContainer,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: 20,
  },
  stepBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.light.secondary,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.light.surfaceContainerHigh,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: Spacing.three,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.light.secondary,
    borderRadius: 4,
  },
  progressSubtitle: {
    fontSize: 14,
    color: Colors.light.onSurfaceVariant,
  },
  progressSubtitleSmall: {
    fontSize: 12,
  },
  timeline: {
    position: 'relative',
  },
  timelineSection: {
    marginBottom: Spacing.four,
    position: 'relative',
  },
  timelineDot: {
    position: 'absolute',
    top: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.light.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: Colors.light.surface,
    zIndex: 10,
  },
  timelineDotActive: {
    backgroundColor: Colors.light.secondary,
    borderColor: Colors.light.surface,
  },
  timelineDotIcon: {
    fontSize: 14,
  },
  timelineDotIconActive: {
    color: Colors.light.onSecondary,
  },
  timelineCard: {
    backgroundColor: Colors.light.surfaceContainerLowest,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    width: '100%',
  },
  timelineCardActive: {
    borderWidth: 2,
    borderColor: Colors.light.secondary,
  },
  timelineCardInactive: {
    borderWidth: 1,
    borderColor: Colors.light.outlineVariant,
  },
  timelineCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.three,
    minHeight: 56,
  },
  timelineCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.onSurface,
    marginBottom: Spacing.one,
  },
  timelineCardTitleSmall: {
    fontSize: 15,
  },
  timelineCardSubtitle: {
    fontSize: 12,
    color: Colors.light.onSurfaceVariant,
  },
  timelineCardSubtitleSmall: {
    fontSize: 10,
  },
  timelineCardSubtitleActive: {
    color: Colors.light.secondary,
  },
  expandIcon: {
    fontSize: 16,
    color: Colors.light.onSurfaceVariant,
  },
  expandIconRotated: {
    transform: [{ rotate: '180deg' }],
  },
  timelineCardContent: {
    flex: 1,
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.three,
    paddingTop: 0,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: Spacing.four,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.three,
    alignItems: 'flex-start',
  },
  halfField: {
    flex: 1,
    minWidth: 0,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.light.onSurfaceVariant,
    marginBottom: Spacing.one,
    paddingHorizontal: 0,
  },
  inputContainer: {
    backgroundColor: Colors.light.surfaceContainerLow,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    minHeight: 44,
  },
  input: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    fontSize: 15,
    color: Colors.light.onSurface,
    minHeight: 44,
  },
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(247, 249, 251, 0.8)',
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
    borderTopWidth: 1,
    borderTopColor: Colors.light.outlineVariant,
    flexDirection: 'row',
    gap: Spacing.three,
  },
  saveDraftButton: {
    flex: 1,
    height: 48,
    borderWidth: 2,
    borderColor: Colors.light.secondary,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveDraftButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.secondary,
  },
  saveDraftButtonTextSmall: {
    fontSize: 12,
  },
  continueButton: {
    flex: 2,
    height: 48,
    backgroundColor: Colors.light.secondary,
    borderRadius: 24,
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
  continueButtonTextSmall: {
    fontSize: 12,
  },
});

export default EducationDetailsScreen;
