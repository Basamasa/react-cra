import React from 'react';
import ListPane from './ListPane';
import {Input, Popover} from 'element-react';

class ProxyField extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
                <Popover placement="bottom" trigger="click" visible-arrow="">
                    <div>
                        <ListPane
                            height="200"
                            data={this.props.table}
                            columns={this.props.columns}
                            />
                        <Input slot="reference" v-model="inputValue" prefix-icon="el-icon-search" placeholder="search"/>
                    </div>
                </Popover>
        );
    }
}

export default ProxyField;