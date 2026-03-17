FROM maven:3.9.9-eclipse-temurin-21 AS builder
WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn -DskipTests clean package && \
    cp target/*.jar /tmp/ && \
    find /tmp -name "*.jar" ! -name "*.original" -exec cp {} /app/target/app.jar \;

FROM eclipse-temurin:21-jre
WORKDIR /app

COPY --from=builder /app/target/app.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]