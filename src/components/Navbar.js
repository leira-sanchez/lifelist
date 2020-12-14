import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Header = styled.header`
  width: 100%;
  background-color: #5fa8d3;
  color: white;
  margin: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: sticky;
  top: 0;
  width: 100%;
`;

const NavItem = styled.li`
  list-style: none;
  display: inline;
  /* margin-left: 10px; */
  padding: 10px;

  :hover {
    background-color: ${({ isHeader }) => {
      return isHeader ? '' : '#1b4965';
    }};
  }
`;

const StyledNavLink = styled(NavLink)`
  color: white;
  text-decoration: none;
`;

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
