import "./App.css";
import React from "react";
import { useState } from "react";

function App() {
  const TITLE = "To-Do List";

  const [inputFieldContents, setInputFieldContents] = React.useState("");

  const [toDoList, setToDoList] = React.useState([]);

  const handleInput = (event) => {
    setInputFieldContents(event.target.value);
  };

  const handleAddItem = function () {
    setToDoList([...toDoList, inputFieldContents]);
  };

  const handleDeleteItem = function (description) {
    setToDoList(toDoList.filter((item) => item !== description));
  };

  return (
    <>
      <h1 class="centered">{TITLE}</h1>
      <LabeledForm
        label="Enter Item: "
        buttonText="Add to List"
        position="centered"
        inputFieldContents={inputFieldContents}
        handleInput={handleInput}
        addItem={handleAddItem}
      />
      <div id="to-do-list" className="centered">
        <ToDoList
          listClasses="flex-column"
          elementClasses="flex-row"
          bordered={true}
          items={toDoList}
          onRemoveItem={handleDeleteItem}
        />
      </div>
    </>
  );
}

function LabeledForm({
  label,
  buttonText,
  position,
  inputFieldContents,
  handleInput,
  addItem,
}) {
  return (
    <span class={position}>
      <p class={position}>{label}</p>
      <Form
        class={position}
        position={position}
        isFocused
        inputFieldContents={inputFieldContents}
        buttonText={buttonText}
        handleInput={handleInput}
        addItem={addItem}
      />
    </span>
  );
}

function Form({
  position,
  isFocused,
  inputFieldContents,
  buttonText,
  handleInput,
  addItem,
}) {
  const inputRef = React.useRef();
  isFocused = false;
  isFocused = true;

  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label class={position}></label>
      <input onChange={handleInput} ref={inputRef}></input>
      <Button
        inputFieldContents={inputFieldContents}
        buttonText={buttonText}
        addItem={addItem}
      />
    </>
  );
}

function Button({ inputFieldContents, buttonText, addItem }) {
  return <button onClick={addItem}>{buttonText}</button>;
}

function ToDoList({
  listClasses,
  elementClasses,
  items,
  onRemoveItem,
  bordered,
}) {
  return (
    <ul id="items-container" className={listClasses}>
      {items.map((item) => (
        <Item
          description={item}
          onRemoveItem={onRemoveItem}
          elementClasses={elementClasses}
          bordered={bordered}
        />
      ))}
    </ul>
  );
}

function Item({ description, onRemoveItem, elementClasses, bordered }) {
  const handleRemoveItem = () => onRemoveItem(description);

  return (
    <div
      id="item-div"
      className={bordered ? `${elementClasses} bordered` : elementClasses}
    >
      <p>{description}</p>
      <button id="resolve-btn" type="button" onClick={handleRemoveItem}>
        resolve
      </button>
    </div>
  );
}

export default App;
