import {extendTheme} from 'native-base';
export const theme = extendTheme({
  components: {
    Button: {
      // Can simply pass default props to change default behaviour of components.
      baseStyle: {
        rounded: 'md',
      },
      defaultProps: {
        colorScheme: 'blue',
      },
    },
    Heading: {
      // Can pass also function, giving you access theming tools
      baseStyle: ({colorMode}) => {
        return {
          color: colorMode === 'dark' ? 'blue.500' : 'blue.500',
          fontWeight: 'normal',
        };
      },
    },
    Input: {
      baseStyle: {
        _android: {
          _focus: {
            borderColor: 'blue.500',
          },
        },
        _ios: {
          _focus: {
            borderColor: 'blue.500',
          },
        },
      },
      defaultProps: {
        size: 'xs',
      },
    },
    Select: {
      sizes: 'xs',
    },
  },
});
