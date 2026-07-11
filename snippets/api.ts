import express from 'express';
import { Request, Response } from 'express';

const app = express();
app.use(express.json());

interface JobApplication {
  name: string;
  email: string;
  resumeUrl: string;
}

const jobApplications: JobApplication[] = [];

app.post('/apply', (req: Request, res: Response) => {
  const { name, email, resumeUrl } = req.body;

  if (!name || !email || !resumeUrl) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const application: JobApplication = { name, email, resumeUrl };
  jobApplications.push(application);

  res.status(201).json({ message: 'Application received', application });
});

app.get('/applications', (req: Request, res: Response) => {
  res.json(jobApplications);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});