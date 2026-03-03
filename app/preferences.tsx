import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Bell, ChevronRight, Fingerprint, HelpCircle, Info, Lock, Shield, Smartphone, User } from "lucide-react-native";
import { useState } from "react";
import { Image, ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../utils/themeContext";
import { userStore } from "../utils/userStore";
import { styles } from "./index";

export default function PreferencesScreen() {
    const { type } = useLocalSearchParams<{ type: string }>();
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { isDarkMode } = useTheme();
    const user = userStore.getUser();

    const [settings, setSettings] = useState({
        pushNotifications: true,
        emailAlerts: false,
        smsAlerts: true,
        biometric: true,
        twoFactor: false,
        dataSharing: true,
    });

    const toggleSetting = (key: keyof typeof settings) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const renderHeader = () => {
        let title = "Preferences";
        let icon = <Info size={28} color="#D66A1F" />;

        if (type === "notifications") {
            title = "Notifications";
            icon = <Bell size={28} color="#D66A1F" />;
        } else if (type === "security") {
            title = "Security & Privacy";
            icon = <Fingerprint size={28} color="#D66A1F" />;
        } else if (type === "legal") {
            title = "Legal & Terms";
            icon = <Shield size={28} color="#D66A1F" />;
        } else if (type === "help") {
            title = "Help Center";
            icon = <HelpCircle size={28} color="#D66A1F" />;
        }

        return (
            <View className="px-6 pb-6 pt-8">
                <View className="flex-row items-center gap-4 mb-4">
                    <View className={`w-14 h-14 rounded-2xl ${isDarkMode ? "bg-[#1A1A1A] border border-[#333]" : "bg-[#FAEBE4]"} items-center justify-center shadow-sm`}>
                        {icon}
                    </View>
                    <View className="flex-1">
                        <Text className={`text-3xl ${isDarkMode ? "text-white" : "text-black"}`} style={styles.title}>{title}</Text>
                        <Text className={`${isDarkMode ? "text-gray-500" : "text-[#888]"} text-xs uppercase tracking-widest font-bold mt-1`} style={styles.subtitle}>Settings Section</Text>
                    </View>
                </View>
                <View className={`h-[2px] w-12 bg-[#D66A1F] rounded-full mb-4`} />
                <Text className={`${isDarkMode ? "text-gray-400" : "text-[#666]"} text-base leading-6`} style={styles.text}>
                    {type === "notifications" && "Configure how you receive critical fire safety alerts and system updates across all your devices."}
                    {type === "security" && "Manage your account security, biometric authentication, and control how your data is used within the SparkLock ecosystem."}
                    {type === "legal" && "Review our formal terms of service, privacy policies, and other legal documentation that governs your use of SparkLock."}
                    {type === "help" && "Need assistance? Access our comprehensive user guides, contact support, or find answers to frequently asked questions."}
                </Text>
            </View>
        );
    };

    const SettingRow = ({ label, value, onToggle, description, icon: Icon }: { label: string, value: boolean, onToggle: () => void, description?: string, icon?: any }) => (
        <View className={`flex-row items-center justify-between p-6 border-b ${isDarkMode ? "border-[#333]" : "border-gray-50"}`}>
            <View className="flex-1 mr-4">
                <View className="flex-row items-center gap-2 mb-1">
                    {Icon && <Icon size={16} color="#D66A1F" />}
                    <Text className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-[#333]"}`} style={styles.subtitle}>{label}</Text>
                </View>
                {description && <Text className={`${isDarkMode ? "text-gray-500" : "text-[#888]"} text-xs font-medium`} style={styles.text}>{description}</Text>}
            </View>
            <Switch
                value={value}
                onValueChange={onToggle}
                trackColor={{ false: isDarkMode ? "#333" : "#DDD", true: "#D66A1F" }}
                thumbColor="white"
                ios_backgroundColor={isDarkMode ? "#333" : "#DDD"}
            />
        </View>
    );

    const LinkRow = ({ label, icon: Icon, onPress, subtext }: { label: string, icon: any, onPress: () => void, subtext?: string }) => (
        <TouchableOpacity onPress={onPress} className={`flex-row items-center p-6 border-b ${isDarkMode ? "border-[#333]" : "border-gray-50"}`}>
            <View className={`w-12 h-12 rounded-xl ${isDarkMode ? "bg-[#222]" : "bg-gray-50"} items-center justify-center mr-4 shadow-sm`}>
                <Icon size={20} color={isDarkMode ? "#AAA" : "#666"} />
            </View>
            <View className="flex-1">
                <Text className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-[#333]"}`} style={styles.subtitle}>{label}</Text>
                {subtext && <Text className={`${isDarkMode ? "text-gray-500" : "text-[#888]"} text-xs`} style={styles.text}>{subtext}</Text>}
            </View>
            <ChevronRight size={20} color={isDarkMode ? "#444" : "#CCC"} />
        </TouchableOpacity>
    );

    return (
        <View className={`flex-1 ${isDarkMode ? "bg-black" : "bg-white"}`} style={{ paddingTop: insets.top }}>
            {/* Header with back button */}
            <View className={`px-6 flex-row justify-between items-center pb-2 z-10 ${isDarkMode ? "bg-black" : "bg-white"}`}>
                <View className="flex-row items-center gap-3">
                    <TouchableOpacity onPress={() => router.back()} className={`w-10 h-10 rounded-full items-center justify-center ${isDarkMode ? "bg-[#1A1A1A] border border-[#333]" : "bg-gray-50 border border-gray-100"}`}>
                        <ArrowLeft size={20} color={isDarkMode ? "#AAA" : "#333"} />
                    </TouchableOpacity>
                    <View>
                        <Text className="text-[#D66A1F] text-2xl" style={styles.title}>SPARKLOCK</Text>
                        <Text className={`${isDarkMode ? "text-gray-500" : "text-[#666]"} text-sm`} style={styles.text}>{user.location}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => router.back()} className={`w-10 h-10 rounded-full border border-[#D66A1F] ${isDarkMode ? "bg-[#333]" : "bg-[#FAEBE4]"} items-center justify-center overflow-hidden`}>
                    {user.profileImage ? (
                        <Image source={{ uri: user.profileImage }} className="w-full h-full" />
                    ) : (
                        <User size={20} color="#D66A1F" />
                    )}
                </TouchableOpacity>
            </View>
            <View className={`h-[1px] w-full ${isDarkMode ? "bg-[#333]" : "bg-gray-100"}`} />

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                {renderHeader()}

                <View className="px-6 mt-2">
                    <View className={`rounded-[32px] border ${isDarkMode ? "bg-[#0D0D0D] border-[#333]" : "bg-white border-gray-100"} shadow-sm overflow-hidden`}>
                        {type === "notifications" && (
                            <>
                                <SettingRow
                                    label="Push Notifications"
                                    description="Instant alerts for critical fire safety events."
                                    value={settings.pushNotifications}
                                    onToggle={() => toggleSetting('pushNotifications')}
                                />
                                <SettingRow
                                    label="SMS Alerts"
                                    description="Emergency texts even when offline."
                                    value={settings.smsAlerts}
                                    onToggle={() => toggleSetting('smsAlerts')}
                                />
                                <SettingRow
                                    label="System Status Reports"
                                    description="Weekly performance and safety summaries."
                                    value={settings.emailAlerts}
                                    onToggle={() => toggleSetting('emailAlerts')}
                                />
                                <LinkRow label="Notification Tones" icon={Bell} onPress={() => router.push("/notification-sounds")} subtext="Pulsar (Default)" />
                            </>
                        )}

                        {type === "security" && (
                            <>
                                <SettingRow
                                    label="Biometric Access"
                                    description="Unlock SparkLock using Face ID or Touch ID."
                                    value={settings.biometric}
                                    onToggle={() => toggleSetting('biometric')}
                                />
                                <SettingRow
                                    label="Login Alerts"
                                    description="Get notified of new logins to your account."
                                    value={settings.twoFactor}
                                    onToggle={() => toggleSetting('twoFactor')}
                                />
                                <SettingRow
                                    label="Anonymous Usage Data"
                                    description="Help us improve safety with diagnostic data."
                                    value={settings.dataSharing}
                                    onToggle={() => toggleSetting('dataSharing')}
                                />
                                <LinkRow label="Change Password" icon={Lock} onPress={() => { }} subtext="Last changed 3 months ago" />
                                <LinkRow label="Authorized Hardware" icon={Smartphone} onPress={() => { }} subtext="2 Devices currently active" />
                            </>
                        )}

                        {type === "legal" && (
                            <>
                                <LinkRow label="Terms of Service" icon={Info} onPress={() => { }} />
                                <LinkRow label="Privacy Policy" icon={Shield} onPress={() => { }} />
                                <LinkRow label="Data Usage Agreement" icon={Info} onPress={() => { }} />
                                <LinkRow label="Third-Party Licenses" icon={Info} onPress={() => { }} />
                            </>
                        )}

                        {type === "help" && (
                            <>
                                <LinkRow label="User Manual" icon={Info} onPress={() => { }} subtext="Interactive setup guide" />
                                <LinkRow label="Troubleshooting" icon={Info} onPress={() => { }} subtext="Fix common hardware issues" />
                                <LinkRow label="Contact Support" icon={Smartphone} onPress={() => { }} subtext="+250 788 000 000" />
                                <LinkRow label="Report a Bug" icon={Bell} onPress={() => { }} />
                            </>
                        )}
                    </View>

                    {type === "notifications" && (
                        <View className={`mt-8 p-6 rounded-[24px] ${isDarkMode ? "bg-[#1A1A1A]" : "bg-[#FDF6F2]"} border ${isDarkMode ? "border-[#333]" : "border-[#FAEBE4]"}`}>
                            <Text className={`text-sm mb-2 ${isDarkMode ? "text-gray-300" : "text-[#333]"} font-bold`} style={styles.subtitle}>Pro Tip</Text>
                            <Text className={`${isDarkMode ? "text-gray-500" : "text-[#888]"} text-xs leading-5`} style={styles.text}>
                                Enabling SMS Alerts ensures you receive danger warnings even if your internet connection is unstable during an emergency.
                            </Text>
                        </View>
                    )}
                </View>

                {type === "legal" && (
                    <View className="mt-12 items-center">
                        <Text className="text-gray-500 text-[10px] font-bold uppercase tracking-widest" style={styles.subtitle}>SparkLock Infrastructure</Text>
                        <Text className="text-gray-400 text-xs mt-1" style={styles.text}>Version 1.2.0-Alpha • Build 4892</Text>
                        <Text className="text-gray-400 text-[10px] mt-4" style={styles.text}>© 2024-2026 SparkLock. All rights reserved.</Text>
                    </View>
                )}
            </ScrollView>

            <View className={`px-6 pb-12 pt-6 border-t ${isDarkMode ? "bg-black border-[#333]" : "bg-white border-gray-50"}`}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="bg-[#D66A1F] rounded-2xl p-5 items-center justify-center shadow-lg"
                    style={{ elevation: 5 }}
                >
                    <Text className="text-white text-lg font-bold uppercase tracking-wider" style={styles.subtitle}>Back</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
