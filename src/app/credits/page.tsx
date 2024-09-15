import Link from "next/link";
import "./globals.css";

//I dont care if this is fancy
export default function Credits() {
  return <div>
    <Link href="/" className="font-bold">&lt;- Back</Link>
    <h1>Made With:</h1>
    <ol className="list-disc list-inside">
      <li>NextJS</li>
      <li>react-player</li>
      <li>Soundcloud</li>
      <li>Tailwind</li>
    </ol>
  </div>
}