import { useFocusEffect, useRouter } from "expo-router";
import { User as UserIcon } from "lucide-react-native";
import { useCallback, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Circle, Defs, G, LinearGradient, Path, Stop, Line as SvgLine, Text as SvgText } from "react-native-svg";
import { useTheme } from "../../utils/themeContext";
import { userStore } from "../../utils/userStore";
import { styles } from "../index";

// Defined Points for perfect representation
const X_POINTS = [50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300, 330];
const C1_Y = [110, 105, 115, 90, 105, 45, 80, 85, 115, 100, 80, 75];
const C2_Y = [145, 150, 130, 155, 135, 110, 125, 140, 155, 135, 115, 105];
const C3_Y = [170, 165, 175, 180, 170, 150, 165, 175, 170, 160, 145, 175];
const T_Y = [160, 145, 110, 165, 140, 60, 150, 175, 100, 155, 85, 120];

const createArea = (xs: number[], ys: number[], base: number) => {
    let p = `M${xs[0]},${base} L${xs[0]},${ys[0]}`;
    for (let i = 1; i < xs.length; i++) p += ` L${xs[i]},${ys[i]}`;
    p += ` L${xs[xs.length - 1]},${base} Z`;
    return p;
};

const createLine = (xs: number[], ys: number[]) => {
    let p = `M${xs[0]},${ys[0]}`;
    for (let i = 1; i < xs.length; i++) p += ` L${xs[i]},${ys[i]}`;
    return p;
};

const ChartSection = ({ title, type }: { title: string, type: 'current' | 'temp' }) => {
    const base = 190;
    const isCurrent = type === 'current';
    const { isDarkMode } = useTheme();

    return (
        <View className="mb-12">
            <Text className={`text-2xl mb-4 ${isDarkMode ? "text-white" : "text-black"}`} style={styles.title}>{title}</Text>
            <View style={{ height: 260, width: '100%' }}>
                <Svg height="100%" width="100%" viewBox="0 0 350 240">
                    <Defs>
                        <LinearGradient id="gGreen" x1="0" y1="0" x2="0" y2="1"><Stop offset="0" stopColor="#34C759" stopOpacity="0.2" /><Stop offset="1" stopColor="#34C759" stopOpacity="0" /></LinearGradient>
                        <LinearGradient id="gBlue" x1="0" y1="0" x2="0" y2="1"><Stop offset="0" stopColor="#007AFF" stopOpacity="0.2" /><Stop offset="1" stopColor="#007AFF" stopOpacity="0" /></LinearGradient>
                        <LinearGradient id="gOrange" x1="0" y1="0" x2="0" y2="1"><Stop offset="0" stopColor="#D66A1F" stopOpacity="0.2" /><Stop offset="1" stopColor="#D66A1F" stopOpacity="0" /></LinearGradient>
                        <LinearGradient id="gRed" x1="0" y1="0" x2="0" y2="1"><Stop offset="0" stopColor="#FF3B30" stopOpacity="0.2" /><Stop offset="1" stopColor="#FF3B30" stopOpacity="0" /></LinearGradient>
                    </Defs>

                    {/* Grid and Axis Labels */}
                    {[0, 1, 2, 3, 4].map((i) => (
                        <G key={i}>
                            <SvgLine x1="50" y1={30 + i * 40} x2="330" y2={30 + i * 40} stroke={isDarkMode ? "#333" : "#EBEBEB"} strokeDasharray="4, 4" strokeWidth="1" />
                            <SvgText x="40" y={34 + i * 40} fontSize="10" fill={isDarkMode ? "#666" : "#8E8E93"} textAnchor="end" fontFamily="System">
                                {isCurrent ? 16 - i * 4 : 40 - i * 8}
                            </SvgText>
                        </G>
                    ))}

                    {/* Vertical Axis Title */}
                    <SvgText x="-110" y="12" transform="rotate(-90)" fontSize="12" fill={isDarkMode ? "#666" : "#8E8E93"} textAnchor="middle" fontWeight="bold">
                        {isCurrent ? "Current (A)" : "Temperature (K)"}
                    </SvgText>

                    {/* Axis Lines */}
                    <SvgLine x1="50" y1="30" x2="50" y2={base} stroke={isDarkMode ? "#333" : "#EBEBEB"} strokeWidth="1" />
                    <SvgLine x1="50" y1={base} x2="340" y2={base} stroke={isDarkMode ? "#444" : "#D1D1D1"} strokeWidth="1.5" />

                    {/* X-Axis Time Labels */}
                    {['10:00', '10:05', '10:10', '10:15', '10:20', '10:25'].map((t, i) => (
                        <SvgText key={t} x={70 + i * 50} y="205" fontSize="10" fill={isDarkMode ? "#666" : "#8E8E93"} textAnchor="middle">{t}</SvgText>
                    ))}

                    {isCurrent ? (
                        <>
                            <Path d={createArea(X_POINTS, C1_Y, base)} fill="url(#gGreen)" />
                            <Path d={createLine(X_POINTS, C1_Y)} fill="none" stroke="#34C759" strokeWidth="1.5" />
                            <Path d={createArea(X_POINTS, C2_Y, base)} fill="url(#gBlue)" />
                            <Path d={createLine(X_POINTS, C2_Y)} fill="none" stroke="#007AFF" strokeWidth="1.5" />
                            <Path d={createArea(X_POINTS, C3_Y, base)} fill="url(#gOrange)" />
                            <Path d={createLine(X_POINTS, C3_Y)} fill="none" stroke="#D66A1F" strokeWidth="1.5" />
                        </>
                    ) : (
                        <>
                            <Path d={createArea(X_POINTS, T_Y, base)} fill="url(#gRed)" />
                            <Path d={createLine(X_POINTS, T_Y)} fill="none" stroke="#FF3B30" strokeWidth="1.5" />
                        </>
                    )}

                    {/* Markers for better visualization */}
                    {(isCurrent ? [C1_Y, C2_Y, C3_Y] : [T_Y]).map((ys, idx) => (
                        <G key={idx}>
                            {ys.map((y, i) => (
                                <Circle key={i} cx={X_POINTS[i]} cy={y} r="3" fill={isDarkMode ? "#222" : "white"} stroke={isCurrent ? ["#34C759", "#007AFF", "#D66A1F"][idx] : "#FF3B30"} strokeWidth="1" />
                            ))}
                        </G>
                    ))}

                    {/* Legend */}
                    <G transform="translate(85, 230)">
                        {isCurrent ? (
                            <>
                                <G transform="translate(0,0)"><SvgLine x1="0" y1="0" x2="12" y2="0" stroke="#34C759" strokeWidth="1.5" /><Circle cx="6" cy="0" r="2.5" fill={isDarkMode ? "#222" : "white"} stroke="#34C759" strokeWidth="1" /><SvgText x="16" y="4" fontSize="10" fill="#34C759">Circuit 1</SvgText></G>
                                <G transform="translate(75,0)"><SvgLine x1="0" y1="0" x2="12" y2="0" stroke="#007AFF" strokeWidth="1.5" /><Circle cx="6" cy="0" r="2.5" fill={isDarkMode ? "#222" : "white"} stroke="#007AFF" strokeWidth="1" /><SvgText x="16" y="4" fontSize="10" fill="#007AFF">Circuit 2</SvgText></G>
                                <G transform="translate(150,0)"><SvgLine x1="0" y1="0" x2="12" y2="0" stroke="#D66A1F" strokeWidth="1.5" /><Circle cx="6" cy="0" r="2.5" fill={isDarkMode ? "#222" : "white"} stroke="#D66A1F" strokeWidth="1" /><SvgText x="16" y="4" fontSize="10" fill="#D66A1F">Circuit 3</SvgText></G>
                            </>
                        ) : (
                            <G transform="translate(60,0)">
                                <SvgLine x1="0" y1="0" x2="15" y2="0" stroke="#FF3B30" strokeWidth="1.5" />
                                <Circle cx="7.5" cy="0" r="3" fill={isDarkMode ? "#222" : "white"} stroke="#FF3B30" strokeWidth="1" />
                                <SvgText x="20" y="4" fontSize="10" fill="#FF3B30">Temperature</SvgText>
                            </G>
                        )}
                    </G>
                </Svg>
            </View>
        </View>
    );
};

export default function LiveMonitoring() {
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
        <View className={`flex-1 ${isDarkMode ? "bg-black" : "bg-white"} relative`} style={{ paddingTop: insets.top }}>
            {/* Top Header */}
            <View className={`px-6 flex-row justify-between items-center pb-2 border-b ${isDarkMode ? "border-[#333]" : "border-gray-100"}`}>
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

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                <View className="px-6 mt-8 mb-4">
                    <Text className={`text-4xl ${isDarkMode ? "text-white" : "text-black"}`} style={styles.title}>Live Monitoring</Text>
                    <Text className={`${isDarkMode ? "text-gray-500" : "text-[#666]"} text-base`} style={styles.text}>Real-time building safety status</Text>
                </View>

                <View className="px-6 mt-6">
                    <ChartSection title="Current vs Time" type="current" />
                    <ChartSection title="Temperature vs Time" type="temp" />
                </View>
            </ScrollView>
        </View >
    );
}
