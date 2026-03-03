import { useFocusEffect, useRouter } from "expo-router";
import { AlertTriangle, Clock, Flame, MapPin, ShieldCheck, User as UserIcon, Zap } from "lucide-react-native";
import { useCallback, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "../../utils/themeContext";
import { userStore } from "../../utils/userStore";
import { styles } from "../index";

const events = [
    {
        id: "1",
        type: "alert",
        title: "Flame Detected",
        date: "Today, 08:53 PM",
        desc: "High heat detected in Kitchen. System initiated gas cutoff protocol.",
        location: "Kitchen",
        time: "Just now"
    },
    {
        id: "2",
        type: "warning",
        title: "Voltage Surge",
        date: "Yesterday",
        desc: "Minor voltage irregularity detected in Living Room circuit. No action required.",
        location: "Living Room",
        time: "10:15 AM"
    },
    {
        id: "3",
        type: "safe",
        title: "System Scan",
        date: "08 Dec 2025",
        desc: "Weekly automatic diagnostic completed. All sensors operating within normal limits.",
        location: "Building wide",
        time: "09:00 AM"
    },
    {
        id: "4",
        type: "warning",
        title: "Low Battery",
        date: "07 Dec 2025",
        desc: "Smoke detector in Room 1 reported low battery. Please replace soon.",
        location: "Room 1",
        time: "04:30 PM"
    }
];

const EventIcon = ({ type }: { type: string }) => {
    switch (type) {
        case 'alert': return <Flame size={18} color="#FF3B30" />;
        case 'warning': return <AlertTriangle size={18} color="#FF9500" />;
        case 'safe': return <ShieldCheck size={18} color="#34C759" />;
        default: return <Zap size={18} color="#D66A1F" />;
    }
};

const getBadgeBg = (type: string, isDarkMode: boolean) => {
    if (isDarkMode) {
        switch (type) {
            case 'alert': return 'bg-red-950/30';
            case 'warning': return 'bg-orange-950/30';
            case 'safe': return 'bg-green-950/30';
            default: return 'bg-orange-950/30';
        }
    }
    switch (type) {
        case 'alert': return 'bg-red-50';
        case 'warning': return 'bg-orange-50';
        case 'safe': return 'bg-green-50';
        default: return 'bg-orange-50';
    }
};

const getBadgeText = (type: string) => {
    switch (type) {
        case 'alert': return 'text-red-600';
        case 'warning': return 'text-orange-600';
        case 'safe': return 'text-green-600';
        default: return 'text-[#D66A1F]';
    }
};

export default function EventHistory() {
    const route = useRouter();
    const insets = useSafeAreaInsets();
    const { isDarkMode } = useTheme();
    const [user, setUser] = useState(userStore.getUser());

    useFocusEffect(
        useCallback(() => {
            setUser(userStore.getUser());
        }, [])
    );

    return (
        <View className="flex-1" style={{ paddingTop: insets.top, backgroundColor: isDarkMode ? "#000000" : "#FDFDFD" }}>
            {/* Top Header */}
            <View className={`px-6 flex-row justify-between items-center pb-2 z-10`} style={{ backgroundColor: isDarkMode ? "#000000" : "#FDFDFD" }}>
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
            <View className={`h-[1px] w-full ${isDarkMode ? "bg-[#333]" : "bg-gray-100"} mb-4 z-10`} />

            {/* Title Section */}
            <View className={`px-6 mb-6 z-10`} style={{ backgroundColor: isDarkMode ? "#000000" : "#FDFDFD" }}>
                <Text className={`text-4xl mb-1 ${isDarkMode ? "text-white" : "text-black"}`} style={styles.title}>History</Text>
                <Text className={`${isDarkMode ? "text-gray-500" : "text-[#888]"} text-[15px]`} style={styles.text}>A complete timeline of your building safety.</Text>
            </View>

            <View className="flex-1 px-2 relative">
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    className="flex-1 z-10"
                    contentContainerStyle={{ paddingBottom: 120, paddingTop: 10 }}
                >
                    {/* SVG Timeline curve */}
                    <View className="absolute left-[34px] top-0 bottom-0 w-[40px] z-0 overflow-visible" pointerEvents="none">
                        <Svg height="1200" width="40" viewBox="0 0 40 1200">
                            <Path
                                d="M20,0 Q30,50 20,100 T20,280 T20,460 T20,640 T20,820 T20,1000"
                                fill="none"
                                stroke={isDarkMode ? "#333" : "#E5E5E5"}
                                strokeWidth="2"
                                strokeDasharray="4, 4"
                            />
                        </Svg>
                    </View>

                    {events.map((evt, index) => (
                        <View key={evt.id} className="flex-row items-start mb-8 min-h-[150px]">
                            {/* Timeline Node */}
                            <View className="w-[68px] items-center mt-6">
                                <View className={`w-8 h-8 rounded-full ${isDarkMode ? "bg-[#1A1A1A] border-[#D66A1F]" : "bg-white border-[#D66A1F]"} border-2 items-center justify-center shadow-sm`} style={{ elevation: 2 }}>
                                    <View className="w-3 h-3 rounded-full bg-[#D66A1F]" />
                                </View>
                            </View>

                            {/* Premium Card Content */}
                            <View className={`flex-1 ${isDarkMode ? "bg-[#1A1A1A] border-[#333]" : "bg-white border-gray-100"} rounded-[24px] p-5 mr-4 border shadow-sm`} style={{ elevation: 3 }}>
                                {/* Label & Date */}
                                <View className="flex-row justify-between items-center mb-3">
                                    <View className={`${getBadgeBg(evt.type, isDarkMode)} px-3 py-1.5 rounded-full flex-row items-center gap-2`}>
                                        <EventIcon type={evt.type} />
                                        <Text className={`${getBadgeText(evt.type)} text-[12px] font-bold uppercase tracking-wider`} style={styles.subtitle}>{evt.title}</Text>
                                    </View>
                                    <Text className="text-[#BBB] text-[11px] font-bold" style={styles.title}>{evt.date}</Text>
                                </View>

                                {/* Description */}
                                <Text className={`text-[15px] mb-5 leading-6 ${isDarkMode ? "text-gray-300" : "text-[#444]"}`} style={styles.text}>
                                    {evt.desc}
                                </Text>

                                {/* Metadata Row */}
                                <View className={`flex-row items-center justify-between border-t ${isDarkMode ? "border-[#333]" : "border-gray-50"} pt-4 mt-auto`}>
                                    <View className="flex-row items-center gap-2">
                                        <MapPin size={14} color="#D66A1F" />
                                        <Text className={`${isDarkMode ? "text-gray-500" : "text-[#888]"} text-[12px]`} style={styles.text}>{evt.location}</Text>
                                    </View>
                                    <View className="flex-row items-center gap-2">
                                        <Clock size={14} color={isDarkMode ? "#555" : "#888"} />
                                        <Text className={`${isDarkMode ? "text-gray-600" : "text-[#AAA]"} text-[12px]`} style={styles.text}>{evt.time}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
}


