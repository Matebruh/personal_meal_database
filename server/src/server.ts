
import express from 'express';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Test route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Meal Organiser API is running'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
