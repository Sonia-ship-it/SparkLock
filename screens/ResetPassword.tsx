
import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS, FONTS } from '../constants';
import WavyHeader from '../components/WavyHeader';

const ResetPassword: React.FC<{ onContinue: () => void }> = ({ onContinue }) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <WavyHeader title="Reset Password" />
      
      <View style={styles.content}>
        <Text style={styles.description}>
          Enter your valid phone number so as to reset your password
        </Text>

        <TextInput 
          style={styles.input} 
          placeholder="Phone number" 
          placeholderTextColor="#AAA"
          keyboardType="phone-pad"
        />

        <TouchableOpacity onPress={onContinue} style={styles.continueBtn}>
          <Text style={styles.continueBtnText}>Continue</Text>
        </TouchableOpacity>
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
  },
  content: {
    paddingHorizontal: 32,
    alignItems: 'center',
    marginTop: 40,
  },
  description: {
    fontSize: 15,
    color: '#888',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    fontWeight: '500',
    paddingHorizontal: 20,
    fontFamily: FONTS.main,
  },
  input: {
    width: '100%',
    backgroundColor: '#F9F9F9',
    height: 60,
    borderRadius: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 40,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    color: '#333',
    fontFamily: FONTS.main,
  },
  continueBtn: {
    width: '100%',
    backgroundColor: COLORS.primary,
    height: 64,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  continueBtnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
    fontFamily: FONTS.main,
  }
});

export default ResetPassword;
