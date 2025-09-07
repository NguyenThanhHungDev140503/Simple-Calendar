# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Local Angular Development (inside angular-calendar/)
```bash
cd angular-calendar
npm install              # Install dependencies
npm start                # Start development server on http://localhost:4200
npm run build            # Build for production
npm run build -- --configuration development  # Build for development
npm test                 # Run unit tests with Karma
npm test -- --watch=false --browsers=ChromeHeadless  # Run tests in CI mode
npm run serve:ssr:angular-calendar  # Run SSR server
```

### Docker Development Commands

#### Development Environment (with live reload)
```bash
# Start development environment with Angular dev server + Nginx proxy
docker-compose up -d
# View logs
docker-compose logs -f
# Stop development environment
docker-compose down
```

#### Production Environment
```bash
# Build and start production environment
docker-compose -f docker-compose.prod.yml up -d --build
# Stop production environment
docker-compose -f docker-compose.prod.yml down
```

#### Single Container Testing
```bash
# Build production Docker image
docker build -t nginx-demo-app:latest .
# Build development Docker image
docker build -f Dockerfile.dev -t nginx-demo-dev .
```

### Running Tests in Different Browsers
```bash
cd angular-calendar
# Run tests using the automated script (auto-detects Chrome/Chromium)
npm test
# Run tests with specific browser configurations
npm test -- --browsers=Chrome,Firefox
# Manual headless Chrome testing (if needed)
CHROME_BIN=/snap/bin/chromium ng test -- --browsers=ChromeHeadlessCI --watch=false
# Alternative headless browsers
npm test -- --browsers=FirefoxHeadless  # Requires Firefox snap installation
```

## Project Architecture

This is a containerized Angular application served by Nginx with separate development and production configurations.

### High-Level Architecture

**Multi-Container Development Setup:**
- `angular-app` container: Runs Angular dev server (port 4200) with live reload
- `nginx` container: Acts as reverse proxy to Angular dev server (port 80)
- Custom bridge network (`nginx-network`) for inter-container communication

**Production Setup:**
- Multi-stage Docker build: Node.js build stage + Nginx serve stage
- Angular app built statically and served directly by Nginx
- Production Nginx config with SSL/HTTPS redirect, security headers, and caching

### Key Components

**Frontend:**
- Angular 19.2 with Server-Side Rendering (SSR) support
- TailwindCSS 4.1 for styling
- TypeScript configuration for both app and spec files
- Karma + Jasmine testing setup with multi-browser support

**Web Server Configuration:**
- `nginx.dev.conf`: Development proxy configuration with WebSocket support for live reload
- `nginx.conf`: Production configuration with HTTPS redirect, security headers, gzip compression, and static asset caching
- Custom error pages (500, 502, 503, 504) in `html/` directory

**Build Pipeline:**
- `Dockerfile.dev`: Development container with watch mode
- `Dockerfile`: Multi-stage production build (Node build + Nginx serve)
- `Jenkinsfile`: CI/CD pipeline with checkout, build, test, and deploy stages

### Container Communication

**Development:** Nginx reverse proxy forwards requests to `angular-app:4200` container over the `nginx-network` bridge network. WebSocket support enabled for Angular's live reload feature.

**Production:** Angular app is built statically during Docker build and served directly by Nginx from `/usr/share/nginx/html`.

### Build Configurations

Angular uses different build configurations:
- **Development:** No optimization, source maps enabled, extracted licenses disabled
- **Production:** Full optimization, output hashing, bundle budgets enforced (500kB initial, 4kB component styles)

### Testing Strategy

Karma configuration supports multiple browsers:
- Local development: Chrome, Firefox, Safari
- CI/CD: ChromeHeadless with `--no-sandbox --disable-web-security` flags
- Custom Firefox headless configuration available

**Automated Browser Detection:**
The `test-headless.sh` script automatically detects available Chrome/Chromium installations using the `which` command and sets the appropriate `CHROME_BIN` environment variable. This eliminates the need to manually configure browser paths on different systems.

### Security Considerations

Production Nginx configuration includes:
- HTTPS enforcement with 301 redirects
- SSL/TLS optimization (TLSv1.2/1.3, OCSP stapling)
- Security headers: HSTS, X-Frame-Options, X-XSS-Protection, CSP
- Static asset caching with immutable cache headers

### SSR (Server-Side Rendering)

The Angular application has SSR configured with:
- `main.server.ts`: Server-side entry point
- `server.ts`: Express server configuration
- Build output includes both browser and server bundles
- SSR can be run independently with `npm run serve:ssr:angular-calendar`

## File Structure Notes

- `angular-calendar/`: Contains the complete Angular application with SSR support
- `nginx/`: Contains separate dev and production Nginx configurations
- `html/`: Contains static HTML files and custom error pages
- `docs/`: Technical documentation for Nginx and Docker networking
- Root-level Docker files handle container orchestration for different environments
