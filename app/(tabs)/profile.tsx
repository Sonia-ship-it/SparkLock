import { useFocusEffect, useRouter } from "expo-router";
import { Bell, CheckCircle, ChevronRight, Cpu, Edit, Fingerprint, Home, Info, LogOut, MapPin, Shield, Smartphone, User as UserIcon } from "lucide-react-native";
import { useCallback, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../utils/themeContext";
import { UserData, userStore } from "../../utils/userStore";
import { styles } from "../index";

export default function ProfileScreen() {
    const route = useRouter();
    const insets = useSafeAreaInsets();
    const [user, setUser] = useState<UserData>(userStore.getUser());
    const { isDarkMode } = useTheme();

    useFocusEffect(
        useCallback(() => {
            setUser(userStore.getUser());
        }, [])
    );

    const handleStatPress = (type: string) => {
        if (type === 'Building') route.push("/(tabs)");
        else if (type === 'Device') route.push("/(tabs)/monitor");
        else if (type === 'Status') route.push("/emergency");
    };

    return (
        <View className={`flex-1 ${isDarkMode ? "bg-black" : "bg-white"}`} style={{ paddingTop: insets.top }}>
            {/* Top Header */}
            <View className={`px-6 flex-row justify-between items-center pb-4 border-b ${isDarkMode ? "border-[#333]" : "border-gray-100"}`}>
                <View>
                    <Text className="text-[#D66A1F] text-2xl" style={styles.title}>SPARKLOCK</Text>
                    <Text className={`${isDarkMode ? "text-gray-500" : "text-[#666]"} text-sm`} style={styles.text}>{user.location}</Text>
                </View>
                <TouchableOpacity onPress={() => route.back()} className={`w-10 h-10 rounded-full border ${isDarkMode ? "border-[#333] bg-[#1A1A1A]" : "border-gray-200 bg-gray-50"} items-center justify-center overflow-hidden`}>
                    {user.profileImage ? (
                        <Image source={{ uri: user.profileImage }} className="w-full h-full" />
                    ) : (
                        <UserIcon size={20} color="#D66A1F" />
                    )}
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
                {/* Profile Detail Header */}
                <View className="pt-10 pb-8 items-center">
                    <View className="relative">
                        <TouchableOpacity
                            onPress={() => route.push("/edit-profile")}
                            className={`w-32 h-32 rounded-full ${isDarkMode ? "bg-[#1A1A1A] border-[#333]" : "bg-gray-50 border-gray-100"} items-center justify-center mb-6 overflow-hidden border shadow-sm`}
                        >
                            {user.profileImage ? (
                                <Image source={{ uri: user.profileImage }} className="w-full h-full" resizeMode="cover" />
                            ) : (
                                <UserIcon size={70} color="#D66A1F" strokeWidth={1.5} />
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => route.push("/edit-profile")}
                            className="absolute bottom-6 right-0 w-9 h-9 bg-[#D66A1F] rounded-full border-2 border-white items-center justify-center shadow-md"
                        >
                            <Edit size={16} color="white" />
                        </TouchableOpacity>
                    </View>

                    <View className="flex-row items-center gap-2">
                        <Text className={`text-2xl ${isDarkMode ? "text-white" : "text-black"}`} style={styles.title}>{user.fullName}</Text>
                        <TouchableOpacity onPress={() => route.push("/edit-profile")}>
                            <Edit size={16} color="#D66A1F" />
                        </TouchableOpacity>
                    </View>
                    <Text className="text-[#D66A1F] text-base font-medium mt-1" style={styles.subtitle}>Building Owner</Text>

                    <View className="flex-row items-center mt-3 gap-2">
                        <MapPin size={14} color="#888" />
                        <Text className="text-[#888] text-sm" style={styles.text}>{user.location}</Text>
                    </View>
                </View>

                {/* Dashboard Stats */}
                <View className={`flex-row justify-around px-2 py-8 ${isDarkMode ? "bg-[#1A1A1A] border-[#333]" : "bg-[#fdfaf8] border-[#FAEBE4]"} mx-6 rounded-3xl mb-8 border`}>
                    <TouchableOpacity onPress={() => handleStatPress('Building')} className="items-center flex-1">
                        <View className={`${isDarkMode ? "bg-[#333]" : "bg-white"} w-10 h-10 rounded-full items-center justify-center mb-2 shadow-sm`}>
                            <Home size={18} color="#D66A1F" />
                        </View>
                        <Text className={`text-xl ${isDarkMode ? "text-white" : "text-[#333]"}`} style={styles.title}>3</Text>
                        <Text className="text-[#888] text-[10px] font-bold uppercase" style={styles.text}>Buildings</Text>
                    </TouchableOpacity>

                    <View className={`w-[1px] h-12 ${isDarkMode ? "bg-[#333]" : "bg-gray-200"} self-center`} />

                    <TouchableOpacity onPress={() => handleStatPress('Device')} className="items-center flex-1">
                        <View className={`${isDarkMode ? "bg-[#333]" : "bg-white"} w-10 h-10 rounded-full items-center justify-center mb-2 shadow-sm`}>
                            <Cpu size={18} color="#D66A1F" />
                        </View>
                        <Text className={`text-xl ${isDarkMode ? "text-white" : "text-[#333]"}`} style={styles.title}>12</Text>
                        <Text className="text-[#888] text-[10px] font-bold uppercase" style={styles.text}>Devices</Text>
                    </TouchableOpacity>

                    <View className={`w-[1px] h-12 ${isDarkMode ? "bg-[#333]" : "bg-gray-200"} self-center`} />

                    <TouchableOpacity onPress={() => handleStatPress('Status')} className="items-center flex-1">
                        <View className={`${isDarkMode ? "bg-[#333]" : "bg-white"} w-10 h-10 rounded-full items-center justify-center mb-2 shadow-sm`}>
                            <CheckCircle size={18} color="#008A1E" />
                        </View>
                        <Text className="text-[#008A1E] text-xl" style={styles.title}>SAFE</Text>
                        <Text className="text-[#888] text-[10px] font-bold uppercase" style={styles.text}>Status</Text>
                    </TouchableOpacity>
                </View>

                {/* Account Details */}
                <View className="px-6 mb-24">
                    <Text className="text-[14px] text-[#888] uppercase mb-4 ml-2" style={styles.subtitle}>Account Details</Text>

                    <View className={`${isDarkMode ? "bg-[#1A1A1A] border-[#333]" : "bg-white border-gray-100"} rounded-3xl border shadow-sm p-2`}>
                        <TouchableOpacity onPress={() => route.push("/edit-profile")} className={`flex-row items-center p-4 gap-4 border-b ${isDarkMode ? "border-[#333]" : "border-gray-50"}`}>
                            <View className="w-10 h-10 rounded-2xl bg-[#FAEBE4] items-center justify-center">
                                <UserIcon size={20} color="#D66A1F" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-[#888] text-xs" style={styles.text}>Full Name</Text>
                                <Text className={`text-base ${isDarkMode ? "text-white" : "text-[#333]"}`} style={styles.subtitle}>{user.fullName}</Text>
                            </View>
                            <Edit size={16} color="#CCC" />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => route.push("/edit-profile")} className={`flex-row items-center p-4 gap-4 border-b ${isDarkMode ? "border-[#333]" : "border-gray-50"}`}>
                            <View className="w-10 h-10 rounded-2xl bg-[#FAEBE4] items-center justify-center">
                                <Smartphone size={20} color="#D66A1F" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-[#888] text-xs" style={styles.text}>Phone Number</Text>
                                <Text className={`text-base ${isDarkMode ? "text-white" : "text-[#333]"}`} style={styles.subtitle}>{user.phoneNumber}</Text>
                            </View>
                            <Edit size={16} color="#CCC" />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => route.push("/edit-profile")} className="flex-row items-center p-4 gap-4">
                            <View className="w-10 h-10 rounded-2xl bg-[#FAEBE4] items-center justify-center">
                                <Shield size={20} color="#D66A1F" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-[#888] text-xs" style={styles.text}>Emergency Contact</Text>
                                <Text className={`text-base ${isDarkMode ? "text-white" : "text-[#333]"}`} style={styles.subtitle}>{user.emergencyContact}</Text>
                            </View>
                            <Edit size={16} color="#CCC" />
                        </TouchableOpacity>
                    </View>

                    {/* Settings Section */}
                    <Text className="text-[14px] text-[#888] uppercase mb-4 ml-2 mt-8" style={styles.subtitle}>Preferences</Text>
                    <View className={`${isDarkMode ? "bg-[#1A1A1A] border-[#333]" : "bg-white border-gray-100"} rounded-3xl border shadow-sm p-2`}>
                        <TouchableOpacity onPress={() => route.push("/preferences?type=notifications")} className={`flex-row items-center p-4 gap-4 border-b ${isDarkMode ? "border-[#333]" : "border-gray-50"}`}>
                            <View className={`w-10 h-10 rounded-2xl ${isDarkMode ? "bg-[#333]" : "bg-gray-50"} items-center justify-center`}>
                                <Bell size={18} color={isDarkMode ? "#D66A1F" : "#666"} />
                            </View>
                            <Text className={`flex-1 text-base ${isDarkMode ? "text-gray-200" : "text-[#333]"}`} style={styles.subtitle}>App Notifications</Text>
                            <ChevronRight size={18} color={isDarkMode ? "#555" : "#CCC"} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => route.push("/preferences?type=security")} className={`flex-row items-center p-4 gap-4 border-b ${isDarkMode ? "border-[#333]" : "border-gray-50"}`}>
                            <View className={`w-10 h-10 rounded-2xl ${isDarkMode ? "bg-[#333]" : "bg-gray-50"} items-center justify-center`}>
                                <Fingerprint size={18} color={isDarkMode ? "#D66A1F" : "#666"} />
                            </View>
                            <Text className={`flex-1 text-base ${isDarkMode ? "text-gray-200" : "text-[#333]"}`} style={styles.subtitle}>Security & Privacy</Text>
                            <ChevronRight size={18} color={isDarkMode ? "#555" : "#CCC"} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => route.push("/preferences?type=legal")} className="flex-row items-center p-4 gap-4">
                            <View className={`w-10 h-10 rounded-2xl ${isDarkMode ? "bg-[#333]" : "bg-gray-50"} items-center justify-center`}>
                                <Info size={18} color={isDarkMode ? "#D66A1F" : "#666"} />
                            </View>
                            <Text className={`flex-1 text-base ${isDarkMode ? "text-gray-200" : "text-[#333]"}`} style={styles.subtitle}>Legal & Terms</Text>
                            <ChevronRight size={18} color={isDarkMode ? "#555" : "#CCC"} />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        onPress={() => route.push('/login')}
                        className="mt-10 flex-row items-center justify-center p-5 rounded-2xl border border-[#F3D5C5] bg-[#FAEBE4]/50"
                    >
                        <LogOut size={22} color="#D66A1F" />
                        <Text className="text-[#D66A1F] text-xl font-bold ml-3" style={styles.subtitle}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}
