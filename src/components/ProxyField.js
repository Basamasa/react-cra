import React from 'react';
import ListPane from './ListPane';
import {Input, Popover, Table} from 'element-react';
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
class ProxyField extends React.Component {
    constructor(props) {
        super(props);
    }

    filterSearch(row) {
        if (this.props.value === null || this.props.value === "") {
            return true;
        }
        var content;
        var found = false;
        var pattern = this.props.value;
        pattern = pattern.toLowerCase();
        this.props.columns.forEach(col => {
            content = row[col.prop];
            if(typeof(content)=='string'){
                if(content.toLowerCase().includes(pattern)){
                found=true;
                return;
                } 
            }  
        });
        return found;
    }

    setandset(inp) {
       this.props.callback(inp);
    }

    render() {
        return(
            <>
                {this.props.prime === false &&
                    <Popover placement="bottom" width="400" trigger="click" content={(
                            <Table
                                    key="proxyTable"
                                    height={200}
                                    columns={this.props.columns}
                                    data={this.props.table.filter(row => this.filterSearch(row))}
                                    fit
                                    rowKey="id"
                                    size="mini"
                                    border
                                    maxHeight={200}
                                    highlightCurrentRow
                                    onCellClick={(row) => this.setandset(row.first)} />
                            )}>
                            <Input value={this.props.value} icon="search" onChange={(e) => this.setandset(e)} placeholder="search"/>
                </Popover>
                }
                {this.props.prime === true &&
                    <Popover placement="bottom" width="400" trigger="click" content={(
                            <Table
                                    key="proxyTable"
                                    height={200}
                                    columns={this.props.columns}
                                    data={this.props.table.filter(row => this.filterSearch(row))}
                                    fit
                                    rowKey="id"
                                    size="mini"
                                    border
                                    maxHeight={200}
                                    highlightCurrentRow
                                    onCellClick={(row) => this.setandset(row.first)} />
                            )}>                        
                            <div className="p-inputgroup" style={{display: 'block'}}>
                                    <InputText style={{width: '90%'}} onChange={(e) => this.setandset(e.target.value)} value={this.props.value} placeholder="search"/>
                                    <span className="p-inputgroup-addon" style={{display : 'inline'}}><i class="pi pi-search"></i></span>
                            </div>
                        </Popover>
                }
            </>
        );
    }
}

export default ProxyField;