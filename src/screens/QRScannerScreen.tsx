import { Colors, Spacing } from '@/constants/theme';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const QRScannerScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [permission, requestPermission] = useCameraPermissions();
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [scanned, setScanned] = useState(false);
  const scanAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startScanAnimation();
  }, []);

  const startScanAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanAnimation, {
          toValue: 1,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(scanAnimation, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const handleFlashToggle = () => {
    setFlashEnabled(!flashEnabled);
  };

  const handleGalleryPress = () => {
    console.log('Open gallery for QR code');
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/(auth)/role-selection');
    }
  };

  const handleBarcodeScanned = (data: any) => {
    if (scanned) return;
    setScanned(true);
    console.log('QR Code scanned:', data);
    // Navigate to candidate profile after successful scan
    router.push('/(recruiter)/candidate-profile');
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={[styles.container, styles.centerContainer]}>
        <Text style={styles.permissionText}>
          Camera permission is required to scan QR codes
        </Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const scanLineY = scanAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 280],
  });

  return (
    <View style={styles.container}>
      {/* Camera View */}
      <CameraView
        style={styles.camera}
        facing="back"
        onBarcodeScanned={handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
        enableTorch={flashEnabled}
      />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={handleBack}
          activeOpacity={0.8}
        >
          <Text style={styles.headerIcon}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Zero-Paper</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Scanning Overlay */}
      <View style={styles.overlay}>
        {/* Scanning Frame */}
        <View style={styles.scanFrame}>
          {/* Frame Corners */}
          <View style={[styles.corner, styles.cornerTopLeft]} />
          <View style={[styles.corner, styles.cornerTopRight]} />
          <View style={[styles.corner, styles.cornerBottomLeft]} />
          <View style={[styles.corner, styles.cornerBottomRight]} />

          {/* Scanning Laser */}
          <Animated.View
            style={[
              styles.scanLine,
              {
                transform: [{ translateY: scanLineY }],
              },
            ]}
          />

          {/* QR Icon Indicator */}
          <View style={styles.qrIconContainer}>
            <Text style={styles.qrIcon}>📱</Text>
          </View>
        </View>

        {/* Instruction Text */}
        <View style={styles.instructions}>
          <Text style={styles.instructionMain}>Align QR Code within frame</Text>
          <Text style={styles.instructionSub}>Scanning for student identity...</Text>
        </View>
      </View>

      {/* Floating Action Buttons */}
      <View style={[styles.actionButtons, { bottom: insets.bottom + 80 }]}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleFlashToggle}
          activeOpacity={0.8}
        >
          <View style={styles.actionButtonCircle}>
            <Text style={styles.actionButtonIcon}>
              {flashEnabled ? '🔦' : '💡'}
            </Text>
          </View>
          <Text style={styles.actionButtonLabel}>Flash</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleGalleryPress}
          activeOpacity={0.8}
        >
          <View style={styles.actionButtonCircle}>
            <Text style={styles.actionButtonIcon}>🖼️</Text>
          </View>
          <Text style={styles.actionButtonLabel}>Gallery</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View style={[styles.bottomNav, { paddingBottom: insets.bottom }]}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItemActive}>
          <Text style={styles.navIconActive}>📷</Text>
          <Text style={styles.navLabelActive}>QR Scan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.primaryContainer,
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.five,
  },
  permissionText: {
    fontSize: 16,
    color: Colors.light.onSurface,
    textAlign: 'center',
    marginBottom: Spacing.four,
  },
  permissionButton: {
    backgroundColor: Colors.light.secondary,
    paddingHorizontal: Spacing.six,
    paddingVertical: Spacing.three,
    borderRadius: 12,
  },
  permissionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.onSecondary,
  },
  camera: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.five,
    paddingVertical: Spacing.three,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    zIndex: 50,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {
    fontSize: 24,
    color: Colors.light.onSecondary,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.light.onSecondary,
  },
  headerSpacer: {
    width: 40,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: 288,
    height: 288,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderColor: Colors.light.tertiaryFixed,
  },
  cornerTopLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 12,
  },
  cornerTopRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 12,
  },
  cornerBottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 12,
  },
  cornerBottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 12,
  },
  scanLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'rgba(172, 237, 255, 0.8)',
  },
  qrIconContainer: {
    position: 'absolute',
    inset: 0,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.1,
  },
  qrIcon: {
    fontSize: 120,
  },
  instructions: {
    marginTop: Spacing.six,
    paddingHorizontal: Spacing.five,
    alignItems: 'center',
  },
  instructionMain: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.light.onSecondary,
    marginBottom: Spacing.two,
  },
  instructionSub: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.light.tertiaryFixed,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  actionButtons: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.six,
    paddingHorizontal: Spacing.five,
    zIndex: 30,
  },
  actionButton: {
    alignItems: 'center',
    gap: Spacing.two,
  },
  actionButtonCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonIcon: {
    fontSize: 24,
  },
  actionButtonLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.light.onSecondary,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: Spacing.five,
    paddingVertical: Spacing.three,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderTopWidth: 1,
    borderTopColor: Colors.light.outlineVariant,
    zIndex: 50,
  },
  navItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.five,
    paddingVertical: Spacing.one,
  },
  navItemActive: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.secondaryContainer,
    paddingHorizontal: Spacing.five,
    paddingVertical: Spacing.one,
    borderRadius: 20,
  },
  navIcon: {
    fontSize: 24,
  },
  navLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.light.onSurfaceVariant,
    marginTop: Spacing.one,
  },
  navIconActive: {
    fontSize: 24,
  },
  navLabelActive: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: Spacing.one,
  },
});

export default QRScannerScreen;
