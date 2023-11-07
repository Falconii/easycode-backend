/* DATA trabalho */
const db = require('../infra/database');

/* GET CAMPOS */
exports.getCampos = function(Trabalho){
return [ 
			Trabalho.id_empresa, 
			Trabalho.id_projeto, 
			Trabalho.id_atividade, 
			Trabalho.id, 
			Trabalho.id_responsavel, 
			Trabalho.horas_prog, 
			Trabalho.horas_cons, 
			Trabalho.saldo_hrs, 
			Trabalho.descricao, 
			Trabalho.situacao, 
			Trabalho.datalanc, 
			Trabalho.user_insert, 
			Trabalho.user_update, 
 ]; 
}; 
/* CRUD GET */
exports.getTrabalho = function(id_empresa,id_projeto,id_atividade,id){
	strSql = ` select   
			   trab.id_empresa as  id_empresa  
			,  trab.id_projeto as  id_projeto  
			,  trab.id_atividade as  id_atividade  
			,  trab.id as  id  
			,  trab.id_responsavel as  id_responsavel  
			,  trab.horas_prog as  horas_prog  
			,  trab.horas_cons as  horas_cons  
			,  trab.saldo_hrs as  saldo_hrs  
			,  trab.descricao as  descricao  
			,  trab.situacao as  situacao  
			, to_char(trab.datalanc, 'YYYY-MM-DD HH24:MI GMT-0300') as datalanc  
			,  trab.user_insert as  user_insert  
			,  trab.user_update as  user_update  
			,  resp.razao as  resp_razao  
			,  resp.grupo as  resp_grupo  
			,  usu_insert.razao as  insert_razao    
 			FROM trabalho trab 	  
				 inner join usuarios resp on trab.id_empresa = resp.id_empresa and trab.id_responsavel = resp.id
				 inner join usuarios usu_insert on trab.id_empresa = usu_insert.id_empresa and trab.user_insert = usu_insert.id   
			 where trab.id_empresa = ${id_empresa} and  trab.id_projeto = ${id_projeto} and  trab.id_atividade = ${id_atividade} and  trab.id = ${id}  `;
	return  db.oneOrNone(strSql);
}
/* CRUD GET ALL*/
exports.getTrabalhos = function(params){
if (params) {
	where = "";
	orderby = "";
	paginacao = "";

	if(params.orderby == '') orderby = 'trab.id_empresa,trab.id_atividade,trab.id_projeto';
	if(params.orderby == 'Projeto') orderby = 'trab.id_empresa,trab.id_atividade,trab.id_projeto';
	if(params.orderby == 'Atividade') orderby = 'trab.id_empresa,trab.id_atividade';

	if (orderby != "") orderby = " order by " + orderby;
	if(params.id_empresa  !== 0 ){
		if (where != "") where += " and "; 
		where += `trab.id_empresa = ${params.id_empresa} `;
	}
	if(params.id_projeto  !== 0 ){
		if (where != "") where += " and "; 
		where += `trab.id_projeto = ${params.id_projeto} `;
	}
	if(params.id_atividade  !== 0 ){
		if (where != "") where += " and "; 
		where += `trab.id_atividade = ${params.id_atividade} `;
	}
	if(params.id  !== 0 ){
		if (where != "") where += " and "; 
		where += `trab.id = ${params.id} `;
	}
	if(params.descricao.trim()  !== ''){
		if (where != "") where += " and ";
		if (params.sharp) { 
			 where +=  `trab.descricao = '${params.descricao}' `;
		} else 
		{
			where += `trab.descricao like '%${params.descricao.trim()}%' `;
		}
	}
	if (where != "") where = " where " + where;
	if (params.contador == 'S') {
		sqlStr = `SELECT COALESCE(COUNT(*),0) as total 
				  FROM trabalho trab   
				 inner join usuarios resp on trab.id_empresa = resp.id_empresa and trab.id_responsavel = resp.id
				 inner join usuarios usu_insert on trab.id_empresa = usu_insert.id_empresa and trab.user_insert = usu_insert.id   
				  ${ where} `;
		return db.one(sqlStr);
	}  else {
		strSql = `select   
			   trab.id_empresa as  id_empresa  
			,  trab.id_projeto as  id_projeto  
			,  trab.id_atividade as  id_atividade  
			,  trab.id as  id  
			,  trab.id_responsavel as  id_responsavel  
			,  trab.horas_prog as  horas_prog  
			,  trab.horas_cons as  horas_cons  
			,  trab.saldo_hrs as  saldo_hrs  
			,  trab.descricao as  descricao  
			,  trab.situacao as  situacao  
			, to_char(trab.datalanc, 'YYYY-MM-DD HH24:MI GMT-0300') as datalanc  
			,  trab.user_insert as  user_insert  
			,  trab.user_update as  user_update  
			,  resp.razao as  resp_razao  
			,  resp.grupo as  resp_grupo  
			,  usu_insert.razao as  insert_razao     
			FROM trabalho trab   
				 inner join usuarios resp on trab.id_empresa = resp.id_empresa and trab.id_responsavel = resp.id
				 inner join usuarios usu_insert on trab.id_empresa = usu_insert.id_empresa and trab.user_insert = usu_insert.id   
			${where} 			${ orderby} ${ paginacao} `;
			return  db.manyOrNone(strSql);
		}	}  else {
		strSql = `select   
			   trab.id_empresa as  id_empresa  
			,  trab.id_projeto as  id_projeto  
			,  trab.id_atividade as  id_atividade  
			,  trab.id as  id  
			,  trab.id_responsavel as  id_responsavel  
			,  trab.horas_prog as  horas_prog  
			,  trab.horas_cons as  horas_cons  
			,  trab.saldo_hrs as  saldo_hrs  
			,  trab.descricao as  descricao  
			,  trab.situacao as  situacao  
			, to_char(trab.datalanc, 'YYYY-MM-DD HH24:MI GMT-0300') as datalanc  
			,  trab.user_insert as  user_insert  
			,  trab.user_update as  user_update  
			,  resp.razao as  resp_razao  
			,  resp.grupo as  resp_grupo  
			,  usu_insert.razao as  insert_razao    
			FROM trabalho trab			   
				 inner join usuarios resp on trab.id_empresa = resp.id_empresa and trab.id_responsavel = resp.id
				 inner join usuarios usu_insert on trab.id_empresa = usu_insert.id_empresa and trab.user_insert = usu_insert.id  `;
		return  db.manyOrNone(strSql);
	}
}
/* CRUD - INSERT */
 exports.insertTrabalho = function(trabalho){
	strSql = `insert into trabalho (
		     id_empresa 
		 ,   id_projeto 
		 ,   id_atividade 
		 ,   id_responsavel 
		 ,   horas_prog 
		 ,   horas_cons 
		 ,   saldo_hrs 
		 ,   descricao 
		 ,   situacao 
		 ,   datalanc 
		 ,   user_insert 
		 ,   user_update 
		 ) 
		 values(
		     ${trabalho.id_empresa} 
		 ,   ${trabalho.id_projeto} 
		 ,   ${trabalho.id_atividade} 
		 ,   ${trabalho.id_responsavel} 
		 ,   ${trabalho.horas_prog} 
		 ,   ${trabalho.horas_cons} 
		 ,   ${trabalho.saldo_hrs} 
		 ,   '${trabalho.descricao}' 
		 ,   '${trabalho.situacao}' 
		 ,   '${trabalho.datalanc.replace('GMT-0300', '').replace('T', ' ').replace('Z', '')}' 
		 ,   ${trabalho.user_insert} 
		 ,   ${trabalho.user_update} 
		 ) 
 returning * `;
	return db.oneOrNone(strSql);
};
/* CRUD - UPDATE */
 exports.updateTrabalho = function(trabalho){
	strSql = `update   trabalho set  
		     id_responsavel = ${trabalho.id_responsavel} 
 		 ,   horas_prog = ${trabalho.horas_prog} 
 		 ,   horas_cons = ${trabalho.horas_cons} 
 		 ,   saldo_hrs = ${trabalho.saldo_hrs} 
 		 ,   descricao = '${trabalho.descricao}' 
 		 ,   situacao = '${trabalho.situacao}' 
 		 ,   datalanc = '${trabalho.datalanc.replace('GMT-0300', '').replace('T', ' ').replace('Z', '')}' 
 		 ,   user_insert = ${trabalho.user_insert} 
 		 ,   user_update = ${trabalho.user_update} 
 		 where id_empresa = ${trabalho.id_empresa} and  id_projeto = ${trabalho.id_projeto} and  id_atividade = ${trabalho.id_atividade} and  id = ${trabalho.id}  returning * `;
	return  db.oneOrNone(strSql);
}
/* CRUD - DELETE */
 exports.deleteTrabalho = function(id_empresa,id_projeto,id_atividade,id){
	strSql = `delete from trabalho 
		 where id_empresa = ${id_empresa} and  id_projeto = ${id_projeto} and  id_atividade = ${id_atividade} and  id = ${id}  `;
 	return  db.oneOrNone(strSql);
}


