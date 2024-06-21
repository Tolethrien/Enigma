import Link from "next/link";
interface Props {
  pathID: number;
  center?: boolean;
}
export default function AddNewButton({ pathID, center = false }: Props) {
  return (
    <Link
      className={`flex w-fit gap-2 ${!center && "mr-8 self-end"} rounded-md border-2 px-4 py-1`}
      href={`./${pathID}/addPassCard`}
    >
      <p>+</p>
      <p>Add New</p>
    </Link>
  );
}
