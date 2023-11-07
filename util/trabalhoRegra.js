const trabalhoSrv = require('../service/trabalhoService');
const erroDB = require('../util/userfunctiondb');
const shared = require('../util/shared');
/* REGRA DE NEGOCIO trabalho */

exports.trabalho_Inclusao = async function(trabalho) { 
	try { 
		const obj = await trabalhoSrv.getTrabalho(trabalho.id_empresa,trabalho.id_projeto,trabalho.id_atividade,trabalho.id);
		if (obj != null) { 
		   throw new erroDB.UserException('Regra de negócio', [{ tabela: 'TRABALHO', message: `"INCLUSÃO" Registro Já Existe Na Base De Dados.!` }]);
		}
	} catch (err) { 
		throw err; 
	}


	return; 
} 

exports.trabalho_Alteracao = async function(trabalho) { 
	try { 
		const obj = await trabalhoSrv.getTrabalho(trabalho.id_empresa,trabalho.id_projeto,trabalho.id_atividade,trabalho.id);
		if (obj == null) { 
		   throw new erroDB.UserException('Regra de negócio', [{ tabela: 'TRABALHO', message: `"ALTERAÇÃO" Registro Não Existe Na Base De Dados.!` }]);
		}
	} catch (err) { 
		throw err; 
	}


	return; 
} 

exports.trabalho_Exclusao = async function(id_empresa,id_projeto,id_atividade,id) { 
	try { 
		const obj = await trabalhoSrv.getTrabalho(id_empresa,id_projeto,id_atividade,id);
		if (obj == null) { 
		   throw new erroDB.UserException('Regra de negócio', [{ tabela: 'TRABALHO', message: `"EXCLUSÃO" Registro Não Existe Na Base De Dados.!` }]);
		}
	} catch (err) { 
		throw err; 
	}


	return; 
} 

