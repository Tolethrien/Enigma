import Link from "next/link";
interface Props {
  title: string;
}
export default function OptionTitle({ title }: Props) {
  return (
    <div className="flex w-full justify-between px-4 pb-8 pt-4">
      <h2 className="w-full text-center text-2xl">{title}</h2>
      <Link href="/dashboard/settings" className="text-2xl">
        X
      </Link>
    </div>
  );
}
