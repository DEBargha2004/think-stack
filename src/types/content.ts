export type RendererProps<T> = Omit<Omit<T, "value">, "ref"> & {
  value?: string;
};

export type EditorProps<T, U = string> = Omit<Omit<T, "value">, "onChange"> & {
  value: string;
  onChange: (value: U) => void;
};
