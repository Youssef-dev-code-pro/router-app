// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, getDocs } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyABgdGKzGueLyQIvV2moC85NzdrnFXQfg4",
//   authDomain: "vans-life-f6ab6.firebaseapp.com",
//   projectId: "vans-life-f6ab6",
//   storageBucket: "vans-life-f6ab6.firebasestorage.app",
//   messagingSenderId: "295814918027",
//   appId: "1:295814918027:web:67d0bc33c91cdd8851c98e",
//   measurementId: "G-51D5DVD9TS",
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const vansCollectionRef = collection(db, "vans");

// async function testGetVans() {
//   try {
//     console.log("قبل getDocs");

//     const timeoutPromise = new Promise((_, reject) =>
//       setTimeout(() => reject(new Error("timeout after 10s")), 10000)
//     );

//     const snapshot = await Promise.race([
//       getDocs(vansCollectionRef),
//       timeoutPromise,
//     ]);

//     console.log("بعد getDocs");
//     snapshot.docs.forEach((doc) => {
//       console.log(doc.id, doc.data());
//     });
//   } catch (error) {
//     console.error("خطأ في جلب البيانات:", error);
//   }
// }

// testGetVans();
