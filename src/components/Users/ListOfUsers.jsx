import React, {useContext, useMemo, useState} from 'react';
import User from "./User";
import Input from "../UI/CustomInput/Input";
import {ApplicationContext} from "../../сontext";

const ListOfUsers = () => {

    const [searchText, setSearchText] = useState("");
    const [filteredPerson, setFilteredPerson] = useState([]);

    const {state} = useContext(ApplicationContext)

    useMemo(() => {
        const filtered = state.users.filter(
            (person) =>
                person.firstName.toLowerCase().startsWith(searchText.toLowerCase()) ||
                person.lastName.toLowerCase().startsWith(searchText.toLowerCase())
        );
        setFilteredPerson(filtered);
    }, [searchText, state.users]);

    const handleSearch = (event) => {
        setSearchText(event.target.value);
    };

    return (
        <div>
            <Input type="text" value={searchText} onChange={handleSearch} placeholder="Search..."/>
            {filteredPerson.length > 0 ? (
                filteredPerson.map((person) =>
                    person.firstName.toLowerCase().startsWith(searchText.toLowerCase()) ||
                    person.lastName.toLowerCase().startsWith(searchText.toLowerCase()) ? (
                        <User
                            key={`${person.firstName}-${person.lastName}`}
                            firstName={person.firstName}
                            lastName={person.lastName}
                            email={person.email}
                            color={person.color}
                            selected={person.selected}
                            id={person.id}
                        />
                    ) : null
                )
            ) : (
                <div>No results found</div>
            )}
        </div>
    );
};

export default ListOfUsers;