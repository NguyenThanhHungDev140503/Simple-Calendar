# Angular Calendar with Nginx

This project is a simple demonstration of how to serve an Angular application using Nginx as a web server, all containerized with Docker.

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (which includes npm)
- [Angular CLI](https://angular.io/cli)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd nginx-demo
   ```

2. **Install Angular dependencies:**
   ```bash
   cd angular-calendar
   npm install
   ```

3. **Build the Angular application:**
   ```bash
   npm run build
   ```

4. **Start the services using Docker Compose:**
   From the root of the project directory, run:
   ```bash
   docker-compose up -d
   ```

## Usage

Once the Docker containers are up and running, you can access the Angular Calendar application in your web browser at:

[http://localhost:80](http://localhost:80)

## Project Structure

- `angular-calendar/`: Contains the Angular application source code.
- `nginx/`: Contains the Nginx configuration file (`nginx.conf`).
- `html/`: Contains a simple `index.html` file (can be used for testing or as a placeholder).
- `docker-compose.yml`: The Docker Compose file that defines the Nginx service.

## Configuration

- **Nginx**: The Nginx configuration can be modified in `nginx/nginx.conf`.
- **Angular**: The Angular application can be configured via `angular.json` and other related files inside the `angular-calendar` directory.

## API Documentation

This project is a frontend application and does not have a backend API.

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contact/Support

If you encounter any issues or have questions, please open an issue on the [GitHub repository](<repository-url>).

