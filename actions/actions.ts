"use server"

import { adminDb } from "@/firebase-admin";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


/*
 In Server Actions, auth() returns:
 type AuthData = {
  userId: string | null;
  sessionId: string | null;
  getToken: (options?: GetTokenOptions) => Promise<string | null>;
  sessionClaims: Record<string, unknown> | null;
}
*/

export async function createNewDocument(){
    const { userId, sessionClaims } = await auth(); // in server actions auth() is asynchronous
  if (!userId) redirect("/sign-in");

  const docCollectionRef= adminDb.collection("documents");
  const docRef= await docCollectionRef.add({
    title:"Untitled Doc"
  })


// as here we directly set the item, directly given the value of different fields like userId, role etc. but we do not need to define any such schema before for firestore database(schemaless).
  await adminDb.collection('users').doc(sessionClaims?.email!).collection('rooms').doc(docRef.id).set({
    userId:sessionClaims?.email,
    role:"owner",
    createdAt:new Date(),
    roomId:docRef.id
  })
  
  return {docId:docRef.id};
}