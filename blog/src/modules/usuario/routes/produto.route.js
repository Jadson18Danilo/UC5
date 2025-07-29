import express from "express";
import UsuarioController from "../controllers/usuario.controller.js";

const router = express.Router();

// Listar todos os Usuarios
router.get("/usuario/listar", UsuarioController.listarTodos);

// Listar Usuario por id
router.get("/usuario/listar/:id", UsuarioController.listarPorId);

// Cadastrar um Usuario
router.post("/usuario/cadastrar", UsuarioController.cadastrar);

// Atualizar um Usuario
router.patch("/usuario/atualizar/:id", UsuarioController.atualizar);

// Deletar Usuario por id
router.delete("/usuario/deletar/:id", UsuarioController.deletarPorId);

// Deletar todos os Usuarios
router.delete("/usuario/deletar", UsuarioController.deletarTodos);

// Contar total de Usuarios
router.get("/usuario/total", UsuarioController.totalUsuarios);

export default router;
