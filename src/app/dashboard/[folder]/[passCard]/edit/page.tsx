import { getCardData } from "@/server/supabase/actions";
import SetPassCard from "../components/setPassCard";

export default async function PassCardEdit({
  params,
}: {
  params: { passCard: number };
}) {
  const passCard = await getCardData(params.passCard);
  return <SetPassCard type="edit" data={passCard} />;
}
