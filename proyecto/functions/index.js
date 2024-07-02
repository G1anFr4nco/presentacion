const admin = require('firebase-admin');
const functions = require('firebase-functions');
admin.initializeApp();

const db = admin.firestore();

exports.createItem = functions.https.onRequest(async (req, res) => {
    const data = req.body;
    await db.collection('items').add(data);
    res.status(201).send('Item created');
});

exports.readItem = functions.https.onRequest(async (req, res) => {
    const id = req.query.id;
    const doc = await db.collection('items').doc(id).get();
    if (!doc.exists) {
        res.status(404).send('Item not found');
    } else {
        res.status(200).send(doc.data());
    }
});

exports.updateItem = functions.https.onRequest(async (req, res) => {
    const id = req.body.id;
    const data = req.body.data;
    await db.collection('items').doc(id).update(data);
    res.status(200).send('Item updated');
});

exports.deleteItem = functions.https.onRequest(async (req, res) => {
    const id = req.body.id;
    await db.collection('items').doc(id).delete();
    res.status(200).send('Item deleted');
});
