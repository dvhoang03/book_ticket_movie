

# Sử dụng Node.js image làm base
FROM node:20.19-alpine

# Tạo thư mục /app trong container
WORKDIR /app/bookingservice

# Copy package.json và package-lock.json trước (để cache install)
COPY package*.json ./

# Cài đặt thư viện
RUN npm install

# Copy toàn bộ source vào container
COPY . .

# Expose cổng NestJS
EXPOSE 3005

# Chạy app ở dev mode
CMD ["npm", "run", "start:dev"]