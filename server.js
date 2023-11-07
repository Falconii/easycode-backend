/* fontes gerado automaticamente */
const express = require('express');
const cors = require('cors');
const app = express(); app.use(express.json());
app.use(cors());
app.use('/', require('./route/empresaRoute'));
app.use('/', require('./route/filialRoute'));
app.use('/', require('./route/usuarioRoute'));
app.use('/', require('./route/grupousuarioRoute'));
app.use('/', require('./route/fornecedorRoute'));
app.use('/', require('./route/principalRoute'));
app.use('/', require('./route/produtoRoute'));
app.use('/', require('./route/grupoRoute'));
app.use('/', require('./route/centrocustoRoute'));
app.use('/', require('./route/imobilizadoRoute'));
app.use('/', require('./route/inventarioRoute'));
app.use('/', require('./route/usuarioinventarioRoute'));
app.use((err, req, res, next) =>  { res.status(err.httpStatusCode).json({ error: err.message, merda: 'Deu Erro' }) });
app.listen(3000, () => { console.log('Servidor No Ar. Porta 3000'); });
