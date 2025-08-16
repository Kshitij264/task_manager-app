### BUILD STAGE ###
FROM node:18-alpine AS build
ENV NODE_OPTIONS=--max-old-space-size=460
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


### PRODUCTION STAGE ###
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]