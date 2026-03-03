import { Tabs } from "expo-router";
import { BarChart2, Cpu, FileUp, Home, Settings } from "lucide-react-native";
import React, { useEffect, useMemo } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from "react-native-reanimated";
import Svg, { Defs, G, Mask, Path, Rect } from "react-native-svg";

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HEIGHT = 90; // Optimized height for the "down bg"
const CIRCLE_SIZE = 64;
const PRIMARY_COLOR = "#D66A1F"; // Updated orange color as requested

const AnimatedG = Animated.createAnimatedComponent(G);

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
    const routesToDisplay = state.routes.slice(0, 5);
    const tabWidth = SCREEN_WIDTH / 5;
    const activeIndex = state.index < 5 ? state.index : 0;

    const translateX = useSharedValue(activeIndex * tabWidth);

    useEffect(() => {
        translateX.value = withTiming(activeIndex * tabWidth, {
            duration: 300,
        });
    }, [activeIndex]);

    const holePath = useMemo(() => {
        const center = tabWidth / 2;
        const w = 48; // Width factor for U-shape
        const h = 42; // Deep U-shape depth

        // Refined U-shaped path using Cubic Beziers for steep entry and smooth bottom
        return `
            M ${center - w} 0 
            C ${center - w * 0.7} 0, ${center - w * 0.6} ${h}, ${center} ${h} 
            S ${center + w * 0.7} 0, ${center + w} 0 
            L ${center + w} 0
            Z
        `;
    }, [tabWidth]);

    const animatedNotchStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    const animatedFabStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    return (
        <View style={navStyles.container} pointerEvents="box-none">
            {/* 1. THE BAR with dynamic sliding U-Notch */}
            <View style={navStyles.notchContainer} pointerEvents="none">
                {/* Background Layer: The Orange Slab */}
                <Svg width={SCREEN_WIDTH} height={500} style={{ backgroundColor: 'transparent' }}>
                    <Defs>
                        <Mask id="notchMask">
                            {/* Entire bar area is visible (white) */}
                            <Rect x="0" y="0" width={SCREEN_WIDTH} height={500} fill="white" />
                            {/* The hollow cutout (black means transparent in mask) */}
                            <AnimatedG style={animatedNotchStyle}>
                                <Path d={holePath} fill="black" />
                            </AnimatedG>
                        </Mask>
                    </Defs>
                    {/* The orange bar slab */}
                    <Rect
                        x="0"
                        y="0"
                        width={SCREEN_WIDTH}
                        height={500}
                        fill={PRIMARY_COLOR}
                        mask="url(#notchMask)"
                        rx={24}
                        ry={24}
                    />
                </Svg>
            </View>

            {/* 2. THE FLOATING WHITE FAB (The spotlight) */}
            <Animated.View style={[navStyles.fabWrapper, animatedFabStyle, { width: tabWidth }]} pointerEvents="none">
                <View style={navStyles.whiteCircle} />
            </Animated.View>

            {/* 3. INTERACTION LAYER */}
            <View style={navStyles.iconsContainer} pointerEvents="box-none">
                {routesToDisplay.map((route: any, index: number) => {
                    const isFocused = activeIndex === index;

                    const onPress = () => {
                        const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    const animatedIconStyle = useAnimatedStyle(() => ({
                        transform: [{ translateY: withTiming(isFocused ? -45 : 0, { duration: 250 }) }],
                    }));

                    let Icon = Home;
                    if (route.name === 'monitor') Icon = BarChart2;
                    if (route.name === 'settings') Icon = Settings;
                    if (route.name === 'chip') Icon = Cpu;
                    if (route.name === 'docs') Icon = FileUp;

                    return (
                        <TouchableOpacity
                            key={index}
                            activeOpacity={0.7}
                            onPress={onPress}
                            style={navStyles.tabItem}
                            hitSlop={{ top: 20, bottom: 20, left: 10, right: 10 }}
                        >
                            <Animated.View style={animatedIconStyle}>
                                <Icon
                                    color={isFocused ? PRIMARY_COLOR : "#FFFFFF"}
                                    size={28}
                                    strokeWidth={isFocused ? 3 : 2.5}
                                />
                            </Animated.View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

export default function TabLayout() {
    return (
        <Tabs tabBar={(props) => <CustomTabBar {...props} />} screenOptions={{ headerShown: false }}>
            <Tabs.Screen name="index" options={{ title: "Home" }} />
            <Tabs.Screen name="monitor" options={{ title: "Monitor" }} />
            <Tabs.Screen name="settings" options={{ title: "Settings" }} />
            <Tabs.Screen name="chip" options={{ title: "CPU" }} />
            <Tabs.Screen name="docs" options={{ title: "Docs" }} />
            <Tabs.Screen name="profile" options={{ href: null }} />
        </Tabs>
    );
}

const navStyles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: HEIGHT,
        backgroundColor: 'transparent',
    },
    notchContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 500, // Overflowing to handle safe area
    },
    fabWrapper: {
        position: 'absolute',
        top: -45, // Raised for that premium "hollow" reveal
        alignItems: 'center',
        justifyContent: 'center',
    },
    whiteCircle: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2,
        backgroundColor: 'white',
        // Enhanced shadow to make it "outstand"
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 12,
        // Subtle border to help it pop
        borderWidth: 1,
        borderColor: 'rgba(216, 89, 27, 0.1)',
    },
    iconsContainer: {
        flexDirection: 'row',
        height: HEIGHT,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        paddingBottom: 15, // Push icons up slightly for thicker "down bg"
    }
});
