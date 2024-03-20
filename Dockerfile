# Use an official Maven image to build the application
FROM maven:3.8.4-openjdk-17-slim AS build

# Install npm (Node.js is included in npm package)
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_14.x | bash - && \
    apt-get install -y nodejs && \
    npm --version
    
# Set the working directory in the container
WORKDIR /app

# Copy the Maven project file
COPY pom.xml .
COPY ./frontend/pom.xml ./frontend/
COPY ./backend/pom.xml ./backend/

# Download and install Maven dependencies
RUN mvn dependency:go-offline

# Copy the application source code
COPY backend/src ./backedn/src

# Build the application JAR file
RUN mvn package -DskipTests

# Use an official OpenJDK runtime as a base image
FROM openjdk:17-jdk-slim

# Set the working directory in the container
WORKDIR /app

# Copy the built JAR file from the build stage
COPY --from=build /app/target/otp-service-0.0.1-SNAPSHOT.jar .

# Expose the port that your Spring Boot app will run on
EXPOSE 8080

# Define the command to run your application
CMD ["java", "-jar", "otp-service-0.0.1-SNAPSHOT.jar"]
