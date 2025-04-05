import { useEffect, useState } from "react";
import PermissionsLayout from "./permissionLayout";
import * as Contacts from "expo-contacts";

export default function ContactsPermission() {
  const [permission, setPermission] = useState<Contacts.PermissionResponse | undefined>(undefined);

  // Función para solicitar acceso a contactos
  const requestPermission = async () => {
    const result = await Contacts.requestPermissionsAsync();
    setPermission(result);
  };

  // Verificar el estado del permiso al montar el componente
  useEffect(() => {
    const checkPermission = async () => {
      const result = await Contacts.getPermissionsAsync();
      console.log(result);
      setPermission(result);
    };

    checkPermission();
  }, []);

  return (
    <PermissionsLayout
      icon="people-sharp"
      title="Contactos"
      granted={permission?.granted || false}
      requestPermission={requestPermission}
    />
  );
}
