import { Dimensions } from 'react-native';

const dimensions = {
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width,
};

const color = {
  primary: '#007AFC',
  background: '#f3f3f3',
};

export default { color, dimensions };
