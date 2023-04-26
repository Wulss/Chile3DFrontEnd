import React, {useState} from 'react';
import { TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchField({handleSearch}) {
    const [search, setSearch] = useState("");

    const handleChange = (event) => {
        setSearch(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        //handleSearch(search);
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                id="search"
                label="Buscar"
                variant="outlined"
                
                value={search}
                onChange={handleChange}
                InputProps={{
                    endAdornment: <SearchIcon />
                }}
            />
        </form>
    );
}