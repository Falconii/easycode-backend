/* ROUTE trabalho */
const db = require('../infra/database');
const express = require('express');
const router = express.Router(); 
const trabalhoSrv = require('../service/trabalhoService');

/* ROTA GETONE trabalho */
router.get("/api/trabalho/:id_empresa/:id_projeto/:id_atividade/:id",async function(req, res) {try 
	{
		const lsLista = await trabalhoSrv.getTrabalho(req.params.id_empresa,req.params.id_projeto,req.params.id_atividade,req.params.id);
		if (lsLista == null) 
		{
			res.status(409).json({ message: 'Trabalho Não Encontrada.' });
		}
	else
		{
			res.status(200).json(lsLista);
		}
	}
catch (err)
	{
		if(err.name == 'MyExceptionDB')
		{
			res.status(409).json(err);
		}
		else
		{
			res.status(500).json({ erro: 'BAK-END', tabela: 'trabalho', message: err.message });
		}
	}
})
/* ROTA GETALL trabalho */
router.get("/api/trabalhos",async function(req, res) {try 
	{
		const lsLista = await trabalhoSrv.getTrabalhos();
		if (lsLista.length == 0) 
		{
			res.status(409).json({ message: 'Nehuma Informação Para Esta Consulta.'} );
		}
	else
		{
			res.status(200).json(lsLista);
		}
	}
catch (err)
	{
		if(err.name == 'MyExceptionDB')
		{
			res.status(409).json(err);
		}
		else
		{
			res.status(500).json({ erro: 'BAK-END', tabela: 'trabalho', message: err.message });
		}
	}
})
/* ROTA INSERT trabalho */
router.post("/api/trabalho",async function(req, res) {try 
	{
		const trabalho = req.body;
		const registro = await trabalhoSrv.insertTrabalho(trabalho);		if (registro == null)
		{			res.status(409).json({ message: 'Trabalho Cadastrado!' });
		}
		else
		{
			res.status(200).json(registro);
		}
}
catch (err)
	{
		if(err.name == 'MyExceptionDB')
		{
			res.status(409).json(err);
		}
		else
		{
			res.status(500).json({ erro: 'BAK-END', tabela: 'Trabalho', message: err.message });
		}
	}
})
/* ROTA UPDATE trabalho */
router.put("/api/trabalho",async function(req, res) {try 
	{
		const trabalho = req.body;
		const registro = await trabalhoSrv.updateTrabalho(trabalho);		if (registro == null)
		{			res.status(409).json({ message: 'Trabalho Alterado Com Sucesso!' });
		}
		else
		{
			res.status(200).json(registro);
		}
}
catch (err)
	{
		if(err.name == 'MyExceptionDB')
		{
			res.status(409).json(err);
		}
		else
		{
			res.status(500).json({ erro: 'BAK-END', tabela: 'Trabalho', message: err.message });
		}
	}
})
/* ROTA DELETE trabalho */
router.delete("/api/trabalho/:id_empresa/:id_projeto/:id_atividade/:id",async function(req, res) {try 
	{
		await trabalhoSrv.deleteTrabalho(req.params.id_empresa,req.params.id_projeto,req.params.id_atividade,req.params.id);		res.status(200).json({ message: 'Trabalho Excluído Com Sucesso!' });
}
catch (err)
	{
		if(err.name == 'MyExceptionDB')
		{
			res.status(409).json(err);
		}
		else
		{
			res.status(500).json({ erro: 'BAK-END', tabela: 'Trabalho', message: err.message });
		}
	}
})
/* ROTA CONSULTA POST trabalho */
router.post("/api/trabalhos",async function(req, res) {/*
	{
		"id_empresa":0, 
		"id_projeto":0, 
		"id_atividade":0, 
		"id":0, 
		"descricao":"", 
		"pagina":0, 
		"tamPagina":50, 
		"contador":"N", 
		"orderby":"", 
		"sharp":false 
	}
*/
try 
	{
		const params = req.body;
		const lsRegistros = await trabalhoSrv.getTrabalhos(params);		if (lsRegistros.length == 0)
		{			res.status(409).json({ message: 'Trabalho Nenhum Registro Encontrado!' });
		}
		else
		{
			res.status(200).json(lsRegistros);
		}
}
catch (err)
	{
		if(err.name == 'MyExceptionDB')
		{
			res.status(409).json(err);
		}
		else
		{
			res.status(500).json({ erro: 'BAK-END', tabela: 'Trabalho', message: err.message });
		}
	}
})

module.exports = router;
