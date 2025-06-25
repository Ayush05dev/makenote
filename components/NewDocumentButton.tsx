"use client"

import { useTransition } from "react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation";
import { createNewDocument } from "@/actions/actions";

function NewDocumentButton() {
    // await auth.protect() // it does not work in client components (for client components - either uss Protect (but it only visually hides the content) or you can pass the route in middleware.ts file inside clerkMiddleware function ) or then you have to redirect it  manually)
    const [isPending, startTransition]=useTransition(); 
    const router=useRouter()

    const handleCreateNewDocument = ()=>{
        startTransition(async ()=>{
            const {docId}=await createNewDocument();// here this function will handle authentication
            router.push(`/doc/${docId}`);

        //     const result = await createNewDocument();

        // if (!result || !result.docId) {
        //   console.error("No docId returned. Possibly unauthenticated?");
        //   // You can show toast here or redirect
        //   return;
        // }

        //  router.push(`/doc/${result.docId}`);
        })
    };

  return (
    <Button onClick={handleCreateNewDocument} disabled={isPending} >{
        isPending ? "Creating..." :"New Document"}</Button>
  )
}
export default NewDocumentButton