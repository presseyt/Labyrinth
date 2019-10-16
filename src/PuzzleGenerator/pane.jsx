const React = require('react');

require('./styles.scss');

export default class PuzzleGeneratorOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 9,
      height: 8,
      pop: 200,
      pc: 0.25,
      pm: 0.05,
    };
  }
  submit = () => {
    this.props.onSubmit(this.state);
  }
  render() {
    const { width, height, pop, pc, pm } = this.state;
    const makeOnChange = (id) => (e) => this.setState({ [id]: e.target.value });
    return (
      <div className="PuzzleGeneratorOptions">
        <input id="width" type="number" min="3" max="21" value={width} onChange={makeOnChange('width')} />
        <input id="height" type="number" min="3" max="21" value={height} onChange={makeOnChange('height')} />
        <input id="pop" type="number" min="20" max="2000" value={pop} onChange={makeOnChange('pop')} />
        <input id="pc" type="number" min="0.001" max="0.5" step="0.001" value={pc} onChange={makeOnChange('pc')} />
        <input id="pm" type="number" min="0.001" max="0.5" step="0.001" value={pm} onChange={makeOnChange('pm')} />
        <button onClick={this.submit}> BUILD </button>
      </div>
    )
  }
}


