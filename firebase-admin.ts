// server is a secure environment so we can assume as admin which have all permission to do anything

import {initializeApp, getApps, App, getApp, cert,  } from "firebase-admin/app"
import {getFirestore} from "firebase-admin/firestore"

// const serviceKey = require("@/service_key.json")

// import serviceKey from "@/service_key.json" assert { type: "json" };


let app:App;   // define type of app

// Pull the JSON string from the environment
const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
if (!serviceAccountString) {
  throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY env var is missing");
}

// Parse it back into an object
const serviceAccount = JSON.parse(serviceAccountString);



if(getApps().length===0){
    app=initializeApp({
        credential:cert(serviceAccount)
    });
}else{
    app=getApp();
}

const adminDb=getFirestore(app);

export {app as adminApp, adminDb}