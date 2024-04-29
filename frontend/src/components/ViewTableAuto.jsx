// import React from 'react';
import PropTypes from 'prop-types';

// import { useNavigate } from "react-router-dom";

const ViewTableAuto = ({data}) => {
    if (!data || data.length === 0) {
        return <p>No data available</p>;
    }
    
    const columns = Object.keys(data[0]);
    
    return (
        <table>
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                {columns.map((column, columnIndex) => (
                  <td key={columnIndex}>{item[column]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    };

    ViewTableAuto.propTypes = {
      data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
  };
  
export default ViewTableAuto;