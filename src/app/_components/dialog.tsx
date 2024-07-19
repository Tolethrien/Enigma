interface Props {
  children: React.ReactNode;
}
export default function Dialog({ children }: Props) {
  return (
    <dialog
      className="fixed left-0 top-0 z-50 flex h-full w-full cursor-default flex-col items-center justify-center overflow-auto bg-black bg-opacity-50 px-6 backdrop-blur"
      onClick={(e) => e.preventDefault()}
    >
      {children}
    </dialog>
  );
}
