
import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { COLORS, FONTS, Icons } from '../constants';

const { height } = Dimensions.get('window');

const Login: React.FC<{ onLogin: () => void; onSignup: () => void; onForgot: () => void }> = ({ onLogin, onSignup, onForgot }) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} bounces={false}>
      <View style={styles.header}>
        <View style={styles.headerTextWrapper}>
            <Text style={styles.headerTitle}>Login</Text>
        </View>
        <Icons.WavyHeader height={60} />
      </View>
      
      <View style={styles.form}>
        <TextInput 
          style={styles.input} 
          placeholder="Phone number" 
          placeholderTextColor="#AAA"
          keyboardType="phone-pad"
        />
        <TextInput 
          style={styles.input} 
          placeholder="Password" 
          placeholderTextColor="#AAA"
          secureTextEntry
        />
        
        <TouchableOpacity onPress={onForgot} style={styles.forgotBtn}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onLogin} style={styles.loginBtn}>
          <Text style={styles.loginBtnText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.googleBtn}>
            <Icons.Google />
          </TouchableOpacity>
          
          <View style={styles.signupRow}>
            <Text style={styles.footerLabel}>Don't have an account? </Text>
            <TouchableOpacity onPress={onSignup}>
              <Text style={styles.signupText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    backgroundColor: COLORS.primary,
    height: height * 0.22,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 10,
  },
  headerTextWrapper: {
    paddingBottom: 30,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 40,
    fontWeight: '900',
    fontFamily: FONTS.main,
  },
  form: {
    paddingHorizontal: 28,
  },
  input: {
    backgroundColor: '#FFF',
    height: 52,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    color: '#333',
    fontFamily: FONTS.main,
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
    fontFamily: FONTS.main,
  },
  loginBtn: {
    backgroundColor: COLORS.primary,
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    marginBottom: 24,
  },
  loginBtnText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '800',
    fontFamily: FONTS.bold,
  },
  footer: {
    alignItems: 'center',
  },
  googleBtn: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 1,
    borderColor: '#EEE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  signupRow: {
    flexDirection: 'row',
  },
  footerLabel: {
    color: '#333',
    fontWeight: '500',
    fontFamily: FONTS.main,
    fontSize: 13,
  },
  signupText: {
    color: COLORS.primary,
    fontWeight: '800',
    fontFamily: FONTS.bold,
    fontSize: 13,
    textDecorationLine: 'underline',
  }
});

export default Login;
