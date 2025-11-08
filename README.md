# Header Parser Microservice

A simple Node.js microservice that returns the shortened version the original URL sent by the user.

## About

This project was built using the **boilerplate code** from the **URL Shortener Microservice** project in the freeCodeCamp course **“Back End Development and APIs.”**

The service provides two main API endpoints:

- **POST /api/shorturl** – Accepts a URL submitted by the user and returns a shortened version.
- **GET /api/shorturl/:short_url** – Redirects the user to the original URL when the shortened URL is accessed.

This microservice allows users to easily shorten long URLs and use the short version for easier sharing.

## Usage

### API Endpoint - Examples

#### Method POST
| Request | Response |
|----------|-----------|
| `/api/shorturl` | `{"original_url": "http://localhost:3000/","short_url": 1}` |
---

### Method GET
| Request | Response |
|----------|-----------|
| `/api/shorturl/:id` | Redirects the user to `http://localhost:3000/` |
---

## Installation & Setup

```bash
# Clone the repository
git clone https://github.com/tamarques13/shortener-microservice.git

# Enter the project directory
cd headerparser-microservice

# Install dependencies
npm install

# Run the server
npm start