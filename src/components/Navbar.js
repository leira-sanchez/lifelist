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
`;

const NavItem = styled.li`
  list-style: none;
  display: inline;
  margin-left: 10px;
`;

const Navbar = () => (
  <Header>
    <h1>
      <NavLink to={'/'}>Lifelist </NavLink>
    </h1>
    <nav>
      <NavItem>
        <NavLink to={'/'}>Home</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to={'/archive'}>Archive</NavLink>
      </NavItem>
    </nav>
  </Header>
);

export default Navbar;
