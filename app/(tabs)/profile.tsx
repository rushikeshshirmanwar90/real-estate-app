import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, Modal, Alert, TextInput } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { CustomerDetails, Payment, Property, User } from '@/types/user'; // Adjust path as needed
import { getUserDetails } from '@/lib/user'; // Adjust path as needed
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-native-qrcode-svg';
import { CameraView, useCameraPermissions } from 'expo-camera'; // Updated imports
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { domain } from '@/lib/domain';
import { addProperty } from '@/func/property';
import { Building, FlatInfo, Project, PropertyItem, ScannedData, SectionData } from '@/types/types';
import RefreshButton from '@/components/Refersh';

const { width } = Dimensions.get('window');
const scaleFont = (size: number) => (width / 375) * size;

const UserProfile = () => {
    const router = useRouter();
    const [showQR, setShowQR] = useState(false);
    const [cameraPermission, requestCameraPermission] = useCameraPermissions();
    const [showScannedData, setShowScannedData] = useState<boolean>(false);
    const [scannedData, setScannedData] = useState<ScannedData | null>(null);
    const [userData, setUserData] = useState<User>();
    const [scanning, setScanning] = useState<boolean>(false);
    const [properties, setProperties] = useState<CustomerDetails>()

    // Projects and building
    const [projects, setProjects] = useState<Project[]>([]);
    const [building, setBuilding] = useState<Building[]>([]);

    // Project selection state
    const [selectedProject, setSelectedProject] = useState<string>("");
    const [selectedSection, setSelectedSection] = useState<string>("");
    const [selectedSectionType, setSelectedSectionType] = useState<string>("");
    const [selectedFlat, setSelectedFlat] = useState<string>("");
    const [flatName, setFlatName] = useState<string>("");
    const [flatNumber, setFlatNumber] = useState<string>("");
    const [filteredSections, setFilteredSections] = useState<SectionData[]>([]);
    const [availableFlats, setAvailableFlats] = useState<FlatInfo[]>([]);
    const [refershNum, setRefershNum] = useState<number>(0);

    useEffect(() => {
        getUserDetails(setUserData);
    }, []);


    const referesh = () => {
        setRefershNum(refershNum + 1);
    }


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

            }

        }
        fetchPropertyData();
    }, [userData, refershNum])


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

    const generateQRData = (): string => {
        if (!userData) return '';
        const qrData: ScannedData = {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            phoneNumber: userData.phoneNumber,
            userType: userData.userType,
            userId: userData._id
        };
        return JSON.stringify(qrData);
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

    const handleSectionChange = (sectionId: string): void => {
        const section = filteredSections.find((s) => s.sectionId === sectionId);
        if (section) {
            setSelectedSection(section.sectionId);
            setSelectedSectionType(section.type);
        } else {
            setSelectedSection("");
            setSelectedSectionType("");
        }
        setSelectedFlat("");
        setFlatName("");
    };

    const handleAddFlat = async () => {

        if (userData && scannedData) {

            if (!selectedProject) {
                Alert.alert('Error', 'Please select a project');
                return;
            }

            if (!selectedSection) {
                Alert.alert('Error', 'Please select a section');
                return;
            }

            if (selectedSectionType === "Buildings" && availableFlats?.length > 0 && !selectedFlat) {
                Alert.alert('Error', 'Please select a flat');
                return;
            }

            if (!flatName) {
                Alert.alert('Error', 'Please enter a flat/row house number');
                return;
            }

            const property: PropertyItem = {
                projectId: selectedProject,
                projectName: projects.find(p => p._id === selectedProject)?.name || "Unknown Project",
                sectionId: selectedSection,
                sectionName: filteredSections.find(s => s.sectionId === selectedSection)?.name || "Unknown Section",
                sectionType: selectedSectionType,
                flatId: selectedFlat,
                flatName: flatName,
                flatNumber: flatNumber,
                userId: scannedData.userId
            };


            console.log(property);

            const res = await addProperty(property);

            if (res != null) {
                Alert.alert(
                    'Success',
                    `Added ${selectedSectionType === "Buildings" ? "Flat" : "Row House"} for user: ${scannedData.firstName} ${scannedData.lastName}`,
                    [{
                        text: 'OK', onPress: () => {
                            setShowScannedData(false);
                            setSelectedProject("");
                            setSelectedSection("");
                            setSelectedSectionType("");
                            setSelectedFlat("");
                            setFlatName("");
                        }
                    }]
                );
            }
        }

    };

    const fetchProjects = async (): Promise<void> => {
        try {
            const res = await axios.get(`${domain}/api/project`);
            const data: Project[] = res.data;
            setProjects(data);
        } catch (error) {
            console.error("Error fetching projects:", error);
            Alert.alert("Error", "Failed to load projects");
        }
    };

    const fetchBuilding = async (): Promise<void> => {
        try {
            const res = await axios.get(`${domain}/api/building`);
            const data: Building[] = res.data;
            setBuilding(data);
        } catch (error) {
            console.error("Error fetching buildings:", error);
            Alert.alert("Error", "Failed to load buildings");
        }
    };

    useEffect(() => {
        fetchProjects();
        fetchBuilding();
    }, [])


    // Add this useEffect to update sections when a project is selected
    useEffect(() => {
        if (selectedProject) {
            const project = projects.find((p) => p._id === selectedProject);
            if (project && project.section) {
                setFilteredSections(project.section);
            } else {
                setFilteredSections([]);
            }
            setSelectedSection("");
            setSelectedSectionType("");
            setAvailableFlats([]);
        }
    }, [selectedProject, projects]);

    // Add this useEffect to update available flats when a section is selected
    useEffect(() => {
        if (selectedSection && selectedSectionType === "Buildings") {
            const buildingData = building.find((b) => b._id === selectedSection);
            if (buildingData && buildingData.flatInfo) {
                setAvailableFlats(buildingData.flatInfo);
            } else {
                setAvailableFlats([]);
            }
        } else {
            setAvailableFlats([]);
        }
    }, [selectedSection, selectedSectionType, building]);

    const handleLogout = async () => {
        await AsyncStorage.setItem('user', '');
        router.push({ pathname: '/login' });
    };

    if (!userData) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    if (!cameraPermission) {
        return <View />;
    }

    return (
        <ScrollView style={styles.container}>
            {/* Profile Section */}
            <View style={styles.profileContainer}>
                <View>
                    <Image style={styles.profileImage} source={require('@/assets/images/profile.png')} />
                </View>
                <Text style={styles.name}>{`${userData.firstName} ${userData.lastName}`}</Text>
                <Text style={styles.role}>{userData.userType}</Text>
            </View>

            {/* Contact Info */}
            <View style={styles.contactContainer}>
                <View style={styles.contactItem}>
                    <View style={[styles.iconContainer, { backgroundColor: '#F3E8FF' }]}>
                        <FontAwesome name="envelope-o" size={scaleFont(24)} color="#9333EA" />
                    </View>
                    <View>
                        <Text style={styles.contactLabel}>Email</Text>
                        <Text style={styles.contactValue}>{userData.email}</Text>
                    </View>
                </View>
                <View style={styles.contactItem}>
                    <View style={[styles.iconContainer, { backgroundColor: '#FCE7F3' }]}>
                        <Feather name="phone" size={scaleFont(24)} color="#DB2777" />
                    </View>
                    <View>
                        <Text style={styles.contactLabel}>Phone</Text>
                        <Text style={styles.contactValue}>{userData.phoneNumber}</Text>
                    </View>
                </View>
                <View style={styles.contactItem}>
                    <View style={[styles.iconContainer, { backgroundColor: '#E0E7FF' }]}>
                        <Feather name="home" size={scaleFont(24)} color="#615AE8" />
                    </View>
                    <View>
                        <Text style={styles.contactLabel}>Properties</Text>
                        <Text style={styles.contactValue}>{properties?.properties?.length || "0"} Properties</Text>
                    </View>
                </View>
            </View>


            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <RefreshButton onRefresh={referesh} />
            </View>

            {/* QR Code Buttons */}
            <View style={styles.qrButtonsContainer}>
                {
                    userData.userType === "customer" ? (
                        <TouchableOpacity style={styles.qrButton} onPress={() => setShowQR(true)}>
                            <MaterialCommunityIcons name="qrcode" size={scaleFont(20)} color="#000" style={styles.sectionIcon} />
                            <Text style={styles.qrText}>Show QR Code</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.qrButton} onPress={handleRequestCameraPermission}>
                            <MaterialCommunityIcons name="qrcode-scan" size={scaleFont(20)} color="#000" style={styles.sectionIcon} />
                            <Text style={styles.qrText}>Scan QR Code</Text>
                        </TouchableOpacity>
                    )
                }
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
            <Modal
                visible={showScannedData}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowScannedData(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {scannedData && (
                            <View style={styles.scannedDataContainer}>
                                <View style={styles.scannedDataItem}>
                                    <Text style={styles.scannedDataLabel}>Name:</Text>
                                    <Text style={styles.scannedDataValue}>
                                        {`${scannedData.firstName} ${scannedData.lastName}`}
                                    </Text>
                                </View>
                            </View>
                        )}

                        <Text style={styles.modalTitle}>Select the project</Text>

                        {/* Project Selector Dropdown */}
                        <View style={styles.dropdownContainer}>
                            <Text style={styles.dropdownLabel}>Project</Text>
                            <View style={styles.selectContainer}>
                                <Picker
                                    selectedValue={selectedProject}
                                    style={styles.picker}
                                    onValueChange={(itemValue) => setSelectedProject(itemValue)}
                                >
                                    <Picker.Item label="Select a project" value="" />
                                    {projects.map((project) => (
                                        <Picker.Item
                                            key={project._id}
                                            label={project.name}
                                            value={project._id}
                                        />
                                    ))}
                                </Picker>
                            </View>
                        </View>

                        {/* Section Selector (shows only when a project is selected) */}
                        {selectedProject && (
                            <View style={styles.dropdownContainer}>
                                <Text style={styles.dropdownLabel}>Section</Text>
                                <View style={styles.selectContainer}>
                                    <Picker
                                        selectedValue={selectedSection}
                                        style={styles.picker}
                                        onValueChange={(itemValue) => handleSectionChange(itemValue)}
                                    >
                                        <Picker.Item label="Select a section" value="" />
                                        {filteredSections.map((section) => (
                                            <Picker.Item
                                                key={section.sectionId}
                                                label={`${section.name} (${section.type})`}
                                                value={section.sectionId}
                                            />
                                        ))}
                                    </Picker>
                                </View>
                            </View>
                        )}

                        {/* Flat Selector (shows only for Buildings section type) */}
                        {selectedSectionType === "Buildings" && availableFlats?.length > 0 && (
                            <View style={styles.dropdownContainer}>
                                <Text style={styles.dropdownLabel}>Flat</Text>
                                <View style={styles.selectContainer}>
                                    <Picker
                                        selectedValue={selectedFlat}
                                        style={styles.picker}
                                        onValueChange={(itemValue) => setSelectedFlat(itemValue)}
                                    >
                                        <Picker.Item label="Select a flat" value="" />
                                        {availableFlats.map((flat) => (
                                            <Picker.Item
                                                key={flat._id}
                                                label={`${flat.title} (${flat.totalFlats - flat.totalBookedFlats} available)`}
                                                value={flat._id}
                                            />
                                        ))}
                                    </Picker>
                                </View>
                            </View>
                        )}

                        {/* Flat Name Input (always visible) */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.dropdownLabel}>
                                {selectedSectionType === "Buildings" ? "Flat Number" : "Row House Number"}
                            </Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder={selectedSectionType === "Buildings" ? "e.g., 101" : "e.g., RH-5"}
                                value={flatName}
                                onChangeText={setFlatName}
                            />
                        </View>

                        <View style={styles.actionButtonsRow}>
                            <TouchableOpacity style={[styles.actionButton, styles.addButton]} onPress={handleAddFlat}>
                                <Text style={styles.addButtonText}>Add Flat</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.actionButton, styles.cancelButton]}
                                onPress={() => setShowScannedData(false)}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>

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
    profileContainer: {
        alignItems: 'center',
        marginBottom: scaleFont(16),
    },
    profileImage: {
        width: scaleFont(150),
        height: scaleFont(150),
        borderRadius: scaleFont(75),
    },
    name: {
        fontSize: scaleFont(22),
        fontWeight: 'bold',
        color: '#000000',
        marginTop: scaleFont(8),
    },
    role: {
        fontSize: scaleFont(14),
        color: '#A56CC1',
        backgroundColor: '#EDE0EA',
        paddingHorizontal: scaleFont(8),
        paddingVertical: scaleFont(4),
        borderRadius: scaleFont(15),
        overflow: 'hidden',
        marginTop: scaleFont(4),
    },
    contactContainer: {
        backgroundColor: '#FFFFFF',
        padding: scaleFont(12),
        borderRadius: scaleFont(10),
        marginBottom: scaleFont(16),
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: scaleFont(12),
    },
    iconContainer: {
        width: scaleFont(40),
        height: scaleFont(40),
        borderRadius: scaleFont(20),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: scaleFont(14),
    },
    contactLabel: {
        fontSize: scaleFont(10),
        color: '#6B7280',
        flex: 1,
    },
    contactValue: {
        fontSize: scaleFont(14),
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'right',
    },
    propertiesContainer: {
        backgroundColor: '#FFFFFF',
        padding: scaleFont(12),
        borderRadius: scaleFont(10),
        marginBottom: scaleFont(16),
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: scaleFont(12), // Increased for better separation from payment cards
    },
    sectionIcon: {
        marginRight: scaleFont(8),
    },
    sectionTitle: {
        fontSize: scaleFont(18),
        fontWeight: 'bold',
        color: '#000000',
    },
    sectionSubtitle: {
        fontSize: scaleFont(12),
        color: '#666666',
    },
    propertyCard: {
        padding: scaleFont(12),
        backgroundColor: '#FFFFFF',
        borderRadius: scaleFont(12),
        marginBottom: scaleFont(12),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    propertyHeaderLine: {
        height: scaleFont(4),
        backgroundColor: '#9333EA',
        borderRadius: scaleFont(2),
        marginBottom: scaleFont(8),
    },
    propertyTitle: {
        fontSize: scaleFont(16),
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: scaleFont(4),
    },
    propertySubtitle: {
        fontSize: scaleFont(14),
        color: '#6B7280',
        marginBottom: scaleFont(12), // Increased to separate from payments
    },
    paymentDetailsContainer: {
        marginTop: scaleFont(8), // Space above payment details
    },
    paymentSectionTitle: {
        fontSize: scaleFont(16),
        fontWeight: '600',
        color: '#9333EA',
        marginBottom: scaleFont(8),
    },
    paymentItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F9FAFB', // Reused from propertyDetailItem
        padding: scaleFont(8),
        borderRadius: scaleFont(8),
        marginBottom: scaleFont(4),
    },
    paymentLabelContainer: {
        flex: 1, // Allows it to take available space
        flexDirection: 'column', // Stack title and date vertically
    },
    paymentLabel: {
        fontSize: scaleFont(14),
        fontWeight: '500',
        color: '#6B7280', // Reused from propertyDetailLabel
    },
    paymentDate: {
        fontSize: scaleFont(12), // Smaller for date
        color: '#6B7280',
    },
    paymentValue: {
        fontSize: scaleFont(14),
        fontWeight: 'bold',
        color: '#1F2937', // Reused from propertyDetailValue
    },
    noPaymentsText: {
        fontSize: scaleFont(12),
        color: '#6B7280',
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: scaleFont(8),
    },
    noPropertiesText: {
        fontSize: scaleFont(14),
        color: '#666666',
        textAlign: 'center',
        marginTop: scaleFont(16),
    },
    qrButtonsContainer: {
        marginBottom: scaleFont(16),
    },
    qrButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        padding: scaleFont(12),
        borderRadius: scaleFont(10),
        marginBottom: scaleFont(10),
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: scaleFont(20),
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: scaleFont(16),
        padding: scaleFont(20),
        width: '90%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalTitle: {
        fontSize: scaleFont(22),
        fontWeight: 'bold',
        color: '#333',
        marginBottom: scaleFont(20),
    },
    qrContainer: {
        padding: scaleFont(15),
        backgroundColor: 'white',
        borderRadius: scaleFont(10),
        marginBottom: scaleFont(20),
    },
    qrDescription: {
        fontSize: scaleFont(14),
        color: '#666',
        textAlign: 'center',
        marginBottom: scaleFont(20),
    },
    closeButton: {
        backgroundColor: '#A56CC1',
        paddingHorizontal: scaleFont(30),
        paddingVertical: scaleFont(12),
        borderRadius: scaleFont(8),
    },
    closeButtonText: {
        color: 'white',
        fontSize: scaleFont(16),
        fontWeight: 'bold',
    },
    scannerContainer: {
        flex: 1,
        backgroundColor: 'black',
    },
    scanner: {
        flex: 1,
    },
    scannerOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scannerMarker: {
        width: width * 0.7,
        height: width * 0.7,
        borderWidth: 2,
        borderColor: '#A56CC1',
        borderRadius: 10,
    },
    scannerText: {
        color: 'white',
        fontSize: scaleFont(16),
        textAlign: 'center',
        margin: 20,
    },
    cancelScanButton: {
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center',
        backgroundColor: 'white',
        paddingHorizontal: scaleFont(30),
        paddingVertical: scaleFont(12),
        borderRadius: scaleFont(8),
    },
    cancelScanText: {
        color: '#A56CC1',
        fontSize: scaleFont(16),
        fontWeight: 'bold',
    },
    scannedDataContainer: {
        width: '100%',
        marginBottom: scaleFont(20),
    },
    scannedDataItem: {
        flexDirection: 'row',
        backgroundColor: '#F8F9FA',
        padding: scaleFont(12),
        borderRadius: scaleFont(8),
        marginBottom: scaleFont(8),
    },
    scannedDataLabel: {
        fontSize: scaleFont(14),
        fontWeight: 'bold',
        color: '#6B7280',
        width: scaleFont(80),
    },
    scannedDataValue: {
        fontSize: scaleFont(14),
        color: '#1F2937',
        flex: 1,
    },
    actionButtonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    actionButton: {
        flex: 1,
        paddingVertical: scaleFont(12),
        borderRadius: scaleFont(8),
        alignItems: 'center',
        marginHorizontal: scaleFont(5),
    },
    addButton: {
        backgroundColor: '#9333EA',
    },
    addButtonText: {
        color: 'white',
        fontSize: scaleFont(16),
        fontWeight: 'bold',
    },
    cancelButton: {
        backgroundColor: '#E5E7EB',
    },
    cancelButtonText: {
        color: '#4B5563',
        fontSize: scaleFont(16),
        fontWeight: 'bold',
    },

    dropdownContainer: {
        width: '100%',
        marginBottom: scaleFont(12),
    },
    dropdownLabel: {
        fontSize: scaleFont(14),
        fontWeight: 'bold',
        color: '#6B7280',
        marginBottom: scaleFont(6),
    },
    selectContainer: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: scaleFont(8),
        backgroundColor: '#F9FAFB',
        overflow: 'hidden',
    },
    picker: {
        width: '100%',
        height: scaleFont(50),
    },
    inputContainer: {
        width: '100%',
        marginBottom: scaleFont(16),
    },
    textInput: {
        width: '100%',
        height: scaleFont(50),
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: scaleFont(8),
        backgroundColor: '#F9FAFB',
        paddingHorizontal: scaleFont(12),
        fontSize: scaleFont(14),
    }
});

export default UserProfile;