export class ComponentConfig{
    labelWidth="7em";
    label;
    key;
    span;
    offset;
    type;
    placeHolder;
    hr;
    bottomSpace=null;
    table=null;
    columns=null;

    getLabel(){
        return this.type === "boolean" ? null :this.label;
    }
    getLabelWidth(){
        return this.type === "boolean" ? 0 :this.labelWidth;
    }
    getCheckboxLabel(){
        return this.label;
    }
}
  
export class FormFactory{
    constructor(columns){
        this.input=null;
        this.allLabelWithColon=false;
        this.allCollSpan=24/columns;
        this.allBottomSpace="5px";
        this.allLabelWidth="7em";
    }
    defaultBottomSpace(val){
        this.allBottomSpace=val;
        return this;
    }
    defaultCollSpan(val){
        this.allCollSpan=val;
        return this;
    }
    allLabelEndWithColon(){
        this.allLabelWithColon=true;
        return this;
    }
    defaultLabelWidth(val){
        this.allLabelWidth=val;
        return this;
    }

    span(span){
        this.getInput().span=span; 
        return this;
    }   
    table(table) {
        this.getInput().table = table;
        return this;
    }   
    columns(columns){
        this.getInput().columns=columns; 
        return this;
    }   
    offset(offset){
        this.getInput().offset=offset; 
        return this;
    }   
    bottomSpace(val){
        this.getInput().bottomSpace=val; 
        return this;
    }   
    placeHolder(placeHolder){
        this.getInput().placeHolder=placeHolder;
        return this;
    }   
    key(key){
        this.getInput().key=key; 
        return this;
    }   
    space(){
        this.getInput().type="space"; 
        return this;
    }   
    label(label){
        this.getInput().type="label"; 
        this.getInput().label=label; 
        return this;
    }   
    labelWidth(width){
        this.getInput().labelWidth=width; 
        return this;
    }   
    hr(label){
        this.getInput().type='hr'; 
        this.getInput().label=label; 
        return this;
    }   
    newRow(){
        this.getInput().type='row'; 
        return this.build();
    }   
    textInput(label,key=label.toLowerCase(), type="text"){
        if(this.allLabelWithColon && !label.endsWith(':') && type!=="boolean"){
            this.getInput().label=label+":";
        } else{
            this.getInput().label=label;
        }
        this.getInput().key=key.toLowerCase();
        this.getInput().placeHolder=label;
        this.getInput().type=type;
        return this;
    }   
    checkbox(label,key=label.toLowerCase()){
        this.textInput(label,key, 'boolean');
        return this;
    }   
    lookup(label,key=label.toLowerCase()){
        this.textInput(label,key, 'lookup');
        return this;
    }   
    selectInput(label,key=label.toLowerCase()){
        this.textInput(label,key, 'select');
        return this;
    }   
    dateInput(label,key=label.toLowerCase()){
        this.textInput(label,key,'date');
        return this;
    }   
    numericinput(label,key=label.toLowerCase()){
        this.textInput(label,key,'numeric');
        return this;
    }   
    textArea(label,key=label.toLowerCase()){
        this.textInput(label, key, 'area');
        return this;
    }   

    build(){
        let ret = this.input;
        this.input = null;
        return ret; 
    }




    getInput(){
        if(!this.input){
            this.input = new ComponentConfig();
            this.input.type = "text";
            this.span(this.allCollSpan);
            this.labelWidth(this.allLabelWidth);
            this.input.bottomSpace = this.allBottomSpace;
        } 
        return this.input;
    }
 
 }
 