"use client"

import { Button } from "@/components/ui/button";
export default function Home() {

  const callthing = async () => {
    const res = await fetch("/api/twelvelabs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: "hot pot" }),
    })

    const data = await res.json()

    console.log(data)
  }

  return (
    <div>
        <Button onClick={callthing}>Hi</Button>
    </div>
  );
}
