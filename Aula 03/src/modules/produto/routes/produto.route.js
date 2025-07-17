import express from "express";
import ProdutoController from "../controllers/produto.controller.js";

const router = express.Router();

// Listar todos os produtos
router.get("/produto/listar", ProdutoController.listarTodos);

// Listar produto por id
router.get("/produto/listar/:id", ProdutoController.listarPorId);

// Cadastrar um produto
router.post("/produto/cadastrar", ProdutoController.cadastrar);

// Atualizar um produto
router.patch("/produto/atualizar/:id", ProdutoController.atualizar);

// Deletar produto por id
router.delete("/produto/deletar/:id", ProdutoController.deletarPorId);

// Deletar todos os produtos
router.delete("/produto/deletar", ProdutoController.deletarTodos);

// Contar total de produtos
router.get("/produto/total", ProdutoController.totalProdutos);

export default router;
