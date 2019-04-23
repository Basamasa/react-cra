export class Adress {
    constructor() {
        this.country = "";
        this.city = "";
        this.street = "";
        this.number = 10;
    }
    guiRep(){
        return this.city+" "+this.country+" "+this.street+" "+this.number;
    }
}

export class AdressService  {
    createAdresses(count) {
        var array = new Array();
        var countries = ["USA",           "Germany",         "India",        "Russia",         "Brasil",   "UK"];
        var cities =    ["Gothham",       "Berlin",          "New Deli",     "Moscow",         "Rio",      "London"];
        var streets =   ["Rumble Street", "Neuendorfer Str.","Raband Rudeu", "Novosibirskaja", "Sao Paolo","Abey Road" ];
        for (var i = 0; i < count; i++) {
            var adress = new Adress();
            adress.country = countries[i % countries.length];
            adress.city = cities[i % cities.length];
            adress.street = streets[i % streets.length];
            adress.number = i + 22;
            array.push(adress);
        }
        return array;
    }
}
