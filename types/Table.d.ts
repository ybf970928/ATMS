export interface IColProps<T = any> {
  title: string;
  dataIndex: keyof T | '';
  render?: (text: string, record?: T, index?: number) => JSX.Element;
}
