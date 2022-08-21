import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { useNavigate } from 'react-router-dom';
import '../index.css'

export default function SearchBox() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : '/search');
  };

  return (
    <Form className="d-flex mx-auto mb-3 search mt-3 " onSubmit={submitHandler}>
      <InputGroup className='w-100 mx-auto '>
        <FormControl
          type="text"
          name="q"
          id=""
          className='pill'
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search products..."
          aria-label="Search Products"
          aria-describedby=""
        ></FormControl>
        <Button style={{ borderTopRightRadius: '25px', borderBottomRightRadius: '25px' }} className='text-light' type="submit" id="button-search">
          Search
        </Button>
      </InputGroup>
    </Form>
  );
}
