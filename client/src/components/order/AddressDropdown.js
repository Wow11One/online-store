import React, {useContext, useState} from 'react';
import {Dropdown} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const AddressDropdown = observer(({field, data}) => {
    const {order} = useContext(Context)
    const [postSearch, setPostSearch] = useState('')
    const search = (arr, search) => {
        search = search.trim().toLowerCase()
        if (search.length === 0) {
            return arr
        }
        return arr.filter(item => item.name.toLowerCase().includes(search))
    }
    return (
        <Dropdown className='mt-3' drop='end'>
            <Dropdown.Toggle
                style={{width: 350}}
                variant={'secondary'}
            >
                {order.postAddress[field].name || 'Choose' + field}
            </Dropdown.Toggle>
            <Dropdown.Menu style={{width: 400}}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={postSearch}
                    onChange={e => setPostSearch(e.target.value)}
                    style={{margin: "8px 10px", width: "calc(100% - 20px)", borderRadius: "5px"}}
                />
                {search(data, postSearch).map(item =>
                    <Dropdown.Item
                        key={item.id}
                        onClick={() => order.setPostAddress({...order.postAddress, [field]: item})}
                    >
                        {item.name}
                    </Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
})

export default AddressDropdown;