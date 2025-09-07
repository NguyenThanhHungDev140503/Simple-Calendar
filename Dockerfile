# Stage 1: Build the Angular application
FROM node:18 AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY angular-calendar/package.json angular-calendar/package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
# This is now handled by a bind mount in docker-compose.yml
COPY angular-calendar/ .

# Build the application for production
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:latest

# Copy the built application from the build stage
COPY --from=build /app/dist/angular-calendar/browser /usr/share/nginx/html

# Copy the custom Nginx configuration
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

