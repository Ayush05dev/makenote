// components/HomeClient.tsx
"use client";

import { useEffect } from "react";
import { ArrowLeftCircle } from "lucide-react";
import { toast } from "sonner";

export default function HomeClient() {
   useEffect(() => {
    // console.log("i am in useEffect")
    const params = new URLSearchParams(window.location.search);
    const noAccess = params.get("noAccess");

    if (noAccess === "true") {
        // console.log("i am in if block")
      toast.error("You don't have access to this document.");
    }
   
  }, []);


  return (
    <main className="flex space-x-2 items-center animate-pulse">
      <ArrowLeftCircle className="w-12 h-12" />
      <h1 className="font-bold">Get started with creating a New Document</h1>
    </main>
  );
}
