class Tabelas {


    init(conexao){

        this.conexao = conexao

        this.criarAtendimentos();

    }

    criarAtendimentos(){

        const sql = 'create table if not exists Atendimentos (id int primary key not null auto_increment, client varchar(50) not null, pet varchar(20), servico varchar(20) not null, data datetime not null, dataCriacao datetime not null, status varchar(20) not null, observacoes text)'

        this.conexao.query(sql, (erro) => {
            if(erro){
                console.log(erro);
            }

            console.log("Tabela Atendimentos criado com sucesso!");
        });
    }

}

module.exports = new Tabelas