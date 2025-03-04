import { View, StyleSheet, LayoutChangeEvent } from 'react-native';
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import TabBarButton from './TabBarButton';
import { useState } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {

    const [dimensions, setDimensions] = useState({
        width: 20,
        height: 100
    })

    const buttonWidth = dimensions.width / state.routes.length;

    const onTabbarLayout = (e: LayoutChangeEvent) => {
        setDimensions({
            height: e.nativeEvent.layout.height,
            width: e.nativeEvent.layout.width
        })
    }

    const tabPositionX = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                translateX: tabPositionX.value
            }]
        }
    })


    return (
        <View onLayout={onTabbarLayout} style={styles.tabBar}>

            <Animated.View style={
                [{
                    position: 'absolute',
                    backgroundColor: '#723FEB',
                    borderRadius: 30,
                    marginHorizontal: 12,
                    height: dimensions.height - 15,
                    width: buttonWidth - 25

                }, animatedStyle]
            }>

            </Animated.View>

            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {

                    tabPositionX.value = withSpring(buttonWidth * index, { duration: 1500 })

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
                        onPress={onPress}
                        onLongPress={onLongPress}
                        isFocused={isFocused}
                        routeName={route.name}
                        color={isFocused ? '#673ab7' : '#222'}
                        label={label}
                    />
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        position: "absolute",
        bottom: 20,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        backgroundColor: "#fff",
        marginHorizontal: 50,
        paddingVertical: 15,
        borderRadius: 35,
        shadowColor: '#000',
        shadowOffset: {
            width: 20,
            height: 10
        },
        shadowRadius: 50,
        shadowOpacity: 0.5,
        elevation: 2
    },
    tabBarItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    }
})

export default TabBar