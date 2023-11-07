/* SERVICE trabalho */
const trabalhoData = require('../data/trabalhoData');
const validacao = require('../util/validacao');
const parametros = require('../util/trabalhoParametros');
const erroDB = require('../util/userfunctiondb');
const regras = require('../util/trabalhoRegra');
const TABELA = 'TRABALHO';
/* CRUD GET SERVICE */
exports.getTrabalho = async function(id_empresa,id_projeto,id_atividade,id){
	return trabalhoData.getTrabalho(id_empresa,id_projeto,id_atividade,id);
};
/* CRUD GET ALL SERVICE */
exports.getTrabalhos = async function(params){
	return trabalhoData.getTrabalhos(params);
};
//* CRUD - INSERT - SERVICE */
 exports.insertTrabalho = async function(trabalho){
try 
{
	await regras.trabalho_Inclusao(trabalho);
	validacao.Validacao(TABELA,trabalho, parametros.trabalho());
	return trabalhoData.insertTrabalho(trabalho);
}
catch (err)
{ 
	throw new erroDB.UserException(err.erro, err); 
}
 };
//* CRUD - UPDATE - SERVICE */
 exports.updateTrabalho = async function(trabalho){try 
{
	await regras.trabalho_Alteracao(trabalho);
	validacao.Validacao(TABELA,trabalho, parametros.trabalho());
	return trabalhoData.updateTrabalho(trabalho);
}
catch (err)
{ 
	throw new erroDB.UserException(err.erro, err); 
}
 };
//* CRUD - DELETE - SERVICE */
 exports.deleteTrabalho = async function(id_empresa,id_projeto,id_atividade,id){try 
{
	await  regras.trabalho_Exclusao(id_empresa,id_projeto,id_atividade,id);
	return trabalhoData.deleteTrabalho(id_empresa,id_projeto,id_atividade,id);
}
catch (err)
{ 
	throw new erroDB.UserException(err.erro, err); 
}
 };
