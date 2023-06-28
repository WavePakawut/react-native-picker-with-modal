import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { multiply, Picker } from '@wavedph/react-native-picker-with-modal';

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();

  React.useEffect(() => {
    multiply(3, 9).then(setResult);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <Picker
        data={[
          { value: 1, label: 'test1' },
          { value: 2, label: 'test2' },
          { value: 3, label: 'test3' },
        ]}
        selectedValue={1}
        onValueChange={() => {}}
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
