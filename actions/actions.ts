"use server"

import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";


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
  auth.protect();
    const { userId, sessionClaims } = await auth(); // in server actions auth() is asynchronous
  // if (!userId) redirect("/sign-in");

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


export async function deleteDocument(roomId:string){
  auth.protect();

  // console.log("deleteDocument",roomId);

  try{
    // delete the document reference itself
    await adminDb.collection("documents").doc(roomId).delete();

    const query  =await adminDb.collection("rooms").where("roomId","==",roomId).get();

    const batch = adminDb.batch();
    // delete the room reference in the user's collection fro every user in the room
    query.docs.forEach((doc)=>{
      batch.delete(doc.ref);
    });

    await batch.commit();

    await liveblocks.deleteRoom(roomId);

    return {success:true}

  }
  catch(error) {
    console.error(error);
    return {success:false}
  }
}


export async function inviteUserToDocument(roomId:string, email:string){
  auth.protect();
  // console.log("inviteUserToDocument", roomId, email);

  try{

    await adminDb.collection("users").doc(email)
    .collection("rooms").doc(roomId)
    .set({userId:email,
      role:"editor",
      createdAt:new Date(),
      roomId,
    });
    return {success:true};
  }
  catch(error){
    console.error(error);
    return {success:false}
  }
}


export async function removeUserFromDocument(roomId:string , email:string){
  auth.protect();
  // console.log("removeUserFromDocument",roomId,email);

  try{
    await adminDb.collection("users")
    .doc(email)
    .collection("rooms")    // subcollections of user
    .doc(roomId)
    .delete();

    return {success:true};
  }
  catch(error){
    console.error(error);
    return {success:false};
  }
}