# react-native-picker-with-modal

simple picker with modal

## Installation

```sh
yarn add @wavedph/react-native-picker-with-modal
```

## Usage

```js
import { Picker } from '@wavedph/react-native-picker-with-modal';

// ...

const [selected, setSelected] = React.useState < string | number > '');
// ...
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
/>;
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
