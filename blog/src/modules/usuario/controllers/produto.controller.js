import { where } from "sequelize";
import UsuarioModel from "../models/usuario.model.js";

class UsuarioController {
  // Cadastra um novo Usuario
  static async cadastrar(requisicao, resposta) {
    try {
      const { nome, preco, descricao, email, senha, foto_perfil } = requisicao.body;
      if ( !nome || !preco || !descricao || !email || !senha || !foto_perfil) {
        return resposta
          .status(400)
          .json({ mensagem: "Todos os campos são obrigatorios!" });
      }
      await UsuarioModel.create({ nome, preco, descricao, email, senha, foto_perfil });
      resposta.status(201).json({ mensagem: "Usuario criado com sucesso!" });
    } catch (error) {
      resposta.status(500).json({
        mensagem: "Erro interno do servidor. Por favor tente mais tarde!",
        erro: error.message,
      });
    }
  }

  // Lista todos os Usuarios
  static async listarTodos(requisicao, resposta) {
    try {
      const Usuarios = await UsuarioModel.findAll();
      if (!Usuarios || Usuarios.length === 0) {
        return resposta.status(200).json({ mensagem: "Banco de dados vazio!" });
      }
      resposta.status(200).json(Usuarios);
    } catch (error) {
      resposta.status(500).json({
        mensagem: "Erro interno do servidor. Por favor tente mais tarde!",
        erro: error.message,
      });
    }
  }

  // Lista um Usuario pelo ID
  static async listarPorId(requisicao, resposta) {
    try {
      const id = requisicao.params.id;
      const Usuario = await UsuarioModel.findByPk(id);
      if (!Usuario) {
        return resposta
          .status(404)
          .json({ mensagem: "Usuario não encontrado!" });
      }
      resposta.status(200).json(Usuario);
    } catch (error) {
      resposta.status(500).json({
        mensagem: "Erro interno do servidor. Por favor tente mais tarde!",
        erro: error.message,
      });
    }
  }

  // Atualiza um Usuario pelo ID
  static async atualizar(requisicao, resposta) {
    try {
      const { nome, preco, descricao } = requisicao.body;
      const id = requisicao.params.id
      const Usuario = await UsuarioModel.update({
        nome,
        preco,
        descricao
      }, {where:{ id }}
    );
      if (!Usuario || Usuario.length === 0) {
        return resposta
          .status(404)
          .json({ mensagem: "Usuario não encontrado!" });
      }
      resposta.status(200).json({ mensagem: "Usuario atualizado com sucesso" });

    } catch (error) {
      resposta.status(500).json({
        mensagem: "Erro interno do servidor. Por favor tente mais tarde!",
        erro: error.message,
      });
    }
  }

  // Deleta um Usuario pelo ID
  static async deletarPorId(requisicao, resposta) {
    try {

      const id = requisicao.params.id
      const Usuario = await UsuarioModel.destroy({where:{ id }});

      if (!Usuario.length === 0) {
        return resposta
          .status(404)
          .json({ mensagem: "Usuario não encontrado!" });
      }
      return resposta.status(200).json({ 
        mensagem: "Usuario excluido com sucesso!"
      });
    } catch (error) {
      resposta.status(500).json({
        mensagem: "Erro interno do servidor. Por favor tente mais tarde!",
        erro: error.message,
      });
    }
  }

  // Deleta todos os Usuarios
  static async deletarTodos(requisicao, resposta) {
    try {
      await UsuarioModel.destroy({truncate: true});
      resposta
        .status(200)
        .json({ mensagem: "Todos os Usuarios foram deletados!" });
    } catch (error) {
      resposta.status(500).json({
        mensagem: "Erro interno do servidor. Por favor tente mais tarde!",
        erro: error.message,
      });
    }
  }

  static async totalUsuarios(requisicao, resposta) {
    try {
      const total = await UsuarioModel.count();
      resposta.status(200).json(total);
    } catch (error) {
      resposta.status(500).json({
        mensagem: "Erro interno do servidor. Por favor tente mais tarde!",
        erro: error.message,
      });
    }
  }
}

export default UsuarioController;
