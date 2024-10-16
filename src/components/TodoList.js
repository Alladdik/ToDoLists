import React, { useState, useEffect } from 'react';
import { Form, Button, ListGroup, Badge, Dropdown, InputGroup } from 'react-bootstrap';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [category, setCategory] = useState('Всі');

  useEffect(() => {
    // Завантаження завдань з сервера
    const fetchTasks = async () => {
      const response = await fetch('http://localhost:5000/tasks');
      const data = await response.json();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  const addTask = () => {
    const newTaskObj = {
      id: Date.now(),
      text: newTask,
      category: category,
      completed: false,
      priority: 'Medium',
      dueDate: new Date().toISOString().slice(0, 10),
    };
    setTasks([...tasks, newTaskObj]);
    setNewTask('');
  };

  const toggleComplete = (taskId) => {
    const updatedTasks = tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task);
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h2 className="mb-4">Мій список справ</h2>

      <Form onSubmit={(e) => e.preventDefault()}>
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            placeholder="Нове завдання"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <Dropdown onSelect={setCategory}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {category}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="Робота">Робота</Dropdown.Item>
              <Dropdown.Item eventKey="Навчання">Навчання</Dropdown.Item>
              <Dropdown.Item eventKey="Особисте">Особисте</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button variant="primary" onClick={addTask}>Додати</Button>
        </InputGroup>
      </Form>

      <ListGroup>
        {tasks.map(task => (
          <ListGroup.Item key={task.id} className="d-flex justify-content-between align-items-center">
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.text} <Badge bg="secondary">{task.category}</Badge>
            </span>
            <div>
              <Button variant="success" onClick={() => toggleComplete(task.id)} className="me-2">
                {task.completed ? 'Відновити' : 'Завершити'}
              </Button>
              <Button variant="danger" onClick={() => deleteTask(task.id)}>
                Видалити
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default TodoList;
