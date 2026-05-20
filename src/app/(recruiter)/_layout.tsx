import { Stack } from 'expo-router';
import React from 'react';

export default function RecruiterLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="qr-scanner" />
      <Stack.Screen name="candidate-profile" />
    </Stack>
  );
}
