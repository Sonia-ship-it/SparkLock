
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { COLORS, FONTS, Icons } from '../constants';

interface WavyHeaderProps {
  title: string;
  subtitle?: string;
}

const { width } = Dimensions.get('window');

const WavyHeader: React.FC<WavyHeaderProps> = ({ title, subtitle }) => {
  return (
    <View style={styles.container}>
      <View style={styles.svgContainer}>
        <Icons.WavyHeader height={80} width="100%" />
      </View>
      
      <View style={styles.textWrapper}>
        <Text style={styles.titleText}>{title}</Text>
        {subtitle && <Text style={styles.subtitleText}>{subtitle}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 180,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  svgContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  textWrapper: {
    paddingHorizontal: 30,
    alignItems: 'center',
    marginTop: -10,
  },
  titleText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 4,
    fontFamily: FONTS.main,
  },
  subtitleText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 18,
    fontFamily: FONTS.main,
  },
});

export default WavyHeader;
