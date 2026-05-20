import { Colors, Spacing } from '@/constants/theme';
import * as DocumentPicker from 'expo-document-picker';
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

interface ResumeFile {
  uri: string;
  name: string;
  size: number;
  type: string;
}

const ResumeUploadScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [resumeFile, setResumeFile] = useState<ResumeFile | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });

      if (result.canceled === false && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const file: ResumeFile = {
          uri: asset.uri,
          name: asset.name,
          size: asset.size || 0,
          type: asset.mimeType || 'application/pdf',
        };

        // Simulate upload
        setIsUploading(true);
        setTimeout(() => {
          setResumeFile(file);
          setIsUploading(false);
          setUploadSuccess(true);
        }, 1500);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick document. Please try again.');
    }
  };

  const handleReplaceResume = () => {
    Alert.alert(
      'Replace Resume',
      'Are you sure you want to replace your current resume?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Replace', style: 'destructive', onPress: handlePickDocument },
      ]
    );
  };

  const handleDeleteResume = () => {
    Alert.alert(
      'Delete Resume',
      'Are you sure you want to delete your resume?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setResumeFile(null);
            setUploadSuccess(false);
          },
        },
      ]
    );
  };

  const handleSkip = () => {
    router.push('/(student)/final-review' as any);
  };

  const handleContinue = () => {
    if (resumeFile) {
      router.push('/(student)/final-review' as any);
    } else {
      Alert.alert('Required', 'Please upload your resume to continue.');
    }
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/(auth)/role-selection');
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.brandName}>Zero-Paper</Text>
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
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 140 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressInfo}>
            <Text style={styles.stepLabel}>Step 5 of 6</Text>
            <Text style={styles.progressPercent}>83% Complete</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '83%' }]} />
          </View>
        </View>

        {/* Header Content */}
        <View style={styles.headerSection}>
          <Text style={styles.title}>Upload your Resume</Text>
          <Text style={styles.subtitle}>
            Recruiters prioritize candidates with clean, PDF formatted resumes. We'll parse your
            data to auto-fill the final application steps.
          </Text>
        </View>

        {/* Upload Area */}
        {!resumeFile ? (
          <TouchableOpacity
            style={styles.uploadArea}
            onPress={handlePickDocument}
            activeOpacity={0.7}
          >
            <View style={styles.uploadIconContainer}>
              <Text style={styles.uploadIcon}>☁️</Text>
            </View>
            <Text style={styles.uploadTitle}>Drag and drop your resume</Text>
            <Text style={styles.uploadSubtitle}>Supported format: PDF only (Max 5MB)</Text>
            <TouchableOpacity
              style={styles.browseButton}
              onPress={handlePickDocument}
              activeOpacity={0.8}
            >
              <Text style={styles.browseButtonText}>Browse Files</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ) : (
          <View style={styles.previewCard}>
            <View style={styles.previewIconContainer}>
              <Text style={styles.previewIcon}>📄</Text>
            </View>
            <View style={styles.previewInfo}>
              <Text style={styles.fileName} numberOfLines={1}>
                {resumeFile.name}
              </Text>
              <Text style={styles.fileSize}>
                {formatFileSize(resumeFile.size)} • Uploaded just now
              </Text>
              {uploadSuccess && (
                <View style={styles.uploadProgress}>
                  <View style={styles.progressBarSmall}>
                    <View style={styles.progressBarSmallFill} />
                  </View>
                  <Text style={styles.checkIcon}>✓</Text>
                </View>
              )}
            </View>
            <View style={styles.previewActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleReplaceResume}
                activeOpacity={0.7}
              >
                <Text style={styles.actionIcon}>🔄</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleDeleteResume}
                activeOpacity={0.7}
              >
                <Text style={[styles.actionIcon, styles.deleteIcon]}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Visual Context Image */}
        <View style={styles.contextImageContainer}>
          <Image
            source={require('../../assets/images/tutorial-web.png')}
            style={styles.contextImage}
            resizeMode="cover"
          />
          <View style={styles.contextOverlay}>
            <Text style={styles.contextText}>
              <Text style={styles.contextIcon}>🔒</Text> Your data is encrypted and secure
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Action */}
      <View style={[styles.bottomActionContainer, { paddingBottom: insets.bottom + Spacing.four }]}>
        <TouchableOpacity
          style={styles.skipButton}
          onPress={handleSkip}
          activeOpacity={0.8}
        >
          <Text style={styles.skipButtonText}>Skip for now</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.continueButton, !resumeFile && styles.continueButtonDisabled]}
          onPress={handleContinue}
          activeOpacity={0.8}
          disabled={!resumeFile}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
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
  brandName: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.light.secondary,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
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
    marginBottom: Spacing.six,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.two,
  },
  stepLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.light.onSurfaceVariant,
  },
  progressPercent: {
    fontSize: 12,
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
  uploadArea: {
    backgroundColor: Colors.light.surfaceContainerLow,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: Colors.light.outlineVariant,
    borderStyle: 'dashed',
    padding: Spacing.six,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 280,
    marginBottom: Spacing.six,
  },
  uploadIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.light.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.four,
  },
  uploadIcon: {
    fontSize: 32,
  },
  uploadTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.light.onSurface,
    marginBottom: Spacing.two,
  },
  uploadSubtitle: {
    fontSize: 14,
    color: Colors.light.onSurfaceVariant,
    marginBottom: Spacing.four,
  },
  browseButton: {
    backgroundColor: Colors.light.secondary,
    paddingHorizontal: Spacing.six,
    paddingVertical: Spacing.three,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  browseButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.onSecondary,
  },
  previewCard: {
    backgroundColor: Colors.light.surfaceContainerLowest,
    borderRadius: 24,
    padding: Spacing.four,
    borderWidth: 1,
    borderColor: Colors.light.outlineVariant,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.four,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 2,
    marginBottom: Spacing.six,
  },
  previewIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: Colors.light.onErrorContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewIcon: {
    fontSize: 28,
  },
  previewInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.onSurface,
    marginBottom: Spacing.one,
  },
  fileSize: {
    fontSize: 14,
    color: Colors.light.onSurfaceVariant,
    marginBottom: Spacing.two,
  },
  uploadProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  progressBarSmall: {
    flex: 1,
    height: 6,
    backgroundColor: Colors.light.surfaceContainer,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarSmallFill: {
    height: '100%',
    backgroundColor: Colors.light.secondary,
    borderRadius: 3,
  },
  checkIcon: {
    fontSize: 16,
    color: Colors.light.secondary,
  },
  previewActions: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIcon: {
    fontSize: 20,
  },
  deleteIcon: {
    color: Colors.light.error,
  },
  contextImageContainer: {
    borderRadius: 24,
    overflow: 'hidden',
    aspectRatio: 16 / 9,
    marginBottom: Spacing.six,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 4,
  },
  contextImage: {
    width: '100%',
    height: '100%',
  },
  contextOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: Spacing.four,
  },
  contextText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.onSecondary,
  },
  contextIcon: {
    fontSize: 16,
    marginRight: Spacing.two,
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
  skipButton: {
    flex: 1,
    height: 56,
    backgroundColor: Colors.light.surfaceContainerHigh,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.light.outline,
  },
  skipButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.secondary,
  },
  continueButton: {
    flex: 1,
    height: 56,
    backgroundColor: Colors.light.secondary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.onSecondary,
  },
});

export default ResumeUploadScreen;
