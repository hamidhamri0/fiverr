"use client";
import React from "react";
import { useEffect } from "react";

export default function Client() {
  const [name, setName] = React.useState("");
  return (
    <div>
      <button onClick={() => setName(name ? "" : "John")}>Toggle Name</button>
      <ClientTwo open={name} />
    </div>
  );
}

function ClientTwo({ open }: { open: string }) {
  const [name, setName] = React.useState("");
  useEffect(() => {
    console.log("MOUNTED");

    () => {
      console.log("UNMOUNTED");
    };
  }, []);

  if (!open) return false;
  return (
    <div>
      <h1>{name}</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} />
    </div>
  );
}
