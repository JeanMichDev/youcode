"use client";
import { useZodForm } from "@/components/ui/form";
import { LESSON_STATE, LessonFormSchema } from "./lesson.schema";
import { useRouter } from "next/navigation";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";
import { lessonActionEdit } from "./lesson.action";
import { SubmitButton } from "@/components/form/SubmitButton";

export type LessonFormProps = {
  defaultValue?: LessonFormSchema & { id: string };
};

export const AdminLessonForm = ({ defaultValue }: LessonFormProps) => {
  const form = useZodForm({
    schema: LessonFormSchema,
    defaultValues: defaultValue,
  });
  const router = useRouter();

  return (
    <Form
      form={form}
      onSubmit={async (values: LessonFormSchema) => {
        console.log(values);

        if (!defaultValue) {
          toast.error("Default value is missing");
          return;
        }

        const result = await lessonActionEdit({
          lessonId: defaultValue.id,
          data: values,
        });

        if (result?.data) {
          toast.success(result.data.message);
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
        name="state"
        render={({ field }) => (
          <FormItem>
            <FormLabel>State</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a state" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {LESSON_STATE.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <SubmitButton type="submit">Submit</SubmitButton>
    </Form>
  );
};
