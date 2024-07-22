export const homePage = (_req, res) => {
    res.status(200).json({
        message: 'Welcome to Demo REST API! Here are the available endpoints',
        version: '1.2.0',
        author: 'Nimendra',
        license: 'MIT',
        github: 'https://github.com/nmdra/rest-api',
        endpoints: [
            {
                method: 'POST',
                endpoint: '/api/users/register',
                description: 'Register a new user',
            },
            {
                method: 'POST',
                endpoint: '/api/users/auth',
                description: 'Authenticate a user and get token',
            },
            {
                method: 'POST',
                endpoint: '/api/users/logout',
                description: 'Logout user and clear cookie',
            },
            {
                method: 'GET',
                endpoint: '/api/users/profile',
                description: 'Get user profile',
            },
            {
                method: 'POST',
                endpoint: '/api/users/profile',
                description: 'Get user profile',
            },
            {
                method: 'PUT',
                endpoint: '/api/users/profile',
                description: 'Update user profile',
            },
            {
                method: 'DELETE',
                endpoint: '/api/users/delete',
                description: 'Delete user',
            },
            {
                method: 'GET',
                endpoint: '/api/movies/limit:limit&skip:skip',
                description: 'Get All Movies with Pagination',
            },
            {
                method: 'GET',
                endpoint: '/api/movies/:imdbId',
                description: 'Get Movie By IMDb ID',
            },
        ],
    })
}
