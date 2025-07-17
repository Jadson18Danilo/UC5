import express from "express"
import dotenv from "dotenv"
import routeProduto  from "./src/modules/produto/routes/produto.route.js"
import "./src/config/criar_tabela.js"

dotenv.config()

const app = express()
const port = process.env.PORTA

app.use(express.json())

// /api/produtos
app.use('/api',routeProduto)

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})