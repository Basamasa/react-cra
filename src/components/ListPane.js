/* eslint-disable no-unused-expressions */

import React from 'react';
import { Table } from 'element-react';
import ButtonPane from './ButtonPane';
import NewTable from 'antd/lib/table';
import 'antd/lib/table/style/index.css';
import 'antd/lib/pagination/style/index.css';
import { Column as VColumn, Table as VTable, SortDirection, SortIndicator} from 'react-virtualized';
import 'react-virtualized/styles.css';

const headerRowRenderer = ({
    className,
    columns,
    style
  }) => (
    <div
      className={className}
      role='row'
      style={{background : '#E5E9F2', height : '2.5em', borderBottom: '1px solid #dfe6ec'}}
    >
      {columns}
    </div>
  )

class ListPane extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //height: props.height,
            data: props.data,
            searchAble: props.searchAble,
            //columns: props.columns,
            searchText: null,
            loading: false,
            sortBy : 'id',
            sortDirection : SortDirection.ASC,
            sortedList: this._sortList('id', SortDirection.ASC),
        };

        this._sort = this._sort.bind(this);
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

    changeState(tbl) {
        const sortBy = this.state.sortBy;
        const sortDirection = this.state.sortDirection;
        this.setState({
            data : tbl,
        }, this._sort({sortBy, sortDirection}, tbl));
    }

    _sort({ sortBy, sortDirection }, tbl) {
        const sortedList = this._sortList({ sortBy, sortDirection }, tbl);
        this.setState({ 
            sortBy, 
            sortDirection, 
            sortedList });
    }

    _sortList({ sortBy, sortDirection }, tbl) {
        var {data} = this.props;
        if (this.state!==undefined) {
            data = this.state.data;
        }
        if (tbl!==undefined) {
            data = tbl;
        }
        if (sortBy) {
          let updatedList = data.sort(function(a, b) {
              var nameA = a[sortBy];
              var nameB = b[sortBy];
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }
              return 0;
            });
            return sortDirection === SortDirection.DESC
                ? updatedList.reverse()
                : updatedList;
        }
    }

    _getDatum(index) {
        if (this.state.sortedList===undefined) {
            return this.state.data.filter(row => this.filterSearch(row))[index];
        } else {
            return this.state.sortedList.filter(row => this.filterSearch(row))[index];
        }
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
        const {sortBy, sortDirection} = this.state;

        const rowGetter = ({ index }) => this._getDatum(index);
        return (    
            <React.Fragment>
                <ButtonPane 
                    searchAble={this.state.searchAble}
                    buttonClicks={(e) => this.props.buttonClicks(e)}
                    search={(e) => this.setSearch(e)}
                />
                <>
                { this.props.ui === "elementsui" &&
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
                {   this.props.ui === "antd" &&
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
                { this.props.ui === "reactv" &&
                    <VTable
                        style={{width: '98.5%', background: '#FFFFFF', marginLeft: '1em', marginBottom: '1em', fontSize: '14px', color: '#1f2d3d'}}
                        width={window.outerWidth-46}
                        height={600}
                        headerHeight={30}
                        rowHeight={40}
                        rowStyle={{borderBottom: '1px solid #dfe6ec'}}
                        rowCount={this.state.data.filter(row => this.filterSearch(row)).length}
                        rowGetter={rowGetter}
                        headerRowRenderer={headerRowRenderer}
                        onRowClick={(event) => this.props.callback(event.rowData)}
                        sort={this._sort}
                        sortBy={sortBy}
                        sortDirection={sortDirection}
                        onHeaderClick={this._sortByClickedHeader}
                        >
                            {this.props.columns.map(
                                columnData => <VColumn
                                    key={["columnkey", columnData.label].join('_')}
                                    headerStyle={{textAlign: columnData.align}}
                                    label={columnData.label} 
                                    dataKey={columnData.prop} 
                                    style={{textAlign: `${columnData.align}`}} 
                                    width={250}
                                />
                            )}
                        </VTable>
                } 
                </>
            </React.Fragment>
        )
    }
}

export default ListPane;