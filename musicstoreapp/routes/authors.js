module.exports = function (app) {

    let authors = [
        {
            name: "Juan",
            group: "Los Cantores",
            rol: "cantante"
        },
        {
            name: "María",
            group: "Los Trompetistas",
            rol: "trompetista"
        },
        {
            name: "Pablo",
            group: "Los Violinistas",
            rol: "violinista"
        },
        {
            name: "Laura",
            group: "Los Saxofonistas",
            rol: "saxofonista"
        },
        {
            name: "Carlos",
            group: "Los Pianistas",
            rol: "pianista"
        },
        {
            name: "Carlos",
            group: "Los Pianistas",
            rol: "pianista"
        }
    ];

    app.get('/authors/add', function (req, res) {
        let roles = [
            {
                key: "cantante",
                label: "cantante"
            },
            {
                key: "trompetista",
                label: "trompetista"
            },
            {
                key: "violinista",
                label: "violinista"
            },
            {
                key: "saxofonista",
                label: "saxofonista"
            },
            {
                key: "pianista",
                label: "pianista"
            }


        ];

        let response = {
            roles: roles
        };

        res.render("authors/add.twig", response);
    });



    app.post('/authors/add', function (req, res) {
        let response = "";

        // Comprobar name
        if (req.body.name != null && typeof(req.body.name) != "undefined") {
            response += "Name: " + req.body.name + "<br>";
        } else {
            response += "Name no enviado en la peticion<br>";
        }

        // Comprobar group
        if (req.body.group != null && typeof(req.body.group) != "undefined") {
            response += "Group: " + req.body.group + "<br>";
        } else {
            response += "Group no enviado en la peticion<br>";
        }

        // Comprobar rol
        if (req.body.rol != null && typeof(req.body.rol) != "undefined") {
            response += "Rol: " + req.body.rol + "<br>";
        } else {
            response += "Rol no enviado en la peticion<br>";
        }

        res.send(response);
    });




    app.get('/authors/', function (req, res) {


        let response = {
            authors: authors
        };

        res.render("authors/authors.twig", response);
    });

    app.get('/authors/filter/:rol', function (req, res) {
        const rol = req.params.rol;
        const filteredAuthors = authors.filter(author => author.rol === rol);
        res.render("authors/authors.twig", { authors: filteredAuthors });
    })

    app.get('/author*', function (req, res) {
        res.redirect("/authors/");
    });











};
