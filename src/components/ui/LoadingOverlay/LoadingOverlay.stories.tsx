import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from '@storybook/react/types-6-0';
import {LoadingOverlay, LoadingOverlayProps} from "./LoadingOverlay";
import {Table} from "react-bootstrap";

export default {
  title: 'Components/LoadingOverlay',
  component: LoadingOverlay,
} as Meta;

const Template: Story<LoadingOverlayProps> = (args) => (
  <>
    <LoadingOverlay {...args} />
    <Table>
      <thead>
      <tr>
        <th>Col 1</th>
        <th>Col 2</th>
        <th>Col 3</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>Data 1</td>
        <td>Data 2</td>
        <td>Data 3</td>
      </tr>
      <tr>
        <td>Data 1</td>
        <td>Data 2</td>
        <td>Data 3</td>
      </tr>
      </tbody>
    </Table>
  </>
);

export const Default = Template.bind({});
Default.args = {};
