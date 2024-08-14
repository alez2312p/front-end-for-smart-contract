"use client"
import Button from "@/components/Button/Button";
import styles from "./page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  // State to hold the current number
  const [number, setNumber] = useState(0);

  // Function to decrease the number
  const handleDecrease = () => {
    setNumber(number - 1);
  };

  // Function to increase the number
  const handleIncrease = () => {
    setNumber(number + 1);
  };

  // Function to navigate to new page
  const handleNewRouter = (path: string) => {
    router.push(`/${path}`)
  }

  return (
    <main className={styles.main}>
      <h1>Hello World</h1>
      <div className={styles.content}>
        <Button text="-" onClick={handleDecrease} />
        <span>{number}</span>
        <Button text="+" onClick={handleIncrease} />
      </div>
      <div className={styles.content}>
        <Button text="Go to Pokemons" onClick={() => { handleNewRouter("pokemons") }} />
        <Button text="Go to Contract" onClick={() => { handleNewRouter("contract") }} />
      </div>
    </main>
  );
}