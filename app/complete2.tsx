import { TopLayer } from "@/components/TopLayer";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { Camera, User } from "lucide-react-native";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Line1 from "../assets/icons/line1.png";
import { userStore } from "../utils/userStore";
import { AnotherBtn } from "./complete";
import { Btn, styles } from "./index";

export default function Complete2() {
    const route = useRouter();
    const [imageUri, setImageUri] = useState<string | null>(null);

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

    const handleFinish = () => {
        userStore.setUser({ profileImage: imageUri });
        route.push("/scan-qr");
    };

    return (
        <View className="flex-1 bg-white">
            <TopLayer complete title="Complete Profile" another={Line1} />
            <View className="flex-1 mx-6 items-center">
                <Text className="text-center text-3xl mt-12 mb-12" style={styles.title}>Profile Picture</Text>

                <TouchableOpacity onPress={pickImage} className="relative">
                    <View className="w-32 h-32 rounded-full bg-gray-50 border border-gray-100 shadow-sm items-center justify-center overflow-hidden">
                        {imageUri ? (
                            <Image source={{ uri: imageUri }} className="w-full h-full" resizeMode="cover" />
                        ) : (
                            <User size={60} color="#D66A1F" strokeWidth={1.5} />
                        )}
                    </View>
                    <View className="absolute bottom-0 right-0 w-9 h-9 bg-[#D66A1F] rounded-full border-2 border-white items-center justify-center shadow-md">
                        <Camera size={16} color="white" />
                    </View>
                </TouchableOpacity>

                <Text className="text-[#888] text-center mt-12 px-10 leading-6" style={styles.text}>
                    Please upload a clear profile picture. This will help identify you in case of any emergency reports.
                </Text>
            </View>

            <View className="px-6 pb-12 flex flex-row justify-between items-center bg-white pt-4">
                <AnotherBtn text="Back" onPress={() => route.back()} />
                <Btn title="Finish" reduced onPress={handleFinish} />
            </View>
        </View>
    );
}
