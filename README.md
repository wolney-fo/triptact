# TripTact

This project is the back-end service for a comprehensive travel management application. The platform enables users to plan and organize trips to their desired destinations, invite companions, and schedule various activities.

## Table of Contents

- [TripTact](#triptact)
  - [Table of Contents](#table-of-contents)
  - [Key Features:](#key-features)
  - [Documentation](#documentation)
  - [Project Structure](#project-structure)
  - [Stack](#stack)
  - [Installation](#installation)
  - [Contributing](#contributing)
  - [License](#license)

## Key Features:

- **Trip Organization**: Users can create and manage trips, selecting destinations and setting trip details.
- **Invitations**: Users can invite others to join their trips, fostering collaborative planning.
- **Activity Planning**: Users can define and schedule activities for their trips, including meals, hikes, sightseeing, and more.

The project is built with a focus on scalability and efficiency, ensuring smooth handling of multiple users and their data. It provides robust APIs for seamless interaction with the front-end, making travel planning an enjoyable and organized experience.

## Documentation

Access it on-line in [Scalar](https://triptact.apidocumentation.com/)

or

Run the following steps to open Swagger UI:

1. Run the API:
   ```sh
   npm run start:dev
   ```
2. Open Swagger page on browser:
   ```sh
   http://localhost:3333/docs
   ```

## Project Structure

```
$PROJECT_ROOT
├── prisma              # Prisma configs
│   └── migrations      # Database migrations
└── src
    ├── @types          # Typing
    ├── env             # Environment variables validation
    ├── lib
    ├── errors          # Application errors
    ├── http            # Routes
    ├── repositories    # Entities repositories
    ├── use-cases       # Application services
    │    └── factories  # Services factories
    └── utils           # Util functions
```

## Stack

- Node.js
- Typescript
- Fastify
- Prisma ORM
- Docker
- MariaDB
- Dayjs
- Zod

## Installation

To install and run the application locally, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/wolney-fo/triptact.git
   ```
2. Navigate to the project directory:
   ```sh
   cd triptact
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```
4. Start docker container:
   ```sh
   docker compose up -d
   ```
5. Run migrations:
   ```sh
   npx prisma migrate dev
   ```
6. Run the application:
   ```sh
   npm run start:dev
   ```

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a pull request.

## License

MIT by [Wolney Oliveira](https://github.com/wolney-fo)
