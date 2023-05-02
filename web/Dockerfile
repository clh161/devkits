# Stage 1 - the build process
FROM node:20-alpine as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY ./ ./
RUN yarn sitemap
RUN yarn build

# Stage 2 - the production environment
FROM nginx:1.24-alpine
COPY --from=build-deps /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
