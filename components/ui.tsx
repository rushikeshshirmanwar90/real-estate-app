import React, { ReactNode, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ViewStyle,
    TextStyle,
    TextInputProps,
    TouchableOpacityProps,
    KeyboardTypeOptions,
} from 'react-native';

// Type definitions
type ShadowLevel = 'light' | 'medium' | 'heavy';
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'success';
type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
type ComponentSize = 'small' | 'medium' | 'large';

// Updated Card Component with Press Support
interface CardProps {
    children: ReactNode;
    style?: ViewStyle;
    shadowLevel?: ShadowLevel;
    onPress?: () => void;
    disabled?: boolean;
    activeOpacity?: number;
}

export const Card: React.FC<CardProps> = ({
    children,
    style,
    shadowLevel = 'medium',
    onPress,
    disabled = false,
    activeOpacity = 0.8,
}) => {
    const shadowStyles = {
        light: styles.shadowLight,
        medium: styles.shadowMedium,
        heavy: styles.shadowHeavy,
    };

    const cardStyles: ViewStyle[] = [
        styles.card,
        shadowStyles[shadowLevel],
        disabled && styles.cardDisabled,
        ...(Array.isArray(style) ? style : [style]),
    ].filter(Boolean) as ViewStyle[];

    // If onPress is provided, wrap in TouchableOpacity
    if (onPress) {
        return (
            <TouchableOpacity
                style={cardStyles}
                onPress={onPress}
                disabled={disabled}
                activeOpacity={activeOpacity}
            >
                {children}
            </TouchableOpacity>
        );
    }

    // Otherwise, return regular View
    return (
        <View style={cardStyles}>
            {children}
        </View>
    );
};

// Input Component (unchanged)
interface InputProps extends Omit<TextInputProps, 'style'> {
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    secureTextEntry?: boolean;
    multiline?: boolean;
    numberOfLines?: number;
    keyboardType?: KeyboardTypeOptions;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    style?: TextStyle;
    containerStyle?: ViewStyle;
    label?: string;
    error?: string;
    disabled?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}

export const Input: React.FC<InputProps> = ({
    placeholder,
    value,
    onChangeText,
    secureTextEntry = false,
    multiline = false,
    numberOfLines = 1,
    keyboardType = 'default',
    autoCapitalize = 'sentences',
    style,
    containerStyle,
    label,
    error,
    disabled = false,
    leftIcon,
    rightIcon,
    ...props
}) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);

    return (
        <View style={[styles.inputContainer, containerStyle]}>
            {label && <Text style={styles.inputLabel}>{label}</Text>}
            <View style={[
                styles.inputWrapper,
                isFocused && styles.inputWrapperFocused,
                error && styles.inputWrapperError,
                disabled && styles.inputWrapperDisabled,
            ]}>
                {leftIcon && <View style={styles.inputIcon}>{leftIcon}</View>}
                <TextInput
                    style={[
                        styles.input,
                        multiline && styles.inputMultiline,
                        leftIcon ? styles.inputWithLeftIcon : null,
                        rightIcon ? styles.inputWithRightIcon : null,
                        style,
                    ]}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    editable={!disabled}
                    placeholderTextColor="#999"
                    {...props}
                />
                {rightIcon && <View style={styles.inputIcon}>{rightIcon}</View>}
            </View>
            {error && <Text style={styles.inputError}>{error}</Text>}
        </View>
    );
};

// Button Component (unchanged)
interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
    title?: string;
    onPress?: () => void;
    variant?: ButtonVariant;
    size?: ComponentSize;
    disabled?: boolean;
    loading?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    children?: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
    style,
    textStyle,
    leftIcon,
    rightIcon,
    children,
    ...props
}) => {
    const buttonStyles: ViewStyle[] = [
        styles.button,
        styles[`button${variant.charAt(0).toUpperCase() + variant.slice(1)}` as keyof typeof styles] as ViewStyle,
        styles[`button${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof styles] as ViewStyle,
        disabled && styles.buttonDisabled,
        style,
    ].filter(Boolean) as ViewStyle[];

    const textStyles: TextStyle[] = [
        styles.buttonText,
        styles[`buttonText${variant.charAt(0).toUpperCase() + variant.slice(1)}` as keyof typeof styles] as TextStyle,
        styles[`buttonText${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof styles] as TextStyle,
        disabled && styles.buttonTextDisabled,
        textStyle,
    ].filter(Boolean) as TextStyle[];

    return (
        <TouchableOpacity
            style={buttonStyles}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
            {...props}
        >
            {leftIcon && <View style={styles.buttonIcon}>{leftIcon}</View>}
            {children ? children : <Text style={textStyles}>{loading ? 'Loading...' : title}</Text>}
            {rightIcon && <View style={styles.buttonIcon}>{rightIcon}</View>}
        </TouchableOpacity>
    );
};

// Badge Component (unchanged)
interface BadgeProps {
    text?: string;
    variant?: BadgeVariant;
    size?: ComponentSize;
    style?: ViewStyle;
    textStyle?: TextStyle;
    children?: ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
    text,
    variant = 'default',
    size = 'medium',
    style,
    textStyle,
    children,
}) => {
    const badgeStyles: ViewStyle[] = [
        styles.badge,
        styles[`badge${variant.charAt(0).toUpperCase() + variant.slice(1)}` as keyof typeof styles] as ViewStyle,
        styles[`badge${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof styles] as ViewStyle,
        style,
    ].filter(Boolean) as ViewStyle[];

    const badgeTextStyles: TextStyle[] = [
        styles.badgeText,
        styles[`badgeText${variant.charAt(0).toUpperCase() + variant.slice(1)}` as keyof typeof styles] as TextStyle,
        styles[`badgeText${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof styles] as TextStyle,
        textStyle,
    ].filter(Boolean) as TextStyle[];

    return (
        <View style={badgeStyles}>
            <Text style={badgeTextStyles}>
                {children || text}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    // Card Styles
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginVertical: 4,
    },
    cardDisabled: {
        opacity: 0.6,
    },
    shadowLight: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    shadowMedium: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4,
    },
    shadowHeavy: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 8,
    },

    // Input Styles
    inputContainer: {
        marginVertical: 8,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 6,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    inputWrapperFocused: {
        borderColor: '#007AFF',
        borderWidth: 2,
    },
    inputWrapperError: {
        borderColor: '#FF3B30',
    },
    inputWrapperDisabled: {
        backgroundColor: '#f5f5f5',
        borderColor: '#e0e0e0',
    },
    input: {
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 12,
        fontSize: 16,
        color: '#333',
    },
    inputMultiline: {
        minHeight: 80,
        textAlignVertical: 'top',
    },
    inputWithLeftIcon: {
        paddingLeft: 8,
    },
    inputWithRightIcon: {
        paddingRight: 8,
    },
    inputIcon: {
        paddingHorizontal: 8,
    },
    inputError: {
        color: '#FF3B30',
        fontSize: 14,
        marginTop: 4,
    },

    // Button Styles
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    buttonPrimary: {
        backgroundColor: '#007AFF',
    },
    buttonSecondary: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#007AFF',
    },
    buttonOutline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#007AFF',
    },
    buttonDanger: {
        backgroundColor: '#FF3B30',
    },
    buttonSuccess: {
        backgroundColor: '#34C759',
    },
    buttonSmall: {
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    buttonMedium: {
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    buttonLarge: {
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    buttonDisabled: {
        backgroundColor: '#e0e0e0',
        borderColor: '#e0e0e0',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
    },
    buttonTextPrimary: {
        color: '#fff',
    },
    buttonTextSecondary: {
        color: '#007AFF',
    },
    buttonTextOutline: {
        color: '#007AFF',
    },
    buttonTextDanger: {
        color: '#fff',
    },
    buttonTextSuccess: {
        color: '#fff',
    },
    buttonTextSmall: {
        fontSize: 14,
    },
    buttonTextMedium: {
        fontSize: 16,
    },
    buttonTextLarge: {
        fontSize: 18,
    },
    buttonTextDisabled: {
        color: '#999',
    },
    buttonIcon: {
        marginHorizontal: 4,
    },

    // Badge Styles
    badge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    badgeDefault: {
        backgroundColor: '#e0e0e0',
    },
    badgePrimary: {
        backgroundColor: '#007AFF',
    },
    badgeSuccess: {
        backgroundColor: '#34C759',
    },
    badgeWarning: {
        backgroundColor: '#FF9500',
    },
    badgeDanger: {
        backgroundColor: '#FF3B30',
    },
    badgeInfo: {
        backgroundColor: '#5AC8FA',
    },
    badgeSmall: {
        paddingHorizontal: 6,
        paddingVertical: 2,
    },
    badgeMedium: {
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    badgeLarge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: '600',
    },
    badgeTextDefault: {
        color: '#333',
    },
    badgeTextPrimary: {
        color: '#fff',
    },
    badgeTextSuccess: {
        color: '#fff',
    },
    badgeTextWarning: {
        color: '#fff',
    },
    badgeTextDanger: {
        color: '#fff',
    },
    badgeTextInfo: {
        color: '#fff',
    },
    badgeTextSmall: {
        fontSize: 10,
    },
    badgeTextMedium: {
        fontSize: 12,
    },
    badgeTextLarge: {
        fontSize: 14,
    },

    // Additional styles for your use case
    updateTypeCard: {
        margin: 8,
        backgroundColor: '#fff',
    },
    basicUpdateCard: {
        borderLeftWidth: 4,
        borderLeftColor: '#10B981',
    },
    updateTypeContent: {
        alignItems: 'center',
        padding: 16,
    },
    updateTypeIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    updateTypeIconText: {
        fontSize: 24,
    },
    updateTypeTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
        textAlign: 'center',
    },
    updateTypeDescription: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 16,
        lineHeight: 20,
    },
    addUpdate: {
        borderWidth: 1,
        borderColor: '#10B981',
        borderRadius: 6,
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
    },
    addUpdateText: {
        fontSize: 14,
        fontWeight: '600',
    },
});

// Updated Example Usage Component
export const ExampleUsage: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');

    const validateEmail = (text: string): void => {
        setEmail(text);
        if (text && !text.includes('@')) {
            setEmailError('Please enter a valid email');
        } else {
            setEmailError('');
        }
    };

    const handleButtonPress = (buttonType: string): void => {
        console.log(`${buttonType} button pressed`);
    };

    const onBasicUpdate = (): void => {
        console.log('Basic update card pressed');
    };

    return (
        <View style={{ padding: 16, backgroundColor: '#f5f5f5' }}>
            {/* Your specific use case */}
            <Card style={[styles.updateTypeCard, styles.basicUpdateCard]} onPress={onBasicUpdate}>
                <View style={styles.updateTypeContent}>
                    <View style={[styles.updateTypeIcon, { backgroundColor: '#10B981' }]}>
                        <Text style={styles.updateTypeIconText}>📝</Text>
                    </View>
                    <Text style={styles.updateTypeTitle}>Basic Work Update</Text>
                    <Text style={styles.updateTypeDescription}>
                        General project progress, milestones, and overall status updates
                    </Text>
                    <View style={styles.addUpdate}>
                        <Text style={[styles.addUpdateText, { color: '#10B981' }]}>
                            ➕ Add Update
                        </Text>
                    </View>
                </View>
            </Card>

            {/* Regular Card Examples */}
            <Card>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
                    Welcome Card
                </Text>
                <Text>This is a basic card with default shadow.</Text>
            </Card>

            <Card shadowLevel="heavy" style={{ backgroundColor: '#f0f8ff' }} onPress={() => console.log('Card pressed')}>
                <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 4 }}>
                    Pressable Card
                </Text>
                <Text>This card can be pressed!</Text>
            </Card>

            {/* Input Examples */}
            <Input
                label="Basic Input"
                placeholder="Enter your name"
                value={inputValue}
                onChangeText={setInputValue}
            />

            <Input
                label="Email Input"
                placeholder="Enter your email"
                value={email}
                onChangeText={validateEmail}
                keyboardType="email-address"
                error={emailError}
            />

            {/* Button Examples */}
            <View style={{ flexDirection: 'row', gap: 8, marginVertical: 8 }}>
                <Button
                    title="Primary"
                    variant="primary"
                    onPress={() => handleButtonPress('Primary')}
                    style={{ flex: 1 }}
                />
                <Button
                    title="Secondary"
                    variant="secondary"
                    onPress={() => handleButtonPress('Secondary')}
                    style={{ flex: 1 }}
                />
            </View>

            {/* Badge Examples */}
            <View style={{ flexDirection: 'row', gap: 8, marginVertical: 16, flexWrap: 'wrap' }}>
                <Badge text="Default" variant="default" />
                <Badge text="Primary" variant="primary" />
                <Badge text="Success" variant="success" />
            </View>
        </View>
    );
};