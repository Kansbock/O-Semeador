// mongodb+srv://semeador:<password>@semeador.ejhcgst.mongodb.net/?retryWrites=true&w=majority
const express = require ('express')
const cors = require ('cors')
const mongoose = require ('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const app = express()
app.use(express.json())
app.use(cors())
console.log("Oi")
const usuarioSchema = mongoose.Schema({
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})
const alunosSchema = mongoose.Schema({
    id: {type: String, required: true, unique: true},
    nome: {type: String, required: true},
    turma: {type: String, required: true},
    endereco: {type: String, required: true},
    cpf: {type: String, required: true, unique: true},
    imagem: {type: String}
})
async function conectarAoMongoDB() {
    await
    mongoose.connect(`mongodb+srv://semeador:liVPgZ4yYMVWLhPg@semeador.ejhcgst.mongodb.net/?retryWrites=true&w=majority`)
}
let usuarios = [
    {
        login: "teste",
        password: "Teste"
    },
]
app.post('/signup', async (req, res) => {
    try {
        const login = req.body.login
        const password = req.body.password
        const criptografada = await bcrypt.hash(password, 10)
        const usuario = new Usuario({
            login: login,
            password: criptografada
        })
        const respMongo = await usuario.save()
        console.log(respMongo)
        res.status(201).end()
    } catch (error) {
        console.log(error)
        res.status(409).end()
    }
})
app.post('/login', async (req, res) => {
    const login = req.body.login
    const password = req.body.password
    const u = await Usuario.findOne({login: req.body.login})
    if(!u){
    return res.status(401).json({mensagem: "login inválido"})
    }
    const senhaValida = await bcrypt.compare(password, u.password)
    if (!senhaValida){
    return res.status(401).json({mensagem: "senha inválida"})
    }
    const token = jwt.sign(
    {login: login},
    "chave-secreta",
    {expiresIn: "1h"}
    )
    res.status(200).json({token: token})
}) 
usuarioSchema.plugin(uniqueValidator)
const Usuario = mongoose.model("Usuario", usuarioSchema)
let alunos = [
    {
        id: "teste",
        nome: "Teste",
        turma: "Teste",
        endereco: "Teste",
        cpf: "Teste",
        imagem: "Teste",
    },
]
app.post('/alunocadastro', async (req, res) => {
    try {
        const id = req.body.id
        const nome = req.body.nome
        const turma = req.body.turma
        const endereco = req.body.endereco
        const cpf = req.body.cpf
        const imagem = req.body.imagem
        const aluno = new Aluno({
            id : id,
            nome : nome,
            turma : turma,
            endereco : endereco,
            cpf : cpf,
            imagem :imagem
        })
        const respMongo = await aluno.save()
        console.log(respMongo)
        res.status(201).end()
    } catch (error) {
        console.log(error)
        res.status(409).end()
    }
})
app.get('/aluno', async (req, res) => {
    try {
        const alunos = await Aluno.find();
        res.status(200).json(alunos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
});
usuarioSchema.plugin(uniqueValidator)
const Aluno = mongoose.model("Aluno", alunosSchema)
app.listen(3000, () => {
        try{
        conectarAoMongoDB()
        console.log("up and running")
        }
        catch (e){
        console.log('Erro', e)
        }
})
