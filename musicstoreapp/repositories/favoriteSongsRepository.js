const { ObjectId } = require('mongodb');

module.exports = {
    mongoClient: null,
    app: null,
    database: "musicStore",
    collectionName: "favoriteSongs",
    init: function (app, dbClient) {
        this.dbClient = dbClient;
        this.app = app;
    },
    getFavoriteSongs: async function (user, options) {
        try {
            await this.dbClient.connect();
            const database = this.dbClient.db(this.database);
            const songsCollection = database.collection(this.collectionName);
            const songs = await songsCollection.find({ user: user }, options).toArray();
            await this.dbClient.close();
            return songs;
        } catch (error) {
            throw error;
        }
    },
    insertFavoriteSongs: function (song, callbackFunction) {
        this.dbClient.connect()
            .then(() => {
                const database = this.dbClient.db(this.database);
                const songsCollection = database.collection(this.collectionName);
                songsCollection.insertOne(song)
                    .then(result => callbackFunction({ songId: result.insertedId }))
                    .then(() => this.dbClient.close())
                    .catch(err => callbackFunction({ error: err.message }));
            })
            .catch(err => callbackFunction({ error: err.message }));
    },
    deleteFavoriteSong: async function (id) {
        try {
            let filter = {_id: new ObjectId(id)};
            await this.dbClient.connect();
            const database = this.dbClient.db(this.database);
            const songsCollection = database.collection(this.collectionName);
            const result = await songsCollection.deleteOne(filter);
            await this.dbClient.close();
            return result;
        } catch (error) {
            throw error;
        }
    }
};
