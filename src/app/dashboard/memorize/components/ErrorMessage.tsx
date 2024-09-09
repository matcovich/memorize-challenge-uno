import { PropsWithChildren } from "react"

export default function ErrorMessage( {children} : PropsWithChildren) {
    return (
        <p className="text-red-500 italic text-xs">
            {children}
        </p>
    )
}
