import React from 'react';

const Alternatives: React.FC = () => {
  const trStyle = {
    lineHeight: '2.5rem',
    borderBottom: '1px solid #ccc',
  };

  const trStyleLast = {
    lineHeight: '2.5rem',
  };

  return (
    <>
      <table style={{ textAlign: 'justify', borderCollapse: 'collapse', width: '100%' }}>
        <caption>use !!</caption>
        <tr style={trStyle}>
          <th></th>
          <th>Expression</th>
          <th>Result</th>
        </tr>
        <tr style={trStyle}>
          <td>!!0</td>
          <td>{`{!!0 && <div>👋</div>}`}</td>
          <td>{!!0 && <div>👋</div>}</td>
        </tr>
        <tr style={trStyleLast}>
          <td>!!NaN</td>
          <td>{`{!!NaN && <div>👋</div>}`}</td>
          <td>{!!NaN && <div>👋</div>}</td>
        </tr>
      </table>
      <table style={{ textAlign: 'justify', borderCollapse: 'collapse', width: '100%'}}>
        <caption>cast it to Boolean</caption>
        <tr style={trStyle}>
          <th></th>
          <th>Expression</th>
          <th>Result</th>
        </tr>
        <tr style={trStyle}>
          <td>Boolean(0)</td>
          <td>{`{Boolean(0) && <div>👋</div>}`}</td>
          <td>{Boolean(0) && <div>👋</div>}</td>
        </tr>
        <tr style={trStyleLast}>
          <td>Boolean(NaN)</td>
          <td>{`{Boolean(NaN) && <div>👋</div>}`}</td>
          <td>{Boolean(NaN) && <div>👋</div>}</td>
        </tr>
      </table>
      <table style={{ textAlign: 'justify', borderCollapse: 'collapse', width: '100%' }}>
        <caption>Use ternary operator</caption>
        <tr style={trStyle}>
          <th></th>
          <th>Expression</th>
          <th>Result</th>
        </tr>
        <tr style={trStyle}>
          <td>0</td>
          <td>{`{0 ? <div>👋</div> : null`}</td>
          <td>{0 ? <div>👋</div> : null}</td>
        </tr>
        <tr style={trStyleLast}>
          <td>NaN</td>
          <td>{`{NaN ? <div>👋</div> : null}`}</td>
          <td>{NaN ? <div>👋</div> : null}</td>
        </tr>
      </table>
    </>
  );
};

export default Alternatives;
