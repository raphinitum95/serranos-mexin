import React, {Component} from 'react';
import styled from 'styled-components';
import Hero from '../../Assets/Images/Alamo.jpg'
import Aux from "../../hoc/Aux/Aux";
import Webnav from "../../Components/Navigation/Webnav";
import Mobilenav from "../../Components/Navigation/Mobilenav";
import MobileMenu from "../../Components/Menu/MobileMenu";
import MobileSchedule from "../../Components/Schedule/MobileSchedule";
import MobileAbout from "../../Components/About/MobileAbout";
import {Switch, Redirect, Route, withRouter} from "react-router-dom"
import {initGa, updateGa} from "../../hoc/GA/InitGa";

class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeNav: 0,
            open: false,
            mobile: true,
            pageWidth: 800,
            pageHeight: 800,
            menuClicked: false
        }
    }

    updateDimensions = () => {
        if(window.innerWidth < 1000) {
            this.setState({
                mobile: true,
                pageWidth: window.innerWidth,
                pageHeight: window.innerHeight
            });
        } else{
            this.setState({
                mobile: false,
                pageWidth: window.innerWidth,
                pageHeight: window.innerHeight
            });
        }
    };

    /**
     * Remove event listener
     */
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    componentDidMount () {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
        initGa();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.location.pathname !== this.props.location.pathname) {
            updateGa(this.props.history.location.pathname);
        }
    }

    handleNavClick = (navClick) => {
        this.setState({
            activeNav: navClick,
            open: false
        })
    };

    handleMenuToggle = () => {
        this.setState({
            open: !this.state.open,
            menuClicked: true
        })
    }

    render() {
        return (
            <Switch>
                {this.state.mobile ?
                    <Aux>
                        <Mobilenav
                            active={this.state.activeNav}
                            mobile={this.state.mobile}
                            open={this.state.open}
                            width={this.state.pageWidth}
                            height={this.state.pageHeight}
                            clicked={this.state.menuClicked}
                            linkClick={this.handleNavClick}
                            toggleMenu={this.handleMenuToggle}
                        />
                        <Route path={"/about"} exact component={() => <MobileAbout isLandscape={this.state.pageWidth > this.state.pageHeight} height={this.state.pageHeight} />}/>
                        <Route path={"/menu"} exact component={() => <MobileMenu isLandscape={this.state.pageWidth > this.state.pageHeight} height={this.state.pageHeight} />} />
                        <Route path={"/schedule"} exact component={() => <MobileSchedule isLandscape={this.state.pageWidth > this.state.pageHeight} height={this.state.pageHeight} />} />
                        <Route path={"/contact"} exact component={() => ""} />
                        <Redirect to={"/about"} />
                    </Aux> : <Aux>
                        <h1>Only Mobile Site</h1>
                        {/*<Background/>*/}
                        {/*<Overlay/>*/}
                        {/*<Container>*/}
                        {/*    <Webnav*/}
                        {/*        active={this.state.activeNav}*/}
                        {/*        mobile={this.state.mobile}*/}
                        {/*        open={this.state.open}*/}
                        {/*        linkClick={this.handleNavClick}*/}
                        {/*        toggleMenu={this.handleMenuToggle}*/}
                        {/*    />*/}
                        {/*</Container>*/}
                    </Aux>
                }
            </Switch>
        );
    }
}

export default withRouter(Body)

const Background = styled.div`
    background-image: url(${Hero});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -100;
`;

const Overlay = styled.div`
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -99;
    background-color: rgba(0,0,0,.8);
`;

const Container = styled.div`
    width: 75%;
    height: 100vh;
    margin: auto;
    z-index: 1;
`