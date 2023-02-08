import Link from "next/link";
export default function Home() {
  return (
    <>
      <div className="navbar justify-center">
        <Link href="/categories">
          <div className="btn btn-ghost normal-case font-bold gap-2 text-6xl h-auto p-2 text-[#5C2D90] ">
            <img src="/logo.png" alt="logo" className="" />
          </div>
        </Link>
      </div>
      <div className="divider"></div>
    </>
  );
}
