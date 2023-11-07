/* DATA usuariosinventarios */
const db = require('../infra/database');

/* GET CAMPOS */
exports.getCampos = function(Usuariosinventario){
return [ 
			Usuariosinventario.id_empresa, 
			Usuariosinventario.id_filial, 
			Usuariosinventario.id_inventario, 
			Usuariosinventario.id_usuario, 
			Usuariosinventario.user_insert, 
			Usuariosinventario.user_update, 
 ]; 
}; 
/* CRUD GET */
exports.getUsuariosinventario = function(id_empresa,id_filial,id_inventario,id_usuario){
	strSql = ` select   
			   usu_inv.id_empresa as  id_empresa  
			,  usu_inv.id_filial as  id_filial  
			,  usu_inv.id_inventario as  id_inventario  
			,  usu_inv.id_usuario as  id_usuario  
			,  usu_inv.user_insert as  user_insert  
			,  usu_inv.user_update as  user_update    
 			FROM usuariosinventarios usu_inv 	     
			 where usu_inv.id_empresa = ${id_empresa} and  usu_inv.id_filial = ${id_filial} and  usu_inv.id_inventario = ${id_inventario} and  usu_inv.id_usuario = ${id_usuario}  `;
	return  db.oneOrNone(strSql);
}
/* CRUD GET ALL*/
exports.getUsuariosinventarios = function(params){
if (params) {
	where = "";
	orderby = "";
	paginacao = "";

	if(params.orderby == '') orderby = 'usu_inv.id_empresa,usu_inv.id_filial';
	if(params.orderby == 'Filial') orderby = 'usu_inv.id_empresa,usu_inv.id_filial';
	if(params.orderby == 'Inventario') orderby = 'usu_inv.id_empresa,usu_inv.id_filial,usu_inv.id_inventario';
	if(params.orderby == 'Usuário') orderby = 'usu_inv.id_empresa,usu_inv.id_filial,usu_inv.id_usuario';

	if (orderby != "") orderby = " order by " + orderby;
	if(params.id_empresa  !== 0 ){
		if (where != "") where += " and "; 
		where += `usu_inv.id_empresa = ${params.id_empresa} `;
	}
	if(params.id_inventario  !== 0 ){
		if (where != "") where += " and "; 
		where += `usu_inv.id_inventario = ${params.id_inventario} `;
	}
	if(params.id_usuario  !== 0 ){
		if (where != "") where += " and "; 
		where += `usu_inv.id_usuario = ${params.id_usuario} `;
	}
	if (where != "") where = " where " + where;
	if (params.contador == 'S') {
		sqlStr = `SELECT COALESCE(COUNT(*),0) as total 
				  FROM usuariosinventarios usu_inv      
				  ${ where} `;
		return db.one(sqlStr);
	}  else {
		strSql = `select   
			   usu_inv.id_empresa as  id_empresa  
			,  usu_inv.id_filial as  id_filial  
			,  usu_inv.id_inventario as  id_inventario  
			,  usu_inv.id_usuario as  id_usuario  
			,  usu_inv.user_insert as  user_insert  
			,  usu_inv.user_update as  user_update     
			FROM usuariosinventarios usu_inv      
			${where} 			${ orderby} ${ paginacao} `;
			return  db.manyOrNone(strSql);
		}	}  else {
		strSql = `select   
			   usu_inv.id_empresa as  id_empresa  
			,  usu_inv.id_filial as  id_filial  
			,  usu_inv.id_inventario as  id_inventario  
			,  usu_inv.id_usuario as  id_usuario  
			,  usu_inv.user_insert as  user_insert  
			,  usu_inv.user_update as  user_update    
			FROM usuariosinventarios usu_inv			     `;
		return  db.manyOrNone(strSql);
	}
}
/* CRUD - INSERT */
 exports.insertUsuariosinventario = function(usuariosinventario){
	strSql = `insert into usuariosinventarios (
		     id_empresa 
		 ,   id_filial 
		 ,   id_inventario 
		 ,   id_usuario 
		 ,   user_insert 
		 ,   user_update 
		 ) 
		 values(
		     ${usuariosinventario.id_empresa} 
		 ,   ${usuariosinventario.id_filial} 
		 ,   ${usuariosinventario.id_inventario} 
		 ,   ${usuariosinventario.id_usuario} 
		 ,   ${usuariosinventario.user_insert} 
		 ,   ${usuariosinventario.user_update} 
		 ) 
 returning * `;
	return db.oneOrNone(strSql);
};
/* CRUD - UPDATE */
 exports.updateUsuariosinventario = function(usuariosinventario){
	strSql = `update   usuariosinventarios set  
		     user_insert = ${usuariosinventario.user_insert} 
 		 ,   user_update = ${usuariosinventario.user_update} 
 		 where id_empresa = ${usuariosinventario.id_empresa} and  id_filial = ${usuariosinventario.id_filial} and  id_inventario = ${usuariosinventario.id_inventario} and  id_usuario = ${usuariosinventario.id_usuario}  returning * `;
	return  db.oneOrNone(strSql);
}
/* CRUD - DELETE */
 exports.deleteUsuariosinventario = function(id_empresa,id_filial,id_inventario,id_usuario){
	strSql = `delete from usuariosinventarios 
		 where id_empresa = ${id_empresa} and  id_filial = ${id_filial} and  id_inventario = ${id_inventario} and  id_usuario = ${id_usuario}  `;
 	return  db.oneOrNone(strSql);
}


