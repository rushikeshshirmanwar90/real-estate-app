// components/ScannedDataModal.tsx
import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ScannedData, Project, SectionData, FlatInfo, PropertyItem } from '@/types/types';
import { addProperty } from '@/func/property';
import { scaleFont } from '@/utils/scaling';

interface ScannedDataModalProps {
    visible: boolean;
    scannedData: ScannedData | null;
    projects: Project[];
    building: FlatInfo[];
    onClose: () => void;
}

const ScannedDataModal: React.FC<ScannedDataModalProps> = ({ visible, scannedData, projects, building, onClose }) => {
    const [selectedProject, setSelectedProject] = useState<string>('');
    const [selectedSection, setSelectedSection] = useState<string>('');
    const [selectedSectionType, setSelectedSectionType] = useState<string>('');
    const [selectedFlat, setSelectedFlat] = useState<string>('');
    const [flatName, setFlatName] = useState<string>('');
    const [filteredSections, setFilteredSections] = useState<SectionData[]>([]);
    const [availableFlats, setAvailableFlats] = useState<FlatInfo[]>([]);

    useEffect(() => {
        if (selectedProject) {
            const project = projects.find((p) => p._id === selectedProject);
            if (project && project.section) {
                setFilteredSections(project.section);
            } else {
                setFilteredSections([]);
            }
            setSelectedSection('');
            setSelectedSectionType('');
            setAvailableFlats([]);
        }
    }, [selectedProject, projects]);

    useEffect(() => {
        if (selectedSection && selectedSectionType === 'Buildings') {
            if (building) {
                setAvailableFlats(building);
            } else {
                setAvailableFlats([]);
            }
        } else {
            setAvailableFlats([]);
        }
    }, [selectedSection, selectedSectionType, building]);

    const handleSectionChange = (sectionId: string): void => {
        const section = filteredSections.find((s) => s.sectionId === sectionId);
        if (section) {
            setSelectedSection(section.sectionId);
            setSelectedSectionType(section.type);
        } else {
            setSelectedSection('');
            setSelectedSectionType('');
        }
        setSelectedFlat('');
        setFlatName('');
    };

    const handleAddFlat = async () => {
        if (!scannedData) return;

        if (!selectedProject) {
            Alert.alert('Error', 'Please select a project');
            return;
        }

        if (!selectedSection) {
            Alert.alert('Error', 'Please select a section');
            return;
        }

        if (selectedSectionType === 'Buildings' && availableFlats.length > 0 && !selectedFlat) {
            Alert.alert('Error', 'Please select a flat');
            return;
        }

        if (!flatName) {
            Alert.alert('Error', 'Please enter a flat/row house number');
            return;
        }

        const property: PropertyItem = {
            projectId: selectedProject,
            projectName: projects.find((p) => p._id === selectedProject)?.name || 'Unknown Project',
            sectionId: selectedSection,
            sectionName: filteredSections.find((s) => s.sectionId === selectedSection)?.name || 'Unknown Section',
            sectionType: selectedSectionType,
            flatId: selectedFlat,
            flatName: flatName,
            flatNumber: flatName,
            userId: scannedData.userId,
        };

        const res = await addProperty(property);

        if (res != null) {
            Alert.alert(
                'Success',
                `Added ${selectedSectionType === 'Buildings' ? 'Flat' : 'Row House'} for user: ${scannedData.firstName} ${scannedData.lastName}`,
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            onClose();
                            setSelectedProject('');
                            setSelectedSection('');
                            setSelectedSectionType('');
                            setSelectedFlat('');
                            setFlatName('');
                        },
                    },
                ]
            );
        }
    };

    return (
        <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    {scannedData && (
                        <View style={styles.scannedDataContainer}>
                            <View style={styles.scannedDataItem}>
                                <Text style={styles.scannedDataLabel}>Name:</Text>
                                <Text style={styles.scannedDataValue}>{`${scannedData.firstName} ${scannedData.lastName}`}</Text>
                            </View>
                        </View>
                    )}

                    <Text style={styles.modalTitle}>Select the project</Text>

                    {/* Project Selector */}
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
                                    <Picker.Item key={project._id} label={project.name} value={project._id} />
                                ))}
                            </Picker>
                        </View>
                    </View>

                    {/* Section Selector */}
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

                    {/* Flat Selector */}
                    {selectedSectionType === 'Buildings' && availableFlats.length > 0 && (
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

                    {/* Flat Name Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.dropdownLabel}>
                            {selectedSectionType === 'Buildings' ? 'Flat Number' : 'Row House Number'}
                        </Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder={selectedSectionType === 'Buildings' ? 'e.g., 101' : 'e.g., RH-5'}
                            value={flatName}
                            onChangeText={setFlatName}
                        />
                    </View>

                    <View style={styles.actionButtonsRow}>
                        <TouchableOpacity style={[styles.actionButton, styles.addButton]} onPress={handleAddFlat}>
                            <Text style={styles.addButtonText}>Add Flat</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.actionButton, styles.cancelButton]} onPress={onClose}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
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
});

export default ScannedDataModal;