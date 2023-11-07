const imobilizadosSrv = require('../service/imobilizadosService');
const erroDB = require('../util/userfunctiondb');
const shared = require('../util/shared');
/* REGRA DE NEGOCIO imobilizados */

exports.imobilizados_Inclusao = async function(imobilizados) { 
	try { 
		const obj = await imobilizadosSrv.getImobilizados(imobilizados.id_empresa,imobilizados.id_filial,imobilizados.codigo);
		if (obj != null) { 
		   throw new erroDB.UserException('Regra de negócio', [{ tabela: 'IMOBILIZADOS', message: `"INCLUSÃO" Registro Já Existe Na Base De Dados.!` }]);
		}
	} catch (err) { 
		throw err; 
	}


	return; 
} 

exports.imobilizados_Alteracao = async function(imobilizados) { 
	try { 
		const obj = await imobilizadosSrv.getImobilizados(imobilizados.id_empresa,imobilizados.id_filial,imobilizados.codigo);
		if (obj == null) { 
		   throw new erroDB.UserException('Regra de negócio', [{ tabela: 'IMOBILIZADOS', message: `"ALTERAÇÃO" Registro Não Existe Na Base De Dados.!` }]);
		}
	} catch (err) { 
		throw err; 
	}


	return; 
} 

exports.imobilizados_Exclusao = async function(id_empresa,id_filial,codigo) { 
	try { 
		const obj = await imobilizadosSrv.getImobilizados(id_empresa,id_filial,codigo);
		if (obj == null) { 
		   throw new erroDB.UserException('Regra de negócio', [{ tabela: 'IMOBILIZADOS', message: `"EXCLUSÃO" Registro Não Existe Na Base De Dados.!` }]);
		}
	} catch (err) { 
		throw err; 
	}


	return; 
} 

