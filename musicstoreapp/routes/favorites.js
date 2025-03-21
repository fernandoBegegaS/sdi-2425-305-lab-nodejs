module.exports = function (app,favoriteSongsRepository) {

    app.post('/songs/favorites/add/:song_id', function (req, res) {

        let song = {
            song_id: req.params.song_id,
            title: req.body.title,
            price: parseFloat(req.body.price), // Convertimos a número
            user: req.session.user
        };

        favoriteSongsRepository.insertFavoriteSongs(song, function (result) {
            if (result.songId !== null && result.songId !== undefined) {
                res.redirect("/favorites");
            } else {
                res.send("Error al insertar canción favorita: " + result.error);
            }
        });

    });



    app.get('/songs/favorites/delete/:favorite_id', async function (req, res) {
        try {
            let favorite_id = req.params.favorite_id;
            let result = await favoriteSongsRepository.deleteFavoriteSong(favorite_id);

            if (result.deletedCount > 0) {
                res.redirect('/favorites');
            } else {
                res.send("Error: No se encontró la canción para eliminar.");
            }
        } catch (error) {
            res.send("Error al eliminar la canción favorita: " + error.message);
        }
    });


    app.get('/favorites', function (req, res) {
        let options = {};
        let user = req.session.user;

        favoriteSongsRepository.getFavoriteSongs(user, options)
            .then(songs => {
                let totalPrice = songs.reduce((acumulador, song) => acumulador + song.price, 0);
                res.render("favorites.twig", { songs: songs, totalPrice: totalPrice });
            })
            .catch(error => {
                res.send("Se ha producido un error al listar las canciones " + error);
            });
    });

};