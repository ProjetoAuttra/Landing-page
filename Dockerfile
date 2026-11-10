# Build do site (Vite + pré-renderização) e entrega por um nginx enxuto.
FROM node:22-bookworm-slim AS build
WORKDIR /app

# As VITE_* entram no build (o Railway passa as variáveis do serviço como build args).
ARG VITE_APP_URL=https://app.auttra.com.br
ARG VITE_SIGNUP_URL=
ARG VITE_FORM_ENDPOINT=
ARG VITE_GA_MEASUREMENT_ID=
ARG VITE_SCHEDULING_URL=
ENV VITE_APP_URL=$VITE_APP_URL \
    VITE_SIGNUP_URL=$VITE_SIGNUP_URL \
    VITE_FORM_ENDPOINT=$VITE_FORM_ENDPOINT \
    VITE_GA_MEASUREMENT_ID=$VITE_GA_MEASUREMENT_ID \
    VITE_SCHEDULING_URL=$VITE_SCHEDULING_URL

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.27-alpine AS runner
# O entrypoint oficial gera o default.conf a partir do template, trocando só ${PORT}.
ENV PORT=8080
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
