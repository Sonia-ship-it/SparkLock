import { TopLayer } from "@/components/TopLayer";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, TextInput, View } from "react-native";
import Key from "../assets/icons/key.png";
import { Btn, styles } from "./index";

export function InputText({ text }: { text: string }) {
    const [focused, setFocused] = useState(false)
    return (
        <TextInput
            style={styles.borgray}
            placeholder={text}
            className={`rounded-lg border p-3 px-4 ${focused ? "border-[#9F9F9F]" : "border-[#9F9F9F]"} `}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        />
    )
}
export default function OTP() {
    const route = useRouter();
    const [code, setCode] = useState("");
    const [error, setError] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30);

    useEffect(() => {
        if (timeLeft <= 0) return;
        const interval = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleResend = () => {
        if (timeLeft === 0) {
            setTimeLeft(30);
            // logic for resending OTP here
        }
    };

    const verifyOtp = () => {
        if (code === "1234") {
            route.push("/success");
        } else {
            setError(true);
            alert("Incorrect OTP. Please use '1234' for testing.");
        }
    };

    const renderDigit = (index: number) => {
        const digit = code[index] || "";
        return (
            <View
                key={index}
                className={`w-14 h-14 rounded-xl border-2 items-center justify-center bg-white ${error ? "border-red-500" : digit ? "border-[#D66A1F]" : "border-gray-200"
                    }`}
            >
                <Text className="text-2xl font-bold text-[#333]" style={styles.title}>{digit}</Text>
            </View>
        );
    };

    return (
        <View className="flex-1 bg-white">
            <TopLayer title="OTP Verification" big more="Enter one time password that we have sent to your phone number." />
            <View className="m-6 gap-6 ">
                <View className="flex items-center justify-center ">
                    <Image source={Key} className="w-48 h-48" />
                </View>

                <View className="relative items-center">
                    {/* Hidden Actual Input */}
                    <TextInput
                        className="absolute w-full h-full opacity-0 z-10"
                        keyboardType="number-pad"
                        maxLength={4}
                        value={code}
                        onChangeText={(text) => {
                            setCode(text);
                            setError(false);
                        }}
                        autoFocus
                    />

                    {/* Visual Boxes */}
                    <View className="flex flex-row items-center justify-center gap-4">
                        {[0, 1, 2, 3].map(renderDigit)}
                    </View>
                </View>

                <View>
                    <Text style={styles.text} className="text-lg text-[#464646FF] text-center">
                        can't get code ? &nbsp;&nbsp;
                        <Text
                            onPress={handleResend}
                            style={[styles.text, { opacity: timeLeft === 0 ? 1 : 0.5 }]}
                            className="underline"
                        >
                            Resend Now
                        </Text>
                        <Text className="text-[#D66A1F] ml-2" style={styles.text}> {formatTime(timeLeft)}</Text>
                    </Text>
                </View>

                <View className="flex justify-center items-center mt-4">
                    <Btn title="Verify OTP" onPress={verifyOtp} />
                </View>
            </View>
        </View>
    )
}
