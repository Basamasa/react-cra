/* eslint-disable */

import React from 'react';
import { mount } from 'enzyme';
import LocalePerson from '../LocalePerson';

describe ('<LocalePerson />', () => {
    it ('General Test', () => {
        // Full mount 
        const wrapper = mount(<LocalePerson />);
        // Copy initial state for comparisons later
        const initState = wrapper.state();
        // Copy child state for comparisons later
        const listPaneState = wrapper.find('ListPane').instance().state;
        // Check if the states has been defined
        expect(initState).toBeDefined();
        expect(listPaneState).toBeDefined();
        // See if 4 Buttons have been rendered (Force Rerender, Copy, Delete, New)
        expect(wrapper.find('Button')).toHaveLength(4);
        // Select the copyButton
        const copyBtn = wrapper.find('Button').at(1);
        // Simulate onClick without having anything selected
        copyBtn.simulate('click');
        // Checking if state has been modified => it should not have been modified (testing internal implementation is a bad idea: https://www.valentinog.com/blog/testing-react/)
        expect(wrapper.state().table).toEqual(initState.table);
        // Checking if table still has x rows => it should still have x entries since no selection have been made (Testing the visible UI is better)
        expect(wrapper.find('.el-table__row')).toHaveLength(initState.table.length);
        // Simulate a selection in the table row 2 cell 2
        wrapper.find('.el-table_1_column_2').at(2).simulate('click');
        // Since we made a selection the state's myPerson should be changed
        expect(wrapper.state().myPerson).not.toEqual(initState.myPerson);
        // Simulate onClick again while having something selected
        copyBtn.simulate('click');
        // Table state should now be modified and not be equal to the initial state anymore
        expect(wrapper.state().table).not.toEqual(initState.table);
        // Table state should now have x+1 Elements since we copied something (Again testing the visible UI instead of comparing state.table lenghts)
        expect(wrapper.find('.el-table__row')).toHaveLength(initState.table.length+1);
        // Since we copied row 2 we're gonna check if it has been copied successfully
        // Again we could just test the internal implementation i.e the table state but testing the visible UI is better since changes in the
        // implementation wont affect this test.
        const copiedPerson = wrapper.find('.el-table_1_column_2').at(2);
        const personUnderCopied = wrapper.find('.el-table_1_column_2').at(3);
        const personAboveCopied = wrapper.find('.el-table_1_column_2').at(1);
        // .html to compare the rendered HTML markup
        expect(copiedPerson.html()).toEqual(personUnderCopied.html());
        expect(copiedPerson.html()).not.toEqual(personAboveCopied.html());
    })
})