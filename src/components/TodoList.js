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
      try {
        const response = await axios.get('http://localhost:3001/api/todos');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
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

    try {
      const response = await axios.post('http://localhost:3001/api/todos', newItem);
      setItems([...items, { id: response.data.id, ...newItem }]);
      setNewItem({ title: '', description: '', dueDate: '', category: '' });
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/todos/${id}`);
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
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
