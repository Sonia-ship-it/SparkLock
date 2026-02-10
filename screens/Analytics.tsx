import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { COLORS, FONTS } from '../constants';

const { width } = Dimensions.get('window');

const labels = ['10:00','10:05','10:10','10:15','10:20','10:25','10:30','10:35','10:40'];

const Analytics: React.FC = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      
      <View style={styles.header}>
        <View>
          <Text style={styles.brandName}>SPARKLOCK</Text>
          <Text style={styles.subHeader}>KIGALI, RWANDA</Text>
        </View>
        <Image 
          source={{ uri: 'https://api.dicebear.com/7.x/avataaars/png?seed=Felix' }}
          style={styles.avatar}
        />
      </View>

      <Text style={styles.title}>Live Monitoring</Text>
      <Text style={styles.subTitle}>Real-time building safety status</Text>

      {/* Circuits Chart */}
      <View style={styles.chartSection}>
        <Text style={styles.chartTitle}>Current vs Time</Text>

        <LineChart
          data={{
            labels,
            datasets: [
              { data: [11,9,12,10,13,11,12,9,14], color: () => "#22c55e" },
              { data: [4,3,9,6,9,8,7,8,12], color: () => "#3b82f6" },
              { data: [2,3,4,1.5,7,3.5,2,6,5], color: () => "#ef4444" },
            ],
            legend: ["Circuit 1", "Circuit 2", "Circuit 3"]
          }}
          width={width - 40}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </View>

      {/* Temperature Chart */}
      <View style={styles.chartSection}>
        <Text style={styles.chartTitle}>Temperature vs Time</Text>

        <LineChart
          data={{
            labels,
            datasets: [
              { data: [12,16,24,10,38,16,10,32,28] }
            ],
            legend: ["Temperature (°C)"]
          }}
          width={width - 40}
          height={220}
          chartConfig={{
            ...chartConfig,
            color: () => "#f43f5e"
          }}
          bezier
          style={styles.chart}
        />
      </View>

    </ScrollView>
  );
};

const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  decimalPlaces: 1,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16
  },
  propsForDots: {
    r: "4",
    strokeWidth: "2",
    stroke: "#fff"
  }
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  scrollContent: { padding: 24, paddingTop: 60, paddingBottom: 120 },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },

  brandName: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.primary,
    fontFamily: FONTS.main,
  },

  subHeader: {
    fontSize: 10,
    fontWeight: '800',
    color: '#CCC',
    fontFamily: FONTS.main,
  },

  avatar: { width: 48, height: 48, borderRadius: 16 },

  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#1A1A1A',
    fontFamily: FONTS.main,
  },

  subTitle: {
    fontSize: 14,
    color: '#AAA',
    marginBottom: 40,
    fontFamily: FONTS.main,
  },

  chartSection: { marginBottom: 60 },

  chartTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#333',
    marginBottom: 24,
    fontFamily: FONTS.main,
  },

  chart: { borderRadius: 16 },
});

export default Analytics;
