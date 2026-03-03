export interface UserData {
    fullName: string;
    phoneNumber: string;
    location: string;
    emergencyContact: string;
    profileImage: string | null;
}

const DEFAULT_USER: UserData = {
    fullName: "Building Owner",
    phoneNumber: "+250 123 456 789",
    location: "Kigali, Rwanda",
    emergencyContact: "999",
    profileImage: null,
};

let currentUser: UserData = { ...DEFAULT_USER };

export const userStore = {
    getUser: () => currentUser,
    setUser: (data: Partial<UserData>) => {
        currentUser = { ...currentUser, ...data };
    },
    resetUser: () => {
        currentUser = { ...DEFAULT_USER };
    },
};
