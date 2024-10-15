import React from 'react';
import TodoList from './components/TodoList'; // Підключаємо компонент для списку завдань
import Register from './components/Register'; // Підключаємо компонент для реєстрації
import Login from './components/Login'; // Підключаємо компонент для входу
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">Список справ</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/">Домашня</Nav.Link>
              <Nav.Link href="/login">Вхід</Nav.Link>
              <Nav.Link href="/register">Реєстрація</Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        <Container className="mt-5">
          <Switch>
            <Route path="/" exact component={TodoList} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </Container>

        <footer className="footer bg-dark text-white mt-5 p-3 text-center">
          &copy; {new Date().getFullYear()} Todo App
        </footer>
      </div>
    </Router>
  );
}

export default App;
