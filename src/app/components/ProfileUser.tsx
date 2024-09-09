'use client'
import Image from "next/image";
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import Link from "next/link";

export default function ProfileUser() {
    const [userName, setUserName] = useState<string | null>(null);
    const [cookieUserName, setCookieUserName] = useState(getCookie('userName')); // Utiliza un estado para almacenar el valor de la cookie

    useEffect(() => {
        setUserName(cookieUserName as string | null);
    }, [cookieUserName]); // Utiliza el estado en el arreglo de dependencias

    useEffect(() => {
        const intervalId = setInterval(() => {
        const nuevoValor = getCookie('userName');
        if (nuevoValor !== cookieUserName) {
            setCookieUserName(nuevoValor);
        }
        }, 1000); // Verifica cada segundo si la cookie ha cambiado
        return () => clearInterval(intervalId);
    }, [cookieUserName]);

    return (
        <div>
        {userName ? (
            <a href="#" className="inline-flex space-x-2 items-center">
            <span>
                <Image className="rounded-full w-8 h-8" src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c" alt="user avatar" width={50} height={50} />
            </span>
            <span className="text-sm md:text-base font-bold">
                <span className="hidden md:inline">Hola, </span>
                {userName}
            </span>
            </a>
        ) : (
            <Link href="/dashboard/memorize">Hola<span className="underline hidden md:inline text-blue-300">, cual es tu nombre de jugador</span></Link>
        )}
        </div>
    )
}