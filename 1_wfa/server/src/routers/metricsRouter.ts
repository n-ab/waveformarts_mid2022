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

app.post('/addPageMetrics', async (req: any, res) => {
    console.log('adding page metrics with data: ', req.body);
    return res.status(200).json('REVIEW /addPageMetrics... ');
    // const metricsSaved = metricsController.addPageMetrics(req.body);
    // return res.status(200).json(metricsSaved);
})