import styled from "styled-components";


const StyledTopDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;
    width:100%;
    margin-bottom: 1rem;
`

export default function TopDiv({children}) {
    return (
        <StyledTopDiv>
            {children}
        </StyledTopDiv>
    )
}