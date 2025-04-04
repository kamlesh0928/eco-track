import { useState, useEffect } from "react";

export default function ClientOnly({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);  // Jab mount ho jaye tab state update karo
  }, []);

  if (!mounted) return null;  // Jab tak mount na ho, kuch bhi return na karo

  return <>{children}</>;  // Jab mount ho jaye tab children dikhaye
}
