// Importamos las dependencias necesarias
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getCookie } from 'cookies-next';
// Definimos la interfaz para los datos de la imagen
interface ImageData {
  url: string;
  name: string;
}
// Función principal del componente
export default function ImageList() {
  // Estados para almacenar la lista de imágenes, imágenes seleccionadas, imágenes duplicadas, dificultad, errores, aciertos y nombre de usuario
  const [imageList, setImageList] = useState<ImageData[]>([]);
  const [selectedImages, setSelectedImages] = useState<ImageData[]>([]);
  const [duplicatedImages, setDuplicatedImages] = useState<ImageData[]>([]);
  const [difficulty, setDifficulty] = useState('easy');
  // const [reset, setReset] = useState(false);
  const [errors, setErrors] = useState(0);
  const [correctMatches, setCorrectMatches] = useState(0);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [userName, setUserName] = useState(getCookie('userName'));

  // Efecto para obtener la lista de imágenes al montar el componente
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('https://challenge-uno.vercel.app/api/images');
        const data = await response.json();
        setImageList(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchImages();
  }, []);

  // Función para mezclar un arreglo
  function shuffle<T>(arr: T[]): T[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
// Efecto para seleccionar y mezclar las imágenes según la dificultad
  useEffect(() => {
    if (imageList.length > 0) {
      const indexes = Array.from({ length: imageList.length }, (_, i) => i);
      const shuffledIndexes = shuffle(indexes);
      let numberOfImages = 0;
      switch (difficulty) {
        case 'easy':
          numberOfImages = 8;
          break;
        case 'medium':
          numberOfImages = 12;
          break;
        case 'hard':
          numberOfImages = 20;
          break;
        default:
          numberOfImages = 8;
      }
      const selectedImages = shuffledIndexes.slice(0, numberOfImages).map(index => imageList[index]);
      setSelectedImages(selectedImages);
    }
  }, [imageList, difficulty]);
// Efecto para duplicar y mezclar las imágenes seleccionadas
  useEffect(() => {
    if (selectedImages.length > 0) {
      const duplicatedImages = [...selectedImages, ...selectedImages];
      const shuffledDuplicatedImages = shuffle(duplicatedImages);
      setDuplicatedImages(shuffledDuplicatedImages);
    }
  }, [selectedImages]);
 // Función para cambiar la dificultad
  const handleDifficultyChange = (difficulty: string) => {
    setDifficulty(difficulty);
    // Resetear estados
    setFlipped([]); // Reset flipped state
    setSolved([]); // Reset solved state
    setErrors(0); // Reset errors counter
    setCorrectMatches(0); // Reset correct matches counter
  };

// Estados para almacenar las imágenes volteadas y resueltas
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);
  // Efecto para comprobar si hay una coincidencia
  useEffect(() => {
    const checkForMatch = () => {
      if (flipped.length === 2) {
        const [first, second] = flipped;
        if (duplicatedImages[first] === duplicatedImages[second]) {
          setSolved([...solved, ...flipped]);
        }
        setFlipped([]);
      }
    };
    if (flipped.length === 2) {
      setTimeout(() => {
        checkForMatch();
      }, 1000);
    }
  }, [flipped, duplicatedImages, solved, difficulty]);
// Función para voltear una imagen
  const handleFlip = ( index: number) => {
    if (!flipped.includes(index) && flipped.length < 2) {
      setFlipped([...flipped, index]);
    }
  };
  // Efecto para comprobar si hay una coincidencia y actualizar los aciertos y errores
  useEffect(() => {
    const checkForMatch = () => {
      if (flipped.length === 2) {
        const [first, second] = flipped;
        if (duplicatedImages[first] === duplicatedImages[second]) {
          setSolved([...solved, ...flipped]);
          setCorrectMatches(correctMatches + 1);
        } else {
          setErrors(errors + 1);
        }
        setFlipped([]);
      }
    };
    if (flipped.length === 2) {
      setTimeout(() => {
        checkForMatch();
      }, 500);
    }
  }, [flipped, duplicatedImages, solved, errors, correctMatches]);
 // Efecto para mostrar la felicitación al terminar el juego
  useEffect(() => {
    if (solved.length === duplicatedImages.length && solved.length > 0) {
      setShowCongratulations(true);
      setTimeout(() => {
        setShowCongratulations(false);
        setFlipped([]);
        setSolved([]);
        setErrors(0);
        setCorrectMatches(0);
        setUserName(getCookie('userName'));
      },
      6000);
    }
  }, [solved, duplicatedImages, flipped]);

  // const resetGame = () => {
  //   setFlipped([]);
  //   setSolved([]);
  //   setDifficulty('easy');
  // };

  return (
    <>
      <div className="w-full container mx-auto flex flex-col lg:flex-row items-center justify-between mb-4 -mt-12 lg:my-3 gap-4">

      {showCongratulations  ? (
          <div className="xl:flex  w-full  lg:w-2/3 text-center  font-semibold lg:text-lg">
            ¡Felicitaciones {userName} Has terminado con: <br></br> <span className="text-green-500 mx-2"> {correctMatches} aciertos</span> y con <span className="ml-2 text-red-500">{errors} errores</span> .
          </div>
        ): (
          <div className="flex gap-2  w-full  lg:w-2/3 text-center items-center justify-center lg:justify-start">
              <p className="text-xl"> Hola {userName} tienes: </p>
              <div className="flex justify-center items-center text-center font-semibold text-xl text-red-500 mr-6">
                Errores: <span className="text-3xl"> {errors}</span>
              </div>
              <div className="flex justify-center items-center text-center font-semibold text-xl text-green-500">
              Aciertos: <span className="text-3xl">{correctMatches}</span>
              </div>
        </div>
        )}
        <div className="flex gap-2 lg:w-1/3">
          <input
            type="submit"
            value={"fácil"}
            disabled={difficulty === 'easy'}
            className="bg-green-50 p-2 rounded-md w-full text-green-600 border-green-300 border-2 uppercase tracking-widest cursor-pointer disabled:bg-slate-100 disabled:text-slate-600 disabled:border-slate-300 disabled:cursor-not-allowed disabled:opacity-50" onClick={() => handleDifficultyChange('easy')} />
          <input
            type="submit"
            value={"medio"}
            disabled={difficulty === 'medium'}
            className="bg-yellow-50 p-2 rounded-md w-full text-yellow-600 border-yellow-300 border-2 uppercase tracking-widest cursor-pointer disabled:bg-slate-100 disabled:text-slate-600 disabled:border-slate-300 disabled:cursor-not-allowed disabled:opacity-50" onClick={() => handleDifficultyChange('medium')} />
          <input
            type="submit"
            value={"dificil"}
            disabled={difficulty === 'hard'}
            className="bg-red-50 p-2 rounded-md w-full text-red-600 border-red-300 border-2 uppercase tracking-widest cursor-pointer disabled:bg-slate-100 disabled:text-slate-600 disabled:border-slate-300 disabled:cursor-not-allowed disabled:opacity-50" onClick={() => handleDifficultyChange('hard')} />
          {/* <input
            type="submit"
            value={"reiniciar"}
            className="bg-blue-50 p-2 rounded-md w-full text-blue-600 border-blue-600 border-2 uppercase tracking-widest cursor-pointer" onClick={resetGame} /> */}
        </div>
      </div>

      <div className="grid grid-cols-4 lg:grid-cols-8 gap-4 w-fit h-full mx-auto pb-8">
        {duplicatedImages.map((image, index) => (
          <div
            key={index}
            className="p-1 border-4 border-gray-400 shadow-slate-300 shadow-md w-20  xl:w-28 min-h-24 xl:h-36  flex justify-center rounded-md cursor-pointer"
            onClick={() => handleFlip(index)}
            >
            {flipped.includes(index)  || solved.includes(index) ? (
              <Image className='transform rotate-y-180 transition-transform duration-500' src={image.url} alt="AFP UNO" width={100} height={120} quality={100} style={{ objectFit: 'cover' }} />
            ): (
              <div className="w-full h-full flex justify-center items-center ">
                <Image
                  src="https://www.uno.cl/_next/static/media/logo-uno.fcd9df2d.svg"
                  width={80}
                  height={50}
                  alt="AFP UNO"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};