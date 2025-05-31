import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  connectFirestoreEmulator,
} from "firebase/firestore";

// إعدادات الفايربيز بتاعتك
const firebaseConfig = {
  apiKey: "AIzaSyABgdGKzGueLyQIvV2moC85NzdrnFXQfg4",
  authDomain: "vans-life-f6ab6.firebaseapp.com",
  projectId: "vans-life-f6ab6",
  storageBucket: "vans-life-f6ab6.firebasestorage.app",
  messagingSenderId: "295814918027",
  appId: "1:295814918027:web:67d0bc33c91cdd8851c98e",
  measurementId: "G-51D5DVD9TS",
};

// تعريف نوع البيانات Van
type Van = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  type: string;
  description: string;
  hostId: string;
};

// تهيئة التطبيق وقاعدة البيانات
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// توصيل المحاكي (لو شغال على محلي)
connectFirestoreEmulator(db, "localhost", 8080);

// تعريف المرجع للـ collection "vans"
const vansCollectionRef = collection(db, "vans");

// دالة لجلب كل الفانات
export async function getVans(): Promise<Van[]> {
  try {
    console.log("داخل getVans قبل getDocs");
    const snapshot = await getDocs(vansCollectionRef);
    console.log("بعد getDocs");
    const vans = snapshot.docs.map((doc) => {
      const data = doc.data() as Omit<Van, "id">;
      return {
        ...data,
        id: doc.id,
      };
    });
    console.log("بعد تجهيز الفانز:", vans);
    return vans;
  } catch (error) {
    console.error("في خطأ داخل getVans:", error);
    return [];
  }
}

// دالة لجلب فان معين حسب الـ id
export async function getVan(id: string): Promise<Van> {
  try {
    const docRef = doc(db, "vans", id);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) throw new Error("العربية مش موجودة");
    return {
      ...snapshot.data(),
      id: snapshot.id,
    } as Van;
  } catch (err) {
    console.error(`🚨 Error fetching van with id ${id}:`, err);
    throw new Error("فشل في تحميل بيانات العربية");
  }
}

// دالة لجلب العربيات الخاصة بهوست معين (hostId = "123")
export async function getHostVans(): Promise<Van[]> {
  try {
    const q = query(vansCollectionRef, where("hostId", "==", "123"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as Van[];
  } catch (err) {
    console.error("🚨 Error fetching host vans:", err);
    throw new Error("فشل في تحميل عربيات الهوست");
  }
}

// import { initializeApp } from "firebase/app";
// import {
//   getFirestore,
//   collection,
//   doc,
//   getDocs,
//   getDoc,
//   query,
//   where,
// } from "firebase/firestore";

// import { FirebaseError } from "firebase/app";

// const firebaseConfig = {
//   apiKey: "AIzaSyD_k3v3HK3tKEqhlqFHPkwogW7PqEqhGhk",
//   authDomain: "vanlife-a1af5.firebaseapp.com",
//   projectId: "vanlife-a1af5",
//   storageBucket: "vanlife-a1af5.appspot.com",
//   messagingSenderId: "803007000356",
//   appId: "1:803007000356:web:446cd3a1ca406839258db1",
// };

// type Van = {
//   id: string;
//   name: string;
//   price: number;
//   imageUrl: string;
//   type: string;
//   description: string;
// };

// type User = {
//   email: string;
//   password: string;
//   name: string;
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// const vansCollection = collection(db, "vans");
// const usersCollection = collection(db, "users");

// export async function getVans(): Promise<Van[]> {
//   try {
//     console.log("🔥 بنجرب نوصل لـ Firebase...");
//     const vansDocs = await getDocs(vansCollection);
//     const vans = vansDocs.docs.map((doc) => {
//       const data = doc.data() as Omit<Van, "id">;
//       return {
//         ...data,
//         id: doc.id,
//       };
//     });
//     return vans;
//   } catch (error) {
//     if (error instanceof FirebaseError) {
//       console.error("🔥 FirebaseError:", error.code, error.message);
//     } else if (error instanceof Error) {
//       console.error("🔥 Error:", error.message);
//     } else {
//       console.error("🔥 Unknown error:", error);
//     }
//     throw error; // مهم ترمي الخطأ تاني عشان الدالة تعلن بفشل العملية لو حبيت تعالجها برا
//   }
// }

// export async function getVan(id: string): Promise<Van> {
//   const vanDoc = doc(db, "vans", id);
//   const van = await getDoc(vanDoc);
//   const Data = van.data() as Omit<Van, "id">;

//   if (van.exists()) {
//     return {
//       ...Data,
//       id: van.id,
//     };
//   } else {
//     throw new Error("العربية مش موجودة يا طو");
//   }
// }

// export async function hostVans(): Promise<Van[]> {
//   const listedVans = query(vansCollection, where("hostId", "==", "123"));

//   const vansDocs = await getDocs(listedVans);

//   const vans = vansDocs.docs.map((doc) => {
//     const Data = doc.data() as Omit<Van, "id">;
//     return {
//       ...Data,
//       id: doc.id,
//     };
//   });

//   return vans;
// }

// export async function hostVan(id: string): Promise<Van> {
//   const hostVanDoc = doc(db, "vans", id);

//   const vansDocs = await getDoc(hostVanDoc);
//   const Data = vansDocs.data() as Omit<Van, "id">;

//   if (vansDocs.exists()) {
//     return {
//       ...Data,
//       id: vansDocs.id,
//     };
//   } else {
//     throw new Error("العربية مش موجودة يا طو");
//   }
// }

// export async function getUsers(): Promise<User[]> {
//   const usersDocs = await getDocs(usersCollection);

//   const users = usersDocs.docs.map((user) => {
//     const Data = user.data() as Omit<User, "id">;
//     return {
//       ...Data,
//       id: user.id,
//     };
//   });

//   return users;
// }

// Refactoring the fetching functions below
// const vansCollectionRef = collection(db, "vans");

// export async function getVans() {
//   const snapshot = await getDocs(vansCollectionRef);
//   const vans = snapshot.docs.map((doc) => ({
//     ...doc.data(),
//     id: doc.id,
//   }));
//   return vans;
// }

// export async function getVan(id: string) {
//   const docRef = doc(db, "vans", id);
//   const snapshot = await getDoc(docRef);
//   return {
//     ...snapshot.data(),
//     id: snapshot.id,
//   };
// }

// export async function getHostVans() {
//   const q = query(vansCollectionRef, where("hostId", "==", "123"));
//   const snapshot = await getDocs(q);
//   const vans = snapshot.docs.map((doc) => ({
//     ...doc.data(),
//     id: doc.id,
//   }));
//   return vans;
// }
