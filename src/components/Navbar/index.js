// import { useThemeState } from '../../customHooks/useThemeState';
import { Header, StyledNavLink, NavItem } from './NavbarStyles';
import { Switch } from '@material-ui/core';

const Navbar = ({ isDarkMode, toggleTheme }) => {
  // Default for useThemeState is false
  // const [isDarkMode, toggleTheme] = useThemeState();
  console.log(isDarkMode);
  return (
    <Header>
      <h1>
        <StyledNavLink to={'/'}>Lifelist </StyledNavLink>
        <Switch onChange={toggleTheme}></Switch>
      </h1>
      <nav>
        <NavItem>
          <StyledNavLink to={'/'}>Home</StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to={'/archive'}>Archive</StyledNavLink>
        </NavItem>
      </nav>
    </Header>
  );
};

export default Navbar;
