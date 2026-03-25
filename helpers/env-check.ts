export function checkEnv(): void {
    if (!process.env.GOREST_TOKEN) {
        throw new Error('Missing GOREST_TOKEN in environment variables');
    }
}