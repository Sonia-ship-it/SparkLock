
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { COLORS, Icons, FONTS } from '../constants';

const { height } = Dimensions.get('window');

const Success: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTextWrapper}>
            <Text style={styles.headerTitle}>Success</Text>
        </View>
        <Icons.WavyHeader height={60} />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.description}>
          You have successfully reset your password back to login page
        </Text>

        <View style={styles.successContainer}>
            <View style={styles.blob} />
            <Icons.CheckCircle size={70} />
        </View>

        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backBtnText}>Back To Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    backgroundColor: COLORS.primary,
    height: height * 0.22,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  headerTextWrapper: {
    paddingBottom: 20,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 40,
    fontWeight: '900',
    fontFamily: FONTS.bold,
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 50,
    fontWeight: '500',
    fontFamily: FONTS.main,
    maxWidth: 260,
  },
  successContainer: {
    width: 160,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 50,
  },
  blob: {
    position: 'absolute',
    width: 150,
    height: 150,
    backgroundColor: COLORS.primary,
    borderRadius: 65,
    opacity: 0.9,
    transform: [{ scaleX: 1.1 }, { rotate: '15deg' }],
  },
  backBtn: {
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
  backBtnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
    fontFamily: FONTS.bold,
  }
});

export default Success;
