import { getFolderData } from "@/server/supabase/actionsDB";
import Link from "next/link";
import CompanyBar from "./components/companyBar";
export default async function FolderLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { folder: number };
}>) {
  const folder = await getFolderData(params.folder);
  return (
    <div className="flex h-full flex-col">
      <div className="flex justify-between px-8 pt-4">
        <CompanyBar data={folder} />
        <div>
          <Link href="./">X</Link>
        </div>
      </div>
      {children}
    </div>
  );
}
