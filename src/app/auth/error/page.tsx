import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="flex h-full flex-col">
      <h1 className="my-[8vh] text-center text-5xl">Enigma</h1>
      <div className="mt-[10vh] flex w-full flex-grow flex-col items-center gap-8 text-center  *:text-xl">
        <p className="w-3/4">Ups! something went wrong!</p>
        <p className="w-3/4">
          {"Try again and if you still see this error try to contact Me :)"}
        </p>
        <Link
          className={`flex w-fit rounded-md border-2 px-4 py-1`}
          href={`./login`}
        >
          <p>main page!</p>
        </Link>
      </div>
    </div>
  );
}
