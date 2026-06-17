import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'lms' });
});

const PORT = process.env.PORT || (process.env.APP === 'lms' ? 4000 : 4001);
app.listen(PORT, () => {
  console.log(`LMS server running on port ${PORT}`);
});