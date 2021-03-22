import React from 'react';
import {Story, Meta} from '@storybook/react/types-6-0';
import {Header, HeaderProps} from './Header';
import {MemoryRouter as Router} from 'react-router-dom';
import {UserContext, UserContextModel} from 'infrastructure/context';

export default {
  title: 'Components/Header',
  component: Header
} as Meta;


const Template: Story<HeaderProps> = (args) => (<Header {...args} />);

const loggedInContext: UserContextModel = {
};

export const LoggedIn = Template.bind({});
LoggedIn.decorators = [(Story) => (<UserContext.Provider value={loggedInContext}><Router><Story/></Router></UserContext.Provider>)]

const loggedOutContext: UserContextModel = {};

export const LoggedOut = Template.bind({});
LoggedOut.decorators = [(Story) => (<UserContext.Provider value={loggedOutContext}><Router><Story/></Router></UserContext.Provider>)]
