import { getDatabase } from '@firebase/database';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'

export const firebaseConfig = {
    apiKey: "AIzaSyBhSSF912sSu-Omf-XoCC8KzM4EbdABScM",
    authDomain: "reactts-7cf8a.firebaseapp.com",
    databaseURL: "https://reactts-7cf8a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "reactts-7cf8a",
    storageBucket: "reactts-7cf8a.appspot.com",
    messagingSenderId: "206873354238",
    appId: "1:206873354238:web:ffac2405f17b110615aaaf"
};

initializeApp(firebaseConfig);

// Realtime database
export const dbrealtime = getDatabase(initializeApp(firebaseConfig));
export const auth = getAuth();

