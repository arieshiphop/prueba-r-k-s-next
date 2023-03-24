'use client'
import styled from 'styled-components';

const StyledGridSection = styled.section`
    display:grid;
    gap:1rem;
    grid-template-columns:repeat(auto-fit, minmax(10rem, 1fr));
    height:100%;
    width:100%;
`;

export default function GridSection({children}) {
    return (
        <StyledGridSection>
            {children}
        </StyledGridSection>
    )
}