import { HASURA_SECRET, HASURA_URL, SGRI_API } from "../app/app.constants";

export const environment = {
    production: true,
    defaultauth: 'fake-backend',
    baseUrlHasura: HASURA_URL,
    rootUrl: SGRI_API,
    hasuraAdminSecret: HASURA_SECRET,
    tz: 'UTC'
};



