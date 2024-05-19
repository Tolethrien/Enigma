import React, { Ref } from "react";

interface Props {
  type: "email" | "password" | "text" | "pin";
  placeholder: string;
  required?: boolean;
  className?: string;
  formID?: string;
  defaultValue?: string | number;
  ref?: Ref<HTMLInputElement>;
  form?: boolean;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
enum TypeEnum {
  email = "email",
  password = "password",
  text = "text",
  pin = "number",
}
export default function Input({
  type,
  placeholder,
  className,
  formID,
  required,
  defaultValue,
  ref,
  onChange,
  value,
}: Props) {
  return (
    <input
      ref={ref}
      name={formID}
      type={TypeEnum[type]}
      placeholder={placeholder}
      required={required ?? false}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      className={` border-b-2 bg-transparent  text-center text-white placeholder-gray-400 outline-none ${className}`}
    />
  );
}
