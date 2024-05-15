import GeneratedFolderIcon from "@/app/components/generatedIcon";
import { getFolderData } from "@/server/supabase/actions";
import Link from "next/link";
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
        <div>
          <div className="flex items-center gap-4">
            <h2 className="text-3xl">{folder.folder_name}</h2>
            <GeneratedFolderIcon
              folderIcon={folder.icon_name}
              folderName={folder.folder_name}
              className="h-7 w-7 text-xl"
            />
          </div>
          <p className="text-gray-300">#{folder.hashtag}</p>
        </div>
        <div>
          <Link href="./">X</Link>
        </div>
      </div>
      {children}
    </div>
  );
}
