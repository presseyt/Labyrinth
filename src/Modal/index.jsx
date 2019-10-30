const React = require('react');
const ReactDOM = require('react-dom');

require('./styles.scss');

export default class LoseMessage extends React.Component {
  setRef = node => this.buttonRef = node;

  componentDidMount = () => this.buttonRef && this.buttonRef.focus();

  render() {
    return ReactDOM.createPortal((
        <div className="Modal">
            {this.props.onClose && <div className="Modal__overlay" onClick={this.props.onClose} />}
            <div onClick={(e) => e.stopPropagation()} style={{ zIndex: 1, position: 'relative' }}>
                {this.props.onClose && <div className="Modal__x" onClick={this.props.onClose}>X</div>}
                {this.props.children}
            </div>
        </div>
    ), document.querySelector('#react-root'));
  }
}

