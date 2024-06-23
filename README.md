# Fake Movie Ticket API

This is a Node.js and Express-based API for managing movie data. The API allows users to add, fetch, update, and delete movie information, including showtimes and poster images. The data is stored in a MongoDB database using Mongoose as the ODM.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Models](#models)
- [Error Handling](#error-handling)
- [License](#license)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/movie-api.git
```

2. Navigate to the project directory:

```bash
cd movie-api
```

3. Install the dependencies:

```bash
npm install
```

4. Create a `.env` file in the root directory and add your MongoDB connection string and other environment variables:

```plaintext
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
PORT=5000
NODE_ENV=dev
```

5. Start the server:

```bash
npm start
```

The server will run on `http://localhost:5000`.

## Usage

You can use tools like Postman or curl to interact with the API. Below are the available endpoints and their usage.

## API Endpoints

### Movies

- **Add a new movie**

  ```http
  POST /api/movies
  ```

  **Request Body:**

  ```json
  {
    "title": "Inception",
    "imdbId": "tt1375666",
    "showtimes": [
      {
        "time": "2024-06-25T10:00:00Z",
        "screen": 1
      },
      {
        "time": "2024-06-25T14:00:00Z",
        "screen": 2
      }
    ],
    "posterImage": "https://example.com/inception.jpg"
  }
  ```

- **Get all movies**

  ```http
  GET /api/movies
  ```

- **Get a movie by IMDb ID**

  ```http
  GET /api/movies/:imdbId
  ```

- **Delete a movie by ID**

  ```http
  DELETE /api/movies/:id
  ```

## Models

### Movie

```json
{
  "title": "string",
  "imdbId": "string",
  "showtimes": [
    {
      "time": "date",
      "screen": "number"
    }
  ],
  "posterImage": "string"
}
```

### User

```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "string"
}
```

## Error Handling

Errors are handled using a custom error handler. Errors will be returned in the following format:

```json
{
  "message": "string",
  "stack": "string"
}
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Feel free to contribute to this project by submitting issues or pull requests. For major changes, please open an issue first to discuss what you would like to change.

---

<div align="center">
  <a href="https://nmdra.github.io"> 🌎 nmdra.github.io</a> |
  <a href="https://github.com/nmdra"> 👨‍💻 Github</a> |
  <a href="https://twitter.com/nimendra_"> 🐦 Twitter</a>
</div>
