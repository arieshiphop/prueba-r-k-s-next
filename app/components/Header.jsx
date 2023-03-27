'use client'
import styled from 'styled-components';
import CustomLink from './CustomLink';
const Title = styled.h1`
  font-size: 1.5rem;
  color: #4a658f;
  text-decoration: none;
  border:0;
`;
const TopBar = styled.header`
    display:flex;
    justify-content:start;
    align-items:center;
    height:4rem;
    width:100vw;
    padding:1rem;
    box-shadow: 0 0 0.5rem 0.1rem rgba(0,0,0,0.2);
`;

export default function Header() {
    return (
        <TopBar>
            <CustomLink href="/">
                <Title>
                    Podcaster
                </Title>
            </CustomLink>
        </TopBar>
    )
}