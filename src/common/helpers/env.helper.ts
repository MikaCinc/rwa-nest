import { existsSync } from "fs";
import { resolve } from "path";

function getEnvPath(destination: string) : string {
    const env: string | undefined = process.env.NODE_ENV;
    const fallback: string = resolve(`${destination}/.env`);

    // ako NODE_ENV nije postavljen, uzimamo development.env
    const filename: string = env ? `${env}.env` : 'development.env';

    let filepath: string = resolve(`${destination}/${filename}`);

    // ako development.env ne postoji, uzimamo obican .env
    if(!existsSync(filepath)) { filepath = fallback; }

    return filepath;
}

export { getEnvPath };