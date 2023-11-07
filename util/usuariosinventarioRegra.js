const usuariosinventarioSrv = require('../service/usuariosinventarioService');
const erroDB = require('../util/userfunctiondb');
const shared = require('../util/shared');
/* REGRA DE NEGOCIO usuariosinventarios */

exports.usuariosinventario_Inclusao = async function(usuariosinventario) { 
	try { 
		const obj = await usuariosinventarioSrv.getUsuariosinventario(usuariosinventario.id_empresa,usuariosinventario.id_filial,usuariosinventario.id_inventario,usuariosinventario.id_usuario);
		if (obj != null) { 
		   throw new erroDB.UserException('Regra de negócio', [{ tabela: 'USUARIOSINVENTARIO', message: `"INCLUSÃO" Registro Já Existe Na Base De Dados.!` }]);
		}
	} catch (err) { 
		throw err; 
	}


	return; 
} 

exports.usuariosinventario_Alteracao = async function(usuariosinventario) { 
	try { 
		const obj = await usuariosinventarioSrv.getUsuariosinventario(usuariosinventario.id_empresa,usuariosinventario.id_filial,usuariosinventario.id_inventario,usuariosinventario.id_usuario);
		if (obj == null) { 
		   throw new erroDB.UserException('Regra de negócio', [{ tabela: 'USUARIOSINVENTARIO', message: `"ALTERAÇÃO" Registro Não Existe Na Base De Dados.!` }]);
		}
	} catch (err) { 
		throw err; 
	}


	return; 
} 

exports.usuariosinventario_Exclusao = async function(id_empresa,id_filial,id_inventario,id_usuario) { 
	try { 
		const obj = await usuariosinventarioSrv.getUsuariosinventario(id_empresa,id_filial,id_inventario,id_usuario);
		if (obj == null) { 
		   throw new erroDB.UserException('Regra de negócio', [{ tabela: 'USUARIOSINVENTARIO', message: `"EXCLUSÃO" Registro Não Existe Na Base De Dados.!` }]);
		}
	} catch (err) { 
		throw err; 
	}


	return; 
} 

