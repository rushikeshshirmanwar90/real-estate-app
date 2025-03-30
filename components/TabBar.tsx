import { View, StyleSheet, LayoutChangeEvent } from 'react-native';
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import TabBarButton from './TabBarButton';
import { useState, useEffect } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { User } from '@/types/user';
import { getUserDetails } from '@/lib/user';

interface TabBarProps extends BottomTabBarProps {
    icons: Record<string, (props: any) => JSX.Element>;
}

const TabBar = ({ state, descriptors, navigation, icons }: TabBarProps) => {
    const [userData, setUserData] = useState<User | undefined>(undefined);
    const [filteredRoutes, setFilteredRoutes] = useState(state.routes);
    
    useEffect(() => {
        getUserDetails(setUserData);
    }, []);
    
    // Filter routes based on user type
    useEffect(() => {
        if (userData) {
            if (userData.userType === 'customer') {
                // For customers, filter out the payments tab
                setFilteredRoutes(state.routes.filter(route => route.name !== 'payments'));
            } else {
                // For non-customers, show all tabs
                setFilteredRoutes(state.routes);
            }
        }
    }, [userData, state.routes]);

    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0
    });

    // Calculate button width based on available space and visible routes
    const buttonWidth = dimensions.width / (userData?.userType === 'customer' ? 3 : 4);

    // Calculate center position for each tab button
    const getTabCenterPosition = (index: number) => {
        // If customer, we need to adjust indices for the missing payments tab
        if (userData?.userType === 'customer' && filteredRoutes[index]) {
            const routeName = filteredRoutes[index].name;
            
            // Map the visual index to the correct position
            if (routeName === 'index') return buttonWidth / 2;
            if (routeName === 'explore') return buttonWidth * 1.5;
            if (routeName === 'profile') return buttonWidth * 2.5;
            
            return (buttonWidth * index) + (buttonWidth / 2);
        }
        
        return (buttonWidth * index) + (buttonWidth / 2);
    };

    const onTabbarLayout = (e: LayoutChangeEvent) => {
        setDimensions({
            height: e.nativeEvent.layout.height,
            width: e.nativeEvent.layout.width
        });
    };

    // Animation value for the tab indicator
    const tabPositionX = useSharedValue(0);

    // Set initial position on first render and when active tab changes
    useEffect(() => {
        // Set initial position based on the active tab
        if (dimensions.width > 0) {
            tabPositionX.value = getTabCenterPosition(state.index) - 25; // Adjust for half of indicator width
        }
    }, [dimensions.width, state.index, userData]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                translateX: tabPositionX.value
            }]
        };
    });

    return (
        <View onLayout={onTabbarLayout} style={styles.tabBar}>
            {/* First tab indicator element */}
            <Animated.View style={[
                styles.leftIndicator,
                animatedStyle
            ]} />

            {/* Second tab indicator element */}
            <Animated.View style={[
                styles.rightIndicator,
                animatedStyle
            ]} />

            {filteredRoutes.map((route, index) => {
                // Skip routes that don't have an icon
                if (!icons[route.name]) {
                    return null;
                }

                // Skip the payments tab for customers
                if (userData?.userType === 'customer' && route.name === 'payments') {
                    return null;
                }

                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                // Find the actual index in the state routes array
                const actualIndex = state.routes.findIndex(r => r.key === route.key);
                const isFocused = state.index === actualIndex;

                const onPress = () => {
                    // Animate to the center of the new tab button, adjusting for indicator width
                    tabPositionX.value = withSpring(
                        getTabCenterPosition(index) - 25, // Adjust for half of indicator width
                        { duration: 500 }
                    );

                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TabBarButton
                        key={route.key}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        isFocused={isFocused}
                        routeName={route.name}
                        color={isFocused ? '#673ab7' : '#222'}
                        label={label}
                        icon={icons[route.name]}
                    />
                );
            })}
        </View>
    );
};

export default TabBar;

const styles = StyleSheet.create({
    tabBar: {
        position: "relative",
        width: "100%",
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        backgroundColor: "#fff",
        paddingVertical: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 20,
            height: 10
        },
        shadowRadius: 50,
        shadowOpacity: 0.5,
        elevation: 2,
    },
    leftIndicator: {
        position: 'absolute',
        top: 34,
        width: 25,
        height: 25,
        borderLeftWidth: 4,
        borderBottomWidth: 4,
        borderColor: '#CC5500',
        borderRadius: 5,
        zIndex: 1,
    },
    rightIndicator: {
        position: 'absolute',
        top: 15,
        width: 25,
        height: 25,
        borderRightWidth: 4,
        borderTopWidth: 4,
        borderColor: '#CC5500',
        borderRadius: 5,
        zIndex: 1,
        marginLeft: 18, // Offset from the left indicator
    },
    tabBarItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    }
});