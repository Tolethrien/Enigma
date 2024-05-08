interface Props {
  type: "email" | "password" | "text" | "pin";
  placeholder: string;
  required?: boolean;
  className?: string;
  formID?: string;
  defaultValue?: string | number;
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
}: Props) {
  return (
    <>
      <label htmlFor={type} className="hidden">
        {placeholder}
      </label>
      <input
        name={formID}
        type={TypeEnum[type]}
        placeholder={placeholder}
        required={required ?? false}
        defaultValue={defaultValue ?? ""}
        className={` border-b-2 bg-transparent  text-center text-white placeholder-gray-400 outline-none ${className}`}
      />
    </>
  );
}
