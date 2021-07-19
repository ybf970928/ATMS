import {NavigationState, PartialState, Route} from '@react-navigation/native';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
export function getHeaderTitle(
  route: Partial<Route<string>> & {
    state?: PartialState<NavigationState>;
  },
) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Todo';
  switch (routeName) {
    case 'Todo':
      return '待办事项';
    case 'MyInfo':
      return '个人中心';
  }
}
