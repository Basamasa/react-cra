import React from 'react';
import { Layout, Button, Checkbox, Select, InputNumber } from 'element-react';
import ListPane from "./components/ListPane";
import EditPane from "./components/EditPane";
import { Person, PersonService } from "./model/Person.js";
import { AdressService } from "./model/Adress.js";
import { FormFactory } from "./factories/FormFactory";
//import { CommandFactory } from "./factories/CommandFactory";
import { ColumnFactory } from "./factories/ColumnFactory";

var form = new FormFactory(4).defaultBottomSpace("4px");
var column = new ColumnFactory();
// var command = new CommandFactory();

class LocalePerson extends React.Component {
    constructor(props) {
        super(props);
        this.myListPane = React.createRef();
        this.myEditPane = React.createRef();
        this.state = {
            devtools: [],
            uis: [{
                value: 'elementsui',
                label: 'Elements UI'
            }, {
                value: 'antd',
                label: 'Ant Design'
            }, {
                value: 'reactv',
                label: 'React-Virtualized'
            }],
            value: 'elementsui',
            selection : null,
            myPerson : new Person(),
            table: new PersonService().createPersons(100),
            tblsize : 100,
            listerConfig: {
                columns:[
                    column.create("Id").type('number').alignCenter().build(),
                    column.create("First").type('text').build(),
                    column.create("Second").type('text').build(),
                    column.create("Paid").type('number').alignRight().build(),
                    column.create("Nickname").type('text').build(),
                    column.create("City").type('text').build(),
                    column.create("Birthday").type('date').build()
                ] /*,
                  comands:[ 
                    command.create("Copy").callback(  ()=>this.$refs.myListPane.copySelectedRow()).build(),
                    command.create("Delete").callback(()=>this.$refs.myListPane.deleteSelectedRow()).build(),
                    command.create("New").callback(   ()=>this.$refs.myListPane.addRow(new Person())).build(),
                  ] */
                },
            newLister: {
                columns:[{
                    title: 'Id',
                    dataIndex: 'id',
                    width: 50,
                }, {
                    title : 'First',
                    dataIndex: 'first',
                    width: 50,
                }, {
                    title : 'Second',
                    dataIndex: 'second',
                    width: 50,
                }, {
                    title : 'Paid',
                    dataIndex: 'paid',
                    width: 50,
                }, {
                    title : 'Nickname',
                    dataIndex : 'nickname',
                    width : 50,
                }, {
                    title : 'City',
                    dataIndex : 'city',
                    width : 50,
                }, {
                    title : 'Birthday',
                    dataIndex : 'birthday',
                    width : 50,
                }]
            },
            editorConfig :{
                inputs: [
                    form.newRow(),
                    form.space().bottomSpace("10px").build(),
                    form.newRow(),
                    form.textInput("Id").span(4).build(),
                    form.checkbox("Male").span(3).offset(0).build(),
                    form.dateInput("Date of Birth", "birthday").build(),
                    form.newRow(),
                    form.hr("Adress").span(24).build(),
                    form.textInput("First").build(),
                    form.lookup("Second")
                            .columns([column.create("Id").alignCenter().sort(false).build(), 
                                        column.create("First").sort(false).build(),
                                        column.create("Second").sort(false).build()])
                            .table( new PersonService().createPersons(10) ).build(),
                    form.newRow(),
                    form.textInput("City").build(),
                    form.textInput("Street").build(),
                    form.textInput("Country").build(),
                    form.hr("Other").span(24).build(),
                    form.textInput("Income", "paid").build(),
                    form.newRow(),
                    form.selectInput("Nickname")
                            .table( new PersonService().createPersons(10) ).build(),
                    form.selectInput("Adress")
                            .table( new AdressService().createAdresses(10) ).build(),
                    form.newRow(),
                    form.textArea("Comment").span(22).build(),
                ] /*,
                commands: [
                    command.create("Save").build(),
                    command.create("Send").build(),
                    command.create("Edit").secondClass().build()
                ], */
                },
            };
        }

    /*
        Note the use of the arrow function in the definition of handleClick. 
        This allows us to avoid using .bind when invoking, as it will retain the context of where it is called. (this)
    */
    handleClick = (row) => {
        this.setState({
            selection : row,
            myPerson : row,
        }, () => this.myEditPane.current.changeState(this.state.myPerson));  // callback cuz setState is asynchronous
    }

    /*
        Handles the editpane onChanges
    */
    handleChange(e)  {
        this.setState({
            myPerson : e,
        },() => this.reflectChanges())
    }

    reflectChanges() {
        var objIndex = this.state.table.findIndex((obj => obj === this.state.selection));
        const array = this.state.table.slice();
        array[objIndex] = this.state.myPerson;
        this.setState({
            table : array,
            selection : this.state.myPerson,
        }, () => this.myListPane.current.changeState(this.state.table));
    }
    
    // Performance Optimization
    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.devtools.indexOf("Disable LocalePerson Rerender") !== -1) {
            console.error("LocalePerson Rerender disabled");
            return false;
        }
        if (JSON.stringify(this.state) === JSON.stringify(nextState)) {
            return false;
        }
        if (this.state.myPerson !== nextState.myPerson) {
            return false;
        }
        if (this.state.selection !== nextState.selection) {
            return false;
        }
        if (this.state.table !== nextState.table) {
            return false;
        }
        return true;
    }

    handleButton = (e) => {
        switch(e) {
            case 'Copy':
                if(!this.state.selection) {
                    console.error("=== NO SELECTION MADE ===");
                    break;
                } else {
                    this.copySelected();
                }
                break;
            case 'Delete':
                if(!this.state.selection) {
                    console.error("=== NO SELECTION MADE ===");
                    break;
                } else {
                    this.deleteSelected();
                }
                break;
            case 'New':
                if(!this.state.selection) {
                    this.newPerson(null);
                } else {
                    this.newPerson(this.state.selection);
                }
                break;
        }
    }

    copySelected() {
        var objIndex = this.state.table.findIndex((obj => obj === this.state.selection));
        const array = this.state.table.slice();
        array.splice(objIndex, 0, this.state.selection.copy());
        this.setState({
            table : array,
        }, () => this.myListPane.current.changeState(this.state.table)); // change state and notify child (Not needed anymore since state has been lifted up (here))
    }

    deleteSelected() {
        const filtered = this.state.table.filter(item => item !== this.state.selection);
        this.setState({
            table : filtered,
            selection : null
        },() => this.myListPane.current.changeState(this.state.table));
    }

    newPerson(e) {
        if (e) {
            var objIndex = this.state.table.findIndex((obj => obj === e));
            const array = this.state.table.slice();
            array.splice(objIndex, 0, new Person());
            this.setState({
                table : array,
            }, () => this.myListPane.current.changeState(this.state.table));
        } else {
            const array = this.state.table.slice();
            array.splice(0, 0, new Person());
            this.setState({
                table : array,
            }, () => this.myListPane.current.changeState(this.state.table));
        }
    }

    inc(e) {
        this.setState({
            table: new PersonService().createPersons(e),
        }, () => this.myListPane.current.changeState(this.state.table));
    }

    render() {
        console.warn("LOCALEPERSON RERENDER");
        return (    
            <>
                <Layout.Row>
                    <Checkbox.Group style={{marginLeft: '1em'}} value={this.state.devtools}>
                        <Checkbox style={{color: 'rgb(250,250,250)'}} label="Disable LocalePerson Rerender"></Checkbox>
                        <Checkbox style={{color: 'rgb(250,250,250)'}} label="Disable Listpane Rerender"></Checkbox>
                        <Checkbox style={{color: 'rgb(250,250,250)'}} label="Disable Editpane Rerender"></Checkbox>
                    </Checkbox.Group>
                    <Select style={{marginLeft: '1em'}} value={this.state.value} onChange={(e)=>this.setState({value : e})}>
                        {   this.state.uis.map(el => {
                                return <Select.Option key={el.value} label={el.label} value={el.value} />
                            })
                        }
                    </Select>
                    <Button style={{marginLeft: '1em',marginTop: '1em'}} onClick={() => {this.setState({test : Math.random()*(1000 - 1) + 1})}} type="secondary" key="ForceR">Force Rerender</Button>
                    <InputNumber style={{marginLeft: '1em'}} defaultValue={100} min="1" max="10000" value={this.state.tblsize} onChange={(e) => this.inc(e)}/>
                    <ListPane 
                        height="300"
                        data={this.state.table}
                        searchAble={true}
                        columns={this.state.listerConfig.columns}
                        ref={this.myListPane}
                        callback={this.handleClick}
                        buttonClicks={e => this.handleButton(e)}
                        dbg={this.state.devtools}
                        ui={this.state.value}
                        newColumns={this.state.newLister.columns}
                    />
                    <EditPane 
                        width = "300"
                        labelPosition = "left"
                        model = {this.state.myPerson}
                        inputs = {this.state.editorConfig}
                        ref= {this.myEditPane}
                        callback={(e) => this.handleChange(e)}
                        gutter={35}
                        dbg={this.state.devtools}
                    />
                </Layout.Row>
            </>
        )
    }
}

export default LocalePerson;