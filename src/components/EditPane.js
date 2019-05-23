import React from 'react';
import { Form, Layout, Input, Checkbox, DatePicker, Select } from 'element-react/next';
import { Person } from '../model/Person';
import ProxyField from './ProxyField';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Checkbox as PrimeCheckbox } from 'primereact/checkbox';
import {Calendar} from 'primereact/calendar';

function MyForm(props) {
    var x = props.todo;
    var prime = false;
    if(props.dbg.indexOf("Enable Primefaces") !== -1) {
        console.warn("Primefaces are enabled");
        prime = true;
    }
    return (
        <>
            { prime === false && 
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
                            <ProxyField prime={prime} callback={props.proxyBack} value={props.model[x.key]} placeholder={x.placeHolder} table={x.table} columns={x.columns} />
                
                        }
                        {
                            x.type==='date' &&
                            <DatePicker style={{width:'100%'}} onChange={(key, e, i) => props.callback(key, props.model, x.key)} placeholder={x.placeHolder} value={props.model[x.key]===undefined ? props.model[x.key] : new Date(props.model[x.key])}>
                            </DatePicker>
                        }
                        {
                            x.type==='select' &&
                            <Select onChange={(key, e, i) => props.callback(key, props.model, x.key)} filterable style={{width:'100%'}} value={props.model[x.key]} placeholder={x.placeHolder}>
                                {   
                                    x.table.map(el => {
                                        return <Select.Option key={["checkbox", x.table.indexOf(el)].join('_')} label={el.guiRep()} value={el.guiRep()}></Select.Option>
                                    })
                                }
                            </Select>
                        }
                        {
                            x.type==='hr' &&
                            <hr style={{height: '2px', backgroundColor: '#34495e', border: 'none', margin: '1.2em auto', width: '99%'}}></hr>
                        }
                </Form.Item> }
            { prime === true &&
                <Form.Item>
                        {   x.type ==='text' &&
                                <span style={{marginBottom: x.bottomSpace}} key={["input", x.key].join('_')} className="p-float-label">
                                    <InputText style={{width: '100%'}} id="in" value={props.model[x.key]} onChange={(key, e, i) => props.callback(key.target.value, props.model, x.key)} />
                                    <label htmlFor="in">{x.label}</label>
                                </span>
                        }
                        {   x.type ==='area' &&
                            <InputTextarea placeholder={x.placeHolder} key={["input", x.key].join('_')} rows={3} cols={182} value={props.model[x.key]} onChange={(key, e, i) => props.callback(key.target.value, props.model, x.key)} autoResize={true} />
                        }
                        {
                            x.type==='boolean' &&
                                <div key={["checkbox", x.key].join('_')} className="p-col-12">
                                    <PrimeCheckbox inputId="cb1" value="Male" onChange={(key, e, i) => props.callback(key, props.model, x.key)} checked={props.model[x.key]}></PrimeCheckbox>
                                    <label htmlFor="cb1" className="p-checkbox-label">Male</label>
                                </div>
                        }
                        {
                            x.type==='lookup' &&
                            <ProxyField prime={prime} callback={props.proxyBack} value={props.model[x.key]} placeholder={x.placeHolder} table={x.table} columns={x.columns} />
                
                        }
                        {
                            x.type==='date' &&
                            <Calendar placeholder={x.placeHolder} value={props.model[x.key]===undefined ? props.model[x.key] : new Date(props.model[x.key])} onChange={(key, e, i) => props.callback(key.target.value, props.model, x.key)} showIcon={true} />
                        }
                        {
                            x.type==='select' &&
                            <Select onChange={(key, e, i) => props.callback(key, props.model, x.key)} filterable style={{width:'100%'}} value={props.model[x.key]} placeholder={x.placeHolder}>
                                {   
                                    x.table.map(el => {
                                        return <Select.Option key={["checkbox", x.table.indexOf(el)].join('_')} label={el.guiRep()} value={el.guiRep()}></Select.Option>
                                    })
                                }
                            </Select>
                        }
                        {
                            x.type==='hr' &&
                            <hr style={{height: '2px', backgroundColor: '#34495e', border: 'none', margin: '1.2em auto', width: '99%'}}></hr>
                        }
                </Form.Item>
            }
        </>
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
                                dbg={props.dbg}
                                temp={i}
                                model={props.model}
                                callback={props.callback}
                                proxyBack={props.proxyBack}
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
                                    dbg={props.dbg}
                                    todo={u}
                                    model={props.model}
                                    callback={props.callback}
                                    proxyBack={props.proxyBack}
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

    proxyBack(e) {
        this.callBack(e, null, "second");
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
            case 'second':
                newPerson.second = key;
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
                newPerson.birthday = key.toDateString();
                break;
            case 'nickname':
                newPerson.nickname = key;
                break;
            case 'adress':
                newPerson.adress = key;
                break;
            default:
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
                    style={{width: '98.5%', marginLeft: '1em', background:'#ecf0f1'}}
                    className="en-US" 
                    model={this.state.myPerson}
                    >
                    <MyLayout 
                        dbg={this.props.dbg}
                        inputs={this.props.inputs}
                        gutter={this.props.gutter}
                        model={this.state.myPerson}
                        callback={(key, e, i) => this.callBack(key, e, i)}
                        proxyBack={(e) => this.proxyBack(e)}
                    />
                </Form>
            </div>
        )
    }
}

export default EditPane;