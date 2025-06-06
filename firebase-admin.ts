// server is a secure environment so we can assume as admin which have all permission to do anything

import {initializeApp, getApps, App, getApp, cert,  } from "firebase-admin/app"
import {getFirestore} from "firebase-admin/firestore"

const serviceKey = require("@/service_key.json")

// import serviceKey from "@/service_key.json" assert { type: "json" };


let app:App;   // define type of app

if(getApps().length===0){
    app=initializeApp({
        credential:cert(serviceKey)
    });
}else{
    app=getApp();
}

const adminDb=getFirestore(app);

export {app as adminApp, adminDb}