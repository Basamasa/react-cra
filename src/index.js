import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main';
import 'element-theme-default';
import './style.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);