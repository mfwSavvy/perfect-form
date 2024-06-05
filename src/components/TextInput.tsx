import React, { forwardRef, InputHTMLAttributes } from 'react';
import { useFormContext, Controller, FieldError } from 'react-hook-form';
import { z } from 'zod';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  schema?: z.ZodType; // Zod schema for validation
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ name, label, schema, ...rest }, ref) => {
    const {
      control,
      formState: { errors },
    } = useFormContext();

    const error = errors[name] as FieldError | undefined;

    return (
      <div>
        {label && <label htmlFor={name}>{label}</label>}
        <Controller
          name={name}
          control={control}
          rules={{ validate: (value) => schema?.safeParse(value) }}
          render={({ field }) => (
            <input
              {...field}
              {...rest}
              id={name}
              ref={ref}
              aria-invalid={!!error}
              aria-describedby={error ? `${name}-error` : undefined}
            />
          )}
        />
        {error && (
          <p id={`${name}-error`} role="alert">
            {error.message}
          </p>
        )}
      </div>
    );
  }
);

export default TextInput;
