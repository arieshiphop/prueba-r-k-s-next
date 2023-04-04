'use client'
import styled from "styled-components";
import CustomLink from "./CustomLink";

const StyledArticle = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 0.5rem 0.1rem rgba(0, 0, 0, 0.1);
  gap: 0.5rem;
  padding: 0 1rem 1rem 1rem;
  text-decoration: none;
  color: black;
  height: 100%;
`;

const StyledImage = styled.img`
  object-fit: cover;
  border-radius: 50%;
  max-height: 8rem;
`;

const StyledPTitle = styled.p`
  font-weight: 600;
  text-align: center;
`;

const StyledP = styled.p`
  text-align: center;
  font-size: 1;
`;

const savePodcastData = (podcast) => {
  localStorage.setItem("podcastData", JSON.stringify(podcast));
};

export default function Podcast({ podcast }) {
  const handleClick = () => {
    savePodcastData(podcast);
  };

  return (
    <CustomLink href={`/podcast/${podcast.id.attributes["im:id"]}`}>
      <StyledArticle onClick={handleClick}>
        <StyledImage
          src={podcast["im:image"][2].label}
          alt={podcast["im:name"].label}
        />
        <StyledPTitle>
          {podcast["im:name"].label.toUpperCase()}
        </StyledPTitle>
        <StyledP>Author: {podcast["im:artist"].label}</StyledP>
      </StyledArticle>
    </CustomLink>
  );
}
