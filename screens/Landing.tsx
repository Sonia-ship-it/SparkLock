
import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '../constants';

const { width } = Dimensions.get('window');

const Landing: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return (
    <ImageBackground 
      source={{ uri: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=1200&auto=format&fit=crop' }}
      style={styles.container}
    >
      <View style={styles.overlay} />
      
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
            <View style={styles.logoRow}>
                <View style={styles.logoIcon}>
                    <View style={styles.logoGrid}>
                        {[1,2,3,4,5,6].map(i => <View key={i} style={styles.logoDot} />)}
                    </View>
                </View>
                <Text style={styles.brandName}>SPARKLOCK</Text>
            </View>
        </View>

        <View style={styles.content}>
            <Text style={styles.heroTitle}>Detect , Alert{'\n'}Prevent</Text>
            <Text style={styles.heroSub}>
                SparkLock is a smart system that helps{'\n'}
                prevent fires before they happen. It detects{'\n'}
                danger early, shuts off power or gas{'\n'}
                automatically, and sends instant alerts to{'\n'}
                keep homes and people safe.
            </Text>

            <View style={styles.centerIndicator}>
                <View style={styles.outerCircle}>
                    <View style={styles.innerCircle}>
                        <View style={styles.coreDot} />
                    </View>
                </View>
            </View>

            <TouchableOpacity style={styles.getStartedBtn} onPress={onNext} activeOpacity={0.8}>
                <Text style={styles.btnLabel}>Get started</Text>
                <Text style={styles.btnArrow}>→</Text>
            </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 24,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoGrid: {
    width: 24,
    height: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 2,
  },
  logoDot: {
    width: 6,
    height: 6,
    backgroundColor: '#FFF',
    borderRadius: 1,
  },
  brandName: {
    color: '#FFF',
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 2,
    fontFamily: FONTS.bold,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  heroTitle: {
    fontSize: 50,
    fontWeight: '900',
    color: '#FFF',
    textAlign: 'center',
    lineHeight: 56,
    marginBottom: 16,
    fontFamily: FONTS.bold,
  },
  heroSub: {
    fontSize: 14,
    color: '#FFF',
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: '500',
    marginBottom: 40,
    opacity: 0.9,
    fontFamily: FONTS.main,
  },
  centerIndicator: {
    marginBottom: 40,
  },
  outerCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(200, 92, 35, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(200, 92, 35, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coreDot: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: COLORS.primary,
    borderWidth: 5,
    borderColor: '#FFF',
  },
  getStartedBtn: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  btnLabel: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: '800',
    marginRight: 8,
    fontFamily: FONTS.bold,
  },
  btnArrow: {
    fontSize: 22,
    color: COLORS.primary,
    fontWeight: 'bold',
    fontFamily: FONTS.bold,
  }
});

export default Landing;
