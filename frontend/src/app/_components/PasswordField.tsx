import TextInput from "@/components/TextInput";
import { ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";

export default function PasswordField<T extends FieldValues>(props: {
  field: ControllerRenderProps<T, FieldPath<T>>;
}) {
  return (
    <TextInput
      field={props.field}
      label={"Contraseña"}
      placeholder="Ingresa tu contraseña"
    />
  );
}
