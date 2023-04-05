'use client'
import styled from "styled-components";
import LateralInfo from "@/app/components/LateralInfo";
import CacheService from "@/services/CacheService";
const ReproducerDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    width: 100%;
    height: 30%;
    border-radius: 10px;
    padding: 20px;
    margin: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-in-out;
`
const AudioPlayer = styled.audio`
  width: 100%;
`;
const FlexDiv = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    gap:4rem;
`
export default function PodcastEpisodePage() {
    const info = CacheService.get('podcastInfo');
   
    return (
        <FlexDiv>
            <LateralInfo podcast={info[0]} />
            <ReproducerDiv>
                <h1>{info[0].collectionName}</h1>
                <p dangerouslySetInnerHTML={{ __html: info[0].shortDescription }}></p>
                <AudioPlayer controls>
                    <source src={info[0].previewUrl} type="audio/mpeg"/>
                </AudioPlayer>
            </ReproducerDiv>
        </FlexDiv>
    );
}
