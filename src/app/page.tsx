import Link from "next/link";

export default function Home() {
  return (
    <div className="mt-72 ">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Home Page</h1>
        <Link href="/dashboard" className="text-blue-500 underline decoration-none" >
          Dashboard
        </Link>
      </div>
    </div>
  );
}
