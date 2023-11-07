/* SERVICE filiais */
const filialData = require('../data/filialData');
const validacao = require('../util/validacao');
const parametros = require('../util/filialParametros');
const erroDB = require('../util/userfunctiondb');
const regras = require('../util/filialRegra');
const TABELA = 'FILIAIS';
/* CRUD GET SERVICE */
exports.getFilial = async function(id_empresa,id_filial,id){
	return filialData.getFilial(id_empresa,id_filial,id);
};
/* CRUD GET ALL SERVICE */
exports.getFiliais = async function(params){
	return filialData.getFiliais(params);
};
//* CRUD - INSERT - SERVICE */
 exports.insertFilial = async function(filial){
try 
{
	await regras.filial_Inclusao(filial);
	validacao.Validacao(TABELA,filial, parametros.filiais());
	return filialData.insertFilial(filial);
}
catch (err)
{ 
	throw new erroDB.UserException(err.erro, err); 
}
 };
//* CRUD - UPDATE - SERVICE */
 exports.updateFilial = async function(filial){try 
{
	await regras.filial_Alteracao(filial);
	validacao.Validacao(TABELA,filial, parametros.filiais());
	return filialData.updateFilial(filial);
}
catch (err)
{ 
	throw new erroDB.UserException(err.erro, err); 
}
 };
//* CRUD - DELETE - SERVICE */
 exports.deleteFilial = async function(id_empresa,id_filial,id){try 
{
	await  regras.filial_Exclusao(id_empresa,id_filial,id);
	return filialData.deleteFilial(id_empresa,id_filial,id);
}
catch (err)
{ 
	throw new erroDB.UserException(err.erro, err); 
}
 };
