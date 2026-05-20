import { Stack } from 'expo-router';
import React from 'react';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="splash" />
      <Stack.Screen name="role-selection" />
      <Stack.Screen name="student-login" />
      <Stack.Screen name="student-signup" />
      <Stack.Screen name="recruiter-login" />
      <Stack.Screen name="recruiter-signup" />
    </Stack>
  );
}
