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
  continue = () => {
    this.props.onContinue({ puzzle: this.props.puzzle, ...this.state });
  }
  render() {
    const { width, height, pop, pc, pm } = this.state;
    const makeOnChange = (id) => (e) => this.setState({ [id]: e.target.value });
    return (
      <div className="PuzzleGeneratorOptions">
        <div>
            <label htmlFor="width">width</label>
            <input id="width" type="number" min="3" max="21" value={width} onChange={makeOnChange('width')} />
            <label htmlFor="height">height</label>
            <input id="height" type="number" min="3" max="21" value={height} onChange={makeOnChange('height')} />
        </div>
        <div>
            <input id="pop" type="number" min="20" max="2000" value={pop} onChange={makeOnChange('pop')} />
            <label htmlFor="pop">population size</label>
        </div>
        <div>
            <input id="pc" type="number" min="0.001" max="0.5" step="0.001" value={pc} onChange={makeOnChange('pc')} />
            <label htmlFor="pc">crossover probability</label>
        </div>
        <div>
            <input id="pm" type="number" min="0.001" max="0.5" step="0.001" value={pm} onChange={makeOnChange('pm')} />
            <label htmlFor="pm">mutation probability</label>
        </div>
        <button onClick={this.submit}> BUILD </button>
        {this.props.puzzle && <button onClick={this.continue}> CONTINUE </button>}
      </div>
    )
  }
}


