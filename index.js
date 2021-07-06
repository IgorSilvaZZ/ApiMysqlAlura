const customExpress = require('./config/customExpress');
const conexao = require('./infraestrutura/conexao');
const Tabelas = require('./infraestrutura/tabelas');

conexao.connect((erro) => {

    if(erro){
        console.log(erro);
    }

    console.log('Conectado com Sucesso!');

    Tabelas.init(conexao);

    const app = customExpress();

    app.listen(3333, () => console.log("Server is running in port 3333"));
});