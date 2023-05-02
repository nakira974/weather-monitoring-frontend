
# Use the official Node.js runtime as a parent image
FROM node:latest

# Set the working directory to /app
WORKDIR /app

CMD mkdir /app/certs

# Define a volume to persist the SSL certificate and key files
VOLUME /app/certs

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Create PKCS12 archive from the certificate and private key
RUN openssl pkcs12 -export -out /app/certs/cert.pfx -inkey /app/certs/privkey.pem -in /app/certs/cert.pem

# Build the Angular application
RUN npm run build

# Expose port 443 for HTTPS traffic
EXPOSE 443



# Start the application with SSL enabled
CMD ["ng", "serve", "--ssl", "true", "--ssl-key", "/app/certs/cert.pfx"]
