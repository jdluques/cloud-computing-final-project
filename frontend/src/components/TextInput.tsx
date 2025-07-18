import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";

interface TextInputProps<T extends FieldValues> {
  field: ControllerRenderProps<T, FieldPath<T>>;
  label: string;
  placeholder?: string;
}

export default function TextInput<T extends FieldValues>(
  props: TextInputProps<T>,
) {
  return (
    <FormItem>
      <FormLabel>{props.label}</FormLabel>

      <FormControl>
        <Input {...props.field} placeholder={props.placeholder} />
      </FormControl>

      <FormMessage />
    </FormItem>
  );
}
