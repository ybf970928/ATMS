import {
  ControllerRenderProps,
  UseFormHandleSubmit,
  UseFormSetValue,
} from 'react-hook-form';

export interface IColProps<T> {
  title: string;
  dataIndex: keyof T | '';
  width?: number | string;
  render?: (
    field: ControllerRenderProps,
    handleSubmit: UseFormHandleSubmit<T>,
    setValue: UseFormSetValue<T>,
    _index: number,
  ) => JSX.Element;
}
