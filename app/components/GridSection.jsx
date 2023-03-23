'use client'
import styled from 'styled-components';

const StyledGridSection = styled.section`
    display:grid;
    gap:1rem;
    grid-template-columns:repeat(auto-fit, minmax(20rem, 1fr));
    height:100%;
    width:80%;
`;

export default function GridSection({children}) {
    return (
        <StyledGridSection>
            {children}
        </StyledGridSection>
    )
}