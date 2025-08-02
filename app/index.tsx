import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper';
import Lottie from 'lottie-react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '@/components/Loading';

const index = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const checkIsOnBoard = async () => {
            const check = await AsyncStorage.getItem("isOnBoard");
            if (check === 'yes') {
                router.push({
                    pathname: "/registration"
                })
            }
            setLoading(false);
        }
        checkIsOnBoard();
    }, [])

    if (loading) {
        return <Loading />
    }

    const handleDone = async () => {
        await AsyncStorage.setItem("isOnBoard", "yes");
        router.replace({
            pathname: '/registration'
        })
    }

    return (
        <View style={styles.container}>
            <Onboarding
                onDone={handleDone}
                pages={[
                    {
                        backgroundColor: '#9C7FFA',
                        image: (
                            <View>
                                <Lottie
                                    style={styles.lottieImg}
                                    source={require('@/assets/onBoarding/screen-1.json')}
                                    autoPlay
                                    loop
                                />
                            </View>
                        ),
                        title: 'Discover Your Dream Home',
                        subtitle: 'Explore a wide range of properties tailored to your needs.',
                    },
                    {
                        backgroundColor: '#FDEFBE',
                        image: (
                            <View>
                                <Lottie
                                    style={styles.lottieImg}
                                    source={require('@/assets/onBoarding/screen-4.json')}
                                    autoPlay
                                    loop
                                />
                            </View>
                        ),
                        title: 'Seamless Buying & Selling',
                        subtitle: 'Experience a hassle-free property journey with us',
                    },
                    {
                        backgroundColor: '#FF5F42',
                        image: (
                            <View>
                                <Lottie
                                    style={styles.lottieImg}
                                    source={require('@/assets/onBoarding/screen-2.json')}
                                    autoPlay
                                    loop
                                />
                            </View>
                        ),
                        title: 'Trusted & Secure Transactions',
                        subtitle: 'We ensure a smooth and secure process for every real estate transaction.',
                    },
                ]}
            />
        </View>
    )
}

export default index

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    lottieImg: {
        width: 450,
        height: 280
    }
})