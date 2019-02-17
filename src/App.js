import React, {Component} from 'react';
import './App.css';

class App extends Component {
    state = {
        text: "",
        todoList: [],
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
        if(this.state.text) {
            todoList.push({item: this.state.text, completed: false, hover: false});
        }
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
    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.showText(event);
            this.addToList()
        }
    };
    hoverOn = (index) => {
        let todoList = [...this.state.todoList]
            .map((todoItem, indexOfItem) => {
                if (indexOfItem === index) {
                    todoItem.hover = true
                }
                return todoItem;
            });
        this.setState({
            todoList
        })
    };
    hoverOff = (index) => {
        let todoList = [...this.state.todoList]
            .map((todoItem, indexOfItem) => {
                if (indexOfItem === index) {
                    todoItem.hover = false
                }
                return todoItem;
            });
        this.setState({
            todoList
        })
    };
        completedTodo = (index) => {
            let todoList = [...this.state.todoList]
                .map((todoItem, indexOfItem) => {
                    if (indexOfItem === index) {
                        todoItem.completed = !todoItem.completed
                    }
                    return todoItem;
                });

            this.setState({
                todoList
            });
        };

        render()
        {
            return (
                <div className="App jumbotron container ">
                    <div className="addTodo">
                        <input type="text" className="col-sm-6" onChange={this.showText} value={this.state.text}
                               onKeyPress={this.handleKeyPress.bind(this)}/>
                        <button className="add btn btn-info" onClick={this.addToList}>Add</button>
                    </div>
                    {
                        this.state.todoList.map((todoItem, index) => {
                                return (
                                    <div key={index} className="todoItem" onMouseEnter={this.hoverOn.bind(this, index)}
                                         onMouseLeave={this.hoverOff.bind(this, index)} onTouchStart={this.hoverOn.bind(this, index)} onTouchEnd={this.hoverOff.bind(this, index)}>
                                        <input type="checkbox" defaultChecked={todoItem.completed}
                                               onClick={this.completedTodo.bind(this, index)}
                                               className={todoItem.hover ? "show" : "hide"}/>
                                        <div className={todoItem.completed ? "strike" : ""}>{todoItem.item}</div>
                                        <button className={`btn btn-danger ${todoItem.hover ? "show" : "hide"}`}
                                                onClick={this.deleteTodo.bind(this, index)}>x
                                        </button>
                                    </div>
                                )
                            }
                        )
                    }
                </div>
            );
        }
    }
    export default App;
