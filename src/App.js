import React, {Component} from 'react';
import './App.css';

class App extends Component {
    state = {
        text: "",
        todoList: []
    };

    componentDidMount = () => {
        this.hydrateStateWithLocalStorage();

        window.addEventListener(
            "beforeunload",
            this.saveStateToLocalStorage.bind(this)
        );
    };

    componentWillUnmount = () => {
        window.removeEventListener(
            "beforeunload",
            this.saveStateToLocalStorage.bind(this)
        );
        this.saveStateToLocalStorage();
    };

    saveStateToLocalStorage() {

        localStorage.setItem('todoList', JSON.stringify(this.state['todoList']));
    }

    hydrateStateWithLocalStorage = () => {
        let cachedList = localStorage.getItem('todoList');
        let todoList = JSON.parse(cachedList);
        this.setState({
            todoList
        });
    };

    showText = (event) => {
        this.setState({
            text: event.target.value
        });
    };

    addToList = () => {
        var todoList = [...this.state.todoList];
        todoList.push({item: this.state.text, completed: false});

        this.setState({
            todoList,
            text: ""
        });
    };

    deleteTodo = (index) => {
        let todoList = [...this.state.todoList]
            .filter((_, indexOfItem) => indexOfItem !== index);
        this.setState({
            todoList
        });
    };

    completedTodo = (index) => {
        let todoList = [...this.state.todoList]
            .map((todoItem, indexOfItem) => {
                if (indexOfItem === index) {
                    todoItem.completed = todoItem.completed ? false : true
                }
                return todoItem;
            });

        this.setState({
            todoList
        });
    };

    render() {
        return (
            <div className="App">
                <input type="text" onChange={this.showText} value={this.state.text}></input>
                <button onClick={this.addToList}>Add</button>
                {
                    this.state.todoList.map((todoItem, index) => {
                            return (
                                <div key={index}>
                                    <input type="checkbox" defaultChecked={todoItem.completed ? true : false}
                                           onClick={this.completedTodo.bind(this, index)}/>
                                    <span className={todoItem.completed ? "strike" : ""}>{todoItem.item}</span>
                                    <button onClick={this.deleteTodo.bind(this, index)}>x</button>
                                </div>
                            )
                        }
                    )
                }
            </div>
        );
    }
}

function ShowText(prop) {
    return (
        <p>{prop.text}</p>
    )
}

export default App;
