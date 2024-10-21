"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from "@/components/ui/form";
import { CourseFormSchema } from "./course.schema";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/form/SubmitButton";
import { courseActionEdit } from "./course.action";

export type CourseFormProps = {
  defaultValue?: CourseFormSchema & { id: string };
};

export const CourseForm = (props: CourseFormProps) => {
  const form = useZodForm({
    schema: CourseFormSchema,
    defaultValues: props.defaultValue,
  });
  return (
    <Form
      form={form}
      onSubmit={async (values) => {
        console.log(values);

        if (props.defaultValue?.id) {
          console.log("update course");
          const { data, serverError } = await courseActionEdit({
            courseId: props.defaultValue?.id,
            data: values,
          });
        } else {
          // create
        }
      }}
    >
      <FormField
        control={form.control}
        name="image"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Image</FormLabel>
            <FormControl>
              <Input placeholder="image url" {...field} />
            </FormControl>
            <FormDescription>Go get an image on google</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Course name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="presentation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Presentation</FormLabel>
            <FormControl>
              <Input placeholder="Some presentation" {...field} />
            </FormControl>
            <FormDescription>Please describe the course</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <SubmitButton type="submit">Submit</SubmitButton>
    </Form>
  );
};
