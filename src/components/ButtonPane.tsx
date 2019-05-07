import React from 'react';
import { Layout, Dropdown, Input, Button } from 'element-react/next';

interface btnProps{
    buttonClicks: (name: string, e: Event) => void;
}

function BtnList(props: btnProps) {
    const btns = ["Copy", "Delete", "New"];
    const items = btns.map((curr) => 
        <Button onClick={(e: Event) => props.buttonClicks(curr.toString(), e)} type="secondary" style={{ paddingTop: '7px', paddingBottom: '7px'}} key={curr.toString()}>
            {curr}
        </Button>
    );
    return (
        <ul className="myButtons" style={{marginRight: '1em'}}>{items}</ul>
    )
}

interface IProps {
    searchAble: boolean;
    search: (searchText: string) => () => void;
    buttonClicks: (name: string) => void;
}

interface IState {
    searchInput: string;
    searchAble: boolean;
}

class ButtonPane extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            searchInput: '',
            searchAble: props.searchAble,
        };
    }

    handleChange(value: string) {
        this.setState({
            searchInput: value
        },this.props.search(value));
    }

    render() {
        return (
            <div>
                {true &&  // hasCommands etc.
                    <Layout.Row style={{background:'#323639'}}>
                        <Layout.Col style={{marginTop: '1em'}} span={this.state.searchAble?4:0}>
                            <Input style={{paddingLeft: '1em'}} value={this.state.searchInput} placeholder="search" size="small" onChange={(e: string) => this.handleChange(e)}/>
                        </Layout.Col>
                        <Layout.Col span={this.state.searchAble?20:24} style={{textAlign:'end'}}>
                            {false &&
                                <Dropdown menu={(
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Action 1</Dropdown.Item>
                                        <Dropdown.Item>Action 2</Dropdown.Item>
                                        <Dropdown.Item>Action 3</Dropdown.Item>
                                        <Dropdown.Item>Action 4</Dropdown.Item>
                                        <Dropdown.Item>Action 5</Dropdown.Item>
                                    </Dropdown.Menu>
                                )}>
                                    <Button type="primary">
                                        More<i className="el-icon-caret-bottom el-icon--right"></i>
                                    </Button>
                                </Dropdown>
                            }
                            <BtnList buttonClicks={(e: any) => this.props.buttonClicks(e)} />
                        </Layout.Col>
                    </Layout.Row>
                }
            </div>
        )
    }
}

export default ButtonPane;