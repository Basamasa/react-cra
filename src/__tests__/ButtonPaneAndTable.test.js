/* eslint-disable */

import React from 'react';
import { mount } from 'enzyme';
import LocalePerson from '../LocalePerson';

describe ('<LocalePerson />', () => {
    it ('renders new Button and', () => {
        const wrapper = mount(<LocalePerson />); // Full mount for sub components
        // See if 3 Buttons have been rendered
        // expect(wrapper.find('.myButtons')).toHaveLength(3);
        console.log(wrapper.debug());
    })
})