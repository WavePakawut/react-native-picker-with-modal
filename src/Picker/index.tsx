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
  BackHandler,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
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

interface PickerProps {
  // mode?: 'normal' | 'wheel';
  data: PickerItemData[];
  headerTitle?: string;
  backgroundColor?: string;
  color?: string;
  selectedColor?: string;
  notSelectedColor?: string;
  disableColor?: string;
  style?: StyleProp<ViewStyle>;
  selectedValue: string | number;
  onValueChange: (value: string | number, index: number) => void;
  disable?: boolean;
  isLoading?: boolean;
  disableShadow?: boolean;
  notSelectLabel?: string;
}

const Picker: React.FC<PickerProps> = ({
  selectedValue,
  data,
  style,
  // mode,
  onValueChange,
  headerTitle,
  disable = false,

  backgroundColor,
  color,
  selectedColor,
  notSelectedColor,
  disableColor,
  isLoading = false,
  disableShadow = false,
  notSelectLabel,
}) => {
  const flRef = useRef<FlatList>(null);
  const [showModal, setShowModal] = useState(false);
  const selectedData = data.find((obj) => obj.value === selectedValue);
  const backAction = useCallback(() => {
    setShowModal(false);
    return true;
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, [backAction]);
  // const scrollToSelected = useCallback(() => {

  // }, [showModal, flRef, selectedData, data]);
  useEffect(() => {
    // scrollToSelected();
    if (flRef && flRef.current && showModal) {
      const id = data.findIndex((value) => value === selectedData);
      if (id !== -1) {
        setTimeout(() => {
          flRef?.current?.scrollToIndex({ animated: true, index: id });
        }, 200);
      }
    }
    return () => {};
  }, [showModal, flRef, selectedData, data]);

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
        selectedColor={selectedColor}
        notSelectedColor={notSelectedColor}
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
                backgroundColor:
                  disableColor || BaseColor.lightGrayColor + '77',
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
              color:
                color ||
                (disable
                  ? BaseColor.grayColor
                  : selectedData?.color || BaseColor.greenColor),
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
              ref={flRef}
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
              getItemLayout={(_, index) => ({
                length: 45, //  WIDTH + (MARGIN_HORIZONTAL * 2)
                offset: 45 * index, //  ( WIDTH + (MARGIN_HORIZONTAL*2) ) * (index)
                index,
              })}
              ListFooterComponent={<View style={{ height: 10 }} />}
              keyExtractor={(_, index) => index.toString()}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default Picker;

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
