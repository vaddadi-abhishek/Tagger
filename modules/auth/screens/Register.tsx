import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const socialOptions = [
  {
    icon: 'google' as const,
    text: 'Continue with Google',
    onPress: () => console.log('Continue with Google'),
  },
  {
    icon: 'apple' as const,
    text: 'Continue with Apple',
    onPress: () => console.log('Continue with Apple'),
  },
];

export default function RegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const navigation = useNavigation();

  const validate = useCallback(() => {
    const newErrors: { [key: string]: string | null } = {};

    // Full Name Validation
    if (fullName.trim().length > 0 && fullName.trim().length <= 4) {
      newErrors.fullName = 'Full name must be more than 4 characters.';
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim().length > 0 && !emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Password Validation
    if (password.length > 0) {
      if (password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters long.';
      } else if (!/[a-z]/.test(password)) {
        newErrors.password = 'Password must contain at least one lowercase letter.';
      } else if (!/[A-Z]/.test(password)) {
        newErrors.password = 'Password must contain at least one uppercase letter.';
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        newErrors.password = 'Password must contain at least one special character.';
      }
    }

    // Confirm Password Validation
    if (confirmPassword.length > 0 && password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
  }, [fullName, email, password, confirmPassword]);

  useEffect(() => {
    validate();
  }, [validate]);

  const handleRegister = () => {
    setLoading(true);
    console.log('Registering with:', { fullName, email, password });
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const isFormInvalid = !!(
    fullName.trim() === '' ||
    email.trim() === '' ||
    password.trim() === '' ||
    Object.values(errors).some(error => error !== null)
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Create Account</Text>
            <Text style={styles.headerSubtitle}>
              Sign up to get started and save your interests.
            </Text>
          </View>

          {/* Registration Form Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="John Doe"
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
              placeholderTextColor="#999"
            />
            {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}

            <Text style={styles.sectionTitle}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholderTextColor="#999"
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <Text style={styles.sectionTitle}>Password</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputField}
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                secureTextEntry={!isPasswordVisible}
                placeholderTextColor="#999"
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                <FontAwesome name={isPasswordVisible ? 'eye-slash' : 'eye'} size={20} color="#666" />
              </TouchableOpacity>
            </View>
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            <Text style={styles.sectionTitle}>Confirm Password</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputField}
                placeholder="••••••••"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                autoCapitalize="none"
                secureTextEntry={!isConfirmPasswordVisible}
                placeholderTextColor="#999"
              />
              <TouchableOpacity style={styles.eyeIcon} onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}>
                <FontAwesome name={isConfirmPasswordVisible ? 'eye-slash' : 'eye'} size={20} color="#666" />
              </TouchableOpacity>
            </View>
            {errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}
          </View>

          {/* Social Options Section */}
          <View style={styles.section}>
            {socialOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={option.onPress}
              >
                <View style={styles.optionIconContainer}>
                  <FontAwesome name={option.icon} size={20} color="#487eb0" />
                </View>
                <Text style={styles.optionText}>{option.text}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Footer Actions */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.actionButton, isFormInvalid && styles.disabledButton]}
              disabled={isFormInvalid || loading}
              onPress={handleRegister}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.actionButtonText}>Sign Up</Text>
              )}
            </TouchableOpacity>

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                <Text style={styles.loginLink}>Log In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderColor: '#dcdfe6',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderColor: '#dcdfe6',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  inputField: {
    flex: 1,
    fontSize: 16,
  },
  eyeIcon: {
    paddingLeft: 10,
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderColor: '#dcdfe6',
    borderWidth: 1,
    marginBottom: 10,
  },
  optionIconContainer: {
    width: 30,
    alignItems: 'center',
    marginRight: 15,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  footer: {
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: '#487eb0',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: '#a0b9d1',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  loginText: {
    fontSize: 14,
    color: '#666',
  },
  loginLink: {
    fontSize: 14,
    color: '#487eb0',
    fontWeight: 'bold',
  },
});