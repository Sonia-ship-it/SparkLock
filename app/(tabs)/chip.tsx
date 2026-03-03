import { useFocusEffect, useRouter } from "expo-router";
import { Flame, Plus, User as UserIcon } from "lucide-react-native";
import { useCallback, useState } from "react";
import { Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../utils/themeContext";
import { userStore } from "../../utils/userStore";
import { styles } from "../index";

export default function ElectricalControls() {
    const [toggles, setToggles] = useState([true, true, false]);
    const [showModal, setShowModal] = useState(false);
    const route = useRouter();
    const insets = useSafeAreaInsets();
    const { isDarkMode } = useTheme();
    const [user, setUser] = useState(userStore.getUser());

    useFocusEffect(
        useCallback(() => {
            setUser(userStore.getUser());
        }, [])
    );

    const toggleSwitch = (index: number) => {
        const newToggles = [...toggles];
        newToggles[index] = !newToggles[index];
        setToggles(newToggles);
    };

    return (
        <View className={`flex-1 ${isDarkMode ? "bg-black" : "bg-white"} relative`} style={{ paddingTop: insets.top }}>
            {/* Top Header */}
            <View className={`px-6 flex-row justify-between items-center pb-2 ${isDarkMode ? "bg-black" : "bg-white"}`}>
                <View>
                    <Text className="text-[#D66A1F] text-2xl" style={styles.title}>SPARKLOCK</Text>
                    <Text className={`${isDarkMode ? "text-gray-500" : "text-[#666]"} text-sm`} style={styles.text}>{user.location}</Text>
                </View>
                <TouchableOpacity onPress={() => route.push("/(tabs)/profile")} className={`w-10 h-10 rounded-full border border-[#D66A1F] ${isDarkMode ? "bg-[#333]" : "bg-[#FAEBE4]"} items-center justify-center overflow-hidden`}>
                    {user.profileImage ? (
                        <Image source={{ uri: user.profileImage }} className="w-full h-full" />
                    ) : (
                        <UserIcon size={20} color="#D66A1F" />
                    )}
                </TouchableOpacity>
            </View>
            <View className={`h-[1px] w-full ${isDarkMode ? "bg-[#333]" : "bg-gray-200"} mb-6`} />

            {/* Title Section */}
            <View className="px-6 flex-row justify-between items-center mb-6">
                <View>
                    <Text className={`text-3xl mb-1 ${isDarkMode ? "text-white" : "text-black"}`} style={styles.title}>Electrical Controls</Text>
                    <Text className={`${isDarkMode ? "text-gray-500" : "text-[#666]"} text-sm`} style={styles.text}>Real-time building safety status</Text>
                </View>
                <TouchableOpacity onPress={() => setShowModal(true)} className="w-12 h-12 rounded-full bg-[#D66A1F] items-center justify-center shadow-sm">
                    <Plus size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Categories */}
            <View className="pl-6 mb-8">
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row overflow-visible pb-2" contentContainerStyle={{ gap: 12 }}>
                    <TouchableOpacity className="bg-[#D66A1F] px-5 py-2.5 rounded-lg shadow-sm" style={{ elevation: 2 }}>
                        <Text className="text-white text-base" style={styles.subtitle}>All Areas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className={`${isDarkMode ? "bg-[#1A1A1A] border-[#333]" : "bg-white border-gray-100"} px-5 py-2.5 rounded-lg shadow-sm border`} style={{ elevation: 2 }}>
                        <Text className={`${isDarkMode ? "text-[#AAA]" : "text-[#464646FF]"} text-base`} style={styles.subtitle}>Kitchen</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className={`${isDarkMode ? "bg-[#1A1A1A] border-[#333]" : "bg-white border-gray-100"} px-5 py-2.5 rounded-lg shadow-sm border`} style={{ elevation: 2 }}>
                        <Text className={`${isDarkMode ? "text-[#AAA]" : "text-[#464646FF]"} text-base`} style={styles.subtitle}>Living Room</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className={`${isDarkMode ? "bg-[#1A1A1A] border-[#333]" : "bg-white border-gray-100"} px-5 py-2.5 rounded-lg shadow-sm border`} style={{ elevation: 2 }}>
                        <Text className={`${isDarkMode ? "text-[#AAA]" : "text-[#464646FF]"} text-base`} style={styles.subtitle}>Room 1</Text>
                    </TouchableOpacity>
                    <View className="w-4" />
                </ScrollView>
            </View>

            {/* Cards List */}
            <ScrollView className="px-6 flex-1 mb-24" showsVerticalScrollIndicator={false}>
                {/* Cards */}
                {[0, 1, 2].map((i) => (
                    <View key={i} className={`${isDarkMode ? "bg-[#1A1A1A] border-[#333]" : "bg-white border-orange-50/50"} rounded-2xl p-5 mb-5 shadow-sm border`} style={{ elevation: 2 }}>
                        <View className="flex-row justify-between items-center mb-4">
                            <View className={`${isDarkMode ? "bg-[#333]" : "bg-[#FAEBE4]"} w-10 h-10 rounded-lg items-center justify-center`}>
                                <Flame size={20} color="#D66A1F" />
                            </View>
                            {/* Custom Toggle Switch */}
                            <TouchableOpacity
                                onPress={() => toggleSwitch(i)}
                                className={`w-[52px] h-[28px] rounded-full p-1 justify-center ${toggles[i] ? 'bg-[#D66A1F]' : (isDarkMode ? 'bg-[#333]' : 'bg-gray-400')}`}
                            >
                                <View className={`w-[20px] h-[20px] rounded-full bg-white ${toggles[i] ? 'self-end' : 'self-start'}`} />
                            </TouchableOpacity>
                        </View>

                        <Text className={`text-sm mb-4 leading-5 ${isDarkMode ? "text-gray-400" : "text-[#464646FF]"}`} style={styles.text}>
                            Flame detected in kitchen. Confirmed SAFE by user.Flame detected in kitchen. Confirmed SAFE by user.
                        </Text>

                        <View className="flex-row items-end pb-1">
                            <Text className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-black"}`} style={styles.title}>2.5</Text>
                            <Text className="text-xs text-[#666] mb-1 ml-1 font-bold" style={styles.subtitle}>AMPS</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <Modal visible={showModal} transparent animationType="fade">
                <View className="flex-1 bg-black/60 justify-center items-center px-6">
                    <View className={`${isDarkMode ? "bg-[#1A1A1A] border border-[#333]" : "bg-white"} w-full rounded-3xl p-6 pt-10 pb-8 items-center shadow-lg`} style={{ elevation: 5 }}>
                        <Text className="text-[#D66A1F] text-4xl mb-3" style={styles.title}>Add Room</Text>
                        <Text className={`${isDarkMode ? "text-gray-500" : "text-[#666]"} text-center text-[15px] mb-8 leading-6 px-4`} style={styles.text}>
                            This is your unique QR code for another person to scan
                        </Text>

                        <View className="w-full gap-5 mb-8">
                            <TextInput
                                placeholder="Room Name"
                                placeholderTextColor={isDarkMode ? "#555" : "#9FA5AA"}
                                className={`w-full border rounded-xl p-4 text-base ${isDarkMode ? "border-[#333] bg-[#222] text-white" : "border-gray-200 bg-white text-gray-800"}`}
                                style={styles.text}
                            />
                            <TextInput
                                placeholder="Room Location"
                                placeholderTextColor={isDarkMode ? "#555" : "#9FA5AA"}
                                className={`w-full border rounded-xl p-4 text-base ${isDarkMode ? "border-[#333] bg-[#222] text-white" : "border-gray-200 bg-white text-gray-800"}`}
                                style={styles.text}
                            />
                        </View>

                        <TouchableOpacity onPress={() => setShowModal(false)} className="w-[80%] bg-[#D66A1F] py-4 rounded-xl items-center shadow-sm">
                            <Text className="text-white text-xl" style={styles.title}>Add Room</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
