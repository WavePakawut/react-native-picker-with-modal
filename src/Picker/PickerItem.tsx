import { Pressable, StyleSheet, Text } from 'react-native';
import React from 'react';
import { BaseColor } from '../configs';

export interface PickerItemData {
  value: string | number;
  label: string;
  color?: string;
}
export interface PickerItemProps {
  data: PickerItemData;
  selected: string | number;
  index: number;
  onPress: () => void;
}

const PickerItem: React.FC<PickerItemProps> = ({
  data,
  // index,
  selected,
  onPress,
}) => {
  const isSelected = selected === data.value;
  return (
    <Pressable
      onPress={() => {
        onPress && onPress();
      }}
      style={[styles.container, { backgroundColor: BaseColor.whiteColor }]}
    >
      <Text
        style={[
          styles.text,
          {
            color: isSelected
              ? BaseColor.greenColor
              : data?.color || BaseColor.text,
          },
        ]}
      >
        {data.label}
      </Text>
    </Pressable>
  );
};

export default PickerItem;

const styles = StyleSheet.create({
  container: {
    height: 45,

    // backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,

    borderBottomWidth: 1,
    borderBottomColor: BaseColor.dividerColor + '22',
  },
  text: {
    fontSize: 15,
  },
});
