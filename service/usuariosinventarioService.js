/* SERVICE usuariosinventarios */
const usuariosinventarioData = require('../data/usuariosinventarioData');
const validacao = require('../util/validacao');
const parametros = require('../util/usuariosinventarioParametros');
const erroDB = require('../util/userfunctiondb');
const regras = require('../util/usuariosinventarioRegra');
const TABELA = 'USUARIOSINVENTARIOS';
/* CRUD GET SERVICE */
exports.getUsuariosinventario = async function(id_empresa,id_filial,id_inventario,id_usuario){
	return usuariosinventarioData.getUsuariosinventario(id_empresa,id_filial,id_inventario,id_usuario);
};
/* CRUD GET ALL SERVICE */
exports.getUsuariosinventarios = async function(params){
	return usuariosinventarioData.getUsuariosinventarios(params);
};
//* CRUD - INSERT - SERVICE */
 exports.insertUsuariosinventario = async function(usuariosinventario){
try 
{
	await regras.usuariosinventario_Inclusao(usuariosinventario);
	validacao.Validacao(TABELA,usuariosinventario, parametros.usuariosinventarios());
	return usuariosinventarioData.insertUsuariosinventario(usuariosinventario);
}
catch (err)
{ 
	throw new erroDB.UserException(err.erro, err); 
}
 };
//* CRUD - UPDATE - SERVICE */
 exports.updateUsuariosinventario = async function(usuariosinventario){try 
{
	await regras.usuariosinventario_Alteracao(usuariosinventario);
	validacao.Validacao(TABELA,usuariosinventario, parametros.usuariosinventarios());
	return usuariosinventarioData.updateUsuariosinventario(usuariosinventario);
}
catch (err)
{ 
	throw new erroDB.UserException(err.erro, err); 
}
 };
//* CRUD - DELETE - SERVICE */
 exports.deleteUsuariosinventario = async function(id_empresa,id_filial,id_inventario,id_usuario){try 
{
	await  regras.usuariosinventario_Exclusao(id_empresa,id_filial,id_inventario,id_usuario);
	return usuariosinventarioData.deleteUsuariosinventario(id_empresa,id_filial,id_inventario,id_usuario);
}
catch (err)
{ 
	throw new erroDB.UserException(err.erro, err); 
}
 };
