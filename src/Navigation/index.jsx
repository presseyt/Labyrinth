const React = require('react');
const ReactDOM = require('react-dom');

require('./styles.scss');

const problemSets = [
    ['qkbVIO', 'LlgwLl', 'PNHk3z', 'Q0mAVD', 'apc49z', 'xelYkm', 'AS3M0e', 'pcjIzl', 'aTVeIg', 'AxM56o', '4Ddi8M', '3mbSkc'], // ones I made
    ['a16oxc', '1O91ll', 'ydILKK', 'Yutrk1', '3pIXNJ', 'NYrJrI', 'rZYpXH', 'X5aZGd', 'MUzgQM', 'Tx1Z1W', '3vxYu8', 'IAZ1Hp', 'Deso1e', 'MOtiyK', '4f19mf', 'Xn7Ux0'], // easy
    ['6kdz74', '7UQMAZ', 'bGzssP', 'o7MRJ6', 'myexAT', 'HrDllp', 'grDljw', 'mfzc9Y', 'iJ0IXm', 'FVesqh', 'Sh7ysR', 'wwbMpR'], // 7x7ish
    ['8slbM4', 'Z0sazN', 'lJgk66', 'kufsao', 'PbTpDK', '9NGHXy', 'z3Kifa', 'c1OppP', 'eR2ZUH', '5F0rS4', 'GIj5fw', 'lmRpOx', 'PrAPS3'], // 8x9ish
    ['lWznRv', 'eKSaz4', '2SzqgX', 'toNkgR', 'c7562g', 'Pd4vT5', 'xUwcZe', '96s7hP', 'pSSvvO', '11Vktz', '565UmR', 'oxsAPF', 'Gdct2y', 'SMu0k3', '4Hdney'], // 10x10ish
    ['phyHyl', 'JpWLRZ', '0NYAum', 'WXDyRX', 'Fb7p2w', 'M06Va6', 'oSyZ5Y', 'gSiSSp', 'S23vhd', 'UGUHkL'] // 14x9
];

export default class Sidebar extends React.Component {
  render() {
    const { onPageSelect, onProblemSetSelect } = this.props;
    return (
      <div className="Navigation">
          {problemSets.map((pSet, i) => (
              <button key={i} onClick={() => onProblemSetSelect(pSet)}>{`LEVEL ${i+1}`}</button>
          ))}
          <button onClick={() => onPageSelect('generate')}> GENERATE </button>
      </div>
    );
  }
}
