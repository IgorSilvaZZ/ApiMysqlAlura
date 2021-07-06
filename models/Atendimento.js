const moment = require('moment');
const conexao = require('../infraestrutura/conexao');

class Atendimento {
    
    adiciona(atendimento, res){

        const dataCriacao = moment().format('YYYY-MM-DD h:mm:ss');

        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD h:mm:ss');

        const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
        const clienteEhValido = atendimento.client.length >= 4;

        const validacoes = [
            { 
                nome: 'data',
                valido: dataEhValida,
                mesagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mesagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido);

        const existemErros = erros.length;

        if(existemErros){
            return res.status(400).json(erros);
        }

        const atendimentoDatado = { ...atendimento, dataCriacao, data }

        const sql = 'insert into Atendimentos set ?';
        
        conexao.query(sql, atendimentoDatado, (erro, resultados) => {
            if (erro){
                return res.status(400).json(erro);
            };

            return res.status(201).json(atendimento);
        })

    }

    lista(res) {

        const sql = 'select * from Atendimentos';

        conexao.query(sql, (erro, resultados) => {
            if(erro){
                return res.status(400).json(erro)
            }

            return res.status(200).json(resultados)
        })

    }

    buscaPorId(id, res){

        const sql = `select * from Atendimentos where id = ${id}`;

        conexao.query(sql, (erro, resultados) => {

            const atendimento = resultados[0];

            if(erro){
                return res.status(400).json(erro)
            }

            return res.status(200).json(atendimento);

        })

    }

    altera(id, valores, res){

        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD h:mm:ss');
        }

        const sql = 'update Atendimentos set ? where id = ?';

        conexao.query(sql, [ valores, id ], (erro, resultados) => {
            if(erro){
                return res.status(400).json(erro)
            }

            return res.status(200).json({ ...valores, id })
        })

    }

    deleta(id, res){

        const sql = 'delete from Atendimentos where id = ?';

        conexao.query(sql, id, (erro, resultados) => {
            if(erro){
                return res.status(400).json(erro)
            }

            return res.status(200).json({ id })
        })

    }

}

module.exports = new Atendimento