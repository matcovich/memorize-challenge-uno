'use client'
import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';

import ImageList from './ImageList';


export default function MemoryGame() {
    const [userName, setUserName] = useState<string | null>(null);
    const [cookieUserName, setCookieUserName] = useState(getCookie('userName'));

    useEffect(() => {
        setUserName(cookieUserName as string | null);
    }, [cookieUserName]);

    useEffect(() => {
        const intervalId = setInterval(() => {
        const newValue = getCookie('userName');
        if (newValue !== cookieUserName) {
            setCookieUserName(newValue);
        }
        }, 1000);
        return () => clearInterval(intervalId);
    }, [cookieUserName]);


    return (
        <div>
        {userName ? (
            <ImageList/>
        ) : (
            <div></div>
        )}
        </div>
    );
}