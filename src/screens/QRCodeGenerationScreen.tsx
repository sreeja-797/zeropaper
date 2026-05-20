import { Colors, Spacing } from '@/constants/theme';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const isSmallScreen = SCREEN_WIDTH < 375;

const QRCodeGenerationScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [screenWidth, setScreenWidth] = useState(SCREEN_WIDTH);

  React.useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenWidth(window.width);
    });
    return () => subscription?.remove();
  }, []);

  const isSmall = screenWidth < 375;

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/(auth)/role-selection');
    }
  };

  const studentData = {
    name: 'Alex Rivers',
    id: '2940-112',
    role: 'CS Senior',
    institution: 'State Tech University',
    verified: true,
  };

  const qrValue = JSON.stringify({
    studentId: studentData.id,
    name: studentData.name,
    institution: studentData.institution,
    timestamp: Date.now(),
  });

  const handleDownloadQR = async () => {
    try {
      Alert.alert('Info', 'QR code download feature requires additional packages');
    } catch (error) {
      Alert.alert('Error', 'Failed to download QR code');
    }
  };

  const handleShareQR = async () => {
    try {
      Alert.alert('Info', 'Share QR code feature requires additional packages');
    } catch (error) {
      Alert.alert('Error', 'Failed to share QR code');
    }
  };

  const handleSaveToGallery = async () => {
    try {
      Alert.alert('Info', 'Save to gallery feature requires additional packages');
    } catch (error) {
      Alert.alert('Error', 'Failed to save to gallery');
      console.error('Save error:', error);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={[styles.header, { paddingHorizontal: isSmall ? Spacing.four : Spacing.five, paddingVertical: isSmall ? Spacing.two : Spacing.three }]}>
        <View style={[styles.headerLeft, { gap: isSmall ? Spacing.two : Spacing.three }]}>
          <TouchableOpacity style={[styles.backButton, { width: isSmall ? 36 : 40, height: isSmall ? 36 : 40 }]} onPress={handleBack}>
            <Text style={[styles.backIcon, { fontSize: isSmall ? 20 : 24 }]}>←</Text>
          </TouchableOpacity>
          <Text style={[styles.brandName, { fontSize: isSmall ? 18 : 20 }]}>Zero-Paper</Text>
        </View>
        <View style={[styles.headerRight, { gap: isSmall ? Spacing.three : Spacing.four }]}>
          <TouchableOpacity style={[styles.notificationButton, { width: isSmall ? 36 : 40, height: isSmall ? 36 : 40 }]}>
            <Text style={[styles.notificationIcon, { fontSize: isSmall ? 20 : 24 }]}>🔔</Text>
          </TouchableOpacity>
          <View style={[styles.profilePhoto, { width: isSmall ? 36 : 40, height: isSmall ? 36 : 40 }]}>
            <Image
              source={require('../../assets/images/icon.png')}
              style={styles.profileImage}
            />
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Digital ID Glass Card */}
        <View style={[styles.qrCard, { minHeight: isSmall ? 360 : 450 }]}>
          {/* Animated Shine Effect */}
          <View style={styles.shineEffect} />

          {/* Branding Header */}
          <View style={[styles.cardHeader, { padding: isSmall ? Spacing.three : Spacing.five }]}>
            <View>
              <Text style={[styles.cardLabel, { fontSize: isSmall ? 11 : 12 }]}>Student Digital Pass</Text>
              <Text style={[styles.studentName, { fontSize: isSmall ? 18 : 20 }]}>{studentData.name}</Text>
              <Text style={[styles.studentDetails, { fontSize: isSmall ? 13 : 14 }]}>
                {studentData.role} • ID: {studentData.id}
              </Text>
            </View>
            <View style={[styles.verifiedBadge, { paddingHorizontal: isSmall ? Spacing.two : Spacing.three, paddingVertical: isSmall ? Spacing.one : Spacing.one }]}>
              <Text style={[styles.verifiedText, { fontSize: isSmall ? 11 : 12 }]}>Verified</Text>
            </View>
          </View>

          {/* QR Code Section */}
          <View style={[styles.qrSection, { marginTop: isSmall ? -Spacing.three : -Spacing.five }]}>
            <View style={styles.qrGradientBorder}>
              <View style={[styles.qrContainer, { padding: isSmall ? Spacing.three : Spacing.five }]}>
                <QRCode
                  value={qrValue}
                  size={isSmall ? 140 : 180}
                  color="#000000"
                  backgroundColor="#FFFFFF"
                />
              </View>
            </View>
            <View style={[styles.encryptedBadge, { marginTop: isSmall ? Spacing.three : Spacing.five, gap: isSmall ? Spacing.one : Spacing.two }]}>
              <Text style={[styles.lockIcon, { fontSize: isSmall ? 16 : 18 }]}>🔒</Text>
              <Text style={[styles.encryptedText, { fontSize: isSmall ? 13 : 14 }]}>Encrypted Verification Token</Text>
            </View>
          </View>

          {/* Card Footer */}
          <View style={[styles.cardFooter, { padding: isSmall ? Spacing.three : Spacing.five }]}>
            <View style={[styles.institutionInfo, { gap: isSmall ? Spacing.two : Spacing.three }]}>
              <View style={[styles.institutionIconContainer, { width: isSmall ? 40 : 48, height: isSmall ? 40 : 48 }]}>
                <Text style={[styles.institutionIcon, { fontSize: isSmall ? 20 : 24 }]}>🎓</Text>
              </View>
              <View>
                <Text style={[styles.institutionLabel, { fontSize: isSmall ? 11 : 12 }]}>Institution</Text>
                <Text style={[styles.institutionName, { fontSize: isSmall ? 13 : 14 }]}>{studentData.institution}</Text>
              </View>
            </View>
            <Image
              source={require('../../assets/images/expo-logo.png')}
              style={[styles.universityLogo, { width: isSmall ? 36 : 40, height: isSmall ? 36 : 40 }]}
            />
          </View>
        </View>

        {/* Action Grid */}
        <View style={[styles.actionGrid, { flexDirection: 'row', gap: Spacing.four }]}>
          <TouchableOpacity
            style={[styles.primaryActionButton, { paddingHorizontal: Spacing.four, minHeight: 60, gap: Spacing.two }]}
            onPress={handleDownloadQR}
            activeOpacity={0.8}
          >
            <Text style={[styles.actionIcon, { fontSize: 20 }]}>⬇️</Text>
            <Text style={[styles.primaryActionText, { fontSize: 14 }]} numberOfLines={1}>Download QR</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.secondaryActionButton, { paddingHorizontal: Spacing.four, minHeight: 60, gap: Spacing.two }]}
            onPress={handleShareQR}
            activeOpacity={0.8}
          >
            <Text style={[styles.actionIcon, { fontSize: 20 }]}>📤</Text>
            <Text style={[styles.secondaryActionText, { fontSize: 14 }]} numberOfLines={1}>Share Pass</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.secondaryActionButton, { paddingHorizontal: Spacing.four, minHeight: 60, gap: Spacing.two }]}
            onPress={handleSaveToGallery}
            activeOpacity={0.8}
          >
            <Text style={[styles.actionIcon, { fontSize: 20 }]}>💾</Text>
            <Text style={[styles.secondaryActionText, { fontSize: 14 }]} numberOfLines={1}>Save Gallery</Text>
          </TouchableOpacity>
        </View>

        {/* Info Tooltip */}
        <View style={[styles.infoTooltip, { padding: isSmall ? Spacing.three : Spacing.four, gap: isSmall ? Spacing.two : Spacing.three }]}>
          <Text style={[styles.infoIcon, { fontSize: isSmall ? 18 : 20 }]}>ℹ️</Text>
          <Text style={[styles.infoText, { fontSize: isSmall ? 13 : 14, lineHeight: isSmall ? 18 : 20 }]}>
            Present this QR code to recruitment staff to instantly share your verified academic
            credentials and digital resume.
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.five,
    paddingVertical: Spacing.three,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
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
  },
  brandName: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.light.secondary,
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
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.light.outlineVariant,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: isSmallScreen ? Spacing.four : Spacing.five,
  },
  qrCard: {
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.2,
    shadowRadius: 40,
    elevation: 20,
    marginBottom: Spacing.six,
    position: 'relative',
  },
  shineEffect: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    pointerEvents: 'none',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: Spacing.six,
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.light.secondary,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: Spacing.one,
  },
  studentName: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.light.onSurface,
    marginBottom: Spacing.one,
  },
  studentDetails: {
    fontSize: 14,
    color: Colors.light.onSurfaceVariant,
  },
  verifiedBadge: {
    backgroundColor: Colors.light.secondaryContainer,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: 20,
  },
  verifiedText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.light.onSecondaryContainer,
  },
  qrSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -Spacing.six,
  },
  qrGradientBorder: {
    backgroundColor: Colors.light.primaryContainer,
    padding: 4,
    borderRadius: 20,
  },
  qrContainer: {
    backgroundColor: Colors.light.surfaceContainerLowest,
    padding: Spacing.six,
    borderRadius: 22,
  },
  encryptedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    marginTop: Spacing.six,
  },
  lockIcon: {
    fontSize: 18,
  },
  encryptedText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.onSurfaceVariant,
  },
  cardFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.six,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  institutionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  institutionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: Colors.light.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  institutionIcon: {
    fontSize: 24,
    color: Colors.light.onSecondary,
  },
  institutionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.light.onSurfaceVariant,
  },
  institutionName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.light.onSurface,
  },
  universityLogo: {
    width: 40,
    height: 40,
    opacity: 0.6,
    tintColor: Colors.light.onSurfaceVariant,
  },
  actionGrid: {
    flexDirection: 'row',
    gap: Spacing.four,
    marginBottom: Spacing.six,
  },
  primaryActionButton: {
    flex: 1,
    backgroundColor: Colors.light.secondary,
    paddingVertical: Spacing.four,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
  },
  secondaryActionButton: {
    flex: 1,
    backgroundColor: Colors.light.secondaryContainer,
    paddingVertical: Spacing.four,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
  },
  actionIcon: {
    fontSize: 20,
  },
  primaryActionText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.onSecondary,
  },
  secondaryActionText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.onSecondaryFixedVariant,
  },
  infoTooltip: {
    backgroundColor: Colors.light.surfaceContainer,
    borderRadius: 12,
    padding: Spacing.four,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.three,
  },
  infoIcon: {
    fontSize: 20,
    color: Colors.light.secondary,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: Colors.light.onSurfaceVariant,
    lineHeight: 20,
  },
});

export default QRCodeGenerationScreen;
