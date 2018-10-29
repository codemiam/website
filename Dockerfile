# Static build
FROM oclock/static-nginx-nodejs AS build
RUN apk update && apk add python
COPY . /var/www/
WORKDIR /var/www/
RUN yarn
RUN yarn build:prod

# Serve (no build artifacts remaining)
FROM oclock/static-nginx-nodejs
COPY --from=build /var/www/dist /var/www/
WORKDIR /var/www/
