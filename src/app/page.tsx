"use client"; // Enable Next.js's "use client" mode

import { useForm, FormProvider } from "react-hook-form"; // Import hooks from react-hook-form
import { zodResolver } from "@hookform/resolvers/zod"; // Zod integration for validation
import { z } from "zod"; // Zod library for defining validation schemas
import TextInput from "@/components/TextInput"; // Import our custom TextInput component

// Define the form validation schema using Zod
const formSchema = z.object({
  firstName: z.string().min(2).max(50), // Validation for "firstName" field (min 2, max 50 chars)
  lastName: z.string().min(2).max(50),  // Validation for "lastName" field (min 2, max 50 chars)
});

export default function Home() {
  // Use the useForm hook from react-hook-form to manage form state
  const methods = useForm({
    resolver: zodResolver(formSchema), // Use zodResolver to integrate Zod with react-hook-form
    defaultValues: {
      firstName: "", // Initial value for "firstName"
      lastName: "",  // Initial value for "lastName"
    },
  });

  // Function that runs when the form is successfully submitted
  function onSubmit(values) {
    console.log(values); // Log the form values to the console
  }

  return (
    // Provide the form context to child components
    <FormProvider {...methods}> 
      <form onSubmit={methods.handleSubmit(onSubmit)}> 
        <TextInput
          name="firstName"
          label="First Name"
          schema={formSchema.shape.firstName} // Pass the Zod schema for validation
        />
        <TextInput
          name="lastName"
          label="Last Name"
          schema={formSchema.shape.lastName} // Pass the Zod schema for validation
        />
        <button type="submit">Submit</button> 
      </form>
    </FormProvider>
  );
}
