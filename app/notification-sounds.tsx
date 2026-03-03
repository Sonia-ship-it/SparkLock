import { Audio, AVPlaybackStatus } from "expo-av";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { ArrowLeft, Check, Play, Volume2 } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../utils/themeContext";
import { userStore } from "../utils/userStore";
import { styles } from "./index";

const TONES = [
    {
        id: '1',
        name: 'Pulsar',
        description: 'Deep, rhythmic alert for clear detection.',
        type: 'Critical',
        url: 'https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/advertising.mp3'
    },
    {
        id: '2',
        name: 'Nexus',
        description: 'Sharp, modern tone for system updates.',
        type: 'Standard',
        url: 'https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/pew.mp3'
    },
    {
        id: '3',
        name: 'Glitch',
        description: 'Rapid, tech-inspired notification.',
        type: 'Standard',
        url: 'https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/soft_bell.mp3'
    },
    {
        id: '4',
        name: 'Beacon',
        description: 'Balanced and persistent emergency sound.',
        type: 'Critical',
        url: 'https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/success.mp3'
    },
    {
        id: '5',
        name: 'Radiant',
        description: 'Soft, ambient notification for status checks.',
        type: 'Status',
        url: 'https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/water_drop.mp3'
    },
];

function SoundWave({ isPlaying }: { isPlaying: boolean }) {
    const scale = useSharedValue(1);

    useEffect(() => {
        if (isPlaying) {
            scale.value = withRepeat(
                withSequence(
                    withTiming(1.6, { duration: 400 }),
                    withTiming(1, { duration: 400 })
                ),
                -1
            );
        } else {
            scale.value = withTiming(1);
        }
    }, [isPlaying]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: isPlaying ? 0.35 : 0,
    }));

    return (
        <Animated.View
            style={[{
                position: 'absolute',
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: '#D66A1F',
            }, animatedStyle]}
        />
    );
}

export default function NotificationSoundsScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { isDarkMode } = useTheme();
    const user = userStore.getUser();
    const [selectedTone, setSelectedTone] = useState('1');
    const [playingTone, setPlayingTone] = useState<string | null>(null);
    const soundRef = useRef<Audio.Sound | null>(null);

    useEffect(() => {
        return () => {
            if (soundRef.current) {
                soundRef.current.unloadAsync();
            }
        };
    }, []);

    const handlePlayTone = async (id: string, type: string, url: string) => {
        // Stop and unload any currently playing sound
        if (soundRef.current) {
            try {
                await soundRef.current.stopAsync();
                await soundRef.current.unloadAsync();
            } catch (error) {
                // Ignore errors
            }
            soundRef.current = null;
        }

        setPlayingTone(id);

        try {
            // Load and play the new sound using Audio
            const { sound } = await Audio.Sound.createAsync(
                { uri: url },
                { shouldPlay: true }
            );
            soundRef.current = sound;

            sound.setOnPlaybackStatusUpdate((status: AVPlaybackStatus) => {
                if (status.isLoaded && status.didJustFinish) {
                    setPlayingTone(null);
                }
            });

            // Parallel Haptic feedback
            if (type === 'Critical') {
                await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
                setTimeout(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error), 500);
            } else if (type === 'Status') {
                await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            } else {
                await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            }
        } catch (error) {
            console.error("Error playing sound:", error);
            setPlayingTone(null);
        }
    };

    return (
        <View className={`flex-1 ${isDarkMode ? "bg-black" : "bg-white"}`} style={{ paddingTop: insets.top }}>
            {/* Header */}
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
                <View className={`w-10 h-10 rounded-full border border-[#D66A1F] ${isDarkMode ? "bg-[#333]" : "bg-[#FAEBE4]"} items-center justify-center overflow-hidden`}>
                    <Volume2 size={20} color="#D66A1F" />
                </View>
            </View>
            <View className={`h-[1px] w-full ${isDarkMode ? "bg-[#333]" : "bg-gray-100"}`} />

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                <View className="px-6 py-8">
                    <Text className={`text-3xl ${isDarkMode ? "text-white" : "text-black"}`} style={styles.title}>Notification Tones</Text>
                    <Text className={`${isDarkMode ? "text-gray-500" : "text-[#888]"} text-base mt-2`} style={styles.text}>
                        Choose the sound you want to hear when SparkLock sends you a safety alert.
                    </Text>
                </View>

                <View className="px-6">
                    <View className={`rounded-[32px] border ${isDarkMode ? "bg-[#0D0D0D] border-[#333]" : "bg-white border-gray-100"} shadow-sm overflow-hidden`}>
                        {TONES.map((tone, index) => (
                            <TouchableOpacity
                                key={tone.id}
                                onPress={() => setSelectedTone(tone.id)}
                                className={`flex-row items-center p-6 border-b ${isDarkMode ? "border-[#333]" : "border-gray-50"} ${selectedTone === tone.id ? (isDarkMode ? "bg-[#1A1A1A]" : "bg-[#FAEBE4]/30") : ""}`}
                            >
                                <View className="flex-1">
                                    <View className="flex-row items-center gap-2 mb-1">
                                        <Text className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-[#333]"}`} style={styles.subtitle}>{tone.name}</Text>
                                        <View className={`px-2 py-0.5 rounded-md ${tone.type === 'Critical' ? 'bg-red-100' : (tone.type === 'Status' ? 'bg-green-100' : 'bg-blue-100')}`}>
                                            <Text className={`text-[10px] font-bold ${tone.type === 'Critical' ? 'text-red-600' : (tone.type === 'Status' ? 'text-green-600' : 'text-blue-600')}`} style={styles.subtitle}>{tone.type}</Text>
                                        </View>
                                    </View>
                                    <Text className={`${isDarkMode ? "text-gray-500" : "text-[#888]"} text-xs`} style={styles.text}>{tone.description}</Text>
                                </View>

                                <View className="flex-row items-center gap-4">
                                    <TouchableOpacity
                                        onPress={() => handlePlayTone(tone.id, tone.type, tone.url)}
                                        className={`w-10 h-10 rounded-full items-center justify-center relative`}
                                    >
                                        <SoundWave isPlaying={playingTone === tone.id} />
                                        <View className={`w-10 h-10 rounded-full items-center justify-center z-10 ${playingTone === tone.id ? "bg-[#D66A1F]" : (isDarkMode ? "bg-[#222]" : "bg-gray-100")}`}>
                                            <Play size={18} color={playingTone === tone.id ? "white" : (isDarkMode ? "#AAA" : "#666")} fill={playingTone === tone.id ? "white" : "none"} />
                                        </View>
                                    </TouchableOpacity>

                                    <View className={`w-6 h-6 rounded-full border-2 items-center justify-center ${selectedTone === tone.id ? "border-[#D66A1F] bg-[#D66A1F]" : (isDarkMode ? "border-[#444]" : "border-gray-200")}`}>
                                        {selectedTone === tone.id && <Check size={14} color="white" strokeWidth={3} />}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View className="px-10 mt-12 mb-8">
                    <View className={`p-6 rounded-[24px] ${isDarkMode ? "bg-[#1A1A1A]" : "bg-[#FDF6F2]"} border ${isDarkMode ? "border-[#333]" : "border-[#FAEBE4]"} items-center`}>
                        <Volume2 size={24} color="#D66A1F" className="mb-3" />
                        <Text className={`text-sm text-center ${isDarkMode ? "text-gray-300" : "text-[#333]"} font-bold mb-1`} style={styles.subtitle}>Auditory Safety</Text>
                        <Text className={`${isDarkMode ? "text-gray-500" : "text-[#888]"} text-xs text-center leading-5`} style={styles.text}>
                            Assigning unique tones to critical alerts helps you identify dangers instantly without even looking at your phone.
                        </Text>
                    </View>
                </View>
            </ScrollView>

            <View className={`px-6 pb-12 pt-6 border-t ${isDarkMode ? "bg-black border-[#333]" : "bg-white border-gray-50"}`}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="bg-[#D66A1F] rounded-2xl p-5 items-center justify-center shadow-lg"
                    style={{ elevation: 5 }}
                >
                    <Text className="text-white text-lg font-bold uppercase tracking-wider" style={styles.subtitle}>Save Selection</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
