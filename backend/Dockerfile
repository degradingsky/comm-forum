FROM node:20-alpine3.18 as base
ENV NODE_ENV=production
EXPOSE 5001

FROM node:20-alpine3.18 as build 
WORKDIR "/src"
COPY . .
RUN npm install 
RUN npm run build

FROM base AS final
WORKDIR "/app"
COPY --from=build "/src/dist" .
COPY --from=build "/src/package.json" "package.json"
COPY --from=build "/src/package-lock.json" "package-lock.json"
RUN npm install --ignore-scripts
CMD [ "node", "./main.js"]
