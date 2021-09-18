import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type AuthProductList = {
  Home: undefined;
  TrackIn: undefined;
  TrackOut: undefined;
  Handover: undefined;
  Setting: undefined;
  CraftCard: undefined;
  ChangeOEE: undefined;
  MaterialChange: undefined;
  Discontinue: undefined;
  MaterialsHistory: undefined;
};

export type AuthNavProps<T extends keyof AuthProductList> = {
  navigation: StackNavigationProp<AuthProductList, T>;
  route: RouteProp<AuthProductList, T>;
};
