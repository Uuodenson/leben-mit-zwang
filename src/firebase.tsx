import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyCcHErKKMChASKp7yLgBRH5xE_nwMIC7C8",
    authDomain: "lebem-mit-zwang.firebaseapp.com",
    projectId: "lebem-mit-zwang",
    storageBucket: "lebem-mit-zwang.firebasestorage.app",
    messagingSenderId: "408968648776",
    appId: "1:408968648776:web:4ce590ba59a7cb45bda07d",
    measurementId: "G-M3Z7D02S82"
};

export const fbapp = initializeApp(firebaseConfig);
export const db = getFirestore(fbapp)