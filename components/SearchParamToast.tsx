'use client'

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function SearchParamToast() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const noAccess = searchParams.get("noAccess");
    if (noAccess === "true") {
      toast.error("You don't have access to this document.");
    }
  }, [searchParams]);

  return null; // This component just handles the toast logic
}
