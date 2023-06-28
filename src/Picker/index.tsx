import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  SafeAreaView,
} from 'react-native';
import React, { useState } from 'react';
import PickerItem, { PickerItemData } from './PickerItem';
import RNBounceable from '@freakycoder/react-native-bounceable';

import { ShadowEle1, ShadowEle5 } from '../helpers/ShadowConfig';

import { getWpHp } from '../helpers';
import { FlatList } from 'react-native';
import { BaseColor, DefaultColor } from '../configs';

// import backImg from '../assets/angle-left-solid.svg';
const { wp } = getWpHp();
const backImg = require('../assets/left.png');
const downIcon = require('../assets/down-icon.png');

interface PickerWProps {
  // mode?: 'normal' | 'wheel';
  data: PickerItemData[];
  headerTitle?: string;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
  selectedValue: string | number;
  onValueChange: (value: string | number, index: number) => void;
  disable?: boolean;
  isLoading?: boolean;
  disableShadow?: boolean;
  notSelectLabel?: string;
}

const PickerW: React.FC<PickerWProps> = ({
  selectedValue,
  data,
  style,
  // mode,
  onValueChange,
  headerTitle,
  disable = false,

  backgroundColor,
  isLoading = false,
  disableShadow = false,
  notSelectLabel,
}) => {
  const [showModal, setShowModal] = useState(false);
  const selectedData = data.find((obj) => obj.value === selectedValue);

  const renderItem = ({
    item,
    index,
  }: {
    item: PickerItemData;
    index: number;
  }) => {
    return (
      <PickerItem
        onPress={() => {
          onValueChange(item.value, index);
          setShowModal(false);
        }}
        data={item}
        index={index}
        selected={selectedValue}
      />
    );
  };
  return (
    <>
      <RNBounceable
        onPress={() => {
          !disable && setShowModal(true);
        }}
        style={[
          styles.container,
          style,
          disable
            ? {
                ...(disableShadow ? {} : ShadowEle1),
                shadowOpacity: 0.1,
                backgroundColor: BaseColor.lightGrayColor + '77',
              }
            : {
                ...(disableShadow ? {} : ShadowEle5),
                shadowOpacity: 0.1,
                backgroundColor: backgroundColor || BaseColor.lightGrayColor2,
              },
        ]}
      >
        <Text
          style={[
            styles.text,
            {
              color: disable
                ? BaseColor.grayColor
                : selectedData?.color || BaseColor.greenColor,
            },
          ]}
        >
          {selectedData
            ? selectedData.label
            : notSelectLabel || 'Please select'}
        </Text>
        {isLoading ? (
          <ActivityIndicator size={40} />
        ) : (
          <View>
            <Image
              source={downIcon}
              style={{ width: 12, height: 12, marginLeft: 10 }}
              resizeMode="contain"
              // size={16}
              // color={BaseColor.lightGrayColor}
            />
          </View>
        )}
      </RNBounceable>
      <Modal visible={showModal} animationType="slide">
        <SafeAreaView
          style={[styles.modalContain, { backgroundColor: '#fff' }]}
        >
          <View
            style={{
              // padding: 10,
              height: 50,
              width: '100%',
              // backgroundColor: 'red',
              // position: 'absolute',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              // zIndex: 100,
            }}
          >
            <Pressable
              onPress={() => {
                setShowModal(false);
              }}
              style={{
                height: 50,
                width: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                source={backImg}
                style={{ width: 25, height: 25 }}
                // size={16}
                // color={BaseColor.lightGrayColor}
              />
            </Pressable>
            <View style={{ flex: 1 }}>
              <Text style={{ color: DefaultColor.text, fontSize: 20 }}>
                {headerTitle || 'Choose options'}
              </Text>
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <FlatList
              style={{ flex: 1, backgroundColor: BaseColor.whiteColor }}
              data={data}
              renderItem={renderItem}
              ListHeaderComponent={
                <View style={{ alignItems: 'center' }}>
                  {isLoading && (
                    <ActivityIndicator
                      style={{ marginTop: 10 }}
                      size={wp(20)}
                    />
                  )}
                </View>
              }
              ListFooterComponent={<View style={{ height: 10 }} />}
              keyExtractor={(_, index) => index.toString()}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default PickerW;

const styles = StyleSheet.create({
  container: {
    margin: 5,
    height: 45,
    paddingHorizontal: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
  },
  modalContain: {
    flex: 1,
  },
});
