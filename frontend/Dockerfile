### BUILD STAGE ###
FROM node:18-alpine AS build
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
ENV NODE_OPTIONS=--max-old-space-size=460
RUN npm run build

### PRODUCTION STAGE ###
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]