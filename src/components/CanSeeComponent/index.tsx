import { ReactNode } from "react"
import { useIs } from "../../hooks";

interface CanSeeComponentProps {
    children: ReactNode;
    roles: {
        name: string;
    }[]
}

export function CanSeeComponent({ children, roles }: CanSeeComponentProps) {
    const userCanSeeComponent = useIs({
        roles
    })

    if (!userCanSeeComponent) {
        return null;
    }

    return (
        <>
         {children}
        </>
    )
}