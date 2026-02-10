
import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS, FONTS } from '../constants';
import WavyHeader from '../components/WavyHeader';

interface ProfileStepsProps {
  step: 1 | 2;
  onNext?: () => void;
  onFinish?: () => void;
  onBack?: () => void;
}

const ProfileSteps: React.FC<ProfileStepsProps> = ({ step, onNext, onFinish, onBack }) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <WavyHeader title="Complete Profile" />
      
      {/* Progress Line */}
      <View style={styles.progressWrapper}>
        <View style={styles.progressLine} />
        <View style={[styles.progressStep, styles.stepActive]}>
            <Text style={styles.stepText}>1</Text>
        </View>
        <View style={[styles.progressStep, step === 2 && styles.stepActive]}>
            <Text style={[styles.stepText, step === 1 && { color: COLORS.primary }]}>2</Text>
        </View>
      </View>

      <View style={styles.content}>
        {step === 1 ? (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Building Details</Text>
            <View style={styles.form}>
                <TextInput 
                    style={styles.input} 
                    placeholder="Building location" 
                    placeholderTextColor="#AAA"
                />
                <TextInput 
                    style={styles.input} 
                    placeholder="Emergency Contact" 
                    placeholderTextColor="#AAA"
                    keyboardType="phone-pad"
                />
            </View>
            <View style={styles.footerBtns}>
                <TouchableOpacity onPress={onBack} style={styles.backBtn}>
                    <Text style={styles.backBtnLabel}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onNext} style={styles.continueBtn}>
                    <Text style={styles.continueBtnText}>Continue</Text>
                </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Final Touches</Text>
            <Text style={styles.stepSub}>You're almost ready to secure your building.</Text>
            
            <View style={styles.avatarSection}>
                <View style={styles.avatarCircle}>
                    <Text style={{ fontSize: 40 }}>👤</Text>
                    <TouchableOpacity style={styles.camBtn}>
                        <Text style={{ color: '#FFF', fontSize: 12 }}>📷</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.profileName}>Owner Profile</Text>
                <Text style={styles.profileLoc}>Kigali</Text>
            </View>

            <View style={styles.infoBox}>
                <Text style={styles.infoText}>
                    By completing your profile, you agree to allow SparkLock to share critical building data with emergency responders during verified fire events.
                </Text>
            </View>

            <View style={styles.footerBtns}>
                <TouchableOpacity onPress={onBack} style={styles.backBtn}>
                    <Text style={styles.backBtnLabel}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onFinish} style={styles.finishBtn}>
                    <Text style={styles.finishBtnText}>Finish</Text>
                </TouchableOpacity>
            </View>
          </View>
        )}
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
  progressWrapper: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 80,
    position: 'relative',
  },
  progressLine: {
    position: 'absolute',
    left: 80,
    right: 80,
    height: 2,
    backgroundColor: COLORS.primary,
    top: 50,
  },
  progressStep: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  stepActive: {
    backgroundColor: COLORS.primary,
  },
  stepText: {
    color: '#FFF',
    fontWeight: '900',
    fontSize: 16,
    fontFamily: FONTS.bold,
  },
  content: {
    paddingHorizontal: 32,
    flex: 1,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 26,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 40,
    color: '#1A1A1A',
    fontFamily: FONTS.bold,
  },
  stepSub: {
    fontSize: 14,
    color: '#AAA',
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: '500',
    fontFamily: FONTS.main,
  },
  form: {
    flex: 1,
  },
  input: {
    backgroundColor: '#F9F9F9',
    height: 60,
    borderRadius: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    fontFamily: FONTS.main,
  },
  footerBtns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 40,
    marginTop: 20,
  },
  backBtn: {
    flex: 1,
    height: 64,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EEE',
    marginRight: 15,
  },
  backBtnLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#888',
    fontFamily: FONTS.bold,
  },
  continueBtn: {
    flex: 2,
    height: 64,
    backgroundColor: COLORS.primary,
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
    fontFamily: FONTS.bold,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 20,
  },
  camBtn: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: COLORS.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 3,
    borderColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 20,
    fontWeight: '900',
    color: '#1A1A1A',
    fontFamily: FONTS.bold,
  },
  profileLoc: {
    fontSize: 12,
    color: '#AAA',
    fontWeight: '700',
    fontFamily: FONTS.bold,
  },
  infoBox: {
    backgroundColor: '#FFF8F1',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFE0B2',
    marginBottom: 40,
  },
  infoText: {
    fontSize: 11,
    color: '#E65100',
    lineHeight: 18,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: FONTS.main,
  },
  finishBtn: {
    flex: 2,
    height: 64,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  finishBtnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
    fontFamily: FONTS.bold,
  }
});

export default ProfileSteps;
