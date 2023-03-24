
import '../styles/globals.css'
import StyledMain from './components/Main.jsx'
import PodcastList from './components/PodcastList';

export default async function HomePage() {
    return (
        <StyledMain>
            <PodcastList />
        </StyledMain>
    );
}