// remove 'readonly' from all fields
export type MakeWritable<T> = {
  -readonly [K in keyof T]: T[K]
};

// remove 'readonly' fromm all fields and add optional (?) to each one
export type MakeWritableOptional<T> = {
  -readonly [K in keyof T]?: T[K]
};
