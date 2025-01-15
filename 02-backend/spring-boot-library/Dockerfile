FROM eclipse-temurin:21-jdk

WORKDIR /app
COPY target/spring-boot-library-0.0.1-SNAPSHOT.jar /app.jar

ARG VITE_API_URL
ARG VITE_REDIRECT_URI
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_REDIRECT_URI=$VITE_REDIRECT_URI

EXPOSE 8080

CMD ["java", "-jar", "/app.jar"]
