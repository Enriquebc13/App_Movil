import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
    query,
    where,
    onSnapshot,
  } from "firebase/firestore";
  import { db, auth } from "@/lib/firebaseConfig";
  
  export const obtenerNotas = (callback: Function) => {
    const user = auth.currentUser;
    if (!user) return;
  
    const q = query(collection(db, "notas"), where("userId", "==", user.uid));
    return onSnapshot(q, (snapshot) => {
      const notas = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(notas);
    });
  };
  
  export const agregarNota = async (titulo: string, texto: string) => {
    const user = auth.currentUser;
    if (!user) return;
    return await addDoc(collection(db, "notas"), { titulo, texto, userId: user.uid });
  };
  
  export const editarNota = async (id: string, titulo: string, texto: string) => {
    return await updateDoc(doc(db, "notas", id), { titulo, texto });
  };
  
  export const eliminarNota = async (id: string) => {
    return await deleteDoc(doc(db, "notas", id));
  };
  