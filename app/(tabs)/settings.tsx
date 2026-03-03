import { useFocusEffect, useRouter } from "expo-router";
import { Bell, ChevronRight, Fingerprint, HelpCircle, Info, Moon, Shield, Smartphone, User as UserIcon } from "lucide-react-native";
import { useCallback, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../utils/themeContext";
import { UserData, userStore } from "../../utils/userStore";
import { styles } from "../index";

export default function SettingsScreen() {
    const route = useRouter();
    const insets = useSafeAreaInsets();
    const [user, setUser] = useState<UserData>(userStore.getUser());
    const { isDarkMode, toggleTheme } = useTheme();

    useFocusEffect(
        useCallback(() => {
            setUser(userStore.getUser());
        }, [])
    );

    const SettingsItem = ({ icon: Icon, title, value = "", onPress, isLast = false, isToggle = false }: { icon: any, title: string, value?: string, onPress?: () => void, isLast?: boolean, isToggle?: boolean }) => (
        <TouchableOpacity
            onPress={onPress}
            disabled={!onPress && !isToggle}
            className={`flex-row items-center justify-between ${isDarkMode ? "bg-[#1A1A1A]" : "bg-white"} px-5 py-4 ${!isLast ? (isDarkMode ? "border-b border-[#333]" : "border-b border-gray-100") : ""}`}
        >
            <View className="flex-row items-center gap-4">
                <View className={`w-10 h-10 rounded-full ${isDarkMode ? "bg-[#333]" : "bg-[#FAEBE4]"} items-center justify-center`}>
                    <Icon size={20} color={isDarkMode ? "#D66A1F" : "#D66A1F"} />
                </View>
                <Text className={`text-base ${isDarkMode ? "text-gray-200" : "text-[#333]"}`} style={styles.subtitle}>{title}</Text>
            </View>
            <View className="flex-row items-center gap-2">
                {isToggle ? (
                    <TouchableOpacity onPress={onPress}>
                        <View className={`w-12 h-6 rounded-full p-1 ${isDarkMode ? "bg-[#D66A1F]" : "bg-[#DDD]"}`}>
                            <View className={`w-4 h-4 rounded-full bg-white transition-all ${isDarkMode ? "ml-6" : "ml-0"}`} />
                        </View>
                    </TouchableOpacity>
                ) : (
                    <>
                        {value ? <Text className={`text-sm ${isDarkMode ? "text-gray-500" : "text-[#888]"}`} style={styles.text}>{value}</Text> : null}
                        <ChevronRight size={20} color={isDarkMode ? "#444" : "#CCC"} />
                    </>
                )}
            </View>
        </TouchableOpacity>
    );

    return (
        <View className={`flex-1 ${isDarkMode ? "bg-black" : "bg-[#F8F9FA]"} pt-16 relative`} style={{ paddingTop: insets.top }}>
            {/* Top Header */}
            <View className={`px-6 flex-row justify-between items-center pb-2 ${isDarkMode ? "bg-black" : "bg-[#F8F9FA]"} z-10`}>
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
            <View className={`h-[1px] w-full ${isDarkMode ? "bg-[#333]" : "bg-gray-200"}`} />

            <ScrollView showsVerticalScrollIndicator={false} className="flex-1 pt-4">
                <Text className={`text-3xl px-6 mb-6 ${isDarkMode ? "text-white" : "text-black"}`} style={styles.title}>App Settings</Text>

                {/* Profile Link */}
                <TouchableOpacity
                    onPress={() => route.push("/edit-profile")}
                    className={`flex-row items-center justify-between ${isDarkMode ? "bg-[#1A1A1A] border-y border-[#333]" : "bg-white border-y border-gray-200"} px-5 py-6 mb-8`}
                >
                    <View className="flex-row items-center gap-4">
                        <View className={`w-14 h-14 rounded-full ${isDarkMode ? "bg-[#333]" : "bg-gray-100"} border-2 border-white/10 shadow-sm items-center justify-center overflow-hidden`}>
                            {user.profileImage ? (
                                <Image source={{ uri: user.profileImage }} className="w-full h-full" resizeMode="cover" />
                            ) : (
                                <UserIcon size={32} color="#D66A1F" strokeWidth={1.5} />
                            )}
                        </View>
                        <View>
                            <Text className={`text-xl ${isDarkMode ? "text-white" : "text-black"}`} style={styles.title}>{user.fullName}</Text>
                            <Text className={`${isDarkMode ? "text-gray-500" : "text-[#888]"} text-[13px]`} style={styles.text}>View and edit profile</Text>
                        </View>
                    </View>
                    <ChevronRight size={24} color={isDarkMode ? "#444" : "#CCC"} />
                </TouchableOpacity>

                {/* Settings sections */}
                <View className="mb-6">
                    <Text className={`px-5 pb-2 ${isDarkMode ? "text-gray-500" : "text-[#888]"} text-sm uppercase`} style={styles.subtitle}>Security & Privacy</Text>
                    <View className={`${isDarkMode ? "bg-[#1A1A1A] border-y border-[#333]" : "bg-white border-y border-gray-200"}`}>
                        <SettingsItem icon={Shield} title="Data Privacy" onPress={() => route.push("/preferences?type=security")} />
                        <SettingsItem icon={Fingerprint} title="Biometric Security" value="On" onPress={() => route.push("/preferences?type=security")} />
                        <SettingsItem icon={Smartphone} title="Linked Hardware" value="2 Devices" isLast onPress={() => route.push("/preferences?type=security")} />
                    </View>
                </View>

                <View className="mt-2 mb-6">
                    <Text className={`px-5 pb-2 ${isDarkMode ? "text-gray-500" : "text-[#888]"} text-sm uppercase`} style={styles.subtitle}>System Preferences</Text>
                    <View className={`${isDarkMode ? "bg-[#1A1A1A] border-y border-[#333]" : "bg-white border-y border-gray-200"}`}>
                        <SettingsItem icon={Bell} title="System Alerts" value="High" onPress={() => route.push("/preferences?type=notifications")} />
                        <SettingsItem
                            icon={Moon}
                            title="Dark Mode"
                            isToggle
                            onPress={toggleTheme}
                        />
                        <SettingsItem icon={Bell} title="Notification Sounds" isLast onPress={() => route.push("/notification-sounds")} />
                    </View>
                </View>

                <View className="mt-2 mb-10">
                    <Text className={`px-5 pb-2 ${isDarkMode ? "text-gray-500" : "text-[#888]"} text-sm uppercase`} style={styles.subtitle}>Support</Text>
                    <View className={`${isDarkMode ? "bg-[#1A1A1A] border-y border-[#333]" : "bg-white border-y border-gray-200"}`}>
                        <HelpCenterIcon icon={HelpCircle} title="Help Center" onPress={() => route.push("/preferences?type=help")} />
                        <SettingsItem icon={Info} title="Legal & Policies" isLast onPress={() => route.push("/preferences?type=legal")} />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

// HelpCenter helper
const HelpCenterIcon = ({ icon: Icon, title, isLast, onPress }: { icon: any, title: string, isLast?: boolean, onPress?: () => void }) => {
    const { isDarkMode } = useTheme();
    return (
        <TouchableOpacity
            onPress={onPress}
            className={`flex-row items-center justify-between ${isDarkMode ? "bg-[#1A1A1A]" : "bg-white"} px-5 py-4 ${!isLast ? (isDarkMode ? "border-b border-[#333]" : "border-b border-gray-100") : ""}`}
        >
            <View className="flex-row items-center gap-4">
                <View className={`w-10 h-10 rounded-full ${isDarkMode ? "bg-[#333]" : "bg-[#FAEBE4]"} items-center justify-center`}>
                    <Icon size={20} color="#D66A1F" />
                </View>
                <Text className={`text-base ${isDarkMode ? "text-gray-200" : "text-[#333]"}`} style={styles.subtitle}>{title}</Text>
            </View>
            <ChevronRight size={20} color={isDarkMode ? "#444" : "#CCC"} />
        </TouchableOpacity>
    );
};
