import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Header = styled.header`
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

export const NavItem = styled.li.attrs((props) => ({
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

export const StyledNavLink = styled(NavLink)`
  color: white;
  text-decoration: none;
`;
