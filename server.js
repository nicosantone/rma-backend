const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Cargar álbumes (nuestro "DB")
let albums = require("./albums.json");

// ✅ GET todos los álbumes
app.get("/albums", (req, res) => {
  res.json(albums);
});

// ✅ GET álbum por ID (agregamos esto)
app.get("/albums/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const album = albums.find((a) => a.id === id);

  if (!album) return res.status(404).json({ message: "Album no encontrado" });

  res.json(album);
});

// ✅ POST agregar reseña
app.post("/add-review", (req, res) => {
  const { albumId, review } = req.body;

  const album = albums.find((a) => a.id === albumId);
  if (!album) return res.status(404).json({ message: "Album no encontrado" });

  if (!album.reviews) album.reviews = [];
  album.reviews.push(review);
  console.log("Reseña agregada:", review);

  res.json({ message: "Review guardada con éxito", album });
});

// Iniciar servidor
app.listen(PORT, () =>
  console.log(`✅ Backend Node corriendo en http://localhost:${PORT}`)
);
