import express from 'express';
import * as communicationsController from '../controllers/communicationsController';

export const app = express();

app.post('/sendMessage', async (req: any, res) => {
    const message = req.body.content;
    const recipient = req.body.recipient;
    if (req.body.discussion) {
        const result = await communicationsController.addMessageToExistingDiscussion(message, recipient, req.user._id, req.body.discussion);
        return res.status(200).json(result);
    } else {
        const result = await communicationsController.sendMessage(message, recipient, req.user._id);
        return res.status(200).json(result);
    }
});

app.get('/fetchUserMessages', (req: any, res) => {
    const messages = communicationsController.fetchMessages(req.user._id);
    return res.status(200).json(messages);
})

app.get('/fetchUserDiscussions', (req: any, res) => {
    const discussions = communicationsController.fetchDiscussions(req.user._id);
    return res.status(200).json(discussions);
})