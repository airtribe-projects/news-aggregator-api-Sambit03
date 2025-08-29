# News Aggregator API

A RESTful API service that aggregates news articles based on user preferences using the GNews API. This project is part of the AirTribe Backend Engineering Launchpad Assignment 2.

## Features

- User Authentication: Secure JWT-based authentication with bcrypt password hashing
- User Preferences: Customizable news topics and language preferences
- News Aggregation: Fetches personalized news articles based on user preferences
- Caching: Implements intelligent caching to optimize API calls and improve performance
- Database Integration: MongoDB with Mongoose ODM for data persistence
- Comprehensive Testing: Full test suite using TAP testing framework

## Tech Stack

- Runtime: Node.js (≥18.0.0)
- Framework: Express.js
- Database: MongoDB with Mongoose
- Authentication: JWT + bcrypt
- External API: GNews API
- Caching: node-cache
- Testing: TAP, Supertest
- Development: Nodemon

## Prerequisites

- Node.js version 18 or higher
- MongoDB database
- GNews API key ([Get one here](https://gnews.io/))

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd news-aggregator-api-Sambit03
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/news-aggregator
   JWT_SECRET=your-jwt-secret-key
   GNEWS_API_KEY=your-gnews-api-key
   ```

4. **Start the application**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on `http://localhost:3000`

## API Documentation

### Authentication Endpoints

#### Register User
- **POST** `/users/signup`
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**: User object with hashed password

#### Login User
- **POST** `/users/login`
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "status": "ok",
    "token": "jwt-token-here"
  }
  ```

### Preferences Endpoints

#### Get User Preferences
- **GET** `/user/preferences`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
  ```json
  {
    "topics": ["technology", "sports"],
    "language": "en"
  }
  ```

#### Update User Preferences
- **PUT** `/user/preferences`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "topics": ["technology", "sports", "business"],
    "languages": "en"
  }
  ```

### News Endpoints

#### Get Personalized News
- **GET** `/news`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
  ```json
  {
    "success": true,
    "preferences": ["technology", "sports"],
    "articles": [
      {
        "title": "Article Title",
        "description": "Article description",
        "content": "Article content",
        "url": "https://example.com/article",
        "image": "https://example.com/image.jpg",
        "publishedAt": "2024-01-01T00:00:00Z",
        "source": {
          "name": "Source Name",
          "url": "https://source.com"
        }
      }
    ],
    "cached": false
  }
  ```

## Database Schema

### User Model
```javascript
{
  name: String (required, unique),
  email: String (required, unique, validated),
  password: String (required, min 6 chars, hashed),
  role: String (enum: ["user", "admin"], default: "user"),
  preferences: {
    topics: [String] (default: []),
    language: String (default: "en")
  },
  readArticles: [String],
  favoriteArticles: [String],
  createdAt: Date,
  updatedAt: Date
}
```

## Authentication & Authorization

- JWT Tokens: 4-hour expiration time
- Password Hashing: bcrypt with salt rounds = 10
- Protected Routes: All preference and news endpoints require valid JWT token
- Token Format: `Authorization: Bearer <token>`

## Caching Strategy

- Cache Duration: 10 minutes (600 seconds)
- Cache Key: Sorted user topics joined with underscore
- Cache Cleanup: Every 2 minutes (120 seconds)
- Benefits: Reduces external API calls and improves response time

## Testing

Run the test suite:
```bash
npm test
```

### Test Coverage
- User registration (success & validation)
- User login (success & authentication errors)
- Preferences management (CRUD operations)
- News fetching (authenticated & unauthorized)
- JWT token validation

## Project Structure

```
├── app.js                      # Main application entry point
├── package.json               # Dependencies and scripts
├── .gitignore                # Git ignore rules
├── .env                      # Environment variables (not tracked)
│
├── controllers/              # Request handlers
│   ├── AuthController.js     # Authentication logic
│   ├── newsController.js     # News fetching logic
│   └── preferencesController.js # User preferences logic
│
├── middleware/               # Custom middleware
│   └── authMiddleware.js     # JWT validation middleware
│
├── models/                   # Database schemas
│   └── UserModel.js         # User schema definition
│
├── routes/                   # API route definitions
│   ├── UsersRoute.js        # Authentication routes
│   ├── newsRoute.js         # News routes
│   └── preferencesRoute.js  # Preferences routes
│
├── services/                 # Business logic
│   └── authservices.js      # Authentication services
│
└── test/                     # Test files
    └── server.test.js       # API endpoint tests
```

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run test suite
- `npm run pretest` - Validate Node.js version before testing

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT signing | Yes |
| `GNEWS_API_KEY` | GNews API key for fetching articles | Yes |

## Development Notes

- Node.js Version: Minimum requirement is Node.js 18
- Database: Uses MongoDB with Mongoose ODM
- Code Style: Follows common JavaScript conventions
- Error Handling: Comprehensive error responses with appropriate HTTP status codes
- Security: Password hashing, JWT authentication, input validation

## Known Issues & Limitations

- News articles are limited to 10 per request (GNews API limitation)
- Cache is in-memory (resets on server restart)
- Language preference in user schema but not fully implemented in news fetching
- Some test cases expect different route structure than implemented

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

ISC License

## Author

AirTribe - Backend Engineering Launchpad Assignment

---

For more information about the GNews API, visit: https://gnews.io/docs/v4
