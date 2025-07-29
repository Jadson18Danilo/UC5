// import client from "../../../config/database.js";

// class ProdutoModel {
//   static async cadastrar(nome, preco, descricao) {
//     const dados = [nome, preco, descricao]
//     const consulta = `insert into produto(nome, preco, descricao) values ($1, $2, $3) returning *;`
//     const resultado = await client.query(consulta, dados)
//     return resultado.rows
//   }
//   static async listarTodos() {
//     const consulta = `select * from produto`
//     const resultado = await client.query(consulta)
//     return resultado.rows

//   }
//   static async listarPorId(id) {
//     const dados = [id]
//     const consulta = `select * from produto where id = $1`
//     const resultado = await client.query(consulta, dados)
//     return resultado.rows
//   }
//   static async atualizar(id, novoNome, novoPreco, novaDescricao) {
//     const dados = [novoNome, novoPreco, novaDescricao, id]
//     const consulta = `update produto
//     set nome = coalesce($1, nome),
//     preco = coalesce($2, preco),
//     descricao = coalesce($3, descricao)
//     where id = $4 returning *;`
//     const resultado = await client.query(consulta, dados)
//     return resultado.rows
//     }

//   static async deletarPorId(id) {
//     const dados = [id]
//     const consulta = `delete from produto where id = $1`
//     await client.query(consulta, dados)
//   }
//   static async deletarTodos() {
//     const consulta = `delete from produto`
//     await client.query(consulta)
//   }
//   static async totalProdutos() {
//     const consulta = `select count(*) from produto`
//     const resultado = await client.query(consulta)
//     return resultado.rows
//   }
// }

// export default ProdutoModel;

import { DataTypes } from "sequelize";
import sequelize from "../../../config/database.js";

const UsuarioModel = sequelize.define(
  "Usuario",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 100],
          msg: "O nome deve ter entre 2 e 100 caracteres.",
        },
        is: {
          args: /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s]+$/,
          msg: "O nome deve conter apenas letras e espaços.",
        },
        notEmpty: {
          msg: "O nome não pode ser vazio.",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: 'unique_email',
        msg: "Este email já está cadastrado.",
      },
      validate: {
        isEmail: {
          msg: "O email deve ser um endereço de email válido.",
        },
        notEmpty: {
          msg: "O email não pode ser vazio.",
        },
      },
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: {
          args: 8,
          msg: "A senha deve ter no mínimo 8 caracteres.",
        },
        notEmpty: {
          msg: "A senha não pode ser vazia.",
        },
      },
    },
    foto_perfil:{
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: {
          msg: "A foto de perfil deve ser uma URL válida.",
        },
      },
    },
    // preco: {
    //   type: DataTypes.DECIMAL(5, 2),
    //   allowNull: false,
    //   validate: {
    //     isDecimal: {
    //       msg: "O preço do produto deve ser no formato (valor . casa decimal).",
    //     },
    //     isNumeric: {
    //       msg: "O preço deve ser um número.",
    //     },
    //     isMenor(value) {
    //       if (value === null && value <= 0) {
    //         throw new Error("O preço deve ser maior que zero.");
    //       }
    //     },
    //   },
    // },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "A descrição não pode ser vazia.",
        },
        len: {
          args: [10, 50],
          msg: "A descrição deve ter entre 20 e 50 caracteres.",
        },
      },
    },
  },
  {
    createdAt: "criado_em",
    updatedAt: "atualizando_em",
  }
);

export default UsuarioModel;
