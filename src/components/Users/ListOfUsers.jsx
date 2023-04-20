import React, {useContext} from 'react';
import {useEffect, useState} from "react";
import {DateContext} from "../Context/dateContext";
import CustomInput from "../UI/CustomInput/CustomInput";
import User from "./User";

const ListOfUsers = () => {

    const [searchText, setSearchText] = useState("");
    const [filteredPerson, setFilteredPerson] = useState([]);

    const dateContext = useContext(DateContext)

    useEffect(() => {
        const filtered = dateContext.user.filter(
            (person) =>
                person.firstName.toLowerCase().startsWith(searchText.toLowerCase()) ||
                person.lastName.toLowerCase().startsWith(searchText.toLowerCase())
        );
        setFilteredPerson(filtered);
    }, [searchText, dateContext.user]);

    const handleSearch = (event) => {
        setSearchText(event.target.value);
    };

    return (
        <div>
            <CustomInput type="text" value={searchText} onChange={handleSearch}/>
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