import styled from "styled-components";

const StyledLateralInfo = styled.div`
    display: flex;
    flex-direction: column;
    width: 20%;
    height: 100%;
    border-radius: 10px;
    padding: 20px;
    margin: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-in-out;
`

const Title = styled.h2`
    font-weight: bold;
    font-size:1rem;
`;

const Author = styled.p`
    font-style: italic;
    font-size:.8rem;
`;

const Description = styled.p`
    font-size:.8rem;
    font-weight: bold;
    text-align:left;
`;
const SeparatorLine = styled.hr`
  width: 100%;
  margin: 10px 0;
`;
const DescriptionText = styled.p`
    font-size:.8rem;
    text-align:left;
    max-width:95%;
`;
export default function LateralInfo({podcast}) {
    const podcastData = JSON.parse(localStorage.getItem('podcastData'));
    return (
        <StyledLateralInfo>
            <img src={podcast.artworkUrl160} alt={podcast.collectionName} />
            <SeparatorLine/>
            <Title>{podcast.collectionName}</Title>
            <Author>by {podcastData['im:artist'].label}</Author>
            <SeparatorLine/>
            <Description>Description: </Description>
            <DescriptionText>{podcast.description}</DescriptionText>
        </StyledLateralInfo>
    )
}
