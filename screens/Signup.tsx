
import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { COLORS, FONTS, Icons } from '../constants';

const { height } = Dimensions.get('window');

const Signup: React.FC<{ onSignup: () => void; onLogin: () => void }> = ({ onSignup, onLogin }) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} bounces={false}>
      <View style={styles.header}>
        <View style={styles.headerTextWrapper}>
            <Text style={styles.headerTitle}>Sign Up</Text>
        </View>
        <Icons.WavyHeader height={50} />
      </View>
      
      <View style={styles.form}>
        <TextInput 
          style={styles.input} 
          placeholder="Full name" 
          placeholderTextColor="#AAA"
        />
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
        <TextInput 
          style={styles.input} 
          placeholder="Confirm password" 
          placeholderTextColor="#AAA"
          secureTextEntry
        />

        <TouchableOpacity onPress={onSignup} style={styles.signupBtn}>
          <Text style={styles.signupBtnText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.googleBtn}>
            <Icons.Google />
          </TouchableOpacity>
          
          <View style={styles.loginRow}>
            <Text style={styles.footerLabel}>Already have an account? </Text>
            <TouchableOpacity onPress={onLogin}>
              <Text style={styles.loginText}>Login</Text>
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
    height: height * 0.18,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 5,
  },
  headerTextWrapper: {
    paddingBottom: 20,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 36,
    fontWeight: '900',
    fontFamily: FONTS.bold,
  },
  form: {
    paddingHorizontal: 28,
  },
  input: {
    backgroundColor: '#FFF',
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    color: '#333',
    fontFamily: FONTS.main,
  },
  signupBtn: {
    backgroundColor: COLORS.primary,
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    marginTop: 5,
    marginBottom: 15,
  },
  signupBtnText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '800',
    fontFamily: FONTS.bold,
  },
  footer: {
    alignItems: 'center',
  },
  googleBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#EEE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  loginRow: {
    flexDirection: 'row',
  },
  footerLabel: {
    color: '#333',
    fontWeight: '500',
    fontFamily: FONTS.main,
    fontSize: 13,
  },
  loginText: {
    color: COLORS.primary,
    fontWeight: '800',
    fontFamily: FONTS.bold,
    fontSize: 13,
    textDecorationLine: 'underline',
  }
});

export default Signup;
