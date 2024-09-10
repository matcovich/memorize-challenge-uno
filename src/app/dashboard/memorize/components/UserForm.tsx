'use client'
import { setCookie, getCookie, deleteCookie } from 'cookies-next';

import { useState, useEffect } from 'react';
import ErrorMessage from './ErrorMessage';
export default function UserForm() {

    const [userName, setUserName] = useState('');
    const [error, setError] = useState('');

    const [hasCookie, setHasCookie] = useState(false);

    useEffect(() => {
        const cookieUserName = getCookie('userName');
        if (cookieUserName) {
        setHasCookie(true);
        }
    }, []);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!userName) {
        setError('Por favor, ingresa tu nombre de usuario');
        return;
        }
        if (userName.length < 3) {
        setError('El nombre de usuario debe tener al menos 3 caracteres');
        return;
        }
        setCookie('userName', userName.toString());
        setHasCookie(true);
    };
    const handleLogout = () => {
        deleteCookie('userName');
        setHasCookie(false);
    };
    if (hasCookie)  {
        return(
            <div className="flex flex-col items-end justify-center h-full">
                <button className="border-2 border-red-400 rounded-lg py-2 px-12 hover:bg-red-400 hover:text-white text-red-600 font-bold md:-mt-10 mb-16 " onClick={handleLogout}>Salir</button>
            </div>
        );
    }


return (
    <div className="flex flex-col items-center justify-center h-full">
        <form
        onSubmit={handleSubmit}
        className="bg-white border  lg:w-3/5 rounded-lg lg:rounded-2xl p-8 mt-4 lg:p-16 flex flex-col gap-6 space-y-4 shadow-lg "
        >
            <legend className=" lg:text-xl font-bold text-sky-600 uppercase text-center border-b-2 lg:border-b-4 border-sky-600 mb-6 lg:mb-0"> Ingresa tu nombre de jugador </legend>

            <div className='flex flex-col gap-2'>
                <label
                    className="text-sky-600 font-bold"
                    htmlFor="userName"
                >
                    Nombre de usuario:
                </label>
                <input
                    type="text"
                    id="userName"
                    className="border-2 border-sky-600 rounded-lg p-2"
                    placeholder="Ingresa tu nombre de usuario"
                    name="userName"
                    value={userName}
                    onChange={(event) => setUserName(event.target.value)}
                />
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </div>

            <input
                className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-lg cursor-pointer"
                type="submit"
                value="Ingresar a la partida"
            />
        </form>
    </div>
)
}
