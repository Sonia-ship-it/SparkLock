
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Modal, TextInput, Dimensions } from 'react-native';
import { COLORS, FONTS, Icons } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';

const { height, width } = Dimensions.get('window');

const Controls: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All Areas');
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [roomLocation, setRoomLocation] = useState('');

  const [devices, setDevices] = useState([
    { id: '1', name: 'Kitchen Main', amps: 2.5, status: true },
    { id: '2', name: 'Kitchen Main', amps: 2.5, status: true },
    { id: '3', name: 'Kitchen Main', amps: 2.5, status: false },
  ]);

  const toggleDevice = (id: string) => {
    setDevices(prev => prev.map(d => d.id === id ? { ...d, status: !d.status } : d));
  };

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
             <Icons.User color={COLORS.primary} size={20} />
          </TouchableOpacity>
        </View>

        <View style={styles.titleRow}>
          <View>
            <Text style={styles.pageTitle}>Electrical Controls</Text>
            <Text style={styles.pageSubTitle}>Real-time building safety status</Text>
          </View>
          <TouchableOpacity style={styles.plusBtn} onPress={() => setAddModalVisible(true)}>
             <Text style={styles.plusText}>+</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterBar}>
          {['All Areas', 'Kitchen', 'Living Room', 'Room 1'].map((f, i) => (
            <TouchableOpacity 
                key={i} 
                onPress={() => setActiveFilter(f)}
                style={[styles.filterChip, activeFilter === f && styles.filterChipActive]}
            >
              <Text style={[styles.filterText, activeFilter === f && styles.filterTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.deviceList}>
          {devices.map((device) => (
            <View key={device.id} style={styles.deviceCard}>
              <View style={styles.cardTop}>
                <View style={styles.iconBox}>
                   <Icons.Flame color={COLORS.primary} size={16} />
                </View>
                <Switch 
                    value={device.status} 
                    onValueChange={() => toggleDevice(device.id)} 
                    trackColor={{ false: '#767577', true: COLORS.primary }}
                    thumbColor="#FFF"
                    style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                />
              </View>
              <Text style={styles.cardMsg}>
                Flame detected in kitchen. Confirmed SAFE by user. Flame detected in kitchen. Confirmed SAFE by user.
              </Text>
              <View style={styles.readout}>
                <Text style={styles.ampsValue}>{device.amps}</Text>
                <Text style={styles.ampsUnit}>AMPS</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Add Room Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isAddModalVisible}
        onRequestClose={() => setAddModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setAddModalVisible(false)}
        >
          <View style={styles.modalContainer} onStartShouldSetResponder={() => true}>
            <Text style={styles.modalTitle}>Add Room</Text>
            <Text style={styles.modalSubText}>
              This is your unique QR code for another person to scan
            </Text>

            <View style={styles.modalInputGroup}>
              <TextInput 
                style={styles.modalInput} 
                placeholder="Room Name" 
                placeholderTextColor="#AAA"
                value={roomName}
                onChangeText={setRoomName}
              />
              <TextInput 
                style={styles.modalInput} 
                placeholder="Room Location" 
                placeholderTextColor="#AAA"
                value={roomLocation}
                onChangeText={setRoomLocation}
              />
            </View>

            <TouchableOpacity 
              style={styles.modalAddBtn} 
              onPress={() => {
                setAddModalVisible(false);
                setRoomName('');
                setRoomLocation('');
              }}
            >
              <Text style={styles.modalAddBtnText}>Add Room</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FBFBFB',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 14,
    paddingBottom: 110,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingTop: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: '#EEE',
    paddingBottom: 10,
  },
  brandName: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    letterSpacing: 0.2,
  },
  locationText: {
    fontSize: 11,
    color: '#666',
    fontWeight: '500',
    fontFamily: FONTS.main,
    marginTop: -1,
  },
  avatarBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFF1EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    marginTop: 6,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1A1A1A',
    fontFamily: FONTS.bold,
  },
  pageSubTitle: {
    fontSize: 11,
    color: '#888',
    fontWeight: '500',
    fontFamily: FONTS.main,
    marginTop: -1,
  },
  plusBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  plusText: {
    fontSize: 26,
    color: '#FFF',
    fontWeight: '300',
  },
  filterBar: {
    marginBottom: 18,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    minWidth: 70,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.04,
    shadowRadius: 2.5,
    elevation: 1,
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#555',
    fontFamily: FONTS.main,
  },
  filterTextActive: {
    color: '#FFF',
  },
  deviceList: {
    gap: 10,
  },
  deviceCard: {
    backgroundColor: '#FFF',
    borderRadius: 18,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 7,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F9F9F9',
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconBox: {
    width: 32,
    height: 32,
    backgroundColor: '#FFF1EB',
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardMsg: {
    fontSize: 10.5,
    color: '#666',
    lineHeight: 15,
    fontWeight: '500',
    marginBottom: 10,
    fontFamily: FONTS.main,
  },
  readout: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  ampsValue: {
    fontSize: 20,
    fontWeight: '900',
    color: '#1A1A1A',
    fontFamily: FONTS.main,
  },
  ampsUnit: {
    fontSize: 8.5,
    fontWeight: '800',
    color: '#999',
    marginLeft: 3,
    fontFamily: FONTS.main,
    letterSpacing: 0.4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width * 0.8,
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 22,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.primary,
    fontFamily: FONTS.main,
    marginBottom: 6,
    textAlign: 'center',
  },
  modalSubText: {
    fontSize: 11,
    color: '#777',
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: 22,
    fontWeight: '500',
    fontFamily: FONTS.main,
    paddingHorizontal: 6,
  },
  modalInputGroup: {
    width: '100%',
    marginBottom: 22,
  },
  modalInput: {
    width: '100%',
    height: 44,
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 9,
    paddingHorizontal: 12,
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
    fontFamily: FONTS.main,
    marginBottom: 10,
    backgroundColor: '#FDFDFD',
  },
  modalAddBtn: {
    width: '100%',
    backgroundColor: COLORS.primary,
    height: 48,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  modalAddBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '900',
    fontFamily: FONTS.main,
  },
});

export default Controls;
