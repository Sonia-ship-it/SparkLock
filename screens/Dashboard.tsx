
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { COLORS, FONTS, Icons } from '../constants';

interface StatusCardProps {
  icon: string;
  title: string;
  status: string;
}

interface IndicatorItemProps {
  icon: string;
  label: string;
  value: string;
  unit?: string;
}

const Dashboard: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container} 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.brandName}>SPARKLOCK</Text>
            <Text style={styles.locationText}>Kigali, Rwanda</Text>
          </View>
          <TouchableOpacity style={styles.avatarBtn}>
            <View style={styles.avatarContainer}>
                <Icons.Settings size={20} color={COLORS.primary} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.titleSection}>
          <Text style={styles.pageTitle}>Home Dashboard</Text>
          <Text style={styles.pageSubTitle}>Real-time building safety status</Text>
        </View>

        <View style={styles.statusGrid}>
          <StatusCard icon="⚡" title="Electrical Status" status="SAFE" />
          <StatusCard icon="🔥" title="Fire Status" status="SAFE" />
        </View>

        <Text style={styles.sectionTitle}>QUICK INDICATORS</Text>
        
        <View style={styles.indicatorList}>
          <IndicatorItem icon="⚡" label="Total Load" value="8.8" unit="A" />
          <IndicatorItem icon="🌡️" label="Indoor Temp" value="24.8" unit="C" />
          <IndicatorItem icon="⚠️" label="Smoke (MQ-135)" value="15" unit="PPM" />
          <IndicatorItem icon="🔥" label="Flame Sensor" value="NO FIRE" />
        </View>

        <View style={styles.controlsSection}>
          <Text style={styles.controlsTitle}>QUICK CONTROLS</Text>
          <View style={styles.controlsRow}>
            <TouchableOpacity style={styles.controlBtnBlack}><Text style={styles.controlBtnText}>Reset Line</Text></TouchableOpacity>
            <TouchableOpacity style={styles.controlBtnBlack}><Text style={styles.controlBtnText}>Silence Alarm</Text></TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.killBtn}>
             <Text style={styles.killBtnText}>Kill All Power</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const StatusCard: React.FC<StatusCardProps> = ({ icon, title, status }) => (
  <View style={styles.statusCard}>
    <View style={styles.cardHeader}>
       <View style={styles.cardIconBox}><Text style={styles.cardIconText}>{icon}</Text></View>
       <Text style={styles.cardStatusText}>{status}</Text>
    </View>
    <Text style={styles.cardLabel}>{title}</Text>
  </View>
);

const IndicatorItem: React.FC<IndicatorItemProps> = ({ icon, label, value, unit }) => (
  <View style={styles.indicatorItem}>
    <View style={styles.indicatorLeft}>
      <Text style={styles.indicatorIcon}>{icon}</Text>
      <Text style={styles.indicatorLabel}>{label}</Text>
    </View>
    <View style={styles.indicatorRight}>
       <Text style={styles.indicatorValue}>{value}</Text>
       {unit && <Text style={styles.indicatorUnit}>{unit}</Text>}
    </View>
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 120,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  brandName: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.primary,
    fontFamily: FONTS.bold,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    fontFamily: FONTS.main,
  },
  avatarBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF1EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleSection: {
    marginBottom: 24,
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: '900',
    color: '#1A1A1A',
    fontFamily: FONTS.bold,
  },
  pageSubTitle: {
    fontSize: 14,
    color: '#888',
    fontWeight: '500',
    fontFamily: FONTS.main,
  },
  statusGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statusCard: {
    width: '48%',
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: 20,
    height: 130,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardIconBox: {
    width: 36,
    height: 36,
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardIconText: {
    fontSize: 16,
    color: COLORS.primary,
  },
  cardStatusText: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 13,
    fontFamily: FONTS.bold,
  },
  cardLabel: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: FONTS.bold,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1A1A1A',
    marginBottom: 16,
    fontFamily: FONTS.bold,
  },
  indicatorList: {
    marginBottom: 30,
  },
  indicatorItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#F8F8F8',
  },
  indicatorLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicatorIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  indicatorLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#555',
    fontFamily: FONTS.main,
  },
  indicatorRight: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  indicatorValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A1A1A',
    fontFamily: FONTS.bold,
  },
  indicatorUnit: {
    fontSize: 12,
    fontWeight: '700',
    color: '#AAA',
    marginLeft: 4,
    fontFamily: FONTS.main,
  },
  controlsSection: {
    backgroundColor: COLORS.primary,
    borderRadius: 24,
    padding: 24,
  },
  controlsTitle: {
    color: '#FFF',
    fontWeight: '900',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: FONTS.main,
    letterSpacing: 1,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  controlBtnBlack: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 12,
    width: '48%',
    alignItems: 'center',
  },
  controlBtnText: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 14,
    fontFamily: FONTS.main,
  },
  killBtn: {
    backgroundColor: '#FFF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  killBtnText: {
    color: COLORS.primary,
    fontWeight: '900',
    fontSize: 17,
    fontFamily: FONTS.main,
  }
});

export default Dashboard;
