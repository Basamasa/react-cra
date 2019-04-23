export class CommandConfig{
    constructor(){
      this.label="";
      this.secondClassCommand=false;
      this.callback=function (){};
    }
    execute(selection) {
        if (this.callback) {
            this.callback(selection);
        } else {
            alert("No callback defined for :label("+this.label+") :"+selection)
        }
    }
  }


  export class CommandFactory{
    constructor(){
        this.command=null;
    }

    create(label){
        this.getCommand().label=label;
        return this;
    }   
    secondClass(){
        this.getCommand().secondClassCommand=true;
        return this;
    }   
    callback(callback) {
        this.getCommand().callback = callback;
        return this;
    }   

    build(){
        let ret = this.command;
        this.command = null;
        return ret; 
    }

    getCommand(){
        if(!this.command){
            this.command = new CommandConfig();
        } 
        return this.command;
    }
 }
 