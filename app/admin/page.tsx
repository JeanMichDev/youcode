import Link from "next/link";

export default function AdminPage() {
  return (
    <div>
      <h1>Admin Page</h1>
      <Link href="/admin/courses">See my courses</Link>
    </div>
  );
}
