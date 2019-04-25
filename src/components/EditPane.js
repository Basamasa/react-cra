import React from 'react';
import { Form, Layout, Input, Checkbox, DatePicker, Select } from 'element-react/next';
import ButtonPane from './ButtonPane';
import { Person } from '../model/Person';

function MyForm(props) {
    var x = props.todo;
    return ( 
        <Form.Item 
            label={x.label} 
            labelWidth={x.getLabelWidth()}>
                {   x.type ==='text' &&
                    <Input key={["input", x.key].join('_')} style={{marginBottom: x.bottomSpace}} value={props.model[x.key]} onChange={(key, e, i) => props.callback(key, props.model, x.key)} placeholder={x.placeHolder}></Input>
                }
                {   x.type ==='area' &&
                    <Input key={["input", x.key].join('_')} value={props.model[x.key]} placeholder={x.placeHolder} onChange={(key, e, i) => props.callback(key, props.model, x.key)} type="textarea"></Input>
                }
                {
                    x.type==='boolean' &&
                    <Checkbox key={["checkbox", x.key].join('_')} checked={props.model[x.key]} onChange={(key, e, i) => props.callback(key, props.model, x.key)}></Checkbox>
                }
                {
                    x.type==='lookup' &&
                    <React.Fragment></React.Fragment>
                }
                {
                    x.type==='date' &&
                    <DatePicker style={{width:'100%'}} onChange={(key, e, i) => props.callback(key, props.model, x.key)} placeholder={x.placeHolder} value={props.model[x.key]==undefined ? props.model[x.key] : new Date(props.model[x.key])}>
                    </DatePicker>
                }
                {
                    x.type==='select' &&
                    <Select filterable style={{width:'100%'}} value={props.model[x.key]} onChange={(key, e, i) => props.callback(key, props.model, x.key)} placeholder={x.placeHolder}>
                    </Select>
                }
                {
                    x.type==='hr' &&
                    <hr style={{height: '2px', backgroundColor: 'rgb(255,255,255)', border: 'none', margin: '1.2em auto', width: '99%'}}></hr>
                }
        </Form.Item> 
    )
}

function MyLayout(props) {
    var rows = [];
    var row = null;
    var myRows = [];
    var temp = props.inputs.inputs
    for (let index = 0; index < temp.length; index++) {
        const input = temp[index];
        if (row === null || input.type === 'row') {
            row = new Row(index);
            rows.push(row);
        } else {
            row.inputs.push(input);
        }
    }
    for (let i of rows) {
        myRows.push(<Layout.Row 
                        key={i.count} 
                        gutter={props.gutter}
                        >
                            <MyCol
                                temp={i}
                                model={props.model}
                                callback={props.callback}
                                >
                            </MyCol>
                    </Layout.Row>);
    }
    return (
        <React.Fragment>
            {myRows}
        </React.Fragment>
    )
}

function MyCol(props) {
    var myCol = [];
    var ind = 0;
    for (let u of props.temp.inputs) {
            ind++;
            myCol.push(<Layout.Col 
                            key={[u.key, ind].join('_')} // Key was not unique enough
                            span={u.span}
                            offset={u.offset}
                            >
                                <MyForm 
                                    todo={u}
                                    model={props.model}
                                    callback={props.callback}
                                    >
                                </MyForm>
                        </Layout.Col>);
            }
    return myCol;
}

class Row{
    constructor(count){
        this.count = count;
        this.inputs = [];
    }
}

class EditPane extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            width : props.width,
            labelPosition : props.labelPosition,
            myPerson : props.model,
        }
    }

    changeState(props) {
        this.setState({
            myPerson : props,
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.props.dbg.indexOf("Disable Editpane Rerender") !== -1) {
            console.error("EditPane Rerender disabled");
            return false;
        }
        return true;
    }

    callBack(key, e, index) {
        let temp = new Person();
        let newPerson = Object.assign(temp, this.state.myPerson);
        switch (index) {
            case 'id':
                newPerson.id = key;
                break;
            case 'first':
                newPerson.first = key;
                break;
            case 'city':
                newPerson.city = key;
                break;
            case 'street':
                newPerson.street = key;
                break;
            case 'country':
                newPerson.country = key;
                break;
            case 'paid':
                newPerson.paid = key;
                break;
            case 'comment':
                newPerson.comment = key;
                break;
            case 'male':
                if (newPerson.male === undefined) {
                    newPerson.male = true;
                } else if (newPerson.male === false) {
                    newPerson.male = true;
                } else {
                    newPerson.male = false;
                }
                break;
            case 'birthday':
                newPerson.birthday = key;
                break;
        }
        this.setState({
            myPerson : newPerson,
        },(e) => this.props.callback(newPerson));
    }

    render() {
        console.warn("EDITPANE RERENDER");
        return (
            <div style={{'width': this.state.width}}>
                <Form 
                    labelPosition={this.state.labelPosition}
                    style={{width: '98.5%', marginLeft: '1em', background:'#323639'}}
                    className="en-US" 
                    model={this.state.myPerson}
                    >
                    <MyLayout 
                        inputs={this.props.inputs}
                        gutter={this.props.gutter}
                        model={this.state.myPerson}
                        callback={(key, e, i) => this.callBack(key, e, i)}
                    />
                </Form>
            </div>
        )
    }
}

export default EditPane;