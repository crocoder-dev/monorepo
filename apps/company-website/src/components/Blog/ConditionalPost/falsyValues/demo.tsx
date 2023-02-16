import React from 'react';

const FalsyValues: React.FC = () => {

  const trStyle = {
    lineHeight: '2.5rem',
    borderBottom: '1px solid #ccc',
  }

  const trStyleLast = {
    lineHeight: '2.5rem',
  }

  return (
    <table style={{textAlign: 'justify', borderCollapse: 'collapse'}}>
      <tr style={trStyle}>
        <th>Falsy Value</th>
        <th>Expression</th>
        <th>Result</th>
      </tr>
      <tr style={trStyle}>
        <td>false</td>
        <td>{`{false && <div>👋</div>}`}</td>
        <td>{false && <div>👋</div>}</td>
      </tr>
      <tr style={trStyle}>
        <td>0</td>
        <td>{`{0 && <div>👋</div>}`}</td>
        <td>{0 && <div>👋</div>}</td>
      </tr>
      <tr style={trStyle}>
        <td>""</td>
        <td>{`{"" && <div>👋</div>}`}</td>
        <td>{"" && <div>👋</div>}</td>
      </tr>
      <tr style={trStyle}>
        <td>null</td>
        <td>{`{null && <div>👋</div>}`}</td>
        <td>{null && <div>👋</div>}</td>
      </tr>
      <tr style={trStyle}>
        <td>undefined</td>
        <td>{`{undefined && <div>👋</div>}`}</td>
        <td>{undefined && <div>👋</div>}</td>
      </tr>
      <tr style={trStyleLast}>
        <td>NaN</td>
        <td>{`{NaN && <div>👋</div>}`}</td>
        <td>{NaN && <div>👋</div>}</td>
      </tr>
    </table>
  );
};

export default FalsyValues;
