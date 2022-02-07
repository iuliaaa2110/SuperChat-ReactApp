import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Container } from 'reactstrap';
import IPageProps from '../../interfaces/page';
import 'firebase/firestore';
import Channel from './components/Channel';
import { FcViewDetails } from 'react-icons/fc';

const HomePage: React.FunctionComponent<IPageProps> = props => {
    
    return (
        <Container>
            <Card>
                <CardBody>
                    <p>
                        Change your password <Link to="/change">here</Link>.
                    </p>
                    <p>
                        Click <Link to='/logout'>here</Link> to logout.
                    </p>
                </CardBody>
            

                {/* SuperChat */}
                <div className="flex flex-col h-full dark:bg-coolDark-500 dark:text-white transition-colors ">
                <header
                    className="flex-shrink-0 flex items-center justify-between px-8 shadow-md"
                    style={{ height: 'var(--topbar-height)' }}
                >
                    <h1 
                    className="font-medium text-lg truncate display:flex justify-content:center" 
                    style={{ lineHeight: 'var(--topbar-height)',  left: '50%', backgroundColor: "lightseagreen"}}
                    >ᔕᑌᑭᗴᖇ
                    <FcViewDetails/>
                    ᑕᕼᗩ丅
                    </h1>
                    {/* <ThemeIcon /> */}
                </header>
                <main
                    className="flex-1 flex flex-col"
                    style={{ maxHeight: 'calc(100% - var(--topbar-height))' }}
                >
                    <Channel />
                </main>
                </div>
            </Card>

        </Container>
    );
}

export default HomePage;