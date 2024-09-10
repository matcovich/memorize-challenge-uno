import Link from "next/link";

export default function MainPage() {
    return (
        <div className="flex flex-col items-center justify-center h-full text-sky-700">
        <h1 className="text-3xl font-bold text-center text-sky-600">Bienvenidos a MemorizeGame</h1>
        <p className="text-xl font-bold text-center mt-4">
            El objetivo del juego es encontrar las cartas que se repiten en el tablero.
        </p>
        <ul className="list-disc list-inside">
                <li className="text-xl text-center py-2">Por cada turno, debes voltear 2 cartas.</li>
                <li className="text-xl text-center py-2">Si las cartas no coinciden, se suma 1 punto de error en el marcador.</li>
                <li className="text-xl text-center py-2">Si las cartas coinciden, se suma 1 punto de acierto en el marcador.</li>
                <li className="text-xl text-center py-2">Las cartas que aciertes quedarán boca arriba.</li>
        </ul>
        <p className="text-lg text-center mt-2 flex flex-col gap-2 lg:flex-row items-center font-bold">
            Existen tres niveles:
            <span className="text-xl font-normal bg-green-200 p-2 mr-2 ml-2" >Fácil (8 parejas)</span> 
            <span className="text-xl font-normal bg-yellow-200 p-2 mr-2" >Medio (12 parejas)</span>  
            <span className="text-xl font-normal bg-red-200 p-2 mr-2" >Difícil (20 parejas).</span>
        </p>
        <Link href="/dashboard/memorize">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded mt-12">
            Jugar
            </button>
        </Link>
        </div>
    );
}
