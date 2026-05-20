import { Colors, Spacing } from '@/constants/theme';
import React from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  padding?: number;
  variant?: 'default' | 'elevated' | 'outlined';
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  onPress,
  padding = Spacing.four,
  variant = 'default',
}) => {
  const cardStyle = [
    styles.card,
    { padding },
    variant === 'elevated' && styles.elevated,
    variant === 'outlined' && styles.outlined,
    style,
  ];

  if (onPress) {
    return (
      <Pressable style={cardStyle} onPress={onPress}>
        {children}
      </Pressable>
    );
  }

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.surfaceContainerLowest,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.light.outlineVariant,
  },
  elevated: {
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
    elevation: 4,
  },
  outlined: {
    borderWidth: 1,
    borderColor: Colors.light.outlineVariant,
  },
});
