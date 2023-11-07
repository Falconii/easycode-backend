/* ROUTE imobilizados */
const db = require('../infra/database');
const express = require('express');
const router = express.Router(); 
const imobilizadosSrv = require('../service/imobilizadosService');

/* ROTA GETONE imobilizados */
router.get("/api/imobilizados/:id_empresa/:id_filial/:codigo",async function(req, res) {
	{
		const lsLista = await imobilizadosSrv.getImobilizados(req.params.id_empresa,req.params.id_filial,req.params.codigo);
		if (lsLista == null) 
		{
			res.status(409).json({ message: 'Imobilizados Não Encontrada.' });
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
			res.status(500).json({ erro: 'BAK-END', tabela: 'imobilizados', message: err.message });
		}
	}
})
/* ROTA GETALL imobilizados */
router.get("/api/imobilizado",async function(req, res) {
	{
		const lsLista = await imobilizadosSrv.getImobilizado();
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
			res.status(500).json({ erro: 'BAK-END', tabela: 'imobilizados', message: err.message });
		}
	}
})
/* ROTA INSERT imobilizados */
router.post("/api/imobilizados",async function(req, res) {
	{
		const imobilizados = req.body;
		const registro = await imobilizadosSrv.insertImobilizados(imobilizados);
		{
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
			res.status(500).json({ erro: 'BAK-END', tabela: 'Imobilizados', message: err.message });
		}
	}
})
/* ROTA UPDATE imobilizados */
router.put("/api/imobilizados",async function(req, res) {
	{
		const imobilizados = req.body;
		const registro = await imobilizadosSrv.updateImobilizados(imobilizados);
		{
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
			res.status(500).json({ erro: 'BAK-END', tabela: 'Imobilizados', message: err.message });
		}
	}
})
/* ROTA DELETE imobilizados */
router.delete("/api/imobilizados/:id_empresa/:id_filial/:codigo",async function(req, res) {
	{
		await imobilizadosSrv.deleteImobilizados(req.params.id_empresa,req.params.id_filial,req.params.codigo);
}
catch (err)
	{
		if(err.name == 'MyExceptionDB')
		{
			res.status(409).json(err);
		}
		else
		{
			res.status(500).json({ erro: 'BAK-END', tabela: 'Imobilizados', message: err.message });
		}
	}
})
/* ROTA CONSULTA POST imobilizados */
router.post("/api/imobilizado",async function(req, res) {
	{
		"id_empresa":0, 
		"id_filial":0, 
		"codigo":0, 
		"descricao":"", 
		"grupo_cod":0, 
		"cc_cod":"", 
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
		const lsRegistros = await imobilizadosSrv.getImobilizado(params);
		{
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
			res.status(500).json({ erro: 'BAK-END', tabela: 'Imobilizados', message: err.message });
		}
	}
})

module.exports = router;