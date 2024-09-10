'use client'

import MemoryGame from './components/MemoryGame';
import UserForm from './components/UserForm';

export default function MemorizePage() {

    return (
        <div className="flex flex-col">
            <h1 className="text-3xl font-bold lg:text-center text-sky-600 hidden md:block">MemorizeGame</h1>
            <UserForm />
            <MemoryGame />
        </div>
    )
}
