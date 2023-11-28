const protocolo = 'http://'
const baseURL = 'localhost:3000'
const loginEndpoint = '/login'
const alunoEndpoint = '/aluno'
const buscarAluno = async () => {
    let alunoIdInput = document.querySelector('#idInput')
    let alunoId = alunoIdInput.value
    let localizacao = document.querySelector('.quadrado')
    let erroLocalizacao = document.querySelector('.erro')
    if (alunoId) {
        try{
            let erro = 1
            const URLCompletaAluno = `${protocolo}${baseURL}${alunoEndpoint}`
            const alunos = (await axios.get(URLCompletaAluno)).data
            for (let aluno of alunos) {
                if (aluno.id === alunoId)
                {
                    rodape = document.querySelector('.rodape')
                    rodape.style.position = 'static';
                    erro = 0
                    localizacao.innerHTML = `
                            <img class="col-6 m-5" src="${aluno.imagem}" alt="" style="width: 300px;">
                            <main class="col-6 column d-flex justify-content-center">
                                <main>
                                    <h1 class="mb-5" style="
                                        font-family: 'Zabal DEMO';
                                        font-style: normal;
                                        font-weight: 500;
                                        font-size: 36px;
                                        line-height: 30px;
                                        color: #002653;
                                    ">${aluno.nome}</h1>
                                    <main class="">
                                        <h3 id="informacoes">ID: ${aluno.id}</h3>
                                        <h3 id="informacoes">Turma: ${aluno.turma}</h3>
                                        <h3 id="informacoes">Endereço: ${aluno.endereco}</h3>
                                        <h3 id="informacoes">CPF: ${aluno.cpf}</h3>
                                    </main>
                                </main>
                            </main>`;
                }
            }
            if (erro === 1){
                erroLocalizacao.innerHTML ='<img class="col-2 p-0" src="imagens/erro.png" alt="erro" style="width: 40px;">' +
        '<h3 class="col-9" style="color: red;">ID incorreto</h3>';
            }
        }
        catch {
            erroLocalizacao.innerHTML ='<img class="col-2 p-0" src="imagens/erro.png" alt="erro" style="width: 40px;">' +
        '<h3 class="col-9" style="color: red;">Erro de Conexão</h3>';
        }
    }
    else {
        erroLocalizacao.innerHTML ='<img class="col-2 p-0" src="imagens/erro.png" alt="erro" style="width: 40px;">' +
        '<h3 class="col-9" style="color: red;">Preencha os campos!</h3>';
    }
}
const fazerLogin = async () => {
    let usuarioLoginInput = document.querySelector('#usuarioLoginInput')
    let passwordLoginInput = document.querySelector('#passwordLoginInput')
    let usuarioLogin = usuarioLoginInput.value
    let passwordLogin = passwordLoginInput.value
    let erro = document.querySelector('.erro')
    if (usuarioLogin && passwordLogin) {
        try {
            const URLCompleta = `${protocolo}${baseURL}${loginEndpoint}`
            const response = await axios.post(URLCompleta, { login: usuarioLogin, password: passwordLogin })
            console.log(response.data)
            usuarioLoginInput.value = ""
            passwordLoginInput.value = ""
            window.location.href = "aluno.html";
        } catch (error) {
            console.log(error)
            erro.innerHTML ='<img class="col-2 p-0" src="imagens/erro.png" alt="erro" style="width: 40px;">' +
        '<h3 class="col-9" style="color: red;">Senha ou ID incorretos</h3>';
        }
    } else {
        erro.innerHTML ='<img class="col-2 p-0" src="imagens/erro.png" alt="erro" style="width: 40px;">' +
        '<h3 class="col-9" style="color: red;">Preencha os campos!</h3>';
    }
}
let radio = document.querySelector('.manual-btn')
let cont = 1
document.getElementById('radio1').checked = true
setInterval(() => {
    proximaImg()
}, 5000)
function proximaImg() {
    cont++
    if(cont > 3){
        cont = 1
    }
    document.getElementById('radio'+ cont).checked = true
}
