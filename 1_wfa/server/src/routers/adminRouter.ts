import express from 'express';

export const app = express();

app.post('/adminLogin', (req: any, res) => {
    console.log(req.body);
    
})