import React from 'react';
import {
    View,
    Text,
    Modal,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';

interface ReviewModalProps {
    isVisible: boolean;
    reviewText: string;
    isSubmitting: boolean;
    isEditing: boolean;
    textColor?: string;
    onClose: () => void;
    onReviewChange: (text: string) => void;
    onSubmit: () => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
    isVisible,
    reviewText,
    isSubmitting,
    isEditing,
    textColor = '#333',
    onClose,
    onReviewChange,
    onSubmit,
}) => (
    <Modal
        visible={isVisible}
        transparent
        animationType="slide"
        onRequestClose={() => !isSubmitting && onClose()}
    >
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Text style={[styles.modalTitle, { color: textColor }]}>
                    {isEditing ? 'Edit Feedback' : 'Add Feedback'}
                </Text>
                <View style={styles.formContainer}>
                    <Text style={[styles.formLabel, { color: textColor }]}>Your Feedback</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        value={reviewText}
                        onChangeText={onReviewChange}
                        placeholder="Share your thoughts about this update..."
                        placeholderTextColor={textColor}
                        multiline
                        numberOfLines={4}
                        editable={!isSubmitting}
                    />
                </View>
                <View style={styles.modalButtons}>
                    <TouchableOpacity
                        style={[styles.modalButton, styles.cancelButton, isSubmitting && styles.disabledButton]}
                        onPress={onClose}
                        disabled={isSubmitting}
                    >
                        <Text style={[styles.cancelButtonText, { color: textColor }]}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.modalButton, styles.submitButton, isSubmitting && styles.disabledButton]}
                        onPress={onSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <View style={styles.buttonLoadingContainer}>
                                <ActivityIndicator size="small" color={textColor} />
                                <Text style={[styles.submitButtonText, { color: textColor }]}>Submitting...</Text>
                            </View>
                        ) : (
                            <Text style={[styles.submitButtonText, { color: textColor }]}>
                                {isEditing ? 'Update' : 'Submit'}
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </Modal>
);

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        padding: 16,
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        maxHeight: '90%',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    formContainer: {
        marginBottom: 20,
    },
    formLabel: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 16,
        backgroundColor: '#fafafa',
    },
    textArea: {
        minHeight: 100,
        textAlignVertical: 'top',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    modalButton: {
        flex: 1,
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitButton: {
        backgroundColor: '#f0f0f0',
    },
    cancelButton: {
        backgroundColor: '#f0f0f0',
    },
    disabledButton: {
        opacity: 0.5,
    },
    submitButtonText: {
        fontSize: 16,
        fontWeight: '600',
    },
    cancelButtonText: {
        fontSize: 16,
        fontWeight: '600',
    },
    buttonLoadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
});

export default ReviewModal;