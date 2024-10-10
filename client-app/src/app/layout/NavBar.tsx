import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export default function NavBar(){
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    <img src="/asset/logo.png" alt ="logo" style={{marginRight:'10px'}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item as={NavLink} to='/activities' name="Activities"/>
                <Menu.Item>
                    <Button positive as={NavLink} to='/createActivity' content="Create Activity"></Button>
                </Menu.Item>
            </Container>
        </Menu>
    )
}