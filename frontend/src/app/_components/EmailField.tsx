import TextInput from "@/components/TextInput";
import { ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";

export default function EmailField<T extends FieldValues>(props: {
  field: ControllerRenderProps<T, FieldPath<T>>;
}) {
  return (
    <TextInput
      field={props.field}
      label={"Correo electrónico"}
      placeholder="Ingresa tu correo electrónico"
    />
  );
}
