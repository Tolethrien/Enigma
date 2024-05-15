"use client";
import { Ref, useState } from "react";
interface Props {
  forwardedRef: Ref<HTMLButtonElement>;
  children: React.ReactNode;
}
export function ContextMenu({ forwardedRef, children }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const openMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(true);
    window.addEventListener("mousedown", handleOutSideClick);
  };

  const handleOutSideClick = (event: MouseEvent) => {
    if (!forwardedRef!.current?.contains(event.target as Node)) {
      window.removeEventListener("mousedown", handleOutSideClick);
      setIsOpen(false);
    }
  };
  return (
    <div className="relative">
      {}
      <div className="absolute right-1 top-1/2 rounded-md bg-[#313640] px-6 py-1 shadow-iconShadow">
        {children}
      </div>
    </div>
  );
}
export function ContextOption() {
  return (
    <div className="absolute right-1 top-1/2 rounded-md bg-[#313640] px-6 py-1 shadow-iconShadow">
      <p className="hover:bg-slate-200" onClick={editTile}>
        Edit
      </p>
    </div>
  );
}
export function ContextButton({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
