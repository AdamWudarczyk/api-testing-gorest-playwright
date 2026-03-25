export function checkEnv() {
    const token = process.env.GOREST_TOKEN;

    if (!token) {
        throw new Error(`
Missing GOREST_TOKEN.

Add it in:
  • .env file locally
`);
    }
}