
function login (username, password) {
    const email = '';
    return fetch('localhost:8081/login', {
    method: 'POST',
    body: {username, password, email}
    });
}


export default {
    login
}