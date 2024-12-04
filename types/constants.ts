// form field interface

import { ImagePickerAsset } from "expo-image-picker";
import { TextInputProps } from "react-native";

export interface FormFieldProps extends TextInputProps {
  title: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  otherStyle?: string;
  inputStyle?: string;
}

// animations

export const zoomIn: any = {
  0: {
    scale: 0.9,
  },

  1: {
    scale: 1.1,
  },
};
export const zoomOut: any = {
  0: {
    scale: 1,
  },

  1: {
    scale: 0.9,
  },
};

export interface UploadProps {
  title: string;
  videoUrl: null | ImagePickerAsset;
  thumbnail: null | ImagePickerAsset;
  prompt: string;
}
