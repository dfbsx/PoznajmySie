"use client";

import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  return (
    <>
      Strona
    </>
  );
}
