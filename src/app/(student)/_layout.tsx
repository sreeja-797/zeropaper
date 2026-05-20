import { Stack } from 'expo-router';
import React from 'react';

export default function StudentLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="basic-details" />
      <Stack.Screen name="education-details" />
      <Stack.Screen name="skills-interests" />
      <Stack.Screen name="projects-experience" />
      <Stack.Screen name="resume-upload" />
      <Stack.Screen name="final-review" />
      <Stack.Screen name="qr-generation" />
    </Stack>
  );
}
