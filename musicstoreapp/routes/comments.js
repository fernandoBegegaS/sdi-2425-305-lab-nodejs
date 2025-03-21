module.exports = function (app,commentsRepository) {

    app.post('/songs/comments/add/:song_id', function (req, res) {

        let comment = {
            song_id: req.params.song_id,
            text: req.body.text,
            author: req.session.user
        };

        commentsRepository.insertComment(comment, function (result) {
            if (result.songId !== null && result.songId !== undefined) {
                res.send("Comentario añadido con exito");
            } else {
                res.send("Error al insertar comentario: " + result.error);
            }
        });

    });

};