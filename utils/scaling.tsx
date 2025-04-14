// utils/scaling.ts
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const scaleFont = (size: number): number => (width / 375) * size;