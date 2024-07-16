interface Props {
  children: React.ReactNode;
  className?: string;
}
export default function ScrollableContent({ children, className }: Props) {
  return (
    <div
      className={`flex-grow overflow-y-auto rounded-lg border border-gray-500 py-4 ${className}`}
    >
      {children}
    </div>
  );
}
