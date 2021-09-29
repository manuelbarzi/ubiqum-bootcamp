export default async function (token) {
    const response = await fetch('http://localhost:5000/accounts', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (response.status === 200) {
        const account = await response.json();

        return account
    }

    throw new Error('could not retrieve account')
}