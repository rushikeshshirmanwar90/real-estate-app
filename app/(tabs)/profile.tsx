import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Alert, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCameraPermissions } from 'expo-camera';
import axios from 'axios';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ContactInfo from '@/components/profile/ContactInfo';
import QRButtons from '@/components/profile/QRButton';
import PropertiesList from '@/components/profile/PropertiesList';
import LogoutButton from '@/components/profile/LogoutButton';
import QRCodeModal from '@/components/profile/QRCodeModel';
import QRScannerModal from '@/components/profile/QRScannerModel';
import ScannedDataModal from '@/components/profile/ScannedDataModel';
import RefreshButton from '@/components/Refersh';
import { User, CustomerDetails } from '@/types/user';
import { Project, Building, ScannedData } from '@/types/types';
import { getUserDetails } from '@/lib/user';
import { domain } from '@/lib/domain';
import { scaleFont } from '@/utils/scaling';
import { FlatInfo } from '@/types/profile';
import { clientId } from '@/client';

const UserProfile: React.FC = () => {
    const router = useRouter();
    const [showQR, setShowQR] = useState<boolean>(false);
    const [cameraPermission, requestCameraPermission] = useCameraPermissions();
    const [showScannedData, setShowScannedData] = useState<boolean>(false);
    const [scannedData, setScannedData] = useState<ScannedData | null>(null);
    const [userData, setUserData] = useState<User | undefined>(undefined);
    const [scanning, setScanning] = useState<boolean>(false);
    const [properties, setProperties] = useState<CustomerDetails | undefined>(undefined);
    const [projects, setProjects] = useState<Project[]>([]);
    const [building, setBuilding] = useState<FlatInfo[]>([]);
    const [refreshNum, setRefreshNum] = useState<number>(0);

    useEffect(() => {
        getUserDetails(setUserData);
    }, []);

    const refresh = () => {
        setRefreshNum((prev) => prev + 1);
    };

    useEffect(() => {
        const fetchPropertyData = async () => {
            try {
                const response = await axios.get(`${domain}/api/building/flat?userId=${userData?._id}`);
                if (response && response.data) {
                    setProperties(response.data);
                } else {
                    setProperties(undefined);
                }
            } catch (error: unknown) {
                console.error('Error fetching properties:', error);
            }
        };
        if (userData) {
            fetchPropertyData();
        }
    }, [userData, refreshNum]);

    const handleRequestCameraPermission = async (): Promise<void> => {
        if (cameraPermission?.granted) {
            setScanning(true);
        } else {
            const { granted } = await requestCameraPermission();
            if (granted) {
                setScanning(true);
            } else {
                Alert.alert('Permission denied', 'Camera permission is required to scan QR codes');
            }
        }
    };

    const handleBarCodeScanned = ({ type, data }: { type: string; data: string }): void => {
        setScanning(false);
        try {
            const parsedData: ScannedData = JSON.parse(data);
            setScannedData(parsedData);
            setShowScannedData(true);
        } catch (error) {
            Alert.alert('Error', 'Invalid QR code format');
        }
    };

    const fetchProjects = async (): Promise<void> => {
        try {
            const res = await axios.get(`${domain}/api/project?clientId=${clientId}`);
            const data: Project[] = res.data;
            setProjects(data);
        } catch (error) {
            console.error('Error fetching projects:', error);
            Alert.alert('Error', 'Failed to load projects');
        }
    };

    const fetchBuilding = async (): Promise<void> => {
        try {
            const res = await axios.get(`${domain}/api/building`);
            const data: Building[] = res.data;
            const flatInfos = data.flatMap((b) => b.flatInfo || []);
            setBuilding(flatInfos);
        } catch (error) {
            console.error('Error fetching buildings:', error);
            Alert.alert('Error', 'Failed to load buildings');
        }
    };

    useEffect(() => {
        fetchProjects();
        fetchBuilding();
    }, []);

    const handleLogout = async () => {
        await AsyncStorage.setItem('user', '');
        router.push({ pathname: '/login' });
    };

    if (!userData || !cameraPermission) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <ProfileHeader userData={userData} />
            <ContactInfo userData={userData} properties={properties} />
            <QRButtons
                userData={userData}
                onShowQR={() => setShowQR(true)}
                onScanQR={handleRequestCameraPermission}
            />
            <View style={styles.refreshContainer}>
                <RefreshButton onRefresh={refresh} />
            </View>
            <PropertiesList properties={properties} />
            <LogoutButton onLogout={handleLogout} />
            <QRCodeModal visible={showQR} userData={userData} onClose={() => setShowQR(false)} />
            <QRScannerModal
                visible={scanning}
                cameraPermission={cameraPermission}
                onClose={() => setScanning(false)}
                onBarcodeScanned={handleBarCodeScanned}
            />
            <ScannedDataModal
                visible={showScannedData}
                scannedData={scannedData}
                projects={projects}
                building={building}
                onClose={() => setShowScannedData(false)}
            />
            <View style={styles.bottomPadding} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F3FF',
        padding: scaleFont(16),
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: scaleFont(16),
        color: '#000000',
    },
    refreshContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginBottom: scaleFont(15),
    },
    bottomPadding: {
        height: scaleFont(16),
    },
});

export default UserProfile;