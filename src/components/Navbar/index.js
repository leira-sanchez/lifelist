import { Header, StyledNavLink, NavItem } from "./NavbarStyles"

const Navbar = () => (
  <Header>
    <h1>
      <StyledNavLink to={'/'}>Lifelist </StyledNavLink>
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

export default Navbar;