import React, {useContext, useState} from 'react';
import {Button, Form, InputGroup} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const SearchBar = observer(({context}) => {
    const search = (search) => {
        context.setPage(1)
        context.setSearch(search)
    }
    return (
        <InputGroup style={{width: 'auto'}}>
            <div style={{width: 250}}>
                <Form.Control className='rounded-left py-1'
                              placeholder="Enter the name"
                              value={context.search}
                              onChange={e => search(e.target.value)}
                              style={{
                                  borderTopRightRadius: 0,
                                  borderBottomRightRadius: 0,
                                  height: 37.5
                              }}
                />
            </div>
            <div className="input-group-append">
                <Button
                    style={{
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0
                    }}
                    variant='outline-secondary'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-search" viewBox="0 0 16 16">
                        <path
                            d="M11.742 10.344a6.5 6.5 0 1
                                0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1
                                1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12
                                6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"></path>
                    </svg>
                </Button>
            </div>
        </InputGroup>
    )
});

export default SearchBar;