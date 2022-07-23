import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { validateUserPermissions } from "../utils/validateUserPermissions";

export function useAuth() {
    return useContext(AuthContext);
}

interface UseIsParams {
    roles?: {
        name: string;
    }[];
}

export function useIs({ roles }: UseIsParams) {
    const { user, isUserLoggedIn } = useContext(AuthContext)

    if (!isUserLoggedIn) {
        return false;
    }

    const userHasValidPermissions = validateUserPermissions({
        user,
        roles
    })

    return userHasValidPermissions;
}