const erroDB = require('../util/userfunctiondb');

exports.trabalho = function() { 
const parametros = { 
		id_empresa:{check:true,require:true,min:1},
	};
	return parametros; 
} 

