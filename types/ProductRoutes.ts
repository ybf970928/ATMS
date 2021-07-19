import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type AuthProductList = {
  Main: undefined;
  TrackIn: undefined;
  TrackOut: undefined;
};

export type AuthNavProps<T extends keyof AuthProductList> = {
  navigation: StackNavigationProp<AuthProductList, T>;
  route: RouteProp<AuthProductList, T>;
};
