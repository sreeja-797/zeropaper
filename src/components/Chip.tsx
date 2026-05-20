import { Colors, Spacing } from '@/constants/theme';
import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle
} from 'react-native';

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  variant?: 'default' | 'secondary' | 'tertiary';
}

export const Chip: React.FC<ChipProps> = ({
  label,
  selected = false,
  onPress,
  containerStyle,
  textStyle,
  variant = 'default',
}) => {
  const getContainerStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = styles.chip;

    if (selected) {
      switch (variant) {
        case 'secondary':
          return { ...baseStyle, backgroundColor: Colors.light.secondary };
        case 'tertiary':
          return { ...baseStyle, backgroundColor: Colors.light.tertiaryFixed };
        default:
          return { ...baseStyle, backgroundColor: Colors.light.secondary };
      }
    }

    switch (variant) {
      case 'secondary':
        return { ...baseStyle, backgroundColor: Colors.light.secondaryContainer };
      case 'tertiary':
        return { ...baseStyle, backgroundColor: Colors.light.tertiaryFixed };
      default:
        return { ...baseStyle, backgroundColor: Colors.light.surfaceContainer };
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = styles.text;

    if (selected) {
      switch (variant) {
        case 'secondary':
          return { ...baseStyle, color: Colors.light.onSecondary };
        case 'tertiary':
          return { ...baseStyle, color: Colors.light.onSecondary };
        default:
          return { ...baseStyle, color: Colors.light.onSecondary };
      }
    }

    switch (variant) {
      case 'secondary':
        return { ...baseStyle, color: Colors.light.onSecondaryFixedVariant };
      case 'tertiary':
        return { ...baseStyle, color: Colors.light.onSecondary };
      default:
        return { ...baseStyle, color: Colors.light.onSurfaceVariant };
    }
  };

  if (onPress) {
    return (
      <Pressable
        style={[getContainerStyle(), containerStyle]}
        onPress={onPress}
      >
        <Text style={[getTextStyle(), textStyle]}>{label}</Text>
      </Pressable>
    );
  }

  return (
    <View style={[getContainerStyle(), containerStyle]}>
      <Text style={[getTextStyle(), textStyle]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
  },
});
