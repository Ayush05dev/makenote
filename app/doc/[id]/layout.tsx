import RoomProvider from "@/components/ui/RoomProvider";
import { auth } from "@clerk/nextjs/server";
import { adminDb } from "@/firebase-admin";
import { redirect } from "next/navigation";

type DocLayoutProps = {
  children: React.ReactNode;
  params: { id: string };
};

export default async function DocLayout({ children, params: { id } }: DocLayoutProps) {
 // ✅ This will automatically redirect if user is not signed in
  const { sessionClaims } = await auth.protect();


  // 2️⃣ Check Firestore to see if this user has access to this room
  const roomsSnapshot = await adminDb
    .collectionGroup("rooms")
    .where("roomId", "==", id)
    .where("userId", "==", sessionClaims!.email!)
    .get();

  if (roomsSnapshot.empty) {
    // Signed in but not in this room → back home with an indicator
    redirect(`/?noAccess=true`);
  }

  return <RoomProvider roomId={id}>{children}</RoomProvider>;
}
