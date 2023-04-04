'use client'
import styled from 'styled-components';

const StyledMain = styled.main`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    gap:1rem;
    padding:1rem;
    width:100vw;
`
export default function Main({children}) {
    return (
        <StyledMain>
            {children}
        </StyledMain>
    )
}