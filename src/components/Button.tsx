import { Colors, Spacing } from '@/constants/theme';
import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  icon,
  fullWidth = false,
  style,
  textStyle,
}) => {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      ...styles.button,
      ...(fullWidth && styles.fullWidth),
    };

    if (disabled || loading) {
      return { ...baseStyle, ...styles.disabled };
    }

    switch (variant) {
      case 'secondary':
        return { ...baseStyle, backgroundColor: Colors.light.secondaryContainer };
      case 'outline':
        return { ...baseStyle, backgroundColor: 'transparent', borderWidth: 1, borderColor: Colors.light.secondary };
      case 'ghost':
        return { ...baseStyle, backgroundColor: 'transparent' };
      default:
        return { ...baseStyle, backgroundColor: Colors.light.secondary };
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = styles.text;

    if (disabled || loading) {
      return { ...baseStyle, color: Colors.light.onSurfaceVariant };
    }

    switch (variant) {
      case 'secondary':
        return { ...baseStyle, color: Colors.light.onSecondaryContainer };
      case 'outline':
        return { ...baseStyle, color: Colors.light.secondary };
      case 'ghost':
        return { ...baseStyle, color: Colors.light.secondary };
      default:
        return { ...baseStyle, color: Colors.light.onSecondary };
    }
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={Colors.light.onSecondary} />
      ) : (
        <View style={styles.content}>
          {icon && <View style={styles.icon}>{icon}</View>}
          <Text style={[getTextStyle(), textStyle]}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.one,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  icon: {
    marginRight: Spacing.one,
  },
});
