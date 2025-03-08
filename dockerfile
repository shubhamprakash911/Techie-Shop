# Use Node.js as the base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package* .

# Install backend dependencies
RUN npm install

# Copy the entire project (backend and frontend)
COPY . .

# Install frontend dependencies and build it
RUN npm install --prefix frontend && npm run build --prefix frontend

# Move built frontend files to the backend's static folder
# RUN mkdir -p backend/frontend && cp -r frontend/build backend/frontend

# Expose backend port
EXPOSE 8000

# Start backend server
CMD ["node", "backend/server.js"]
