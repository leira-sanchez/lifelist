import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Header = styled.header`
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

const NavItem = styled.li.attrs((props) => ({
  isHeader: props.isHeader,
}))`
  list-style: none;
  display: inline;
  padding: 10px;
  cursor: pointer;

  :hover {
  padding-bottom: 35px;
  background-color: ${(isHeader) => {
    return isHeader ? '' : '#1b4965';
  }}
`;

const StyledNavLink = styled(NavLink)`
  color: white;
  text-decoration: none;
`;

export { Header, NavItem, StyledNavLink}