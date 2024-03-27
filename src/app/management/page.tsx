"use client";

import { usePathname, useRouter } from "next/navigation";

function Management() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/management") router.push("/management/home"); // route to home
  return <div></div>;
}

export default Management;
