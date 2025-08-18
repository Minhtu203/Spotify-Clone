import './GlobalStyle.scss';
import PropTypes from 'prop-types';

export default function GlobalStyle({ children }) {
    return children;
}

GlobalStyle.propTypes = {
    children: PropTypes.node.isRequired,
};
