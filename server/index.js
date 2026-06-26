import "dotenv/config";
import express from "express";
import cors from "cors";
import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import path from "path";

const app = express();
const PORT = process.env.PORT || 4000;
const ADMIN_PASSWORD = process.env.VITE_ADMIN_PASSWORD || "admin123";
const BUCKET_NAME = process.env.AWS_STORAGE_BUCKET_NAME;

app.use(cors());
app.use(express.json());

// 1. Initialize AWS S3 Client
const s3 = new S3Client({
  region: process.env.AWS_REGION || "us-east-1"
});

// Helper function to read JSON data straight out of your S3 Bucket
const readS3JsonArray = async (key) => {
  try {
    const command = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: key });
    const response = await s3.send(command);
    const str = await response.Body.transformToString();
    return JSON.parse(str);
  } catch (error) {
    // If the file doesn't exist yet on S3, return an empty array fallback
    if (error.name === "NoSuchKey") return [];
    throw error;
  }
};

// Helper function to save JSON data structures to your S3 Bucket
const writeS3JsonArray = async (key, data) => {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: JSON.stringify(data, null, 2),
    ContentType: "application/json",
  });
  await s3.send(command);
};

// Helper function to recursively delete asset directories inside an S3 Bucket
const deleteS3Folder = async (folderPrefix) => {
  // To list objects with the prefix and delete them in a complete AWS SDK implementation.
  // Also update the target references directly for safety and conciseness.
};

// 2. Multer-S3 configuration for direct memory streams to AWS
const createS3Storage = (folderName) =>
  multerS3({
    s3: s3,
    bucket: BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      const id = req.body.id || req.body.projectId || "untitled";
      const safeName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, "-");
      // Saves files nicely organized into deep folders inside the bucket
      const s3Path = `assets/${folderName}/${id}/${Date.now()}-${safeName}`;
      cb(null, s3Path);
    },
  });

const projectUpload = multer({ storage: createS3Storage("projects") });
const blogUpload = multer({ storage: createS3Storage("blogs") });

// GET ROUTES (streams straight from S3 data keys)
app.get("/api/projects", async (req, res) => {
  try {
    const data = await readS3JsonArray("data/projects.json");
    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Could not read projects data from S3" });
  }
});

app.get("/api/blogs", async (req, res) => {
  try {
    const data = await readS3JsonArray("data/blogs.json");
    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Could not read blogs data from S3" });
  }
 });

// POST PROJECT ROUTE
app.post("/api/projects", projectUpload.array("images"), async (req, res) => {
  console.log("=== PROJECT AUTH DEBUG ===");
  console.log("Header Received:", JSON.stringify(req.headers["x-admin-password"]));
  console.log("Expected ENV:", JSON.stringify(process.env.VITE_ADMIN_PASSWORD));
  console.log("Match Result:", req.headers["x-admin-password"] === process.env.VITE_ADMIN_PASSWORD);
  console.log("==========================");
  const auth = req.headers["x-admin-password"];
  if (auth !== ADMIN_PASSWORD) return res.status(401).json({ error: "Unauthorized" });

  try {
    const { id, title, description, techStack, externalUrl, oldId } = req.body;
    if (!id || !title) return res.status(400).json({ error: "id and title required" });

    const data = await readS3JsonArray("data/projects.json");

    if (oldId && oldId !== id) {
      const oldIndex = data.findIndex((p) => p.id === oldId);
      if (oldIndex >= 0) data.splice(oldIndex, 1);
      // Trigger background deletion of oldId object prefixes here
    }

    const existingIndex = data.findIndex((p) => p.id === id);
    const existing = existingIndex >= 0 ? data[existingIndex] : {};

    // Multer-S3 automatically returns the raw public CloudFront/S3 url in f.location!
    const uploadedImages = (req.files || []).map((f) => f.location);

    const existingImages = existing.images || [];
    const finalImagesArray = [...existingImages, ...uploadedImages];

    const newEntry = {
      id,
      title,
      description: description !== undefined ? description : existing.description || "",
      techStack: techStack ? techStack.split(",").map((tech) => tech.trim()).filter(Boolean) : existing.techStack || [],
      externalUrl: externalUrl !== undefined ? externalUrl : existing.externalUrl || "",
      image: finalImagesArray.length > 0 ? finalImagesArray[0] : "",
      images: finalImagesArray,
      date: new Date().toISOString().slice(0, 10),
      link: `/projects/${id}`,
    };

    if (existingIndex >= 0) {
      data[existingIndex] = newEntry;
    } else {
      data.push(newEntry);
    }

    await writeS3JsonArray("data/projects.json", data);
    res.json(newEntry);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Could not save project to S3" });
  }
});

// POST BLOG ROUTE
app.post("/api/blogs", blogUpload.array("images"), async (req, res) => {
  const auth = req.headers["x-admin-password"];
  if (auth !== ADMIN_PASSWORD) return res.status(401).json({ error: "Unauthorized" });

  try {
    const { id, title, description, category, oldId } = req.body;
    if (!id || !title) return res.status(400).json({ error: "id and title required" });

    const data = await readS3JsonArray("data/blogs.json");

    if (oldId && oldId !== id) {
      const oldIndex = data.findIndex((blog) => blog.id === oldId);
      if (oldIndex >= 0) data.splice(oldIndex, 1);
    }

    const existingIndex = data.findIndex((blog) => blog.id === id);
    const existing = existingIndex >= 0 ? data[existingIndex] : {};

    const uploadedImages = (req.files || []).map((f) => f.location);

    const existingImages = existing.images || [];
    const finalImagesArray = [...existingImages, ...uploadedImages];

    const newEntry = {
      id,
      title,
      description: description !== undefined ? description : existing.description || "",
      category: category !== undefined ? category : existing.category || "PERSONAL GROWTH",
      image: finalImagesArray.length > 0 ? finalImagesArray[0] : "",
      images: finalImagesArray,
      date: new Date().toISOString().slice(0, 10),
      link: `/blogs/${id}`,
    };

    if (existingIndex >= 0) {
      data[existingIndex] = newEntry;
    } else {
      data.push(newEntry);
    }

    await writeS3JsonArray("data/blogs.json", data);
    res.json(newEntry);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Could not save blog to S3" });
  }
});

// DELETE PROJECT ROUTE
app.delete("/api/projects/:id", async (req, res) => {
  const auth = req.headers["x-admin-password"];
  if (auth !== ADMIN_PASSWORD) return res.status(401).json({ error: "Unauthorized" });

  try {
    const { id } = req.params;
    const data = await readS3JsonArray("data/projects.json");
    const filteredData = data.filter((p) => p.id !== id);
    
    await writeS3JsonArray("data/projects.json", filteredData);
    res.json({ id: "Project record wiped from database" });
  } catch (e) {
    res.status(500).json({ error: "Could not delete project" });
  }
});

// DELETE BLOG ROUTE
app.delete("/api/blogs/:id", async (req, res) => {
  const auth = req.headers["x-admin-password"];
  if (auth !== ADMIN_PASSWORD) return res.status(401).json({ error: "Unauthorized" });

  try {
    const { id } = req.params;
    const data = await readS3JsonArray("data/blogs.json");
    const filteredData = data.filter((b) => b.id !== id);
    
    await writeS3JsonArray("data/blogs.json", filteredData);
    res.json({ id: "Blog record wiped from database" });
  } catch (e) {
    res.status(500).json({ error: "Could not delete blog" });
  }
});

app.listen(PORT, () => console.log(`Stateless Server running on port ${PORT}`));