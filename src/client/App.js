import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [dataState, setDataState] = useState([]);
  const [previewState, setPreviewState] = useState([]);
  const [dietaryState, setDietaryState] = useState({});
  const url = "/api/items?search=";

  function fetchMenuItems(searchParams) {
    fetch(`${url}${searchParams}`)
      .then(res => res.json())
      .then(data => { setDataState(data.responseArray) })
  }

  useEffect(() => {
    fetchMenuItems('');
  }, [url]);

  const addItemToPreview = (item) => {
    const itemStateId = Math.floor(Math.random() * 999999999);
    const previewObject = {
      id: item.id,
      name: item.name,
      dietaries: item.dietaries,
      itemStateId,
    };
    handleDietaryData([...previewState, previewObject])
    setPreviewState([...previewState, previewObject]);
  };

  const removeItemFromPreview = (key) => {
    const updatedPreviewState = previewState.filter((item) => item.itemStateId !== key);
    handleDietaryData(updatedPreviewState);
    setPreviewState(updatedPreviewState);
  };

  const renderDietaryItems = (item) => {
    return item.dietaries.map((dietary, index) => (
      <span className="dietary" key={index} data-testid="dietaryMenuItems">
        {dietary}
      </span>
    ));
  };

  const renderDietaryHud = dietaryState
    ? Object.keys(dietaryState).map((item, i) => (
        <span className="dietary dietaryHud" key={i} data-testid="dietaryHudItems">
          {item} <span className="dietaryCount">{dietaryState[item]}</span>
        </span>
      ))
    : null;

  const handleDietaryData = (items) => {
    const dietaryDataHud = {};
    items.forEach((item) => {
      item.dietaries.forEach((dietary) => {
        dietaryDataHud[dietary] = (dietaryDataHud[dietary] || 0) + 1;
      });
    });
    setDietaryState(dietaryDataHud);
  };

  const renderMenuItems = dataState
    ? dataState.map((item) => (
        <li className="item" key={item.id} onClick={() => addItemToPreview(item)}>
          <h2 data-testid="menuItems">{item.name}</h2>
          <p>{renderDietaryItems(item)}</p>
        </li>
      ))
    : null;

  const renderPreviewItems = previewState
    ? previewState.map((item) => (
        <li className="item menupreview" key={item.itemStateId} data-testid="previewItems">
          <h2>{item.name}</h2>
          <p>{renderDietaryItems(item)}</p>
          <button className="remove-item" onClick={() => removeItemFromPreview(item.itemStateId)}>
            x
          </button>
        </li>
      ))
    : null;

  return (
    <div className="wrapper">
      <div className="menu-summary">
        <div className="container">
          <div className="row">
            <div className="menu-summary-left">
              <span data-testid="itemNumber">{previewState.length} selected results</span>
            </div>
            <div className="menu-summary-right dietaryIconContainer">{renderDietaryHud}</div>
          </div>
        </div>
      </div>
      <div className="container menu-builder">
        <div className="row">
          <div className="col-4">
            <div className="filters">
              <input
                className="form-control"
                aria-label="product-input"
                placeholder="Name"
                onChange={(e) => fetchMenuItems(e.target.value)}
              />
              <span data-testid="itemNumber">{dataState.length} search results</span>
            </div>
            <ul className="item-picker">{renderMenuItems}</ul>
          </div>
          <div className="col-8">
            <h2>Menu preview</h2>
            <ul className="menu-preview">{renderPreviewItems}</ul>
          </div>
        </div>
      </div>
    </div>
  );
}
