"use client";

import { useEffect } from "react";
import { ArrowLeftCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function Home() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const noAccess = searchParams.get("noAccess");
    if (noAccess === "true") {
      toast.error("You don't have access to this document.");
    }
  }, [searchParams]);

  return (
    <main className="flex space-x-2 items-center animate-pulse">
      <ArrowLeftCircle className="w-12 h-12" />
      <h1 className="font-bold">Get started with creating a New Document</h1>
    </main>
  );
}



// import { Suspense } from "react";
// import { ArrowLeftCircle } from "lucide-react";
// import SearchParamToast from "@/components/SearchParamToast";

// export default function Home() {
//   return (
//     <main className="flex space-x-2 items-center animate-pulse">
//       <ArrowLeftCircle className="w-12 h-12" />
//       <h1 className="font-bold">Get started with creating a New Document</h1>

//       {/* Suspense wrapper for the client-side toast logic */}
//       <Suspense fallback={null}>
//         <SearchParamToast />
//       </Suspense>
//     </main>
//   );
// }
