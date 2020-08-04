import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

import CheckBox from "./common/ChekBox";

function Todos(props) {
  const urlServer = "http://localhost:3000/api/todos";

  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [changedInServer, setChangedInServer] = useState(null);
  const [isCompleteSelected, setIsCompleteSelected] = useState("0");

  useEffect(() => {
    async function getTodos() {
      try {
        const result = await axios(urlServer);
        setTodos(result.data);
        // console.log(result);
      } catch (error) {
        console.log(error);
      }
    }

    getTodos();
  }, [changedInServer]);

  function handleAddTodo(e) {
    e.preventDefault();
    console.log("event form", e);
    (async function () {
      try {
        const result = await axios.post(urlServer, {
          title,
        });
        setChangedInServer(result);
      } catch (error) {
        console.log(error);
      }
    })();

    //To clear the inputText field
    setTitle("");
  }

  function handleChange(e) {
    setTitle(e.target.value);
  }

  function handleCheckBoxClick({ _id, title, isComplete }) {
    (async () => {
      try {
        isComplete = !isComplete;
        const result = await axios.put(`${urlServer}/${_id}`, {
          title,
          isComplete,
        });
        setChangedInServer(result);
      } catch (error) {
        console.log(error);
      }
    })();
  }

  function handleDeleteTodo(_id) {
    (async function () {
      try {
        const result = await axios.delete(`${urlServer}/${_id}`);
        setChangedInServer(result);
      } catch (error) {
        console.log(error);
      }
    })();
  }

  function handleIsCompleteSelected(e) {
    setIsCompleteSelected(e.target.value);
  }

  return (
    <div className="col-md-6 mt-4">
      <div className="row justify-content-center">
        <form onSubmit={handleAddTodo}>
          <div className="form-group row">
            <input
              type="text"
              className="form-control col-md-6"
              placeholder="Todo title"
              value={title}
              onChange={(e) => handleChange(e)}
            />
            <input
              type="submit"
              className="btn btn-primary col-md-2 ml-2 text-center"
              value="Add"
            />
          </div>
          <div className="form-group">
            <label htmlFor="isComplete" className="m-2">
              View:{" "}
            </label>
            <select
              value={isCompleteSelected}
              onChange={handleIsCompleteSelected}
              className="fom-control"
              id="isComplete"
            >
              <option value="0">Not Completed</option>
              <option value="1">Completed</option>
            </select>
          </div>
        </form>
      </div>

      <table className="table table-bordered table-stripped table-hover">
        <thead>
          <tr className="text-center">
            <th>Title</th>
            <th>Is Completed?</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {todos
            .filter((t) => {
              if (!t.isComplete && isCompleteSelected === "0") return t;
              else if (t.isComplete && isCompleteSelected === "1") return t;
              return false;
            })
            .map((todo) => (
              <tr key={todo._id}>
                <td>{todo.title}</td>
                <td>
                  <CheckBox
                    checked={todo.isComplete}
                    onCheckBoxChange={() => handleCheckBoxClick(todo)}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteTodo(todo._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Todos;
