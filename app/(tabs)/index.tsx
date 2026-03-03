import { useFocusEffect, useRouter } from "expo-router";
import { AlertCircle, Flame, Thermometer, User, Zap } from "lucide-react-native";
import { useCallback, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../utils/themeContext";
import { userStore } from "../../utils/userStore";
import { styles } from "../index";

export default function HomeDashboard() {
    const route = useRouter();
    const insets = useSafeAreaInsets();
    const [user, setUser] = useState(userStore.getUser());
    const { isDarkMode } = useTheme();

    useFocusEffect(
        useCallback(() => {
            setUser(userStore.getUser());
        }, [])
    );

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
                        <User size={20} color="#D66A1F" />
                    )}
                </TouchableOpacity>
            </View>
            <View className={`h-[1px] w-full ${isDarkMode ? "bg-[#333]" : "bg-gray-200"} mb-6`} />

            <ScrollView className="px-6 flex-1 mb-24" showsVerticalScrollIndicator={false}>
                <Text className={`text-3xl mb-1 ${isDarkMode ? "text-white" : "text-black"}`} style={styles.title}>Home Dashboard</Text>
                <Text className={`${isDarkMode ? "text-gray-500" : "text-[#666]"} text-sm mb-6`} style={styles.text}>Real-time building safety status</Text>

                {/* Status Cards */}
                <View className="flex-row gap-4 mb-8">
                    <View className="flex-1 bg-[#D66A1F] rounded-xl p-4 min-h-[110px] justify-between shadow-sm">
                        <View className="flex-row justify-between items-start">
                            <View className="w-10 h-10 bg-white rounded-lg items-center justify-center">
                                <Zap size={20} color="#D66A1F" />
                            </View>
                            <Text className="text-white text-xs font-bold" style={styles.subtitle}>SAFE</Text>
                        </View>
                        <Text className="text-white text-base" style={styles.subtitle}>Electrical Status</Text>
                    </View>

                    <TouchableOpacity onPress={() => route.push("/fire-detected")} className="flex-1 bg-[#D66A1F] rounded-xl p-4 min-h-[110px] justify-between shadow-sm">
                        <View className="flex-row justify-between items-start">
                            <View className="w-10 h-10 bg-white rounded-lg items-center justify-center">
                                <Flame size={20} color="#D66A1F" />
                            </View>
                            <Text className="text-white text-xs font-bold" style={styles.subtitle}>SAFE</Text>
                        </View>
                        <Text className="text-white text-base" style={styles.subtitle}>Fire Status</Text>
                    </TouchableOpacity>
                </View>

                {/* Quick Indicators */}
                <Text className={`text-xl mb-4 uppercase ${isDarkMode ? "text-white" : "text-black"}`} style={styles.title}>QUICK INDICATORS</Text>
                <View className={`${isDarkMode ? "bg-[#1A1A1A] border-[#333]" : "bg-white border-gray-100"} rounded-xl shadow-sm border p-4 mb-3 flex-row justify-between items-center`} style={{ elevation: 2 }}>
                    <View className="flex-row items-center gap-3">
                        <Zap size={18} color="#D66A1F" />
                        <Text className={`${isDarkMode ? "text-gray-400" : "text-[#666]"} text-base`} style={styles.text}>Total Load</Text>
                    </View>
                    <Text className={`text-lg ${isDarkMode ? "text-white" : "text-black"}`} style={styles.subtitle}>8.8 <Text className="text-xs text-gray-500">A</Text></Text>
                </View>

                <View className={`${isDarkMode ? "bg-[#1A1A1A] border-[#333]" : "bg-white border-gray-100"} rounded-xl shadow-sm border p-4 mb-3 flex-row justify-between items-center`} style={{ elevation: 2 }}>
                    <View className="flex-row items-center gap-3">
                        <Thermometer size={18} color="#D66A1F" />
                        <Text className={`${isDarkMode ? "text-gray-400" : "text-[#666]"} text-base`} style={styles.text}>Indoor Temp</Text>
                    </View>
                    <Text className={`text-lg ${isDarkMode ? "text-white" : "text-black"}`} style={styles.subtitle}>24.8 <Text className="text-xs text-gray-500">C</Text></Text>
                </View>

                <View className={`${isDarkMode ? "bg-[#1A1A1A] border-[#333]" : "bg-white border-gray-100"} rounded-xl shadow-sm border p-4 mb-3 flex-row justify-between items-center`} style={{ elevation: 2 }}>
                    <View className="flex-row items-center gap-3">
                        <AlertCircle size={18} color="#D66A1F" />
                        <Text className={`${isDarkMode ? "text-gray-400" : "text-[#666]"} text-base`} style={styles.text}>Smoke (MQ-135)</Text>
                    </View>
                    <Text className={`text-lg ${isDarkMode ? "text-white" : "text-black"}`} style={styles.subtitle}>15 <Text className="text-xs text-gray-500">PPM</Text></Text>
                </View>

                <View className={`${isDarkMode ? "bg-[#1A1A1A] border-[#333]" : "bg-white border-gray-100"} rounded-xl shadow-sm border p-4 mb-8 flex-row justify-between items-center`} style={{ elevation: 2 }}>
                    <View className="flex-row items-center gap-3">
                        <Flame size={18} color="#D66A1F" />
                        <Text className={`${isDarkMode ? "text-gray-400" : "text-[#666]"} text-base`} style={styles.text}>Flame Sensor</Text>
                    </View>
                    <Text className={`text-sm uppercase ${isDarkMode ? "text-white" : "text-black"}`} style={styles.subtitle}>NO FIRE</Text>
                </View>

                {/* Quick Controls */}
                <View className="bg-[#D66A1F] rounded-2xl p-6 mb-8 pt-4">
                    <Text className="text-center text-white text-base uppercase mb-5" style={styles.subtitle}>QUICK CONTROLS</Text>

                    <View className="flex-row justify-between gap-4 mb-4">
                        <TouchableOpacity className="flex-1 bg-black p-4 rounded-xl items-center justify-center">
                            <Text className="text-white text-base" style={styles.subtitle}>Reset Line</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-1 bg-black p-4 rounded-xl items-center justify-center">
                            <Text className="text-white text-base" style={styles.subtitle}>Silence Alarm</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity className="w-full bg-white p-4 rounded-xl items-center justify-center shadow-sm">
                        <Text className="text-[#D66A1F] text-lg" style={styles.subtitle}>Kill All Power</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    );
}
