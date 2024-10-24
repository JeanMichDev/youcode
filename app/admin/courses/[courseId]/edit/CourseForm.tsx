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
import { courseActionEdit, courseActionCreate } from "./course.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export type CourseFormProps = {
  defaultValue?: CourseFormSchema & { id: string };
};

export const CourseForm = ({ defaultValue }: CourseFormProps) => {
  const form = useZodForm({
    schema: CourseFormSchema,
    defaultValues: defaultValue,
  });
  const router = useRouter();

  return (
    <Form
      form={form}
      onSubmit={async (values) => {
        console.log(values);

        const result = defaultValue?.id
          ? await courseActionEdit({
              courseId: defaultValue.id,
              data: values,
            })
          : await courseActionCreate(values);

        if (result?.data) {
          toast.success(result.data.message);
          router.push(`/admin/courses/${result.data.course.id}`);
          router.refresh();
          return;
        }

        toast.error("An error occurred", {
          description: String(result?.serverError),
        });

        return;
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
