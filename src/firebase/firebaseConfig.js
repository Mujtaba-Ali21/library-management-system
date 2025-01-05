import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyByA6mv_HQP7QYsg0Go-w7yfyQgsnT8nMA",
  authDomain: "library-management-system-smiu.firebaseapp.com",
  projectId: "library-management-system-smiu",
  storageBucket: "library-management-system-smiu.firebasestorage.app",
  messagingSenderId: "219205197261",
  appId: "1:219205197261:web:6b5e69bc7eacf8e2fe7884",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
