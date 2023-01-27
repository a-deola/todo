import cx from "classnames";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import styles from "../styles/Home.module.css"

const Home = () => {
  const [items, setItems] = useState([
    { id: uuidv4(), message: "Read a book", done: false },
  ]);
  const [todoItem, setTodoItem] = useState("");
  const addItem = () => {
    if (todoItem) {
      setItems([{
        id: uuidv4(),
        message: todoItem,
        done: false
      },
      ...items]);
      setTodoItem("");
    }
  };
  const handleToggle = (id) => {
    const _items = items.map((item) => {
      if (item.id === id) {
        return { ...item, done: !item.done };
      }
      return item;
    });
    setItems(_items);
  };
  const handleEnter = (e) => {
    if (e.key === "Enter"){
      addItem()
    }
  }
  return (
    <div className="w-3/4 mx-auto text-center">
    <section className="pt-12">
    <h6 className ="text-xs font-bold uppercase pb-2" >Learning react</h6>
      <h1 className="text-5xl ">Todo App</h1>
    </section>
      <div className="pt-12">
        <input
          type="text"
          name="newItem"
          value={todoItem}
          className="w-full text-gray-900 px-4 py-2 text-center rounded"
          onChange={(e) => setTodoItem(e.target.value)}
          onKeyDown= {handleEnter}
        />
      </div>
      <ul className="pt-12">
        {items.filter(({ done }) => !done).map(({ message, id}) => (
          <li
            key={id}
            onClick={() => handleToggle(id)}
            className={cx(styles.item)}
          >{message}
          </li>
        ))}
        {items.filter(({ done }) => done).map(({ message, id}) => (
          <li
            key={id}
            onClick={() => handleToggle(id)}
            className={cx(styles.item, [styles.done])}
          >
            {message}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Home;
