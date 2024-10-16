import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    dueDate: '',
    category: ''
  });

  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios.get('/api/todo');
      setItems(response.data);
    };
    fetchItems();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const addItem = async (e) => {
    e.preventDefault();
    if (newItem.title.trim() === '' || newItem.description.trim() === '') {
      alert('Назва та опис обов’язкові');
      return;
    }

    const response = await axios.post('/api/todo', newItem);
    setItems([...items, response.data]);
    setNewItem({ title: '', description: '', dueDate: '', category: '' });
  };

  const deleteItem = async (id) => {
    await axios.delete(`/api/todo/${id}`);
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={addItem}>
        <input type="text" name="title" placeholder="Назва" value={newItem.title} onChange={handleChange} />
        <input type="text" name="description" placeholder="Опис" value={newItem.description} onChange={handleChange} />
        <input type="date" name="dueDate" value={newItem.dueDate} onChange={handleChange} />
        <select name="category" value={newItem.category} onChange={handleChange}>
          <option value="">Виберіть категорію</option>
          <option value="Робота">Робота</option>
          <option value="Навчання">Навчання</option>
          <option value="Особисте">Особисте</option>
        </select>
        <button type="submit">Додати завдання</button>
      </form>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>Категорія: {item.category}</p>
            <p>Термін: {item.dueDate}</p>
            <button onClick={() => deleteItem(item.id)}>Видалити</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
