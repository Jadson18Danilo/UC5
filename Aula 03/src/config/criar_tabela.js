import dotenv from 'dotenv'
dotenv.config()
import client from './database.js'
import ProdutoModel from '../modules/produto/models/produto.model.js'

class CriarTabela{
    static async produto(){
        const consulta = `create table if not existe produto(
        id serial primary key, 
        nome vachar(100) not null,
        preco numeric(10,2) not null, 
        descricao Text not null
        )`
        try {
            await client.query(consulta)
            console.log('Tabela produto criada com sucesso!')
        } catch (error) {
            console.error("Erro ao criar tabela 'produto':", error.message)
        }

    }
    
}

CriarTabela.produto()


export default CriarTabela