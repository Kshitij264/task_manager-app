### BUILD STAGE ###
FROM node:18-alpine AS build

# Add this line to limit memory usage during the build
ENV NODE_OPTIONS=--max-old-space-size=460

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
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]