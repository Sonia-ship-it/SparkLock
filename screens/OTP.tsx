
import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { COLORS, Icons, FONTS } from '../constants';

const { height } = Dimensions.get('window');

const OTP: React.FC<{ onVerify: () => void }> = ({ onVerify }) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} bounces={false}>
      <View style={styles.header}>
        <View style={styles.headerTextWrapper}>
            <Text style={styles.headerTitle}>OTP Verification</Text>
            <Text style={styles.headerSubtitle}>Enter one time password that we have sent to your phone number.</Text>
        </View>
        <Icons.WavyHeader height={60} />
      </View>
      
      <View style={styles.content}>
        <View style={styles.iconContainer}>
            <Icons.Key size={50} />
        </View>

        <View style={styles.otpGrid}>
            {[1,2,3,4,5,6].map(i => (
                <TextInput 
                    key={i}
                    style={styles.otpInput}
                    maxLength={1}
                    keyboardType="number-pad"
                />
            ))}
        </View>

        <View style={styles.resendWrapper}>
            <Text style={styles.resendLabel}>can't get code? </Text>
            <TouchableOpacity><Text style={styles.resendNow}>Resend Now</Text></TouchableOpacity>
            <View style={{flex: 1}} />
            <Text style={styles.timer}>0:23</Text>
        </View>

        <TouchableOpacity onPress={onVerify} style={styles.verifyBtn}>
            <Text style={styles.verifyBtnText}>Verify OTP</Text>
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
    paddingBottom: 40,
  },
  header: {
    backgroundColor: COLORS.primary,
    height: height * 0.32,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 10,
  },
  headerTextWrapper: {
    paddingHorizontal: 32,
    paddingBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: '900',
    fontFamily: FONTS.bold,
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
    textAlign: 'center',
    fontFamily: FONTS.main,
    lineHeight: 18,
  },
  content: {
    paddingHorizontal: 28,
    alignItems: 'center',
    marginTop: 10,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  otpGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 28,
  },
  otpInput: {
    width: 44,
    height: 52,
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '800',
    color: '#333',
    fontFamily: FONTS.bold,
  },
  resendWrapper: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginBottom: 32,
  },
  resendLabel: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: FONTS.main,
  },
  resendNow: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '700',
    fontFamily: FONTS.bold,
    textDecorationLine: 'underline',
  },
  timer: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '900',
    fontFamily: FONTS.bold,
  },
  verifyBtn: {
    width: '100%',
    backgroundColor: COLORS.primary,
    height: 58,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  verifyBtnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
    fontFamily: FONTS.bold,
  }
});

export default OTP;
