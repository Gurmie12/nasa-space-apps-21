const express = require('express');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const randToken = require('rand-token');
const ObjectId = require('mongodb').ObjectId;
dotenv.config();
const MongoClient = require('mongodb').MongoClient;
const auth = express();
const uri = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@spaceappscluster.1ebzr.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;

auth.post('/signup', async (req, res) => {
    const {username, email, password, firstName, lastName, occupation, country} = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = {username, email, password: hashedPassword, firstName, lastName, occupation, country, refreshToken: null};

    MongoClient.connect(uri, (err, client) => {
        if (err) {
            res.statusCode = 500;
            res.json({
                err: 'DB could not connect: ' + err.message
            });
        }

        const db = client.db(process.env.MONGO_DB_NAME);
        db.collection('users').find({email}).toArray((err, result) => {
            if (err) {
                res.statusCode = 500;
                res.json({
                    err: 'DB error: ' + err.message
                });
            }

            if (result.length > 0) {
                res.statusCode = 201;
                res.json({
                    'success': 'User already exists with these credentials'
                });
            } else {
                db.collection('users').insertOne(user, (err, result) => {
                    if (err) {
                        res.statusCode = 500;
                        res.json({
                            err: 'DB could not connect: ' + err.message
                        });
                    }

                    res.statusCode = 201;
                    res.json({
                        'success': 'New user successfully created!'
                    });
                })
            }
        })
    })
});

auth.post('/login', (req, res) => {
    const {email, password} = req.body;

    MongoClient.connect(uri,(err, client) => {
        if (err) {
            res.statusCode = 500;
            res.json({
                err: 'DB could not connect: ' + err.message
            });
        }

        const db = client.db(process.env.MONGO_DB_NAME);
        db.collection('users').find({email}).toArray(async (err, result) =>{
            if(err){
                res.status(500).json({
                    'error': 'DB error: ' + err.message
                });
            }

            if(result.length === 0){
                res.status(201).json({
                    'success': 'User not found!'
                });
            }else{
                const user = result[0];

                if(await bcrypt.compare(password, user.password)){
                    const randUid = randToken.generate(256);
                    const token = jwt.sign(
                        { user_id: user._id, email, refreshToken: randUid, firstName: user.firstName, lastName: user.lastName, username: user.username },
                        process.env.TOKEN_KEY,
                        {
                            expiresIn: "2h",
                        }
                    );
                    db.collection('users').updateOne({_id: user._id}, {$set: {refreshToken: randUid}}, (err, updateRes) =>{
                        if(err){
                            res.status(500).json({
                                'error': 'DB error: ' + err.message
                            });
                        }
                    })

                    res.status(201).json({
                        success: 'User successfully logged in!',
                        token
                    });
                }else{
                    res.status(201).json({
                        success: 'Username or password is incorrect!'
                    });
                }
            }
        })
    })
});

auth.post('/refreshToken', (req, res) =>{
    jwt.verify(req.body.token, process.env.TOKEN_KEY, (err, decoded) =>{
        if(err){
            res.status(500).json({
                'error': 'JWT not verified: ' + err
            })
        }

        MongoClient.connect(uri,(err, client) => {
            if (err) {
                res.statusCode = 500;
                res.json({
                    err: 'DB could not connect: ' + err.message
                });
            }

            const db = client.db(process.env.MONGO_DB_NAME);
            const u_id = new ObjectId(decoded.user_id);
            db.collection('users').find({_id: u_id}).toArray((err, result) =>{
                if(err){
                    res.status(500).json({
                        'error': 'DB error: ' + err.message
                    });
                }

                if(result.length === 0){
                    res.status(201).json({
                        'success': 'User not found!'
                    });
                }else{
                    const user = result[0];
                    if(user.refreshToken === decoded.refreshToken){
                        const randUid = randToken.generate(256);
                        const token = jwt.sign(
                            { user_id: user._id, email: user.email, refreshToken: randUid, firstName: user.firstName, lastName: user.lastName, username: user.username },
                            process.env.TOKEN_KEY,
                            {
                                expiresIn: "2h",
                            }
                        );
                        db.collection('users').updateOne({_id: u_id}, {$set: {refreshToken: randUid}}, (err, updateRes) =>{
                            if(err){
                                res.status(500).json({
                                    'error': 'DB error: ' + err.message
                                });
                            }
                        })

                        res.status(201).json({
                            success: 'Token refreshed!',
                            token
                        });
                    }else{
                        res.status(500).json({
                            error: 'Token was not refreshed!'
                        });
                    }
                }
            })
        })
    })
});

module.exports = auth;