import React, { Component } from "react";
import {
  Container,
  Header,
  Input,
  Button,
  List,
  Grid,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import axios from "axios";

const YOUR_API_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTNiZjRlZWVjYjU5ZjYyYmFhYTRkZTIiLCJ1c2VybmFtZSI6ImNhcmluIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2OTg0NTg0NzYsImV4cCI6MTY5ODQ2MjA3Nn0.wuS9FAGGDE2BlDbxlXpACiMR0ew4onfLjgMzpuvbJ1A";

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      newTodo: "",
      editingTodoIndex: -1,
    };
  }

  handleInputChange = (e) => {
    this.setState({ newTodo: e.target.value });
  };

  handleAddTodo = () => {
    if (this.state.newTodo) {
      axios
        .post(
          "/todos/create",
          { text: this.state.newTodo },
          {
            headers: {
              Authorization: `Bearer ${YOUR_API_TOKEN}`,
            },
          }
        )
        .then((response) => {
          this.setState((prevState) => ({
            todos: [...prevState.todos, response.data.todo],
            newTodo: "",
          }));
        })
        .catch((error) => {
          console.error("Error adding todo:", error);
        });
    }
  };

  handleEditTodo = (index) => {
    const updatedTodo = prompt("Edit Todo:", this.state.todos[index]);
    if (updatedTodo !== null) {
      axios
        .patch(`/todos/${index}`, { text: updatedTodo })
        .then(() => {
          const todos = [...this.state.todos];
          todos[index] = updatedTodo;
          this.setState({ todos, editingTodoIndex: -1 });
        })
        .catch((error) => {
          console.error("Error updating todo:", error);
        });
    }
  };

  handleDeleteTodo = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this todo?"
    );
    if (confirmDelete) {
      axios
        .delete(`/todos/${index}`)
        .then(() => {
          const todos = [...this.state.todos];
          todos.splice(index, 1);
          this.setState({ todos, editingTodoIndex: -1 });
        })
        .catch((error) => {
          console.error("Error deleting todo:", error);
        });
    }
  };

  handleStartEditing = (index) => {
    this.setState({ editingTodoIndex: index });
  };

  handleCancelEditing = () => {
    this.setState({ editingTodoIndex: -1 });
  };

  render() {
    return (
      <div className="dark-mode centered-container">
        {" "}
        {/* Menggabungkan kelas CSS */}
        <Container>
          <Header as="h1">
            <div className="white-text">Todo List</div>
          </Header>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Input
                  fluid
                  type="text"
                  placeholder="Add a new todo"
                  value={this.state.newTodo}
                  onChange={this.handleInputChange}
                />
              </Grid.Column>
              <Grid.Column>
                <Button primary fluid onClick={this.handleAddTodo}>
                  Add
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <List divided relaxed>
            {this.state.todos.map((todo, index) => (
              <List.Item key={index}>
                <Grid columns={3}>
                  <Grid.Column width={8}>
                    {this.state.editingTodoIndex === index ? (
                      <div>
                        <Input
                          fluid
                          type="text"
                          value={todo}
                          onChange={(e) => this.handleEditChange(e, index)}
                        />
                      </div>
                    ) : (
                      <div>{todo}</div>
                    )}
                  </Grid.Column>
                  <Grid.Column width={4}>
                    {this.state.editingTodoIndex === index ? (
                      <Button
                        primary
                        fluid
                        onClick={() => this.handleEditTodo(index)}
                      >
                        Save
                      </Button>
                    ) : (
                      <Button
                        primary
                        fluid
                        onClick={() => this.handleStartEditing(index)}
                      >
                        Edit
                      </Button>
                    )}
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Button
                      negative
                      fluid
                      onClick={() => this.handleDeleteTodo(index)}
                    >
                      Delete
                    </Button>
                  </Grid.Column>
                </Grid>
              </List.Item>
            ))}
          </List>
        </Container>
      </div>
    );
  }
}

export default App;
