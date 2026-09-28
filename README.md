# AI WeatherWise

AI WeatherWise is a RESTful backend built with Node.js, Express.js and MongoDB/Mongoose. It provides authentication, favorite-location management, live weather information and Gemini-powered weather recommendations.

## Features

- User registration and login
- bcrypt password hashing
- JWT authentication
- Favorite location CRUD
- Current weather from OpenWeatherMap
- AI weather summaries and activity/clothing recommendations using Google Gemini
- Public weather endpoint
- Protected user endpoints
- Health-check endpoint
- Environment-variable configuration
- Centralized JSON error handling

## Requirements

- Node.js 18+
- MongoDB Atlas or local MongoDB
- OpenWeatherMap API key
- Google Gemini API key
- Postman or Thunder Client

## Installation

```bash
npm install
```

Copy `.env.example` to `.env` and add your real credentials.

Run development server:

```bash
npm run dev
```

Or:

```bash
npm start
```

Server:
`http://localhost:5000`

## API Endpoints

### Authentication

POST `/api/auth/register`

```json
{
  "name": "Alex",
  "email": "alex@example.com",
  "password": "password123"
}
```

POST `/api/auth/login`

```json
{
  "email": "alex@example.com",
  "password": "password123"
}
```

The login response contains a JWT token. Use it as:

`Authorization: Bearer YOUR_TOKEN`

### Weather

GET `/api/weather/current?city=Chennai&country=IN`

Protected AI insight:

GET `/api/weather/insight?city=Chennai&country=IN`

### Favorite Locations

All location routes require a JWT.

POST `/api/locations`

```json
{
  "city": "Chennai",
  "country": "IN"
}
```

GET `/api/locations`

GET `/api/locations/:id`

PUT `/api/locations/:id`

```json
{
  "city": "Bengaluru",
  "country": "IN"
}
```

DELETE `/api/locations/:id`

## Important

Never upload the real `.env` file to GitHub or any public submission. Submit `.env.example` and configure `.env` locally.
