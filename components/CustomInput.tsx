import { Eye, EyeOff } from "lucide-react-native";
import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../app/index";

interface CustomInputProps {
    placeholder: string;
    value?: string;
    onChangeText?: (text: string) => void;
    secureTextEntry?: boolean;
    keyboardType?: "default" | "number-pad" | "email-address" | "phone-pad";
}

export function CustomInput({ placeholder, value, onChangeText, secureTextEntry, keyboardType = "default" }: CustomInputProps) {
    const [focused, setFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const isPasswordField = secureTextEntry;

    return (
        <View className="w-full">
            <View
                className={`flex-row items-center rounded-xl border-2 bg-white px-4 h-[50px] ${focused ? "border-[#D66A1F]" : "border-[#F0F0F0]"
                    }`}
                style={{ shadowColor: focused ? "#D66A1F" : "#000", shadowOpacity: focused ? 0.1 : 0.05, shadowRadius: 10, elevation: focused ? 4 : 2 }}
            >
                <TextInput
                    style={[styles.text, { flex: 1, fontSize: 16, color: "#333" }]}
                    placeholder={placeholder}
                    placeholderTextColor="#A0A0A0"
                    secureTextEntry={isPasswordField && !isPasswordVisible}
                    value={value}
                    onChangeText={onChangeText}
                    keyboardType={keyboardType}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                />

                {isPasswordField && (
                    <TouchableOpacity
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                        className="ml-2 p-1"
                    >
                        {isPasswordVisible ? (
                            <EyeOff size={20} color="#D66A1F" />
                        ) : (
                            <Eye size={20} color="#A0A0A0" />
                        )}
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}
