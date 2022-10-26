import mongoose from 'mongoose';
import { MessageModel } from '../models/message';
import { ThreadModel } from '../models/thread';
import { UserModel } from '../models/user';
import { DiscussionModel } from '../models/discussion';

export async function sendMessage(message, recipient, sender) {
    const newMessage = await MessageModel.create({content: message, recipient: recipient, sender: sender}).then(message => message);
    await updateSender(sender, newMessage._id);
    await updateRecipient(sender, newMessage._id);
    await generateNewDiscussion(newMessage._id, sender, recipient);
    return newMessage;
}

export async function addMessageToExistingDiscussion(message, recipient, sender, discussionId) {
    const newMessage = await MessageModel.create({content: message, recipient: recipient, sender: sender, discussion: discussionId}).then(message => message);
}

// --- f e t c h     f u n c t i o n s ---------------

export async function fetchMessages(userId) {
    const user = await UserModel.findById(userId).populate('messages').then(user => user);
    return user?.messages;
}

export async function fetchDiscussions(userId) {
    const user = await UserModel.findById(userId).populate('discussions').then(user => user);
    return user?.discussions;
}

// ---  u t i l i t y    f u n c t i o n s -----------

export async function updateSender(senderId, messageId) {
    await UserModel.findById(senderId).then(user => { user?.messages.push(messageId) });
}

export async function updateRecipient(recipiendId, messageId) {
    await UserModel.findById(recipiendId).then(user => { user?.messages.push(messageId) });
}

export async function generateNewDiscussion(messageId, senderId, recipientId) {
    await DiscussionModel.create({messages: [messageId], users: [senderId, recipientId]});
}