# Nginx Configuration Technical Documentation

This document provides a comprehensive analysis of the Nginx configuration for this project.


## Docker Configuration

The Nginx service is defined in the `docker-compose.yml` file. This file orchestrates the deployment of the Nginx container.

- **`image: nginx:latest`**: The service uses the latest official Nginx image from Docker Hub.
- **`container_name: nginx-server`**: The container is named `nginx-server`.
- **`ports: - "80:80"`**: This maps port 80 of the host machine to port 80 of the container, allowing external traffic to reach the Nginx server.
- **`volumes`**:
  - `./angular-calendar/dist/angular-calendar/browser:/usr/share/nginx/html`: This mounts the compiled Angular application's `browser` directory to the document root of the Nginx container. This is how Nginx serves the frontend application.
  - `./nginx/nginx.conf:/etc/nginx/nginx.conf`: This mounts the local `nginx.conf` file into the container, overwriting the default configuration.
- **`restart: unless-stopped`**: The container will automatically restart unless it is manually stopped.
- **`networks: - nginx-network`**: The container is attached to a custom bridge network named `nginx-network`.

## 2. Nginx Configuration Analysis

The primary Nginx configuration file is located at `nginx/nginx.conf`. This file controls the overall behavior of the Nginx server.

### Detailed Breakdown

- **`events` block**: Configures global event-handling settings.
  - `worker_connections 1024;`: Sets the maximum number of simultaneous connections that can be opened by a worker process.

- **`http` block**: Configures settings for handling HTTP traffic.
  - `include /etc/nginx/mime.types;`: Includes a file that maps file extensions to MIME types.
  - `default_type application/octet-stream;`: Sets the default MIME type for files.
  - `log_format`: Defines a custom log format named `main`.
  - `access_log` and `error_log`: Specify the locations for access and error logs.
  - `sendfile on;`: Enables the use of the `sendfile()` system call for more efficient file transmission.
  - `tcp_nopush on;`: Optimizes the sending of TCP packets.
  - `tcp_nodelay on;`: Disables Nagle's algorithm, reducing latency.
  - `keepalive_timeout 65;`: Sets the timeout for keep-alive connections.
  - `types_hash_max_size 2048;`: Sets the maximum size of the types hash table.
  - **Gzip Compression**: The configuration enables Gzip compression to reduce the size of transferred data.

### Server Blocks

- **`server` block for `mywebsite`**:
  - `listen 80;`: The server listens on port 80 for incoming connections.
  - `server_name mywebsite;`: The server responds to requests for the `mywebsite` hostname.
  - `root /usr/share/nginx/html;`: Sets the document root for requests.
  - `index index.html index.htm;`: Defines the default files to serve.

### Location Blocks and Routing

- **`location /`**: This is the main location block that handles all requests.
  - `try_files $uri $uri/ /index.html;`:  This directive is crucial for single-page applications (SPAs). It first tries to serve the requested file (`$uri`), then a directory (`$uri/`), and if neither exists, it serves `/index.html`. This allows the client-side application to handle routing.

- **`location = /50x.html`**: This block handles the display of a custom error page for 5xx errors.

### SSL/TLS Configuration

There is no SSL/TLS configuration present in this file. All traffic is currently handled over HTTP on port 80.

### Proxy Settings

There are no proxy settings or upstream configurations in this file.

### Security Configurations

The configuration includes several security headers to protect against common web vulnerabilities:

- `X-Frame-Options "SAMEORIGIN"`: Prevents clickjacking attacks by ensuring the site can only be framed by itself.
- `X-XSS-Protection "1; mode=block"`: Enables the browser's built-in cross-site scripting (XSS) filter.
- `X-Content-Type-Options "nosniff"`: Prevents the browser from MIME-sniffing the content type.
- `Referrer-Policy "no-referrer-when-downgrade"`: Controls how much referrer information is sent with requests.
- `Content-Security-Policy`:  Defines a Content Security Policy (CSP) to control which resources can be loaded.

## 3. File Structure

The main Nginx configuration is a single file:

- `nginx/nginx.conf`

## 4. Configuration Examples

**Main Location Block for a Single-Page Application:**

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

This configuration is essential for SPAs, ensuring that all routes are handled by the `index.html` file, allowing the client-side router to take over.

**Caching Static Files:**

```nginx
location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

This block sets a long expiration time for static assets, instructing browsers to cache them for one year.

## 5. Performance Optimizations

- **Gzip Compression**: Reduces the size of text-based files, leading to faster load times.
- **`sendfile`**:  Allows for zero-copy transfer of file data, which is more efficient.
- **`tcp_nopush` and `tcp_nodelay`**: These directives optimize TCP packet handling.
- **Caching of Static Assets**: Reduces the number of requests to the server for subsequent visits.

## 6. Troubleshooting Guide

- **404 Errors on Page Refresh (SPA)**: If you see 404 errors when refreshing a page in a single-page application, ensure the `try_files` directive is correctly configured in the main `location` block.
- **MIME Type Issues**: If files are being served with the wrong content type, check the `mime.types` file and the `default_type` directive.

## 7. Recommendations

- **Enable SSL/TLS**: The current configuration only uses HTTP. It is highly recommended to add an SSL/TLS certificate (e.g., from Let's Encrypt) and configure the server to listen on port 443 to encrypt traffic.
- **Use a More Specific `server_name`**: Instead of `mywebsite`, use the actual domain name (e.g., `example.com www.example.com`).
- **Separate Configurations**: For larger applications, consider splitting the configuration into multiple files (e.g., by creating a `conf.d` directory and including files from there). This improves organization and maintainability.
- **Review CSP**: The current Content Security Policy is quite permissive. It should be reviewed and tightened to only allow resources from trusted sources.

