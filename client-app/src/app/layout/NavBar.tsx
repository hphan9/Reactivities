import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';

interface Props{
    // this one take no parameter since it used to create new Activity 
    openForm: ()=>void;
}
export default function NavBar({openForm}:Props){
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="/asset/logo.png" alt ="logo" style={{marginRight:'10px'}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item name="Activities"/>
                <Menu.Item>
                    <Button positive content="Create Activity" onClick={openForm}></Button>
                </Menu.Item>
            </Container>
        </Menu>
    )
}