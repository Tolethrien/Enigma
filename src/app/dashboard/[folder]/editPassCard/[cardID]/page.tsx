import { getCardData } from "@/server/supabase/actionsDB";
import SetPassCard from "../../components/setPassCard";

export default async function PassCardEdit({
  params,
}: {
  params: { cardID: number };
}) {
  const passCard = await getCardData(params.cardID);
  return <SetPassCard type="edit" data={passCard} />;
}
