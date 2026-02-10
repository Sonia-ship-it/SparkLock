
import React from 'react';
import { Svg, Path, Circle, Line, Polyline, Rect, G } from 'react-native-svg';

export const COLORS = {
  primary: '#C85C23', 
  secondary: '#FF8A48',
  white: '#FFFFFF',
  textDark: '#1A1A1A',
  textMuted: '#8E8E93',
  bgLight: '#FBFBFB',
  navBg: '#A04E1F',
};

export const FONTS = {
  main: 'Outfit',
  bold: 'Outfit-Bold',
};

export interface IconProps {
  color?: string;
  size?: number | string;
}

export const Icons = {
  Home: ({ color = '#000', size = 24 }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M3 9 L12 2 L21 9 L21 20 Q21 22 19 22 L5 22 Q3 22 3 20 Z"/>
      <Polyline points="9 22 9 12 15 12 15 22"/>
    </Svg>
  ),
  Analytics: ({ color = '#000', size = 24 }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <Rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
      <Line x1="8" y1="18" x2="8" y2="12"/>
      <Line x1="12" y1="18" x2="12" y2="7"/>
      <Line x1="16" y1="18" x2="16" y2="14"/>
    </Svg>
  ),
  Settings: ({ color = '#000', size = 24 }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Circle cx="12" cy="12" r="3"/>
      <Path d="M12 1 L13 4 L16 4 L13 6 L14 9 L12 7 L10 9 L11 6 L8 4 L11 4 Z"/>
      <Path d="M12 23 L13 20 L16 20 L13 18 L14 15 L12 17 L10 15 L11 18 L8 20 L11 20 Z"/>
      <Path d="M1 12 L4 11 L4 8 L6 11 L9 10 L7 12 L9 14 L6 13 L4 16 L4 13 Z"/>
      <Path d="M23 12 L20 11 L20 8 L18 11 L15 10 L17 12 L15 14 L18 13 L20 16 L20 13 Z"/>
    </Svg>
  ),
  Chip: ({ color = '#C85C23', size = 28 }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <Rect x="4" y="4" width="16" height="16" rx="2" ry="2"/>
      <Rect x="9" y="9" width="6" height="6"/>
      <Line x1="9" y1="1" x2="9" y2="4"/>
      <Line x1="15" y1="1" x2="15" y2="4"/>
      <Line x1="9" y1="20" x2="9" y2="23"/>
      <Line x1="15" y1="20" x2="15" y2="23"/>
      <Line x1="20" y1="9" x2="23" y2="9"/>
      <Line x1="20" y1="15" x2="23" y2="15"/>
      <Line x1="1" y1="9" x2="4" y2="9"/>
      <Line x1="1" y1="15" x2="4" y2="15"/>
    </Svg>
  ),
  History: ({ color = '#000', size = 24 }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <Polyline points="14 2 14 8 20 8"/>
      <Line x1="12" y1="18" x2="12" y2="12"/>
      <Polyline points="9 15 12 12 15 15"/>
    </Svg>
  ),
  HistoryWithArrow: ({ color = '#000', size = 24 }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <Polyline points="14 2 14 8 20 8"/>
      <Path d="M10 13l2-2 2 2M12 11v6"/>
    </Svg>
  ),
  User: ({ color = '#000', size = 24 }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <Circle cx="12" cy="7" r="4"/>
    </Svg>
  ),
  Google: ({ size = 24 }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx="12" cy="12" r="10" fill="none" stroke="#4285F4" strokeWidth="1.5"/>
      <Rect x="8" y="10" width="8" height="4" fill="#4285F4"/>
    </Svg>
  ),
  Key: ({ size = 60 }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#C85C23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <Circle cx="8" cy="16" r="6"/>
      <Path d="M21 2 L11 12"/>
      <Path d="M16 8 L19 11 L22 8 L19 5"/>
    </Svg>
  ),
  CheckCircle: ({ size = 80 }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <Circle cx="12" cy="12" r="11"/>
      <Polyline points="8 12 11 15 16 9"/>
    </Svg>
  ),
  Flame: ({ color = '#000', size = 16 }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M12 2 L10 8 Q8 12 10 16 Q12 18 14 16 Q16 12 14 8 Z"/>
    </Svg>
  ),
  WavyHeader: ({ height = 60, width = '100%' }: { height?: number; width?: string | number }) => (
    <Svg width={width} height={height} viewBox="0 0 500 200" preserveAspectRatio="none" style={{ position: 'absolute' as any, bottom: 0 }}>
      <Path d="M0 150 C150 50 350 250 500 100 L500 200 L0 200 Z" fill="white" />
    </Svg>
  ),
  TimelineWave: ({ height = '100%', width = 40 }: { height?: string | number; width?: number }) => (
    <Svg width={width} height={height} viewBox="0 0 40 800" preserveAspectRatio="none">
      <Path d="M20 0 Q30 100 20 200 T20 400 T20 600 T20 800" fill="none" stroke="#D35400" strokeWidth="1.5" />
    </Svg>
  )
};
