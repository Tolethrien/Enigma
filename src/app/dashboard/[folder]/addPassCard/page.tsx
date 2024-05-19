import SetPassCard from "../components/setPassCard";

export default function addPassCard({
  params,
}: {
  params: { folder: number };
}) {
  return <SetPassCard folderID={params.folder} type="add" />;
}
