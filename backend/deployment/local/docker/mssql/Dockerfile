FROM mcr.microsoft.com/mssql/server:2019-latest

USER root

RUN apt-get update && apt-get install -y curl gnupg
RUN apt-get update && apt-get install -y curl
RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -
RUN curl https://packages.microsoft.com/config/ubuntu/20.04/prod.list > /etc/apt/sources.list.d/msprod.list
RUN apt-get update && ACCEPT_EULA=Y apt-get install -y mssql-tools unixodbc-dev

ENV PATH=$PATH:/opt/mssql-tools/bin

COPY ./scripts/init.sql /docker-entrypoint-initdb.d/

ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=Admin@123