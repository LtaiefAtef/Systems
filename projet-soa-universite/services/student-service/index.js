const express = require("express");
const app = express();

app.use(express.json());

// In-memory "database"
let students = [
  {
    id: 1,
    name: "Rayen Khaskhoussi",
    email: "rayen.khaskhoussi@univ.tn",
    age: 20,
    cin: "14587963",
    country: "Tunisia",
    address: "Manouba, Tunisia"
  },
  {
    id: 2,
    name: "Ahmed Ben Salah",
    email: "ahmed.bensalah@univ.tn",
    age: 22,
    cin: "11223344",
    country: "Tunisia",
    address: "Sfax, Tunisia"
  },
  {
    id: 3,
    name: "Yasmine Trabelsi",
    email: "yasmine.trabelsi@univ.tn",
    age: 21,
    cin: "22334455",
    country: "Tunisia",
    address: "Ariana, Tunisia"
  },
  {
    id: 4,
    name: "Mehdi Chaabane",
    email: "mehdi.chaabane@univ.tn",
    age: 23,
    cin: "33445566",
    country: "Tunisia",
    address: "Nabeul, Tunisia"
  },
  {
    id: 5,
    name: "Sarra Jaziri",
    email: "sarra.jaziri@univ.tn",
    age: 20,
    cin: "44556677",
    country: "Tunisia",
    address: "Bizerte, Tunisia"
  },
  {
    id: 6,
    name: "Anis Khelifi",
    email: "anis.khelifi@univ.tn",
    age: 24,
    cin: "55667788",
    country: "Tunisia",
    address: "Gabès, Tunisia"
  },
  {
    id: 7,
    name: "Mariem Gharbi",
    email: "mariem.gharbi@univ.tn",
    age: 19,
    cin: "66778899",
    country: "Tunisia",
    address: "Kairouan, Tunisia"
  },
  {
    id: 8,
    name: "Houssem Ayari",
    email: "houssem.ayari@univ.tn",
    age: 22,
    cin: "77889900",
    country: "Tunisia",
    address: "Tunis, Tunisia"
  },
  {
    id: 9,
    name: "Nour El Houda Maatoug",
    email: "nour.maatoug@univ.tn",
    age: 21,
    cin: "88990011",
    country: "Tunisia",
    address: "Monastir, Tunisia"
  },
  {
    id: 10,
    name: "Oussama Belhadj",
    email: "oussama.belhadj@univ.tn",
    age: 25,
    cin: "99001122",
    country: "Tunisia",
    address: "Sousse, Tunisia"
  }
];

let nextId = 11;

/**
 * GET /students
 */
app.get("/students", (req, res) => {
  res.json(students);
});

/**
 * GET /students/:id
 */
app.get("/students/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.json(student);
});

/**
 * POST /students
 */
app.post("/students", (req, res) => {
  const { name, email, age, cin, country, address } = req.body;

  // Basic validation (don’t be lazy)
  if (!name || !email || !age || !cin || !country || !address) {
    return res.status(400).json({
      message: "name, email, age, cin, country and address are required"
    });
  }

  if (typeof age !== "number" || age < 16 || age > 100) {
    return res.status(400).json({ message: "age must be a valid number" });
  }

  if (students.some(s => s.cin === cin)) {
    return res.status(409).json({ message: "Student with this CIN already exists" });
  }

  const newStudent = {
    id: nextId++,
    name,
    email,
    age,
    cin,
    country,
    address
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
});

/**
 * PUT /students/:id
 */
app.put("/students/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  const { name, email, age, cin, country, address } = req.body;

  if (age !== undefined && (typeof age !== "number" || age < 16 || age > 100)) {
    return res.status(400).json({ message: "Invalid age" });
  }

  if (cin !== undefined && students.some(s => s.cin === cin && s.id !== id)) {
    return res.status(409).json({ message: "CIN already in use" });
  }

  // Update only provided fields
  if (name !== undefined) student.name = name;
  if (email !== undefined) student.email = email;
  if (age !== undefined) student.age = age;
  if (cin !== undefined) student.cin = cin;
  if (country !== undefined) student.country = country;
  if (address !== undefined) student.address = address;

  res.json(student);
});

/**
 * DELETE /students/:id
 */
app.delete("/students/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  const removed = students.splice(index, 1)[0];
  res.json(removed);
});

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Student service running on port ${PORT}`);
});
