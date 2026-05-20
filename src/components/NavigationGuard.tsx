import React from 'react';

export const NavigationGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Auth guard disabled - allowing simple navigation flow without authentication
  return <>{children}</>;
};
