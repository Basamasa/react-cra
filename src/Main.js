import React from 'react';
import { Tabs } from 'element-react/next';
import LocalePerson from "./LocalePerson";
import Link from './Link.react';
/*
import person from './Person.jsx';
import swapi from './Swapi.jsx';
*/

class Main extends React.Component {
    render() {
        return (
            <div id="app">
                <div id="header">
                    <img src="background.png" style={{width: '100%'}}/>
                    <Link page="https://www.dbh.de/" style={{position: 'absolute', top: '-5px', left: '40px', color: 'red', fontSize:'25px'}}>dbh</Link>
                </div>
                <div id="tabs">
                    <Tabs activeName="2">
                        <Tabs.Pane label="Star Wars API" name="1">  </Tabs.Pane>
                        <Tabs.Pane label="Locale Persons" name="2"> <LocalePerson />  </Tabs.Pane>
                    </Tabs>
                </div>
            </div>
        );
      }
}

export default Main;