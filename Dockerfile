FROM node:18-alpine

FROM nginx
COPY --from=0 /bin/client /bin/server /bin/
ENTRYPOINT [ "/bin/server" ]