import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";
import decode from 'jwt-decode'
import { validateUserPermissions } from "./validateUserPermissions";

interface WithSSRAuthProps {
    roles: {
        name: string;
    }[];
}

export function withSSRAuth<P>(fn: GetServerSideProps<P>, options?: WithSSRAuthProps) {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const { '@kronuhs-dashboard:token': token } = parseCookies(ctx);

        if (!token) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        }

        if (options) {
            const user = decode<{ roles: { name: string }[] }>(token)

            const { roles } = options;

            const userHasValidPermissions = validateUserPermissions({
                user,
                roles
            })

            if (!userHasValidPermissions) {
                return {
                    redirect: {
                        destination: '/home',
                        permanent: false
                    }
                }
            }
        }

        return await fn(ctx)
    }
}