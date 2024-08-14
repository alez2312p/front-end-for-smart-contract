"use client";
import React, { useEffect, useState } from "react";
import Pokemon from "@/components/Pokemon/Pokemon";
import styles from "./Pokemons.module.css";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";

// Define la interfaz para los datos de Pokémon
interface PokemonData {
    name: string;
    image: string;
    abilities: string[];
}

export default function Pokemons() {
    // Estado para almacenar los datos de los Pokémon
    const [pokemons, setPokemons] = useState<PokemonData[]>([]);
    const router = useRouter();

    // Maneja la navegación a la página de inicio
    const handleNewRouter = () => {
        router.push("/");
    };

    // Efecto que se ejecuta al montar el componente
    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                // Solicita la lista de Pokémon
                const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=2");
                const data = await res.json();

                // Para cada Pokémon, solicita detalles adicionales
                const pokemonPromises = data.results.map(async (pokemon: { name: string; url: string }) => {
                    const pokemonRes = await fetch(pokemon.url);
                    const pokemonData = await pokemonRes.json();
                    console.log({ name: pokemon.name, image: pokemonData.sprites.front_default });
                    return {
                        name: pokemonData.name,
                        image: pokemonData.sprites.front_default,
                        abilities: pokemonData.abilities.map((ability: any) => ability.ability.name),
                    };
                });

                // Espera a que se completen todas las solicitudes de detalles
                const pokemonResults = await Promise.all(pokemonPromises);
                // Actualiza el estado con los datos obtenidos
                setPokemons(pokemonResults);
            } catch (error) {
                console.error("Error fetching Pokémon data:", error);
            }
        };

        // Llama a la función para obtener los datos de los Pokémon
        fetchPokemons();
    }, []);

    return (
        <div className={styles.main}>
            <div className={styles.content}>
                {/* Renderiza un componente Pokemon para cada Pokémon en el estado */}
                {pokemons.map((pokemon, index) => (
                    <Pokemon key={index} name={pokemon.name} image={pokemon.image} abilities={pokemon.abilities} />
                ))}
            </div>
            {/* Botón para navegar a la página de inicio */}
            <Button text="Go to Home" onClick={handleNewRouter} />
        </div>
    );
}
