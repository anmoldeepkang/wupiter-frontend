import React, {FC, useEffect, useState} from "react";
import {useField} from "formik";
import {Form} from "react-bootstrap-formik";
import {Form as BootstrapForm} from "react-bootstrap";
import {AsyncTypeahead} from "react-bootstrap-typeahead";

export type AutoFieldProps = {
  name: string;
  label: string;
  placeholder: string;
  handleSearch: (query: string) => string[];
}

export const AutoField: FC<AutoFieldProps> = ({...props}) => {
  const [field, meta, helper] = useField(props);

  // Typeahead bits
  const [typeaheadIsLoading, setTypeaheadIsLoading] = useState(false);
  const [list, setList] = useState<Array<any>>([]);

  const filterBy = () => true;

  const handleSearchLocal = (query: string) => {
    setTypeaheadIsLoading(true);

    const filteredList: string[] = props.handleSearch(query);

    setList(filteredList.map(o => ({title: o})));
    setTypeaheadIsLoading(false);
  };

  useEffect(() => {
    setList(prevState => {
      return prevState.length === 0 && meta.initialValue ? [{title: meta.initialValue}] : prevState
    });
  }, [setList, meta]);


  return (
    <Form.Group name={field.name}>
      <BootstrapForm.Label>{props.label}</BootstrapForm.Label>
      <AsyncTypeahead
        id={field.name}
        filterBy={filterBy}
        isLoading={typeaheadIsLoading}
        minLength={0}
        delay={500}
        multiple={false}
        allowNew={true}
        labelKey="title"
        onSearch={handleSearchLocal}
        options={list}
        defaultInputValue={meta.initialValue}
        onChange={(selected) => {
          if (selected[0]) {
            helper.setValue(selected[0].title);
          }
        }}
        onBlur={(e) => {
          helper.setTouched(true);
        }}
        placeholder={props.placeholder}
        renderMenuItemChildren={(option, props) => (
          <>
            <span>{option.title}</span>
          </>
        )}
      />
      <BootstrapForm.Control.Feedback type="invalid">
        {meta.error}
      </BootstrapForm.Control.Feedback>
    </Form.Group>
  );
}
