"use client";

import { addCard } from "@/server/supabase/actions";
import SetPassCard from "../[passCard]/components/setPassCard";

export default function addPassCard({
  params,
}: {
  params: { folder: number };
}) {
  return <SetPassCard folderID={params.folder} type="add" />;
}
