import ProdutoModel from "../models/produto.model.js";

class ProdutoController {
  // Cadastra um novo produto
  static async cadastrar(requisicao, resposta) {
    try {
      const { nome, preco, descricao } = requisicao.body;
      if ( !nome || !preco || !descricao) {
        return resposta
          .status(400)
          .json({ mensagem: "Todos os campos são obrigatorios!" });
      }
      ProdutoModel.cadastrar(id, nome, preco, descricao);
      resposta.status(201).json({ mensagem: "Produto criado com sucesso!" });
    } catch (error) {
      resposta.status(500).json({
        mensagem: "Erro interno do servidor. Por favor tente mais tarde!",
        erro: error.message,
      });
    }
  }

  // Lista todos os produtos
  static async listarTodos(requisicao, resposta) {
    try {
      const produtos = ProdutoModel.listarTodos();
      if (produtos.length === 0) {
        return resposta.status(200).json({ mensagem: "Banco de dados vazio!" });
      }
      resposta.status(200).json(produtos);
    } catch (error) {
      resposta.status(500).json({
        mensagem: "Erro interno do servidor. Por favor tente mais tarde!",
        erro: error.message,
      });
    }
  }

  // Lista um produto pelo ID
  static async listarPorId(requisicao, resposta) {
    try {
      const id = parseInt(requisicao.params.id);
      const produto = ProdutoModel.listarPorId(id);
      if (!produto) {
        return resposta
          .status(404)
          .json({ mensagem: "Produto não encontrado!" });
      }
      resposta.status(200).json(produto);
    } catch (error) {
      resposta.status(500).json({
        mensagem: "Erro interno do servidor. Por favor tente mais tarde!",
        erro: error.message,
      });
    }
  }

  // Atualiza um produto pelo ID
  static async atualizar(requisicao, resposta) {
    try {
      const { novoNome, novoPreco, novaDescricao } = requisicao.body;
      const id = parseInt(requisicao.params.id);
      const produto = ProdutoModel.atualizar(id, novoNome, novoPreco, novaDescricao);
      if (!produto) {
        return resposta
          .status(404)
          .json({ mensagem: "Produto não encontrado!" });
      }
      resposta.status(200).json({ mensagem: "Produto atualizado com sucesso" });
    } catch (error) {
      resposta.status(500).json({
        mensagem: "Erro interno do servidor. Por favor tente mais tarde!",
        erro: error.message,
      });
    }
  }

  // Deleta um produto pelo ID
  static async deletarPorId(requisicao, resposta) {
    try {
      const id = parseInt(requisicao.params.id);
      const produto = ProdutoModel.deletarPorId(id); 
      if (produto === null) {
        return resposta
          .status(404)
          .json({ mensagem: "Produto não encontrado!" });
      }
      resposta.status(200).json({ 
        mensagem: "Produto excluido com sucesso!", 
        produtoExcluido: produto 
      });
    } catch (error) {
      resposta.status(500).json({
        mensagem: "Erro interno do servidor. Por favor tente mais tarde!",
        erro: error.message,
      });
    }
  }

  // Deleta todos os produtos
  static async deletarTodos(requisicao, resposta) {
    try {
      ProdutoModel.deletarTodos();
      resposta
        .status(200)
        .json({ mensagem: "Todos os produtos foram deletados!" });
    } catch (error) {
      resposta.status(500).json({
        mensagem: "Erro interno do servidor. Por favor tente mais tarde!",
        erro: error.message,
      });
    }
  }
}

export default ProdutoController;
