/* eslint-disable no-unused-expressions */

export class Person {
    constructor(id, first) {
      this.id = id;
      this.first= first;
      this.second= "";
      this.paid;
      this.nickname= "";
      this.city= "";
      this.male;
      this.birthday;
      this.key;
    }
    copy(){
      var p = new Person(this.id, this.first);
      p.second=this.second;
      p.paid = this.paid;
      p.nickname = this.nickname;
      p.city = this.city;
      p.male = this.male;
      p.birthday = this.birthday;
      p.key = this.key;
      return p;
    }
    guiRep(){
      return this.first;
    }
}

export class PersonService{
  constructor(){}

  createPersons(count) {
    let persons = [];
    let names = ["Reyu","Joshi","Andy","Helen","Carlo","Peter","John"]
    let secondnames = ["Murakami","Rudolp","Kretschmer","Helenbird","Carlosoto","Peterson","Jonson"]
    let nicknames = ["The Flow","Rambo","Cruncher","Delightfull","Weired","Orderly","King"]
    let cities = ["Gothham","Berlin","New Deli","Bejin","Rom","Budapest","New Orleans"]
    for (let index = 0; index < count; index++) {
       let person = new Person(index, names[index%names.length]);
       person.second=secondnames[index%secondnames.length];
       person.birthday=new Date(858594654654+index*60*1000*60*24).toDateString(); // React is not able to render Objects (Objects are not valid as a React child.) -> use String instead
       person.paid=""+index*245;
       person.nickname=nicknames[index%nicknames.length];
       person.city=cities[index%cities.length];
       person.key=index;
       persons.push(person);
    }
    return persons;
  }
}