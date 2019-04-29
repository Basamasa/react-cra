import React from 'react';
import { mount } from 'enzyme';
import LocalePerson from '../LocalePerson';

describe ('<LocalePerson />', () => {
    it ('renders', () => {
        const component = mount(<LocalePerson />);
        console.log(component);
    })
})