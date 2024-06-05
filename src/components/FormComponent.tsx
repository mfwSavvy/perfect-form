// src/components/FormComponent.tsx
'use client';

import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import TextInput from './TextInput';

const formSchema = z.object({
  firstName: z.string().min(2, 'Name must be at least 2 characters'),
});

type FormValues = z.infer<typeof formSchema>;

const FormComponent: React.FC = () => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <TextInput name="firstName" label="First Name" />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
};

export default FormComponent;
