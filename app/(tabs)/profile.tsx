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
            
            <View style={{ marginBottom: scaleFont(10), width : scaleFont(130), alignSelf : "flex-end" }}>
                <RefreshButton onRefresh={referesh} />
            </View>


            {properties ? (
                <View style={styles.propertiesContainer}>
                    <View style={styles.sectionHeader}>
                        <FontAwesome
                            name="building-o"
                            size={scaleFont(24)}
                            color="#9333EA"
                            style={styles.sectionIcon}
                        />
                        <View>
                            <Text style={styles.sectionTitle}>My Properties</Text>
                            <Text style={styles.sectionSubtitle}>View your payment details</Text>
                        </View>
                    </View>
                    {properties.properties.map((property: Property, index: number) => (
                        <View key={index} style={styles.propertyCard}>
                            <View style={styles.propertyHeaderLine} />
                            <Text style={styles.propertyTitle}>{property.projectName}</Text>
                            <Text style={styles.propertySubtitle}>{property.sectionType}</Text>
                            {property.payments && property.payments?.length > 0 ? (
                                <View style={styles.paymentDetailsContainer}>
                                    <Text style={styles.paymentSectionTitle}>Payment Details</Text>
                                    {property.payments.map((payment: Payment, paymentIndex: number) => (
                                        <View key={paymentIndex} style={styles.paymentItem}>
                                            <View style={styles.paymentLabelContainer}>
                                                <Text style={styles.paymentLabel}>{payment.title}</Text>
                                                <Text style={styles.paymentDate}>{payment.date}</Text>
                                            </View>
                                            <Text style={styles.paymentValue}>{payment.percentage}</Text>
                                        </View>
                                    ))}
                                </View>
                            ) : (
                                <Text style={styles.noPaymentsText}>No payments recorded for this property.</Text>
                            )}
                        </View>
                    ))}
                </View>
            ) : (
                <Text style={styles.noPropertiesText}>No properties available.</Text>
            )}

            {/* Logout Button */}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <MaterialCommunityIcons name="logout-variant" size={scaleFont(20)} color="#A56CC1" style={styles.sectionIcon} />
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>

            {/* QR Code Display Modal */}
            <Modal visible={showQR} transparent={true} animationType="fade" onRequestClose={() => setShowQR(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Personal QR Code</Text>
                        <View style={styles.qrContainer}>
                            <QRCode value={generateQRData()} size={width * 0.6} color="#333" backgroundColor="#FFF" />
                        </View>
                        <Text style={styles.qrDescription}>Scan this QR code to share your contact information</Text>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setShowQR(false)}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* QR Code Scanner Modal */}
            <Modal visible={scanning} transparent={true} animationType="fade" onRequestClose={() => setScanning(false)}>
                <View style={styles.scannerContainer}>
                    {cameraPermission?.granted === false ? (
                        <Text style={styles.scannerText}>No access to camera</Text>
                    ) : (
                        <CameraView
                            style={styles.scanner}
                            facing="back"
                            barcodeScannerSettings={{
                                barcodeTypes: ['qr'],
                            }}
                            onBarcodeScanned={handleBarCodeScanned}
                        >
                            <View style={styles.scannerOverlay}>
                                <View style={styles.scannerMarker} />
                            </View>
                            <TouchableOpacity style={styles.cancelScanButton} onPress={() => setScanning(false)}>
                                <Text style={styles.cancelScanText}>Cancel</Text>
                            </TouchableOpacity>
                        </CameraView>
                    )}
                </View>
            </Modal>

            {/* Scanned Data Modal */}
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
    qrText: {
        fontSize: scaleFont(14),
        color: '#000',
        fontWeight: 'bold',
        marginLeft: scaleFont(8),
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        padding: scaleFont(12),
        borderRadius: scaleFont(10),
        marginBottom: scaleFont(16),
    },
    logoutText: {
        fontSize: scaleFont(14),
        color: '#A56CC1',
        fontWeight: 'bold',
        marginLeft: scaleFont(8),
    },
    bottomPadding: {
        height: scaleFont(16),
    },
});

export default UserProfile;