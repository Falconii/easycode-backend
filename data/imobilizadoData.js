/* DATA imobilizados */
const db = require('../infra/database');

/* GET CAMPOS */
exports.getCampos = function(Imobilizado){
return [ 
			Imobilizado.id_empresa, 
			Imobilizado.id_filial, 
			Imobilizado.codigo, 
			Imobilizado.descricao, 
			Imobilizado.cod_grupo, 
			Imobilizado.cod_cc, 
			Imobilizado.id_fornecedor, 
			Imobilizado.nfe, 
			Imobilizado.serie, 
			Imobilizado.item, 
			Imobilizado.user_insert, 
			Imobilizado.user_update, 
 ]; 
}; 
/* CRUD GET */
exports.getImobilizado = function(id_empresa,id_filial,codigo){
	strSql = ` select   
			   imo.id_empresa as  id_empresa  
			,  imo.id_filial as  id_filial  
			,  imo.codigo as  codigo  
			,  imo.descricao as  descricao  
			,  imo.cod_grupo as  cod_grupo  
			,  imo.cod_cc as  cod_cc  
			,  imo.id_fornecedor as  id_fornecedor  
			,  imo.nfe as  nfe  
			,  imo.serie as  serie  
			,  imo.item as  item  
			,  imo.user_insert as  user_insert  
			,  imo.user_update as  user_update  
			,  gru.descricao as  grupo_descricao  
			,  cc.descricao as  cc_descricao  
			,  coalesce(forne.razao,'') as  forne_razao    
 			FROM imobilizados imo 	  
				 inner join grupos gru on gru.id_empresa = imo.id_empresa and gru.id_filial = imo.id_filial and gru.codigo = imo.cod_grupo
				 inner join centroscustos cc on cc.id_empresa = imo.id_empresa and cc.id_filial = imo.id_filial and cc.codigo = imo.cod_cc
				 left join fornecedores forne on forne.id_empresa = imo.id_empresa and forne.id_filial = imo.id_filial and forne.id = imo.id_fornecedor   
			 where imo.id_empresa = ${id_empresa} and  imo.id_filial = ${id_filial} and  imo.codigo = ${codigo}  `;
	return  db.oneOrNone(strSql);
}
/* CRUD GET ALL*/
exports.getImobilizados = function(params){
if (params) {
	where = "";
	orderby = "";
	paginacao = "";

	if(params.orderby == '') orderby = 'imo.id_empresa,imo.id_filial';
	if(params.orderby == 'Filial') orderby = 'imo.id_empresa,imo.id_filial';
	if(params.orderby == 'Código') orderby = 'imo.id_empresa,imo.id_filial,imo.codigo';
	if(params.orderby == 'Descricao') orderby = 'imo.id_empresa,imo.id_filial,imo.descricao';

	if (orderby != "") orderby = " order by " + orderby;
	if(params.id_empresa  !== 0 ){
		if (where != "") where += " and "; 
		where += `imo.id_empresa = ${params.id_empresa} `;
	}
	if(params.id_filial  !== 0 ){
		if (where != "") where += " and "; 
		where += `imo.id_filial = ${params.id_filial} `;
	}
	if(params.codigo  !== 0 ){
		if (where != "") where += " and "; 
		where += `imo.codigo = ${params.codigo} `;
	}
	if(params.descricao.trim()  !== ''){
		if (where != "") where += " and ";
		if (params.sharp) { 
			 where +=  `imo.descricao = '${params.descricao}' `;
		} else 
		{
			where += `imo.descricao like '%${params.descricao.trim()}%' `;
		}
	}
	if(params.grupo_cod  !== 0 ){
		if (where != "") where += " and "; 
		where += `imo.grupo_cod = ${params.grupo_cod} `;
	}
	if(params.cc_cod.trim()  !== '' ){
		if (where != "") where += " and ";
		if (params.sharp) { 
			 where +=  `imo.cc_cod = '${params.cc_cod}' `;
		} else 
		{
			where += `imo.cc_cod like '%${params.cc_cod.trim()}%' `;
		}
	}
	if (where != "") where = " where " + where;
	if (params.contador == 'S') {
		sqlStr = `SELECT COALESCE(COUNT(*),0) as total 
				  FROM imobilizados imo   
				 inner join grupos gru on gru.id_empresa = imo.id_empresa and gru.id_filial = imo.id_filial and gru.codigo = imo.cod_grupo
				 inner join centroscustos cc on cc.id_empresa = imo.id_empresa and cc.id_filial = imo.id_filial and cc.codigo = imo.cod_cc
				 left join fornecedores forne on forne.id_empresa = imo.id_empresa and forne.id_filial = imo.id_filial and forne.id = imo.id_fornecedor   
				  ${ where} `;
		return db.one(sqlStr);
	}  else {
		strSql = `select   
			   imo.id_empresa as  id_empresa  
			,  imo.id_filial as  id_filial  
			,  imo.codigo as  codigo  
			,  imo.descricao as  descricao  
			,  imo.cod_grupo as  cod_grupo  
			,  imo.cod_cc as  cod_cc  
			,  imo.id_fornecedor as  id_fornecedor  
			,  imo.nfe as  nfe  
			,  imo.serie as  serie  
			,  imo.item as  item  
			,  imo.user_insert as  user_insert  
			,  imo.user_update as  user_update  
			,  gru.descricao as  grupo_descricao  
			,  cc.descricao as  cc_descricao  
			,  coalesce(forne.razao,'') as  forne_razao     
			FROM imobilizados imo   
				 inner join grupos gru on gru.id_empresa = imo.id_empresa and gru.id_filial = imo.id_filial and gru.codigo = imo.cod_grupo
				 inner join centroscustos cc on cc.id_empresa = imo.id_empresa and cc.id_filial = imo.id_filial and cc.codigo = imo.cod_cc
				 left join fornecedores forne on forne.id_empresa = imo.id_empresa and forne.id_filial = imo.id_filial and forne.id = imo.id_fornecedor   
			${where} 			${ orderby} ${ paginacao} `;
			return  db.manyOrNone(strSql);
		}	}  else {
		strSql = `select   
			   imo.id_empresa as  id_empresa  
			,  imo.id_filial as  id_filial  
			,  imo.codigo as  codigo  
			,  imo.descricao as  descricao  
			,  imo.cod_grupo as  cod_grupo  
			,  imo.cod_cc as  cod_cc  
			,  imo.id_fornecedor as  id_fornecedor  
			,  imo.nfe as  nfe  
			,  imo.serie as  serie  
			,  imo.item as  item  
			,  imo.user_insert as  user_insert  
			,  imo.user_update as  user_update  
			,  gru.descricao as  grupo_descricao  
			,  cc.descricao as  cc_descricao  
			,  coalesce(forne.razao,'') as  forne_razao    
			FROM imobilizados imo			   
				 inner join grupos gru on gru.id_empresa = imo.id_empresa and gru.id_filial = imo.id_filial and gru.codigo = imo.cod_grupo
				 inner join centroscustos cc on cc.id_empresa = imo.id_empresa and cc.id_filial = imo.id_filial and cc.codigo = imo.cod_cc
				 left join fornecedores forne on forne.id_empresa = imo.id_empresa and forne.id_filial = imo.id_filial and forne.id = imo.id_fornecedor  `;
		return  db.manyOrNone(strSql);
	}
}
/* CRUD - INSERT */
 exports.insertImobilizado = function(imobilizado){
	strSql = `insert into imobilizados (
		     id_empresa 
		 ,   id_filial 
		 ,   codigo 
		 ,   descricao 
		 ,   cod_grupo 
		 ,   cod_cc 
		 ,   id_fornecedor 
		 ,   nfe 
		 ,   serie 
		 ,   item 
		 ,   user_insert 
		 ,   user_update 
		 ) 
		 values(
		     ${imobilizado.id_empresa} 
		 ,   ${imobilizado.id_filial} 
		 ,   ${imobilizado.codigo} 
		 ,   '${imobilizado.descricao}' 
		 ,   ${imobilizado.cod_grupo} 
		 ,   '${imobilizado.cod_cc}' 
		 ,   ${imobilizado.id_fornecedor} 
		 ,   ${imobilizado.nfe} 
		 ,   '${imobilizado.serie}' 
		 ,   ${imobilizado.item} 
		 ,   ${imobilizado.user_insert} 
		 ,   ${imobilizado.user_update} 
		 ) 
 returning * `;
	return db.oneOrNone(strSql);
};
/* CRUD - UPDATE */
 exports.updateImobilizado = function(imobilizado){
	strSql = `update   imobilizados set  
		     descricao = '${imobilizado.descricao}' 
 		 ,   cod_grupo = ${imobilizado.cod_grupo} 
 		 ,   cod_cc = '${imobilizado.cod_cc}' 
 		 ,   id_fornecedor = ${imobilizado.id_fornecedor} 
 		 ,   nfe = ${imobilizado.nfe} 
 		 ,   serie = '${imobilizado.serie}' 
 		 ,   item = ${imobilizado.item} 
 		 ,   user_insert = ${imobilizado.user_insert} 
 		 ,   user_update = ${imobilizado.user_update} 
 		 where id_empresa = ${imobilizado.id_empresa} and  id_filial = ${imobilizado.id_filial} and  codigo = ${imobilizado.codigo}  returning * `;
	return  db.oneOrNone(strSql);
}
/* CRUD - DELETE */
 exports.deleteImobilizado = function(id_empresa,id_filial,codigo){
	strSql = `delete from imobilizados 
		 where id_empresa = ${id_empresa} and  id_filial = ${id_filial} and  codigo = ${codigo}  `;
 	return  db.oneOrNone(strSql);
}


