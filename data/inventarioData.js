/* DATA inventarios */
const db = require('../infra/database');

/* GET CAMPOS */
exports.getCampos = function(Inventario){
return [ 
			Inventario.id_empresa, 
			Inventario.id_filial, 
			Inventario.codigo, 
			Inventario.descricao, 
			Inventario.id_responsavel, 
			Inventario.data_inicial, 
			Inventario.data_final, 
			Inventario.data_encerra, 
			Inventario.laudo, 
			Inventario.user_insert, 
			Inventario.user_update, 
 ]; 
}; 
/* CRUD GET */
exports.getInventario = function(id_empresa,id_filial,codigo){
	strSql = ` select   
			   inv.id_empresa as  id_empresa  
			,  inv.id_filial as  id_filial  
			,  inv.codigo as  codigo  
			,  inv.descricao as  descricao  
			,  inv.id_responsavel as  id_responsavel  
			, to_char(inv.data_inicial, 'DD/MM/YYYY') as data_inicial  
			, to_char(inv.data_final, 'DD/MM/YYYY') as data_final  
			, to_char(inv.data_encerra, 'DD/MM/YYYY') as data_encerra  
			,  inv.laudo as  laudo  
			,  inv.user_insert as  user_insert  
			,  inv.user_update as  user_update    
 			FROM inventarios inv 	     
			 where inv.id_empresa = ${id_empresa} and  inv.id_filial = ${id_filial} and  inv.codigo = ${codigo}  `;
	return  db.oneOrNone(strSql);
}
/* CRUD GET ALL*/
exports.getInventarios = function(params){
if (params) {
	where = "";
	orderby = "";
	paginacao = "";

	if(params.orderby == '') orderby = 'inv.id_empresa,inv.id_filial';
	if(params.orderby == 'Filial') orderby = 'inv.id_empresa,inv.id_filial';
	if(params.orderby == 'Código') orderby = 'inv.id_empresa,inv.id_filial,inv.codigo';
	if(params.orderby == 'Descricao') orderby = 'inv.id_empresa,inv.id_filial,inv.descricao';

	if (orderby != "") orderby = " order by " + orderby;
	if(params.id_empresa  !== 0 ){
		if (where != "") where += " and "; 
		where += `inv.id_empresa = ${params.id_empresa} `;
	}
	if(params.id_filial  !== 0 ){
		if (where != "") where += " and "; 
		where += `inv.id_filial = ${params.id_filial} `;
	}
	if(params.codigo  !== 0 ){
		if (where != "") where += " and "; 
		where += `inv.codigo = ${params.codigo} `;
	}
	if(params.descricao.trim()  !== ''){
		if (where != "") where += " and ";
		if (params.sharp) { 
			 where +=  `inv.descricao = '${params.descricao}' `;
		} else 
		{
			where += `inv.descricao like '%${params.descricao.trim()}%' `;
		}
	}
	if (where != "") where = " where " + where;
	if (params.contador == 'S') {
		sqlStr = `SELECT COALESCE(COUNT(*),0) as total 
				  FROM inventarios inv      
				  ${ where} `;
		return db.one(sqlStr);
	}  else {
		strSql = `select   
			   inv.id_empresa as  id_empresa  
			,  inv.id_filial as  id_filial  
			,  inv.codigo as  codigo  
			,  inv.descricao as  descricao  
			,  inv.id_responsavel as  id_responsavel  
			, to_char(inv.data_inicial, 'DD/MM/YYYY') as data_inicial  
			, to_char(inv.data_final, 'DD/MM/YYYY') as data_final  
			, to_char(inv.data_encerra, 'DD/MM/YYYY') as data_encerra  
			,  inv.laudo as  laudo  
			,  inv.user_insert as  user_insert  
			,  inv.user_update as  user_update     
			FROM inventarios inv      
			${where} 			${ orderby} ${ paginacao} `;
			return  db.manyOrNone(strSql);
		}	}  else {
		strSql = `select   
			   inv.id_empresa as  id_empresa  
			,  inv.id_filial as  id_filial  
			,  inv.codigo as  codigo  
			,  inv.descricao as  descricao  
			,  inv.id_responsavel as  id_responsavel  
			, to_char(inv.data_inicial, 'DD/MM/YYYY') as data_inicial  
			, to_char(inv.data_final, 'DD/MM/YYYY') as data_final  
			, to_char(inv.data_encerra, 'DD/MM/YYYY') as data_encerra  
			,  inv.laudo as  laudo  
			,  inv.user_insert as  user_insert  
			,  inv.user_update as  user_update    
			FROM inventarios inv			     `;
		return  db.manyOrNone(strSql);
	}
}
/* CRUD - INSERT */
 exports.insertInventario = function(inventario){
	strSql = `insert into inventarios (
		     id_empresa 
		 ,   id_filial 
		 ,   codigo 
		 ,   descricao 
		 ,   id_responsavel 
		 ,   data_inicial 
		 ,   data_final 
		 ,   data_encerra 
		 ,   laudo 
		 ,   user_insert 
		 ,   user_update 
		 ) 
		 values(
		     ${inventario.id_empresa} 
		 ,   ${inventario.id_filial} 
		 ,   ${inventario.codigo} 
		 ,   '${inventario.descricao}' 
		 ,   ${inventario.id_responsavel} 
		 ,   '${inventario.data_inicial}' 
		 ,   '${inventario.data_final}' 
		 ,   '${inventario.data_encerra}' 
		 ,   '${inventario.laudo}' 
		 ,   ${inventario.user_insert} 
		 ,   ${inventario.user_update} 
		 ) 
 returning * `;
	return db.oneOrNone(strSql);
};
/* CRUD - UPDATE */
 exports.updateInventario = function(inventario){
	strSql = `update   inventarios set  
		     descricao = '${inventario.descricao}' 
 		 ,   id_responsavel = ${inventario.id_responsavel} 
 		 ,   data_inicial = '${inventario.data_inicial}' 
 		 ,   data_final = '${inventario.data_final}' 
 		 ,   data_encerra = '${inventario.data_encerra}' 
 		 ,   laudo = '${inventario.laudo}' 
 		 ,   user_insert = ${inventario.user_insert} 
 		 ,   user_update = ${inventario.user_update} 
 		 where id_empresa = ${inventario.id_empresa} and  id_filial = ${inventario.id_filial} and  codigo = ${inventario.codigo}  returning * `;
	return  db.oneOrNone(strSql);
}
/* CRUD - DELETE */
 exports.deleteInventario = function(id_empresa,id_filial,codigo){
	strSql = `delete from inventarios 
		 where id_empresa = ${id_empresa} and  id_filial = ${id_filial} and  codigo = ${codigo}  `;
 	return  db.oneOrNone(strSql);
}


