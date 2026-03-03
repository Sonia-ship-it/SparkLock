import { useRouter } from "expo-router";
import { ChevronLeft, Phone } from "lucide-react-native";
import React, { useEffect, useRef } from "react";
import { Animated, Easing, Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../utils/themeContext";
import { styles } from "./index";

const PRIMARY_COLOR = "#D66A1F";

function PulsingBackgroundRing({ delay, size, color, targetScale }: { delay: number; size: number; color: string; targetScale: number }) {
    const scale = useRef(new Animated.Value(1)).current;
    const opacity = useRef(new Animated.Value(0.7)).current;

    useEffect(() => {
        const startPulse = () => {
            scale.setValue(1);
            opacity.setValue(0.7);
            Animated.parallel([
                Animated.timing(scale, {
                    toValue: targetScale,
                    duration: 2500,
                    useNativeDriver: true,
                    easing: Easing.out(Easing.quad),
                }),
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 2500,
                    useNativeDriver: true,
                }),
            ]).start(() => startPulse());
        };

        const timer = setTimeout(startPulse, delay);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Animated.View
            style={[
                emergencyStyles.staticRing,
                {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    backgroundColor: color,
                    transform: [{ scale }],
                    opacity,
                },
            ]}
        />
    );
}

export default function Emergency() {
    const route = useRouter();
    const buttonScale = useRef(new Animated.Value(1)).current;
    const { isDarkMode } = useTheme();

    useEffect(() => {
        // More intense button heartbeat
        Animated.loop(
            Animated.sequence([
                Animated.timing(buttonScale, {
                    toValue: 1.15,
                    duration: 600,
                    useNativeDriver: true,
                    easing: Easing.inOut(Easing.quad),
                }),
                Animated.timing(buttonScale, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                    easing: Easing.inOut(Easing.quad),
                }),
            ])
        ).start();
    }, []);

    const handleCall = () => {
        const url = 'tel:911';
        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported || Platform.OS === 'ios') {
                    return Linking.openURL(url);
                } else {
                    console.log("Don't know how to open URI: " + url);
                }
            })
            .catch((err) => console.error('An error occurred', err));
    };

    return (
        <View className={`flex-1 ${isDarkMode ? "bg-black" : "bg-[#F9F9F9]"} pt-10 relative`} pointerEvents="box-none">
            {/* Header / Back Button */}
            <View className="px-6 flex-row items-center z-20" pointerEvents="box-none">
                <TouchableOpacity
                    onPress={() => route.back()}
                    className={`w-10 h-10 rounded-full items-center justify-center shadow-md border ${isDarkMode ? "bg-[#1A1A1A] border-[#333]" : "bg-white border-gray-50"}`}
                    style={{ elevation: 3 }}
                >
                    <ChevronLeft size={22} color={PRIMARY_COLOR} />
                </TouchableOpacity>
            </View>

            {/* Titles */}
            <View className="px-10 mt-4 items-center" pointerEvents="none">
                <Text className="text-[#D66A1F] text-[36px] text-center mb-2 font-bold" style={styles.title}>
                    Are you in{"\n"}emergency ?
                </Text>
                <Text className={`${isDarkMode ? "text-gray-500" : "text-[#888]"} text-[15px] text-center leading-5 px-8`} style={styles.text}>
                    Press the button below help will reach you soon.
                </Text>
            </View>

            {/* Central Animated Area */}
            <View className="flex-1 items-center justify-center relative" pointerEvents="box-none">
                <View className="items-center justify-center" pointerEvents="box-none">

                    {/* Pulsing Concentric Rings per Screenshot Colors but adapted for Dark Mode if needed */}
                    <PulsingBackgroundRing size={260} color={isDarkMode ? "#2D1A0D" : "#FAEBE4"} delay={0} targetScale={1.3} />
                    <View style={[emergencyStyles.staticRing, { width: 260, height: 260, backgroundColor: isDarkMode ? '#2D1A0D' : '#FAEBE4', opacity: 0.6 }]} />

                    <PulsingBackgroundRing size={220} color={isDarkMode ? "#4A2510" : "#F3D1BC"} delay={400} targetScale={1.5} />
                    <View style={[emergencyStyles.staticRing, { width: 220, height: 220, backgroundColor: isDarkMode ? '#4A2510' : '#F3D1BC', opacity: 0.8 }]} />

                    <PulsingBackgroundRing size={180} color={isDarkMode ? "#8F3E10" : "#EB9455"} delay={800} targetScale={1.8} />
                    <View style={[emergencyStyles.staticRing, { width: 180, height: 180, backgroundColor: isDarkMode ? '#8F3E10' : '#EB9455', opacity: 0.9 }]} />

                    {/* The Main Emergency Button */}
                    <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                        <TouchableOpacity
                            onPress={handleCall}
                            activeOpacity={0.9}
                            className="w-32 h-32 rounded-full bg-[#D66A1F] items-center justify-center shadow-2xl"
                            style={{
                                elevation: 8,
                                shadowColor: '#D66A1F',
                                shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.4,
                                shadowRadius: 10,
                            }}
                        >
                            <View style={{ transform: [{ rotate: '-45deg' }] }}>
                                <Phone size={50} color="white" fill="white" />
                            </View>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </View>

            {/* Footer Section */}
            <View className="px-6 pb-14 items-center" pointerEvents="box-none">
                <Text className={`text-[20px] font-bold mb-1 ${isDarkMode ? "text-white" : "text-black"}`} style={styles.title}>
                    Not Sure What To Do
                </Text>
                <Text className={`${isDarkMode ? "text-gray-600" : "text-[#AAAAAA]"} text-[13px] mb-10`} style={styles.text}>
                    choose chat topics
                </Text>

                <View className="flex-row justify-center w-full gap-3" pointerEvents="box-none">
                    <TouchableOpacity className={`flex-1 shadow-sm rounded-xl items-center justify-center px-1 py-6 border ${isDarkMode ? "bg-[#1A1A1A] border-[#333]" : "bg-white border-gray-50"}`} style={{ elevation: 2 }}>
                        <Text className={`text-center text-[13px] font-medium ${isDarkMode ? "text-gray-400" : "text-[#555]"}`} style={styles.text}>I have an{"\n"}accident</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className={`flex-1 shadow-sm rounded-xl items-center justify-center px-1 py-6 border ${isDarkMode ? "bg-[#1A1A1A] border-[#333]" : "bg-white border-gray-50"}`} style={{ elevation: 2 }}>
                        <Text className={`text-center text-[13px] font-medium ${isDarkMode ? "text-gray-400" : "text-[#555]"}`} style={styles.text}>I have an{"\n"}injury</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className={`flex-1 shadow-sm rounded-xl items-center justify-center px-1 py-6 border ${isDarkMode ? "bg-[#1A1A1A] border-[#333]" : "bg-white border-gray-50"}`} style={{ elevation: 2 }}>
                        <Text className={`text-center text-[13px] font-medium ${isDarkMode ? "text-gray-400" : "text-[#555]"}`} style={styles.text}>Fire Out{"\n"}Break</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const emergencyStyles = StyleSheet.create({
    staticRing: {
        position: 'absolute',
        borderRadius: 999,
    }
});
