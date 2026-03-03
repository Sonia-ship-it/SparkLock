import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { ArrowLeft, Camera, Check, User } from "lucide-react-native";
import { useRef, useState } from "react";
import { Image, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../utils/themeContext";
import { userStore } from "../utils/userStore";
import { styles } from "./index";

export function InputField({ label, value, onChangeText, keyboardType, inputRef, returnKeyType, onSubmitEditing }:
    { label: string, value: string, onChangeText: (t: string) => void, keyboardType?: any, inputRef?: any, returnKeyType?: any, onSubmitEditing?: () => void }) {
    const [focused, setFocused] = useState(false);
    const { isDarkMode } = useTheme();

    return (
        <View className="mb-6">
            <Text className={`text-sm mb-2 ml-1 ${focused ? "text-[#D66A1F]" : (isDarkMode ? "text-gray-500" : "text-[#888]")}`} style={styles.subtitle}>{label}</Text>
            <View className={`rounded-2xl border-2 transition-all duration-200 ${focused ? "border-[#D66A1F] bg-white shadow-sm" : (isDarkMode ? "border-[#333] bg-[#222]" : "border-gray-100 bg-[#F9F9F9]")}`}>
                <TextInput
                    ref={inputRef}
                    value={value}
                    onChangeText={onChangeText}
                    keyboardType={keyboardType}
                    returnKeyType={returnKeyType}
                    onSubmitEditing={onSubmitEditing}
                    className={`p-4 px-5 text-base ${isDarkMode ? "text-white" : "text-black"}`}
                    style={styles.text}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholderTextColor={isDarkMode ? "#555" : "#CCC"}
                />
            </View>
        </View>
    );
}

export default function EditProfile() {
    const route = useRouter();
    const insets = useSafeAreaInsets();
    const user = userStore.getUser();
    const { isDarkMode } = useTheme();

    const [name, setName] = useState(user.fullName || "");
    const [phone, setPhone] = useState(user.phoneNumber || "");
    const [contact, setContact] = useState(user.emergencyContact || "");
    const [imageUri, setImageUri] = useState<string | null>(user.profileImage || null);

    const phoneRef = useRef<TextInput>(null);
    const contactRef = useRef<TextInput>(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    const handleSave = () => {
        userStore.setUser({
            fullName: name,
            phoneNumber: phone,
            emergencyContact: contact,
            profileImage: imageUri
        });
        route.back();
    };

    return (
        <View className={`flex-1 ${isDarkMode ? "bg-black" : "bg-white"}`} style={{ paddingTop: insets.top }}>
            {/* Top Header Match Dashboard */}
            <View className={`px-6 flex-row justify-between items-center pb-2 z-10 ${isDarkMode ? "bg-black" : "bg-white"}`}>
                <View className="flex-row items-center gap-3">
                    <TouchableOpacity onPress={() => route.back()} className={`w-10 h-10 rounded-full items-center justify-center ${isDarkMode ? "bg-[#1A1A1A]" : "bg-gray-50"}`}>
                        <ArrowLeft size={20} color={isDarkMode ? "#AAA" : "#333"} />
                    </TouchableOpacity>
                    <View>
                        <Text className="text-[#D66A1F] text-2xl" style={styles.title}>SPARKLOCK</Text>
                        <Text className={`${isDarkMode ? "text-gray-500" : "text-[#666]"} text-sm`} style={styles.text}>{user.location}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => route.back()} className={`w-10 h-10 rounded-full border border-[#D66A1F] ${isDarkMode ? "bg-[#333]" : "bg-[#FAEBE4]"} items-center justify-center overflow-hidden`}>
                    {imageUri ? (
                        <Image source={{ uri: imageUri }} className="w-full h-full rounded-full" />
                    ) : (
                        <User size={20} color="#D66A1F" />
                    )}
                </TouchableOpacity>
            </View>
            <View className={`h-[1px] w-full ${isDarkMode ? "bg-[#333]" : "bg-gray-100"}`} />

            <KeyboardAwareScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 20, paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                enableOnAndroid={true}
                extraHeight={Platform.OS === "ios" ? 100 : 120}
                extraScrollHeight={50}
            >
                <Text className={`text-3xl mb-8 ${isDarkMode ? "text-white" : "text-black"}`} style={styles.title}>Edit Profile</Text>

                <View className="items-center mb-8">
                    <TouchableOpacity onPress={pickImage} className="relative">
                        <View className={`w-32 h-32 rounded-full items-center justify-center overflow-hidden border-2 shadow-sm ${isDarkMode ? "bg-[#1A1A1A] border-[#333]" : "bg-gray-50 border-gray-100"}`}>
                            {imageUri ? (
                                <Image source={{ uri: imageUri }} className="w-full h-full" resizeMode="cover" />
                            ) : (
                                <User size={70} color="#D66A1F" strokeWidth={1} />
                            )}
                        </View>
                        <View className="absolute bottom-0 right-0 w-9 h-9 bg-[#D66A1F] rounded-full border-2 border-white items-center justify-center shadow-md">
                            <Camera size={16} color="white" />
                        </View>
                    </TouchableOpacity>
                </View>

                <View className={`rounded-[32px] p-6 border shadow-sm mb-6 ${isDarkMode ? "bg-[#1A1A1A] border-[#333]" : "bg-[#fdfaf8] border-[#FAEBE4]"}`}>
                    <InputField
                        label="Full Display Name"
                        value={name}
                        onChangeText={setName}
                        returnKeyType="next"
                        onSubmitEditing={() => phoneRef.current?.focus()}
                    />
                    <InputField
                        label="Personal Phone Number"
                        inputRef={phoneRef}
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                        returnKeyType="next"
                        onSubmitEditing={() => contactRef.current?.focus()}
                    />
                    <InputField
                        label="Emergency Responder Number"
                        inputRef={contactRef}
                        value={contact}
                        onChangeText={setContact}
                        keyboardType="phone-pad"
                        returnKeyType="done"
                        onSubmitEditing={handleSave}
                    />
                </View>
            </KeyboardAwareScrollView>

            <View className={`px-6 pb-12 pt-4 border-t flex-row items-center justify-between ${isDarkMode ? "bg-black border-[#333]" : "bg-white border-gray-50"}`}>
                <TouchableOpacity
                    onPress={() => route.back()}
                    className={`px-8 py-4 rounded-2xl border ${isDarkMode ? "border-[#444]" : "border-gray-200"}`}
                >
                    <Text className={`${isDarkMode ? "text-gray-400" : "text-[#666]"} text-lg font-medium`} style={styles.subtitle}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleSave}
                    className="bg-[#D66A1F] rounded-2xl p-4 px-10 flex-row items-center justify-center gap-3 shadow-md"
                    style={{ elevation: 4 }}
                >
                    <Check size={20} color="white" />
                    <Text className="text-white text-lg font-bold" style={styles.subtitle}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
