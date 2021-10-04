const express = require('express');
const dotenv = require('dotenv');
const ObjectId = require('mongodb').ObjectId;
const MongoClient = require('mongodb').MongoClient;
const fileUpload = require('express-fileupload');
dotenv.config();

const uri = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@spaceappscluster.1ebzr.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;
const logs = express();
logs.use(fileUpload());

logs.get('/getLog', (req, res) => {
    const {userId, numberOfPosts, offset, mission} = req.query;
    MongoClient.connect(uri, (err, client) => {
        if (err) {
            res.statusCode = 500;
            res.json({
                err: 'DB could not connect: ' + err.message
            });
        }

        const db = client.db(process.env.MONGO_DB_NAME);
        db.collection('logs').find({$and: [{userId: {$eq: userId}}, {missionName: {$eq: mission}}]}).skip(parseInt(offset)).sort('createdAt', 'ascending').limit(parseInt(numberOfPosts)).toArray((err, result) => {
            if (err) {
                res.status(500).json({
                    err: 'DB error: ' + err.message
                })
            }

            res.status(201).json(result);
        });
    });

});

logs.get('/getAllLogs', (req, res) => {
    MongoClient.connect(uri, (err, client) => {
        if (err) {
            res.statusCode = 500;
            res.json({
                err: 'DB could not connect: ' + err.message
            });
        }

        const db = client.db(process.env.MONGO_DB_NAME);
        db.collection('logs').aggregate([{$match: {missionName: {$in: ["Test Mission 1", "Test Mission 2", "Test Mission 3", "Test Mission 4"]}}},{
            $sort: {"_id": 1}
        }, {
            $group: {
                _id: '$missionName',
                consoleLogs: {
                    $push: {
                        _id: "$_id",
                        createdAt: "$createdAt",
                        date: "$date",
                        time: "$time",
                        userId: "$userId",
                        message: "$message",
                        username: "$username",
                        firstName: "$firstName",
                        lastName: "$lastName",
                        file: "$file",
                        metadata: {likes: "$metadata.likes", comments: "$metadata.comments"}

                    }
                }
            }
        }
        ]).toArray((err, result) => {
            if (err) {
                res.status(500).json({
                    err: 'DB error: ' + err.message
                })
            }

            res.status(201).json(result);
        });
    });

});

logs.get('/getSingleLog', (req, res) => {
    const {logId} = req.query;
    MongoClient.connect(uri, (err, client) => {
        if (err) {
            res.statusCode = 500;
            res.json({
                err: 'DB could not connect: ' + err.message
            });
        }

        const db = client.db(process.env.MONGO_DB_NAME);
        const objId = new ObjectId(logId)
        db.collection('logs').find({_id: objId}).toArray((err, result) => {
            if (err) {
                res.status(500).json({
                    err: 'DB error: ' + err.message
                })
            }

            res.status(201).json(result);
        });
    });
});

logs.get('/like', (req, res) => {
    const {logId} = req.query;
    MongoClient.connect(uri, (err, client) => {
        if (err) {
            res.statusCode = 500;
            res.json({
                err: 'DB could not connect: ' + err.message
            });
        }

        const db = client.db(process.env.MONGO_DB_NAME);
        const objId = new ObjectId(logId);
        db.collection('logs').updateOne({_id: objId}, {$inc: {"metadata.likes": 1}}, (err, result) => {
            if (err) {
                res.status(500).json({
                    err: "DB error " + err.message
                });
            }

            res.status(201).json(result);
        });
    });

});

logs.post('/comment', (req, res) => {
    const {userId, logId, comment, username, firstName, lastName} = req.body;
    const date_ob = new Date();
    const day = ("0" + date_ob.getDate()).slice(-2);
    const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    const year = date_ob.getFullYear();
    const hours = date_ob.getHours();
    const minutes = date_ob.getMinutes();
    const seconds = date_ob.getSeconds();

    MongoClient.connect(uri, (err, client) => {
        if (err) {
            res.statusCode = 500;
            res.json({
                err: 'DB could not connect: ' + err.message
            });
        }

        const db = client.db(process.env.MONGO_DB_NAME);

        const newComment = {
            createdAt: date_ob,
            date: day + "-" + month + "-" + year,
            time: hours + ":" + minutes + ":" + seconds,
            userId,
            comment,
            username,
            firstName,
            lastName
        };

        const objId = new ObjectId(logId);
        db.collection('logs').updateOne({_id: objId}, {$push: {'metadata.comments': newComment}}, (err, result) => {
            if (err) {
                res.status(500).json({
                    err: "DB error: " + err.message
                });
            }

            res.status(201).json(result);
        });
    });
});

logs.post('/newLog', (req, res) => {
    const {userId, consoleLog, missionName, username, firstName, lastName} = req.body;
    const date_ob = new Date();
    const day = ("0" + date_ob.getDate()).slice(-2);
    const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    const year = date_ob.getFullYear();
    const hours = date_ob.getHours();
    const minutes = date_ob.getMinutes();
    const seconds = date_ob.getSeconds();
    let file;
    if(req.file){
        file = req.files.file;
    }else{
        file = null
    }
    let uploadedFile;
    if(file){
        file.mv(`./frontend/public/uploads/${file.name}`, err =>{
            if(err){
                res.status(500).json({
                    err: 'Path does not exist'
                })
            }

            uploadedFile = {fileName: file.name, filePath: `uploads/${file.name}`}
        })
    }

    MongoClient.connect(uri, (err, client) => {
        if (err) {
            res.statusCode = 500;
            res.json({
                err: 'DB could not connect: ' + err.message
            });
        }

        const db = client.db(process.env.MONGO_DB_NAME);

        const newLog = {
            createdAt: date_ob,
            date: day + "-" + month + "-" + year,
            time: hours + ":" + minutes + ":" + seconds,
            userId,
            message: consoleLog,
            missionName,
            username,
            firstName,
            lastName,
            file: uploadedFile ? uploadedFile : null,
            metadata: {
                likes: 0,
                comments: [],
            }
        };

        db.collection('logs').insertOne(newLog, (err, result) => {
            if (err) {
                res.status(500).json({
                    err: "DB error: " + err.message
                });
            }

            res.status(201).json({
                insertedLog: newLog,
                success: "New console log successfully created!"
            });
        });
    });
});

module.exports = logs;