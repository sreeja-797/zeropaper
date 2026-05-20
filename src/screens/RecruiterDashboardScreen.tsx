import { Colors, Spacing } from '@/constants/theme';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
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

interface RecentScan {
  id: string;
  name: string;
  role: string;
  institution: string;
  timeAgo: string;
  status: 'verified' | 'pending' | 'incomplete';
  skills: string[];
}

const RecruiterDashboardScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const recentScans: RecentScan[] = [
    {
      id: '1',
      name: 'Liam Carter',
      role: 'Full-stack Dev',
      institution: "MIT '24",
      timeAgo: '2m ago',
      status: 'verified',
      skills: ['AI/ML'],
    },
    {
      id: '2',
      name: 'Sophia Martinez',
      role: 'UI/UX Design',
      institution: "RISD '25",
      timeAgo: '15m ago',
      status: 'pending',
      skills: ['Figma', 'Protoshare'],
    },
    {
      id: '3',
      name: 'Scanned Student #882',
      role: '',
      institution: '',
      timeAgo: '1h ago',
      status: 'incomplete',
      skills: [],
    },
  ];

  const chartData = [
    { day: 'Mon', value: 45 },
    { day: 'Tue', value: 70 },
    { day: 'Wed', value: 95 },
    { day: 'Thu', value: 60 },
    { day: 'Fri', value: 80 },
  ];

  const handleScanQR = () => {
    router.push('/(recruiter)/qr-scanner' as any);
  };

  const handleStudentPress = (student: RecentScan) => {
    router.push('/(recruiter)/candidate-profile' as any);
  };

  const handleFilterPress = (filter: string) => {
    setSelectedFilter(filter === selectedFilter ? null : filter);
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/(auth)/role-selection');
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { paddingTop: insets.top }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatar}>
            <Text style={styles.avatarInitials}>AR</Text>
          </View>
          <Text style={styles.brandName}>Zero-Paper</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Text style={styles.notificationIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 120 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Search & Filter Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search student name or ID..."
              placeholderTextColor={Colors.light.onSurfaceVariant}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filterScroll}
            contentContainerStyle={styles.filterContent}
          >
            <TouchableOpacity
              style={[
                styles.filterChip,
                selectedFilter === 'Java' && styles.filterChipActive,
              ]}
              onPress={() => handleFilterPress('Java')}
            >
              <Text style={styles.filterIcon}>🔧</Text>
              <Text style={styles.filterText}>Skill: Java</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterChip,
                selectedFilter === 'FinTech' && styles.filterChipActive,
              ]}
              onPress={() => handleFilterPress('FinTech')}
            >
              <Text style={styles.filterIcon}>🏢</Text>
              <Text style={styles.filterText}>Domain: FinTech</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Analytics Bento Grid */}
        <View style={styles.analyticsGrid}>
          {/* Interested Students Chart */}
          <View style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>Interested Students</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>+12% this week</Text>
              </View>
            </View>
            <View style={styles.chartContainer}>
              {chartData.map((item, index) => (
                <View key={item.day} style={styles.chartBarContainer}>
                  <View
                    style={[
                      styles.chartBar,
                      { height: `${item.value}%` },
                      item.day === 'Wed' && styles.chartBarHighlight,
                    ]}
                  />
                  <Text
                    style={[
                      styles.chartLabel,
                      item.day === 'Wed' && styles.chartLabelHighlight,
                    ]}
                  >
                    {item.day}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Conversion Card */}
          <View style={styles.conversionCard}>
            <View>
              <Text style={styles.conversionLabel}>Scanning Conversion</Text>
              <Text style={styles.conversionValue}>84%</Text>
            </View>
            <View style={styles.conversionDetails}>
              <View style={styles.conversionStat}>
                <Text style={styles.conversionStatLabel}>Scans</Text>
                <Text style={styles.conversionStatValue}>1,204</Text>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '84%' }]} />
              </View>
              <Text style={styles.conversionDescription}>
                Students who completed profile after QR scan.
              </Text>
            </View>
          </View>
        </View>

        {/* Recent Scans */}
        <View style={styles.recentScansSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Scans</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.scansList}>
            {recentScans.map((scan) => (
              <TouchableOpacity
                key={scan.id}
                style={styles.scanItem}
                onPress={() => handleStudentPress(scan)}
              >
                <View style={styles.scanAvatarContainer}>
                  {scan.status === 'incomplete' ? (
                    <View style={styles.scanAvatar}>
                      <Text style={styles.scanAvatarIcon}>👤</Text>
                    </View>
                  ) : (
                    <View style={styles.scanAvatar}>
                      <Text style={styles.scanAvatarInitials}>
                        {scan.name.charAt(0)}
                      </Text>
                    </View>
                  )}
                  {scan.status === 'verified' && (
                    <View style={styles.statusBadgeVerified}>
                      <Text style={styles.statusBadgeIcon}>✓</Text>
                    </View>
                  )}
                  {scan.status === 'pending' && (
                    <View style={styles.statusBadgePending}>
                      <Text style={styles.statusBadgeIcon}>⏰</Text>
                    </View>
                  )}
                </View>
                <View style={styles.scanInfo}>
                  <Text style={styles.scanName}>{scan.name}</Text>
                  <Text style={styles.scanDetails}>
                    {scan.role} • {scan.institution}
                  </Text>
                </View>
                <View style={styles.scanMeta}>
                  <Text style={styles.scanTime}>{scan.timeAgo}</Text>
                  <View style={styles.skillTags}>
                    {scan.skills.map((skill, idx) => (
                      <View key={idx} style={styles.skillTag}>
                        <Text style={styles.skillTagText}>{skill}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Scan QR Floating Action Button */}
      <TouchableOpacity
        style={styles.scanQRButton}
        onPress={handleScanQR}
        activeOpacity={0.8}
      >
        <Text style={styles.scanQRIcon}>📷</Text>
        <Text style={styles.scanQRText}>SCAN QR</Text>
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={[styles.bottomNav, { paddingBottom: insets.bottom }]}>
        <TouchableOpacity style={styles.navItemActive}>
          <Text style={styles.navIconActive}>🏠</Text>
          <Text style={styles.navLabelActive}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>📷</Text>
          <Text style={styles.navLabel}>QR Scan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navLabel}>Profile</Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.five,
    paddingVertical: Spacing.three,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.secondaryFixed,
    borderWidth: 1,
    borderColor: Colors.light.outlineVariant,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
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
  searchSection: {
    marginBottom: Spacing.five,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.surfaceContainerLow,
    borderRadius: 12,
    paddingHorizontal: Spacing.four,
    marginBottom: Spacing.three,
    height: 48,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: Spacing.three,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 0,
    fontSize: 16,
    color: Colors.light.onSurface,
  },
  filterScroll: {
    marginBottom: 0,
  },
  filterContent: {
    gap: Spacing.two,
    paddingRight: Spacing.five,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    backgroundColor: Colors.light.surfaceContainerHigh,
    borderRadius: 12,
  },
  filterChipActive: {
    backgroundColor: Colors.light.secondary,
  },
  filterIcon: {
    fontSize: 16,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.onSurface,
  },
  analyticsGrid: {
    flexDirection: 'column',
    gap: Spacing.four,
    marginBottom: Spacing.six,
  },
  chartCard: {
    width: '100%',
    backgroundColor: Colors.light.surfaceContainerLowest,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.light.outlineVariant,
    padding: Spacing.five,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.five,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.onSurface,
    flexShrink: 1,
  },
  badge: {
    backgroundColor: Colors.light.secondaryFixed,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: 20,
    marginLeft: Spacing.two,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.light.secondary,
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 140,
    gap: Spacing.three,
    paddingHorizontal: Spacing.one,
  },
  chartBarContainer: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing.two,
  },
  chartBar: {
    width: '100%',
    backgroundColor: Colors.light.secondaryContainer,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    minHeight: 4,
  },
  chartBarHighlight: {
    backgroundColor: Colors.light.secondary,
  },
  chartLabel: {
    fontSize: 12,
    color: Colors.light.onSurfaceVariant,
  },
  chartLabelHighlight: {
    fontWeight: '600',
  },
  conversionCard: {
    width: '100%',
    backgroundColor: Colors.light.secondaryContainer,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.light.outlineVariant,
    padding: Spacing.five,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  conversionLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.light.onSecondaryContainer,
    opacity: 0.8,
  },
  conversionValue: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.light.onSecondaryContainer,
    marginTop: Spacing.one,
  },
  conversionDetails: {
    flex: 1,
    marginLeft: Spacing.four,
    gap: Spacing.three,
  },
  conversionStat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  conversionStatLabel: {
    fontSize: 14,
    color: Colors.light.onSecondaryContainer,
  },
  conversionStatValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.onSecondaryContainer,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 2,
  },
  conversionDescription: {
    fontSize: 12,
    color: Colors.light.onSecondaryContainer,
    opacity: 0.8,
    lineHeight: 16,
  },
  recentScansSection: {
    marginBottom: Spacing.five,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.four,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.onSurface,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.secondary,
  },
  scansList: {
    gap: Spacing.three,
  },
  scanItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.four,
    backgroundColor: Colors.light.surfaceContainerLowest,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.light.outlineVariant,
  },
  scanAvatarContainer: {
    position: 'relative',
  },
  scanAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.light.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanAvatarIcon: {
    fontSize: 32,
  },
  scanAvatarInitials: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.light.onSurface,
  },
  statusBadgeVerified: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 24,
    height: 24,
    backgroundColor: '#10b981',
    borderWidth: 2,
    borderColor: Colors.light.surfaceContainerLowest,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBadgePending: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 24,
    height: 24,
    backgroundColor: Colors.light.surfaceContainerHigh,
    borderWidth: 2,
    borderColor: Colors.light.surfaceContainerLowest,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBadgeIcon: {
    fontSize: 14,
    color: '#ffffff',
  },
  scanInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  scanName: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.light.onSurface,
    marginBottom: Spacing.one,
  },
  scanDetails: {
    fontSize: 13,
    color: Colors.light.onSurfaceVariant,
    flexShrink: 1,
  },
  scanMeta: {
    alignItems: 'flex-end',
    gap: Spacing.one,
    minWidth: 80,
  },
  scanTime: {
    fontSize: 12,
    color: Colors.light.onSurfaceVariant,
  },
  skillTags: {
    flexDirection: 'row',
    gap: Spacing.one,
    flexWrap: 'wrap',
  },
  skillTag: {
    backgroundColor: Colors.light.secondaryFixed,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    borderRadius: 12,
  },
  skillTagText: {
    fontSize: 10,
    fontWeight: '500',
    color: Colors.light.onSecondaryFixedVariant,
  },
  scanQRButton: {
    position: 'absolute',
    bottom: 90,
    left: Spacing.five,
    right: Spacing.five,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
    backgroundColor: Colors.light.secondary,
    borderRadius: 28,
    paddingVertical: Spacing.four,
    paddingHorizontal: Spacing.six,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    zIndex: 100,
  },
  scanQRIcon: {
    fontSize: 22,
  },
  scanQRText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.light.onSecondary,
    letterSpacing: 0.5,
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
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderTopWidth: 1,
    borderTopColor: Colors.light.outlineVariant,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 50,
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
  navItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.five,
    paddingVertical: Spacing.one,
  },
  navIconActive: {
    fontSize: 24,
  },
  navLabelActive: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: Spacing.one,
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
});

export default RecruiterDashboardScreen;
