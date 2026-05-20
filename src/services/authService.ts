import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_STORAGE_KEY = '@zeropaper_users';
const CURRENT_USER_KEY = '@zeropaper_current_user';

export interface UserData {
  id: string;
  email: string;
  password: string;
  role: 'student' | 'recruiter';
  name?: string;
  companyName?: string;
  recruiterName?: string;
  designation?: string;
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  user?: UserData;
  error?: string;
}

export class AuthService {
  private static generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private static async getUsers(): Promise<UserData[]> {
    try {
      const usersJson = await AsyncStorage.getItem(USERS_STORAGE_KEY);
      return usersJson ? JSON.parse(usersJson) : [];
    } catch (error) {
      console.error('Error getting users:', error);
      return [];
    }
  }

  private static async saveUsers(users: UserData[]): Promise<void> {
    try {
      await AsyncStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    } catch (error) {
      console.error('Error saving users:', error);
      throw error;
    }
  }

  static async signup(userData: Omit<UserData, 'id' | 'createdAt'>): Promise<AuthResponse> {
    try {
      const users = await this.getUsers();
      
      // Check if email already exists
      const existingUser = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
      if (existingUser) {
        return { success: false, error: 'Email already registered' };
      }

      // Validate password
      if (userData.password.length < 8) {
        return { success: false, error: 'Password must be at least 8 characters' };
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userData.email)) {
        return { success: false, error: 'Invalid email format' };
      }

      // Create new user
      const newUser: UserData = {
        ...userData,
        id: this.generateId(),
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      await this.saveUsers(users);

      // Auto-login after signup
      await this.setCurrentUser(newUser);

      return { success: true, user: newUser };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: 'Signup failed. Please try again.' };
    }
  }

  static async login(email: string, password: string, role: 'student' | 'recruiter'): Promise<AuthResponse> {
    try {
      const users = await this.getUsers();
      
      const user = users.find(
        u => u.email.toLowerCase() === email.toLowerCase() && 
             u.password === password && 
             u.role === role
      );

      if (!user) {
        return { success: false, error: 'Invalid credentials or role mismatch' };
      }

      await this.setCurrentUser(user);
      return { success: true, user };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  }

  static async logout(): Promise<void> {
    try {
      await AsyncStorage.removeItem(CURRENT_USER_KEY);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  static async getCurrentUser(): Promise<UserData | null> {
    try {
      const userJson = await AsyncStorage.getItem(CURRENT_USER_KEY);
      return userJson ? JSON.parse(userJson) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  private static async setCurrentUser(user: UserData): Promise<void> {
    try {
      await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Error setting current user:', error);
      throw error;
    }
  }

  static async updateUser(userId: string, updates: Partial<UserData>): Promise<AuthResponse> {
    try {
      const users = await this.getUsers();
      const userIndex = users.findIndex(u => u.id === userId);
      
      if (userIndex === -1) {
        return { success: false, error: 'User not found' };
      }

      users[userIndex] = { ...users[userIndex], ...updates };
      await this.saveUsers(users);

      // Update current user if it's the same user
      const currentUser = await this.getCurrentUser();
      if (currentUser && currentUser.id === userId) {
        await this.setCurrentUser(users[userIndex]);
        return { success: true, user: users[userIndex] };
      }

      return { success: true, user: users[userIndex] };
    } catch (error) {
      console.error('Update user error:', error);
      return { success: false, error: 'Update failed. Please try again.' };
    }
  }

  static async deleteAccount(userId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const users = await this.getUsers();
      const filteredUsers = users.filter(u => u.id !== userId);
      await this.saveUsers(filteredUsers);
      
      // Logout if deleting own account
      const currentUser = await this.getCurrentUser();
      if (currentUser && currentUser.id === userId) {
        await this.logout();
      }

      return { success: true };
    } catch (error) {
      console.error('Delete account error:', error);
      return { success: false, error: 'Delete failed. Please try again.' };
    }
  }

  static async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([USERS_STORAGE_KEY, CURRENT_USER_KEY]);
    } catch (error) {
      console.error('Clear data error:', error);
      throw error;
    }
  }
}
