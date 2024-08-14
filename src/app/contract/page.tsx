"use client"
import Button from "@/components/Button/Button";
import styles from "./Contract.module.css";
import { useRouter } from "next/navigation";
import contract from "../../../constants.json"
import { useReadContract, useWriteContract } from 'wagmi'
import { FormEvent, useDebugValue, useEffect, useState } from "react";

export default function Contract() {
    // Initialize the router
    const router = useRouter();

    // Function to navigate to the Home page
    const handleNewRouter = () => {
        router.push("/")
    }

    // Read data from the contract
    const { data, isError, isLoading } = useReadContract({
        address: "0x5cAB3567C9f868b2fE5B442eD2af7317dfC7565f", // Contract address
        abi: contract, // Contract ABI
        functionName: "getHello", // Function name to read from the contract
    });

    // Write data to the contract
    const { writeContract } = useWriteContract();

    // Function to update value in the contract
    const updateValue = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission
        const formData = new FormData(e.currentTarget); // Get form data
        const value = formData.get("name") as String; // Get the value from the form input

        // Write to the contract with the new value
        writeContract({
            address: "0x5cAB3567C9f868b2fE5B442eD2af7317dfC7565f", // Contract address
            abi: contract, // Contract ABI
            functionName: "updateValue", // Function name to write to the contract
            args: [value], // Arguments for the function
        });

        // Clear the form inputs
        e.currentTarget.reset();
    }

    return (
        <main className={styles.main}>
            <div className={styles.content}>
                <w3m-button />
            </div>
            <form onSubmit={updateValue} className={styles.form}>
                <label>New Value</label>
                <input type="text" name="name" />
                <button type="submit">Submit</button>
            </form>
            <h1>{isLoading ? "Loading..." : isError ? "Error" : data as String}</h1>
            <Button text="Go to Home" onClick={handleNewRouter} />
        </main>
    );
}