const http = require('http');

const hostname = '0.0.0.0';
const port = process.env.PORT;


mongoose.set('strictQuery', true);

const connectMongoDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB);
    console.log(`DB connected on database named ${connection.connection.name}`);
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the process if DB connection fails
  }
};

mongoose.connection.on('connected', () => {
  console.log("MongoDB connected");
});

mongoose.connection.on('disconnected', () => {
  console.log("MongoDB disconnected");
});

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello Welcome To Node Mongo');
});

server.listen(port, hostname, () => {
    connectMongoDB()
  console.log(`Server running at http://${hostname}:${port}/`);
});

