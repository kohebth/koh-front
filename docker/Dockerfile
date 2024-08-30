FROM openjdk:11-jdk-slim-buster

ENV APP=gateway

COPY build/distributions/${APP}-1.0-SNAPSHOT.tar /opt/dist.tar
WORKDIR /
RUN tar -xf /opt/dist.tar
RUN mv ${APP}-1.0-SNAPSHOT/bin/* /bin
RUN mv ${APP}-1.0-SNAPSHOT/lib/* /lib
RUN rm /opt/dist.tar

ENTRYPOINT [ "gateway", "koh.service.gateway.App" ]
