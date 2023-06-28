import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { Picker } from '@wavedph/react-native-picker-with-modal';

export default function App() {
  const [selected, setSelected] = React.useState<string | number>('');

  return (
    <View style={styles.container}>
      <Picker
        data={[
          { value: 1, label: 'test1' },
          { value: 2, label: 'test2' },
          { value: 3, label: 'test3' },
        ]}
        selectedValue={selected}
        onValueChange={(value) => {
          setSelected(value);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
