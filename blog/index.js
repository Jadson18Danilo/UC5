import express from "express"
import dotenv from "dotenv"
import routeProduto  from "./src/modules/usuario/routes/produto.route.js"
// import "./src/config/criar_tabela.js"

import sequelize from "./src/config/database.js"

dotenv.config()

const app = express()
const port = process.env.PORTA

app.use(express.json())

// /api/produtos
app.use('/api',routeProduto)

app.listen(port, () => {
    try {
        console.log(`Servidor rodando na porta ${port}`)
    } catch (error) {
        console.error("Erro ao subir servidor:", error.message)
    }
    
})