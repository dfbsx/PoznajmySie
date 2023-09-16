"use client"

import { useSearchParams } from "next/navigation";

export default function Page(){
    const searchParams = useSearchParams()
 
  const search = searchParams.get('search')
    return(<>
    Strona
    <h1>ID z URL: {search}</h1>
    </>);
}