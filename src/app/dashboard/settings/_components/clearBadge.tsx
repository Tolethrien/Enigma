"use client";
interface Props {
  id: string;
}
export default function ClearBadge({ id }: Props) {
  const clearData = () => {
    localStorage.removeItem(`badge-${id}`);
    sessionStorage.removeItem("enigmaKey");
    sessionStorage.removeItem("enigmaIv");
  };
  return (
    <button className="text-xl text-red-700" onClick={clearData}>
      Clear Badge
    </button>
  );
}
