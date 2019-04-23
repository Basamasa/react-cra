import React from 'react';
import { Table } from 'element-react';
import ButtonPane from './ButtonPane';
import NewTable from 'antd/lib/table';
import 'antd/lib/table/style/index.css';
import 'antd/lib/pagination/style/index.css';

class ListPane extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //height: props.height,
            data: props.data,
            searchAble: props.searchAble,
            //columns: props.columns,
            searchText: null,
            loading: false,
        };
    }

    changeState(tbl) {
        this.setState({
            data : tbl,
        })
    }

    
    shouldComponentUpdate(nextProps, nextState) {
        if(this.props.dbg.indexOf("Disable Listpane Rerender") !== -1) {
            console.error("Listpane Rerender disabled");
            return false;
        }
        return true;
    } 

    setSearch(e) {
        this.setState({
            searchText : e,
        })
    }

    filterSearch(row) {
        if (this.state.searchText === null || this.state.searchText === "") {
            return true;
        }
        var content;
        var found = false;
        var pattern = this.state.searchText;
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

    render() {
        console.warn("LISTPANE RERENDER");
        return (    
            <React.Fragment>
                <ButtonPane 
                    searchAble={this.state.searchAble}
                    buttonClicks={(e) => this.props.buttonClicks(e)}
                    search={(e) => this.setSearch(e)}
                />
                <>
                { this.props.dbg.indexOf("Toggle Elements UI Table") !== -1 &&
                    <Table
                        key="theTable"
                        style={{width: '98.5%', marginBottom: '1em', marginLeft: '1em'}}
                        height={this.props.height}
                        columns={this.props.columns}
                        data={this.state.data.filter(row => this.filterSearch(row))}
                        fit
                        rowKey="id"
                        size="mini"
                        border
                        maxHeight={600}
                        highlightCurrentRow
                        onCellClick={(row) => this.props.callback(row)}
                    /> 
                }
                { this.props.dbg.indexOf("Toggle Elements UI Table") === -1 &&
                    <NewTable
                        key="XDDDD"
                        style={{width: '98.5%', marginLeft: '1em'}}
                        columns={this.props.newColumns}
                        dataSource={this.state.data.filter(row => this.filterSearch(row))}
                        pagination={{pageSize : 200 }}
                        scroll={{ y : 500}}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: (e) => this.props.callback(record),
                            }
                        }}
                    />
                }
                </>
            </React.Fragment>
        )
    }
}

export default ListPane;