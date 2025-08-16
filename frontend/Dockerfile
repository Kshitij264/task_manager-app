### BUILD STAGE ###
# Use a Node.js image to build the React app
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Run the build command to create optimized static files
RUN npm run build


### PRODUCTION STAGE ###
# Use a lightweight Nginx web server for the final image
FROM nginx:stable-alpine

# Copy the built files from the 'build' stage into the Nginx public directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 (Nginx's default port)
EXPOSE 80

# Default command to start the Nginx server
CMD ["nginx", "-g", "daemon off;"]