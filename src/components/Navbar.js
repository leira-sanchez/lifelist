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
    <h1>Lifelist</h1>
    <nav>
      <NavItem>Home</NavItem>
      <NavItem>Archive</NavItem>
    </nav>
  </Header>
);

export default Navbar;
