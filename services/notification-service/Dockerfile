FROM maven:3.9.9-amazoncorretto-21 AS build

WORKDIR /app

# Copy toàn bộ project (cả pom.xml lẫn src/)
COPY . .

# Build ra file JAR (bỏ qua test để build nhanh hơn)
RUN mvn clean package -DskipTests


# BƯỚC 2: Tạo image chạy app từ JDK nhẹ hơn
FROM amazoncorretto:21-alpine

WORKDIR /app

# Copy file JAR từ giai đoạn build
COPY --from=build /app/target/*.jar app.jar

# Khai báo cổng app chạy trong container (ví dụ: 3002 nếu app chạy cổng đó)
EXPOSE 3006

# Lệnh chạy ứng dụng
ENTRYPOINT ["java", "-jar", "app.jar"]