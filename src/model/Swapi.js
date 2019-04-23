export class Swapi {
    constructor(){
        this.rootURL = 'https://swapi.co/api/';
    }

    getPerson = this.singularRequestGenerator('people')
    getPeople = this.pluralRequestGenerator('people')
    getFilm = this.singularRequestGenerator('films')
    getFilms = this.pluralRequestGenerator('films')
    getPlanet = this.singularRequestGenerator('planets')
    getPlanets = this.pluralRequestGenerator('planets')
    getSpecies = this.singularRequestGenerator('species')
    getAllSpecies = this.pluralRequestGenerator('species')
    getStarship = this.singularRequestGenerator('starships')
    getStarships = this.pluralRequestGenerator('starships')
    getVehicle = this.singularRequestGenerator('vehicles')
    getVehicles = this.pluralRequestGenerator('vehicles')

    request(url, cb) {
        function listener(e) {
            if (oReq.readyState != 4 && e.type !== 'load') return;
            if (oReq.status && oReq.status != 200) {
                //this will be the error handler
            } else {
                cb(JSON.parse(oReq.responseText));
            }
        }

        var oReq = new XMLHttpRequest();
            oReq.open('get', url, true);
            oReq.setRequestHeader('User-Agent', 'swapi-javascript');
            oReq.setRequestHeader('Accept', 'application/json');
        oReq.onload = listener;

        // Wrap in a 0 millisecond timeout.
        // XDomainRequests appear to randomly fail unless kicked into a new scope.
        setTimeout(function () {
            oReq.send();
        }, 0);
    }

    getResources(cb) {
        this.request(this.rootURL, cb);
    }

    singularRequestGenerator(path) {
        return function (id, cb) {
            this.request(this.rootURL + path + '/' + id + '/', cb);
        };
    }

    pluralRequestGenerator(path) {
        return function () {
            if (arguments.length === 1) {
                this.request(this.rootURL + path + '/', arguments[0]);
            } else {
                this.request(this.rootURL + path + '/?page=' + arguments[0], arguments[1]);
            }
        };
    }



}