'use strict';
const Promise = require('bluebird');
const db = require('../models');

// function to capitalize first letter of users Topic search for cohesive UI
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

// Users can add a topic.
const addTopic = (req, res) => {
    const addedTopic = req.body.addTopic;
    return Promise.all([
        db.topic.findOne({
        where: {
            topic_name: addedTopic
        }
        }),
        db.user.findOne({
            where: {
                id: req.user.id
            }
        })
    ])
    .then(data=>{
        if (data[0] === null) {
            console.log('THIS IS RUNNING GAL');
            // no such topic, creating one .
            return Promise.all([
                db.topic.create({
                    userId: 1,
                    topic_name: addedTopic,
                }),
                db.user.findOne({
                    where: {
                        id: req.user.id
                    }
                })
            ]).then(data => {
                const hbsObject = {
                    topic: addedTopic.capitalize(),
                    message1: "Oh no! There aren't any repos yet!",
                    message2: "Want to add another repo?",
                    name: data[1].displayName
                };
                res.render('addTopic', hbsObject)
            }).catch(err => {
                `err is ${err}`
            });
        }
        if (data[0].topic_name){
            // that topic already exists
            const hbsObject = {
                data: false,
                name: data[1].displayName,
                ohSnap: `Oh, snap...`,
                duplicate: `${addedTopic} already exsists! Try searching for it above!`
            }
            res.render('trending', hbsObject);
        } 
    }).then(data => {
        console.log(`hello!`);
    }).catch(err => {
        `err is ${err}`
    })
};

// users can add a repo
const addRepo = (req, res) => {
    const repoLink = req.body.repoLink;
    const repoDesc = req.body.repoDesc;
    const topic = req.query.topic;
    return Promise.all([
        db.repo.create({
            userId: 1,
            repo_name: topic,
            repo_link: repoLink,
            repo_description: repoDesc
        }),
        db.topic.findOne({
            where: {
                topic_name: topic
            }
        })
    ]).then(data => {
        // the data returned is an array with two indicies [repoData, topicdata]
        // there are nested objects with in each index
        const repoId = data[0].id;
        const topicId = data[1].id;
        return db.repos_topics.create({
            repoId: repoId,
            topicId: topicId
        })
    }).then(data => {
        return Promise.all([
            db.topic.findAll({
                where: {
                    topic_name: topic
                },
                include: [db.repo],
                order: [
                    [db.repo, 'repo_score', 'DESC']
                ]
            }),
            db.user.findOne({
                where: {
                    id: req.user.id
                }
            })
        ])
    }).then(data => {
        console.log("This is the data when you find all after adding a repo: " + JSON.stringify(data[1]));
        const hbsObject = {
            data: true,
            topic: data[0][0].topic_name.capitalize(),
            repos: data[0][0].repos,
            name: data[1].displayName
        }
        console.log("This is the handlebar object " + JSON.stringify(hbsObject));
        res.render('trending', hbsObject)
    }).catch(err => {
        `err is ${err}`
    });
}

module.exports = {
    addTopic,
    addRepo,
};