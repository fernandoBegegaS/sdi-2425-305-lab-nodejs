const { ObjectId } = require('mongodb');

module.exports = {
    mongoClient: null,
    app: null,
    database: "musicStore",
    collectionName: "comments",
    init: function (app, dbClient) {
        this.dbClient = dbClient;
        this.app = app;
    },
    insertComment: function (comment, callbackFunction) {
        this.dbClient.connect()
            .then(() => {
                const database = this.dbClient.db(this.database);
                const songsCollection = database.collection(this.collectionName);
                songsCollection.insertOne(comment)
                    .then(result => callbackFunction({ songId: result.insertedId }))
                    .then(() => this.dbClient.close())
                    .catch(err => callbackFunction({ error: err.message }));
            })
            .catch(err => callbackFunction({ error: err.message }));
    },
    findComments : async function (song_id) {
    try {
        let options = {};
        await this.dbClient.connect();
        const database = this.dbClient.db(this.database);
        const songsCollection = database.collection(this.collectionName);
        const songs = await songsCollection.find({ song_id: song_id }, options).toArray();
        await this.dbClient.close();
        return songs;
    } catch (error) {
        throw error;
    }
}
};
