import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [dataState, setDataState] = useState();
  const [previewState, setPreviewState] = useState([]);
  const url = "/api/items?search=";

  function fetchMenuItems(searchParams) {
    fetch(`${url}${searchParams}`)
      .then(res => res.json())
      .then(data => setDataState(data.responseArray))
  }

  useEffect(() => {
    fetchMenuItems('')
  }, [url])

  function addItemToPreview(item) {
    const itemStateId = Math.floor(Math.random() * 999999999);
    const previewObject = {
      id: item.id,
      name: item.name,
      dietaries: item.dietaries,
      itemStateId: itemStateId,
    }
    setPreviewState([...previewState, previewObject])
  }

  function removeItemFromPreview(key) {
    const currentpreviewState = previewState;
    for (let index = 0; index < currentpreviewState.length; index++) {
      const element = currentpreviewState[index];
      if (element.itemStateId === key) {
        currentpreviewState.splice(index, 1)
        setPreviewState([...currentpreviewState])
      }
    }
  }

  const renderDietaryItems = (item) => {
    return item.dietaries.map(item =>
      <span className="dietary">{item}</span>
    )
  };

  const renderMenuItems = dataState ? dataState.map(item =>
    <li className="item" onClick={() => { addItemToPreview(item) }}>
      <h2>{item.name}</h2>
      <p>
        {renderDietaryItems(item)}
      </p>
    </li>) : null;

  const renderPreviewItems = previewState ? previewState.map(item =>
    <li className="item">
      <h2>{item.name}</h2>
      <p>
        {renderDietaryItems(item)}
      </p>
      <button className="remove-item" onClick={()=>{removeItemFromPreview(item.itemStateId)}}>x</button>
    </li>) : null;

  return (
    <div className="wrapper">
      <div className="menu-summary">
        <div className="container">
          <div className="row">
            <div className="col-6 menu-summary-left">
              <span>{dataState ? dataState.length : null}</span>
            </div>
            <div className="col-6 menu-summary-right">
              6x <span className="dietary">ve</span>
              4x <span className="dietary">v</span>
              12x <span className="dietary">n!</span>
            </div>
          </div>
        </div>
      </div>
      <div className="container menu-builder">
        <div className="row">
          <div className="col-4">
            <div className="filters">
              <input className="form-control" placeholder="Name" onChange={e => fetchMenuItems(e.target.value)} />
            </div>
            <ul className="item-picker">
              {renderMenuItems}
            </ul>
          </div>
          <div className="col-8">
            <h2>Menu preview</h2>
            <ul className="menu-preview">
              {renderPreviewItems}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
};