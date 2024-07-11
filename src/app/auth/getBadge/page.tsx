import GeneratedBadge from "./_components/showBadge";
export default function GetBadge() {
  return (
    <div className="flex h-full flex-col">
      <h1 className="mt-[8vh] text-center text-5xl">Enigma</h1>
      <div className="mt-[5vh] flex w-full flex-grow flex-col items-center gap-4">
        <GeneratedBadge />
      </div>
    </div>
  );
}
