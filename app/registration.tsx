import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { toast } from 'sonner-native';
import Loading from '@/components/Loading';
import { User2 } from '@/types/user';
import { clientId } from '@/client';
import { addUser } from '@/func/user';

type Step = 'personalInfo' | 'otp' | 'password';

export default function RegistrationScreen() {
    const router = useRouter();

    const [mountLoading, setMountLoading] = useState<boolean>(true);
    const [currentStep, setCurrentStep] = useState<Step>('personalInfo');

    // Personal info state
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    // Password state
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const checkLogin = async () => {
            const res = await AsyncStorage.getItem("user");

            if (res) {
                router.push({
                    pathname: "/(tabs)"
                });
            }
            setMountLoading(false);
        };
        checkLogin();
    }, []);

    if (mountLoading) {
        return <Loading />
    }

    const handlePersonalInfoSubmit = async () => {

        setLoading(true);


        if (!firstName.trim()) {
            toast.error('Please enter your first name');
            return;
        }

        if (!lastName.trim()) {
            toast.error('Please enter your last name');
            return;
        }

        if (!email.trim() || !email.includes('@')) {
            toast.error('Please enter a valid email address');
            return;
        }

        if (!phoneNumber.trim() || phoneNumber.length < 10) {
            toast.error('Please enter a valid phone number');
            return;
        }


        setLoading(false);

        setCurrentStep("password");

    };

    const handleRegister = async () => {
        setLoading(true);

        if (!password.trim() || password.length < 8) {
            toast.error('Password must be at least 8 characters long');
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        const body: User2 = {
            clientId: clientId,
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password,
            phoneNumber: phoneNumber,
            userType: "customer"
        }

        try {

            const res = await addUser(body);
            toast.success("user registered successfully");
            const jsonUser = JSON.stringify(res);
            await AsyncStorage.setItem("user", jsonUser);
            router.replace('/(tabs)');

        } catch (error) {
            toast.error("can't to register the user");
        } finally {
            setLoading(true);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 'personalInfo':
                return (
                    <>
                        <Text style={styles.welcomeText}>Create Account</Text>
                        <Text style={styles.stepTitle}>Personal Information</Text>
                        <Text style={styles.stepDescription}>
                            Join Deshmukh Builders! Tell us a bit about yourself to get started.
                        </Text>

                        {/* First Name */}
                        <View style={styles.inputContainer}>
                            <FontAwesome name="user" size={18} color="#666" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="First Name"
                                value={firstName}
                                onChangeText={setFirstName}
                                autoCapitalize="words"
                            />
                        </View>

                        {/* Last Name */}
                        <View style={styles.inputContainer}>
                            <FontAwesome name="user" size={18} color="#666" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Last Name"
                                value={lastName}
                                onChangeText={setLastName}
                                autoCapitalize="words"
                            />
                        </View>

                        {/* Email */}
                        <View style={styles.inputContainer}>
                            <MaterialIcons name="email" size={20} color="#666" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Email address"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoComplete="email"
                            />
                        </View>

                        {/* Phone Number */}
                        <View style={styles.inputContainer}>
                            <FontAwesome name="phone" size={20} color="#666" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Phone Number"
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                                keyboardType="phone-pad"
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={handlePersonalInfoSubmit}
                            disabled={loading}
                        >
                            <LinearGradient
                                colors={['#3b82f6', '#4f46e5']}
                                style={styles.buttonGradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            >
                                {loading ? (
                                    <ActivityIndicator color="white" />
                                ) : (
                                    <Text style={styles.buttonText}>Next</Text>
                                )}
                            </LinearGradient>
                        </TouchableOpacity>

                        <View style={styles.signupContainer}>
                            <Text style={styles.signupText}>Already have an account? </Text>
                            <TouchableOpacity onPress={() => router.push('/login')}>
                                <Text style={styles.signupLink}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                );

            case 'password':
                return (
                    <>
                        <Text style={styles.welcomeText}>Almost Done</Text>
                        <Text style={styles.stepTitle}>Create Password</Text>
                        <Text style={styles.stepDescription}>
                            Create a strong password for your account
                        </Text>

                        {/* Password */}
                        <View style={styles.inputContainer}>
                            <MaterialIcons name="lock" size={20} color="#666" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Create password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                autoCapitalize="none"
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.visibilityIcon}>
                                <Ionicons name={showPassword ? "eye-off" : "eye"} size={22} color="#666" />
                            </TouchableOpacity>
                        </View>

                        {/* Confirm Password */}
                        <View style={styles.inputContainer}>
                            <MaterialIcons name="lock" size={20} color="#666" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry={!showConfirmPassword}
                                autoCapitalize="none"
                            />
                            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.visibilityIcon}>
                                <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={22} color="#666" />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleRegister}
                            disabled={loading}
                        >
                            <LinearGradient
                                colors={['#3b82f6', '#4f46e5']}
                                style={styles.buttonGradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            >
                                {loading ? (
                                    <ActivityIndicator color="white" />
                                ) : (
                                    <Text style={styles.buttonText}>Register</Text>
                                )}
                            </LinearGradient>
                        </TouchableOpacity>
                    </>
                );
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <StatusBar style="dark" />
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.keyboardAvoidingView}
                >
                    <View style={styles.content}>
                        <View style={styles.formContainer}>
                            {renderStep()}
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 32,
    },
    logoContainer: {
        marginBottom: 24,
    },
    logoBackground: {
        width: 72,
        height: 72,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    illustration: {
        width: 220,
        height: 180,
    },
    illustrationImage: {
        width: 220,
        height: 180,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#666',
        marginTop: 8,
        textTransform: 'uppercase',
    },
    formContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 5,
    },
    welcomeText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#4f46e5',
        marginBottom: 16,
        textAlign: 'center',
    },
    stepTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    stepDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 24,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f7f9fc',
        borderWidth: 1,
        borderColor: '#e6e8eb',
        borderRadius: 12,
        marginBottom: 16,
        padding: 4,
    },
    inputIcon: {
        padding: 10,
    },
    visibilityIcon: {
        padding: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 12,
        paddingRight: 12,
        fontSize: 16,
        color: '#333',
    },
    button: {
        borderRadius: 12,
        overflow: 'hidden',
        marginTop: 8,
        shadowColor: '#4f46e5',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    buttonGradient: {
        paddingVertical: 16,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#3b82f6',
        borderRadius: 12,
        paddingVertical: 15,
        marginTop: 16,
    },
    secondaryButtonText: {
        color: '#3b82f6',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 24,
    },
    signupText: {
        color: '#666',
    },
    signupLink: {
        color: '#4f46e5',
        fontWeight: 'bold',
    },
});