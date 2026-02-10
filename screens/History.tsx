
import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, Icons } from '../constants';

const History: React.FC = () => {
  const events = [
    { id: '1', date: '2025-12-08', time: '8:53:20 PM', location: 'Kitchen', message: 'Flame detected in kitchen. Confirmed SAFE by user.' },
    { id: '2', date: '2025-12-08', time: '8:53:20 PM', location: 'Kitchen', message: 'Flame detected in kitchen. Confirmed SAFE by user.' },
    { id: '3', date: '2025-12-08', time: '8:53:20 PM', location: 'Kitchen', message: 'Flame detected in kitchen. Confirmed SAFE by user.' },
    { id: '4', date: '2025-12-08', time: '8:53:20 PM', location: 'Kitchen', message: 'Flame detected in kitchen. Confirmed SAFE by user.' },
  ];

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
             <View style={styles.avatarCircle} />
          </TouchableOpacity>
        </View>

        <Text style={styles.pageTitle}>Event History</Text>
        <Text style={styles.pageSubTitle}>Review past system activities.</Text>

        <View style={styles.timelineContainer}>
          <View style={styles.timelineWavyLine}>
             <Icons.TimelineWave width={40} />
          </View>
          
          <View style={styles.eventList}>
            {events.map((event, idx) => (
              <View key={idx} style={styles.timelineItem}>
                <View style={styles.timelineDot} />
                <View style={styles.eventCard}>
                  <View style={styles.cardTop}>
                    <View style={styles.fireTag}>
                       <Text style={styles.fireTagIcon}>🔥</Text>
                       <Text style={styles.fireTagText}>Fire Detection</Text>
                    </View>
                    <Text style={styles.cardDate}>{event.date}</Text>
                  </View>
                  <Text style={styles.cardMsg}>{event.message}</Text>
                  <View style={styles.cardFooter}>
                    <View style={styles.footerItem}>
                       <Text style={styles.footerIcon}>📍</Text>
                       <Text style={styles.footerText}>{event.location}</Text>
                    </View>
                    <View style={styles.footerItem}>
                       <Text style={styles.footerIcon}>🕒</Text>
                       <Text style={styles.footerText}>{event.time}</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
    paddingBottom: 150,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    paddingBottom: 15,
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
    borderWidth: 1,
    borderColor: '#FAD7C3',
  },
  avatarCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#1A1A1A',
    marginBottom: 4,
    fontFamily: FONTS.bold,
  },
  pageSubTitle: {
    fontSize: 14,
    color: '#888',
    fontWeight: '500',
    marginBottom: 30,
    fontFamily: FONTS.main,
  },
  timelineContainer: {
    flexDirection: 'row',
    position: 'relative',
  },
  timelineWavyLine: {
    position: 'absolute',
    left: -10,
    top: 0,
    bottom: 0,
    width: 40,
    alignItems: 'center',
  },
  eventList: {
    flex: 1,
    paddingLeft: 40,
  },
  timelineItem: {
    marginBottom: 24,
    position: 'relative',
  },
  timelineDot: {
    position: 'absolute',
    left: -50,
    top: 15,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    zIndex: 10,
  },
  eventCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FAD7C3',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  fireTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF1EB',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  fireTagIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  fireTagText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '700',
    fontFamily: FONTS.main,
  },
  cardDate: {
    fontSize: 12,
    fontWeight: '900',
    color: '#000',
    fontFamily: FONTS.main,
  },
  cardMsg: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    fontWeight: '500',
    marginBottom: 12,
    fontFamily: FONTS.main,
  },
  cardFooter: {
    flexDirection: 'row',
    gap: 20,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  footerText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '600',
    fontFamily: FONTS.main,
  }
});

export default History;
