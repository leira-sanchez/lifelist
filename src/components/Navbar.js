import styled from 'styled-components';
import colors from '../constants/colors';

const { starCommandBlue } = colors;

const Header = styled.header`
  width: 100%;
  background-color: ${starCommandBlue};
  color: white;
  margin: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: sticky;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.75);
`;

const NavItem = styled.li`
  list-style: none;
  display: inline;
  margin-left: 10px;
`;

const Navbar = () => (
  <Header>
    <h1>Lifelist</h1>
    <nav>
      <NavItem>Home</NavItem>
      <NavItem>Archive</NavItem>
    </nav>
  </Header>
);

export default Navbar;
