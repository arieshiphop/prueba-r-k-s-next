'use client'
import styled from 'styled-components';

const StyledInput = styled.input`
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
`

export default function SearchInput({setSearchTerm}) {
    const handleChange = (e) => {
        setSearchTerm(e.target.value)
    }
    return (
        <StyledInput type="text" placeholder='Filter podcast' onChange={handleChange}/>
    )
}