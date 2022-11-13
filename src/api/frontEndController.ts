import express from 'express';

const router = express.Router();
const publicFolderPath = './src/public';

router.get('/', (_request, response) => {
    response.sendFile('index.html',  { root: publicFolderPath});
})

router.get('/indexScript.js', (_request, response) => {
    response.sendFile('indexScript.js',  { root: publicFolderPath});
})

export default router;