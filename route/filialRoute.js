/* ROUTE filiais */
const db = require('../infra/database');
const express = require('express');
const router = express.Router(); 
const filialSrv = require('../service/filialService');

/* ROTA GETONE filial */
router.get("/api/filial/:id_empresa/:id_filial/:id",async function(req, res) {try 
	{
		const lsLista = await filialSrv.getFilial(req.params.id_empresa,req.params.id_filial,req.params.id);
		if (lsLista == null) 
		{
			res.status(409).json({ message: 'Filial Não Encontrada.' });
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
			res.status(500).json({ erro: 'BAK-END', tabela: 'filial', message: err.message });
		}
	}
})
/* ROTA GETALL filial */
router.get("/api/filiais",async function(req, res) {try 
	{
		const lsLista = await filialSrv.getFiliais();
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
			res.status(500).json({ erro: 'BAK-END', tabela: 'filial', message: err.message });
		}
	}
})
/* ROTA INSERT filial */
router.post("/api/filial",async function(req, res) {try 
	{
		const filial = req.body;
		const registro = await filialSrv.insertFilial(filial);		if (registro == null)
		{			res.status(409).json({ message: 'Filial Cadastrado!' });
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
			res.status(500).json({ erro: 'BAK-END', tabela: 'Filial', message: err.message });
		}
	}
})
/* ROTA UPDATE filial */
router.put("/api/filial",async function(req, res) {try 
	{
		const filial = req.body;
		const registro = await filialSrv.updateFilial(filial);		if (registro == null)
		{			res.status(409).json({ message: 'Filial Alterado Com Sucesso!' });
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
			res.status(500).json({ erro: 'BAK-END', tabela: 'Filial', message: err.message });
		}
	}
})
/* ROTA DELETE filial */
router.delete("/api/filial/:id_empresa/:id_filial/:id",async function(req, res) {try 
	{
		await filialSrv.deleteFilial(req.params.id_empresa,req.params.id_filial,req.params.id);		res.status(200).json({ message: 'Filial Excluído Com Sucesso!' });
}
catch (err)
	{
		if(err.name == 'MyExceptionDB')
		{
			res.status(409).json(err);
		}
		else
		{
			res.status(500).json({ erro: 'BAK-END', tabela: 'Filial', message: err.message });
		}
	}
})
/* ROTA CONSULTA POST filiais */
router.post("/api/filiais",async function(req, res) {/*
	{
		"id_empresa":0, 
		"id":0, 
		"razao":"", 
		"cnpj_cpf":"", 
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
		const lsRegistros = await filialSrv.getFiliais(params);		if (lsRegistros.length == 0)
		{			res.status(409).json({ message: 'Filial Nenhum Registro Encontrado!' });
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
			res.status(500).json({ erro: 'BAK-END', tabela: 'Filial', message: err.message });
		}
	}
})

module.exports = router;
