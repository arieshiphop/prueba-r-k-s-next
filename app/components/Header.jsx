'use client'
import styled from 'styled-components';
import { isLoading } from '@/store/isLoading.store';
import LoadingIndicator from './LoadingIndicator';

const Title = styled.h1`
  font-size: 1.5rem;
  color: #4a658f;
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
    const loadingStore = isLoading.getInstance();
    return (
        <TopBar>
            <Title>
                Podcaster
            </Title>
            {loadingStore.getLoading() === true ? <LoadingIndicator /> : null}
        </TopBar>
    )
}