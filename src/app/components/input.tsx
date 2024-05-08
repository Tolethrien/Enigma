interface Props {
  type: "email" | "password" | "text" | "pin";
  placeholder: string;
  required?: boolean;
  className?: string;
  formID?: string;
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
}: Props) {
  return (
    <>
      <label htmlFor={type} className="hidden">
        {placeholder}
      </label>
      <input
        id={formID}
        type={TypeEnum[type]}
        placeholder={placeholder}
        required={required ?? false}
        className={` border-b-2 bg-transparent  text-center text-white placeholder-gray-400 outline-none ${className}`}
      />
    </>
  );
}
