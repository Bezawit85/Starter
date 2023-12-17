import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from './model/User.js';

const JWT_SECRET = "12345";
const app = express();

// Middlewares
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.post("/post", async(req,res) =>{
  console.log("inside post function");
  console.log(req.body);
 const data= new Intern({
  firstName:req.body.firstName,
  lastName:req.body.lastName,
 email:req.body.email,
 department:req.body.department,
 gpa:req.body.gpa,
 batch:req.body.batch,
 date:req.body.date
 });

 const val=await data.save();
 res.json(val);

})

// Headers middleware
// Headers middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true); 
  next();
});


// Database connection
const CONNECTION_URL = 'mongodb+srv://Bezawit-Eshetu:Bezawit1234@cluster0.qmlsysf.mongodb.net/test';
const PORT = process.env.PORT || 8000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message));

mongoose.set('autoCreate' , false);

// Define schema
const internSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  department: String,
  date: Date,
  gpa: Number,
  batch: Number,
});

// Define model
const Intern = mongoose.model("newstores", internSchema);

// Routes
app.post("/api/interns", async (req, res) => {
  try {
    const { firstName, lastName, email, department, gpa, batch, date } = req.body;
    const data = new Intern({ firstName, lastName, email, department, gpa, batch, date });
    const val = await data.save();
    res.json(val);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/api/register', async (req, res) => {
  try {
    const { firstN, lastN, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ firstN, lastN, email, password: hashedPassword });
    await user.save();
    const token = jwt.sign({ userId: user._id, firstN: user.firstN }, JWT_SECRET);
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email' });
    }
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    const token = jwt.sign({ userId: user._id, firstN: user.firstN }, JWT_SECRET);
    console.log(token);
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Middleware for verifying JWT
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      req.user = user; 
      next();
    });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// profile page
// profile page
app.get('/api/profile', verifyToken, async (req, res) => {
  try {
    // Access user information using req.user
    console.log(req.user);
    const userId = req.user.userId; // Use userId instead of email

    // Fetch user information from the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userProfile = { userId, email: user.email, firstN: user.firstN };
    res.json(userProfile);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Route for getting all interns
app.get('/api/interns', verifyToken, async (req, res) => {
  try {
    const interns = await Intern.find();
    res.json(interns);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});