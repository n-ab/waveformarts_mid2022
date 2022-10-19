import express from 'express';
import * as metricsController from '../controllers/metricsController';

export const app = express();

app.post('/addPageCount', (req: any, res) => {
    console.log('adding page count for page: ', req.body);
    
    metricsController.addPageCount(req.body['page']);
})

app.post('/addPageVisitedFrom', (req: any, res) => {
    console.log('add page visited from metric: ', req.body);
    metricsController.addPageVisitedFrom(req.body);
})