export default async function EditFolder({
  params,
}: {
  params: { folder: number };
}) {
  return <div>Edit: {params.folder}</div>;
}
