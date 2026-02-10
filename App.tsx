import React, { useState, useEffect } from 'react';
import {
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Text,
  View,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, Outfit_400Regular, Outfit_700Bold } from '@expo-google-fonts/outfit';

import { Screen } from './types';
import { COLORS, Icons, FONTS } from './constants';

import Landing from './screens/Landing';
import Login from './screens/Login';
import Signup from './screens/Signup';
import OTP from './screens/OTP';
import ResetPassword from './screens/ResetPassword';
import Success from './screens/Success';
import ProfileSteps from './screens/ProfileSteps';
import Dashboard from './screens/Dashboard';
import Analytics from './screens/Analytics';
import Controls from './screens/Controls';
import History from './screens/History';

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Outfit: Outfit_400Regular,
    'Outfit-Bold': Outfit_700Bold,
  });

  const isWeb = Platform.OS === 'web';

  // Routing maps
  const pathToScreen: Record<string, Screen> = {
    '/': Screen.LANDING,
    '/landing': Screen.LANDING,
    '/login': Screen.LOGIN,
    '/home': Screen.DASHBOARD,
    '/live': Screen.ANALYTICS,
    '/controls': Screen.CONTROLS,
    '/history': Screen.HISTORY,
  };

  const screenToPath: Partial<Record<Screen, string>> = {
    [Screen.LANDING]: '/landing',
    [Screen.LOGIN]: '/login',
    [Screen.DASHBOARD]: '/home',
    [Screen.ANALYTICS]: '/live',
    [Screen.CONTROLS]: '/controls',
    [Screen.HISTORY]: '/history',
  };

  const initialScreen =
    isWeb && typeof window !== 'undefined'
      ? pathToScreen[window.location.pathname] ?? Screen.LANDING
      : Screen.LANDING;

  const [currentScreen, setCurrentScreen] = useState<Screen>(initialScreen);

  useEffect(() => {
    if (!isWeb || typeof window === 'undefined') return;
    const onPop = () => {
      const p = window.location.pathname || '/';
      setCurrentScreen(pathToScreen[p] ?? Screen.LANDING);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [isWeb]);

  if ((Text as any).defaultProps == null) (Text as any).defaultProps = {};
  (Text as any).defaultProps.style = [
    { fontFamily: FONTS.main },
    ...(((Text as any).defaultProps.style) || []),
  ];

  if ((TextInput as any).defaultProps == null) (TextInput as any).defaultProps = {};
  (TextInput as any).defaultProps.style = [
    { fontFamily: FONTS.main },
    ...(((TextInput as any).defaultProps.style) || []),
  ];

  if (!fontsLoaded && !isWeb) {
    return (
      <SafeAreaView style={styles.loadingContainer} edges={['top', 'bottom']}>
        <Text style={styles.loadingText}>Loading…</Text>
      </SafeAreaView>
    );
  }

  const navigate = (screen: Screen) => {
    setCurrentScreen(screen);
    if (isWeb && typeof window !== 'undefined') {
      const to = screenToPath[screen] ?? '/';
      try { window.history.pushState({}, '', to); } catch {}
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.LANDING: return <Landing onNext={() => navigate(Screen.LOGIN)} />;
      case Screen.LOGIN: return <Login onLogin={() => navigate(Screen.DASHBOARD)} onSignup={() => navigate(Screen.SIGNUP)} onForgot={() => navigate(Screen.RESET_PASSWORD)} />;
      case Screen.SIGNUP: return <Signup onSignup={() => navigate(Screen.OTP)} onLogin={() => navigate(Screen.LOGIN)} />;
      case Screen.OTP: return <OTP onVerify={() => navigate(Screen.PROFILE_STEP_1)} />;
      case Screen.RESET_PASSWORD: return <ResetPassword onContinue={() => navigate(Screen.SUCCESS)} />;
      case Screen.SUCCESS: return <Success onBack={() => navigate(Screen.LOGIN)} />;
      case Screen.PROFILE_STEP_1: return <ProfileSteps step={1} onNext={() => navigate(Screen.PROFILE_STEP_2)} />;
      case Screen.PROFILE_STEP_2: return <ProfileSteps step={2} onFinish={() => navigate(Screen.DASHBOARD)} onBack={() => navigate(Screen.PROFILE_STEP_1)} />;
      case Screen.DASHBOARD: return <Dashboard />;
      case Screen.ANALYTICS: return <Analytics />;
      case Screen.CONTROLS: return <Controls />;
      case Screen.HISTORY: return <History />;
      default: return <Landing onNext={() => navigate(Screen.LOGIN)} />;
    }
  };

  const showNav = [
    Screen.DASHBOARD,
    Screen.ANALYTICS,
    Screen.CONTROLS,
    Screen.HISTORY,
  ].includes(currentScreen);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" />
      {renderScreen()}

      {showNav && (
        <SafeAreaView style={styles.navContainer} edges={['bottom']}>
          <View style={styles.navBar}>
            <TouchableOpacity style={styles.navItem} onPress={() => navigate(Screen.DASHBOARD)}>
              {currentScreen === Screen.DASHBOARD ? (
                <View style={styles.activeBubble}>{Icons.Home && <Icons.Home color={COLORS.primary} size={20} />}</View>
              ) : (
                Icons.Home && <Icons.Home color="#FFF" size={24} />
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.navItem} onPress={() => navigate(Screen.ANALYTICS)}>
              {Icons.Analytics && <Icons.Analytics color="#FFF" size={22} />}
            </TouchableOpacity>

            <View style={styles.navCenterItem}>
              <TouchableOpacity
                style={[styles.centerFab, currentScreen === Screen.CONTROLS && styles.centerFabActive]}
                onPress={() => navigate(Screen.CONTROLS)}
              >
                {Icons.Chip && <Icons.Chip color={COLORS.primary} size={28} />}
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.navItem} onPress={() => navigate(Screen.HISTORY)}>
              {Icons.HistoryWithArrow && <Icons.HistoryWithArrow color="#FFF" size={22} />}
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' },
  loadingText: { fontSize: 14, color: '#666' },
  navContainer: { position: 'absolute', bottom: 0, left: 0, right: 0 },
  navBar: {
    height: 80,
    backgroundColor: '#C85C23',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  navItem: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  navCenterItem: { width: 76, alignItems: 'center', justifyContent: 'center', marginTop: -32 },
  centerFab: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 6,
    borderColor: '#C85C23',
  },
  centerFabActive: { transform: [{ scale: 1.02 }] },
  activeBubble: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
