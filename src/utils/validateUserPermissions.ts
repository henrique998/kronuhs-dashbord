interface User {
    roles: {
        name: string;
    }[];
}

interface validateUserPermissionsProps {
    user: User;
    roles?: {
        name: string;
    }[];
}

export function validateUserPermissions({ user, roles }: validateUserPermissionsProps) {
    const userRoles = user.roles?.map(userRole => userRole.name);

    if (roles?.length > 0 && userRoles) {
        const hasSomeRole = roles.some(role => userRoles.includes(role.name))

        if (!hasSomeRole) {
            return false;
        }
    }

    return true;
}