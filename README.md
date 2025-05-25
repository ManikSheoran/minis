# Mini-it

## Description
Mini-it is a minimal URL shortener application that allows users to create shortened versions of long URLs.

## Features
- URL shortening: Converts long URLs into shorter, more manageable links.
- Redirection: Redirects users from the shortened URL to the original long URL.

## Tech Stack
- Next.js
- React
- Tailwind CSS
- PostgreSQL

## Prerequisites
To run this project locally, you will need:
- Node.js (v16 or later)
- npm
- A running PostgreSQL database instance

## Environment Variables
Create a `.env.local` file in the root of the project and add the following environment variables:

```
DB_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

- `DB_URL`: The connection string for your PostgreSQL database. Replace `USER`, `PASSWORD`, `HOST`, `PORT`, and `DATABASE` with your actual database credentials and information.
- `NEXT_PUBLIC_BASE_URL`: The base URL for your application. This is used to construct the shortened URLs. For local development, this is typically `http://localhost:3000`.

## Database Setup
The application requires a PostgreSQL table named `urls` to store the mapping between original and shortened URLs.

You can create this table using the following SQL command:

```sql
CREATE TABLE urls (
    id SERIAL PRIMARY KEY,
    original_url TEXT NOT NULL,
    short_code VARCHAR(10) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Getting Started
Follow these steps to get the project up and running on your local machine:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/mini-it.git
    cd mini-it
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up the `.env.local` file:**
    Create a `.env.local` file in the project root and add your `DB_URL` and `NEXT_PUBLIC_BASE_URL` as described in the "Environment Variables" section.
4.  **Database Setup:**
    Ensure your PostgreSQL database server is running and you have created the `urls` table using the SQL command provided in the "Database Setup" section.
5.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Available Scripts
- `npm run dev`: Starts the development server with hot reloading.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts a production server (requires a prior `npm run build`).
- `npm run lint`: Lints the codebase using Next.js's built-in ESLint configuration.

## API Endpoints

### `POST /api/shorten`
-   **Description:** Creates a new shortened URL.
-   **Request Body:**
    ```json
    {
        "url": "your_long_url_here"
    }
    ```
-   **Success Response (200 OK):**
    ```json
    {
        "shortenedUrl": "http://localhost:3000/your_short_code"
    }
    ```
-   **Error Responses:**
    -   `400 Bad Request`: If the `url` is missing or invalid.
    -   `500 Internal Server Error`: If there's an issue with the database or generating the short code.

## Deployment
This is a Next.js application and can be easily deployed to platforms that support Node.js applications, such as:
- Vercel (Recommended for Next.js)
- Netlify
- AWS Amplify
- Heroku

Ensure your environment variables (`DB_URL` and `NEXT_PUBLIC_BASE_URL`) are correctly set up on your deployment platform.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License
This project is licensed under the MIT License.
