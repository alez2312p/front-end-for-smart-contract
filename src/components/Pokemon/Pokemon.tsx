import Image from 'next/image';
import React from 'react';
import styles from "./Pokemon.module.css";

interface PokemonProps {
    name: string;
    image: string;
    abilities: string[];
}

const Pokemon: React.FC<PokemonProps> = ({ name, image, abilities }) => {
    return (
        <div className={styles.pokemon}>
            <h1>{name}</h1>
            <Image src={image} alt={name} width={200} height={200} />
            <h2>Abilities:</h2>
            <ul>
                {abilities.map((ability, index) => (
                    <li key={index}>{ability}</li>
                ))}
            </ul>
        </div>
    );
};

export default Pokemon;
