// form field interface

import { TextInputProps } from "react-native";

export interface FormFieldProps extends TextInputProps {
  title: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  otherStyle?: string;
  inputStyle?: string;
}
