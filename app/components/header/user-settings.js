"use client";
import ContentStore from "@/app/lib/contentStore";

export default function UserSettings() {
  const handleClic = () => {
    ContentStore(true);
  };

  return <button onClick={handleClic}>SetUser</button>;
}
