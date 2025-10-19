"use client";

import { useState } from "react";

function Hello({ name }: { name: string; }) {
  return <h1>Hello, {name}!</h1>;
}


export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1 onClick={() => setCount(count + 1)}>hello world {count}</h1>
      <Hello name="test" />
    </div>
  );
}