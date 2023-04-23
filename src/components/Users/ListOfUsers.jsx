import React, {useContext, useMemo, useState} from 'react';
import {DateContext} from "../Context/dateContext";
import Input from "../UI/CustomInput/Input";
import User from "./User";

const ListOfUsers = () => {

    const [searchText, setSearchText] = useState("");
    const [filteredPerson, setFilteredPerson] = useState([]);

    const dateContext = useContext(DateContext)

    useMemo(() => {
        const filtered = dateContext.users.filter(
            (person) =>
                person.firstName.toLowerCase().startsWith(searchText.toLowerCase()) ||
                person.lastName.toLowerCase().startsWith(searchText.toLowerCase())
        );
        setFilteredPerson(filtered);
    }, [searchText, dateContext.users]);

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