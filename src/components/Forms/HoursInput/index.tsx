import { ChangeEvent, useState } from "react";
import { View } from "react-native";
import SelectDropdown from 'react-native-select-dropdown'
import { timeArray } from '@/constants'
import { AntDesign } from '@expo/vector-icons';
import { styles } from "./style";

interface IProps {
  value: string;
  onChange: (e: string | ChangeEvent<any>) => void;
}

export function HoursInput({ value, onChange }: IProps) {
  const [selectedTime, setSelectedTime] = useState<string>(value)

  const handleSelectTime = (time: string) => {
    const hour = parseInt(time.split(':')[0])
    const minute = parseInt(time.split(':')[1])
    onChange(`${hour}:${minute}`)
  }

  return (
    <View style={styles.container}>
      <SelectDropdown
        data={timeArray}
        onSelect={(selectedItem) => handleSelectTime(selectedItem)}
        defaultButtonText={selectedTime}
        buttonTextAfterSelection={(selectedItem) => selectedItem.toString()}
        rowTextForSelection={(item) => item.toString()}
        buttonStyle={styles.button}
        buttonTextStyle={styles.buttonText}
        dropdownStyle={styles.dropdown}
        rowStyle={styles.row}
        rowTextStyle={styles.rowText}
        showsVerticalScrollIndicator
        dropdownIconPosition="right"
        renderDropdownIcon={() => <AntDesign name="caretdown" size={8} color="black" />}
      />
    </View>
  );
}
