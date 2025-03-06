import React, { useEffect, useState } from "react";

const List = () => {
  const [list, setList] = useState([]);

  const apiUrl = "https://playground.4geeks.com/todo";

  useEffect(() => {
    let userRegistered = false;
    fetch(`${apiUrl}/users/lucas_aguiar`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.detail) {
          userRegistered = false;
        } else {
          userRegistered = true;
        }

        if (!userRegistered) {
          fetch(`${apiUrl}/users/lucas_aguiar`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }).catch((error) => {
            alert("Error al registrar usuario en la api");
          });
        } else {
          fetch(`${apiUrl}/users/lucas_aguiar`)
            .then((res) => {
              return res.json();
            })
            .then((res) => {
              const tasks = res.todos.map((todo) => ({
                label: todo.label,
                is_done: todo.is_done,
                id: todo.id,
              }));
              setList(tasks);
            });
        }
      })
      .catch((error) => {
        console.log("Error al verificar si el usuario existe en la api", e);
      });
  }, []);

  const handleAddTask = (event) => {
    const task = event.target.value;
    const body = {
      label: task,
      is_done: false,
    };
    if (list.includes(task)) {
      alert("La tarea ya existe");
    } else if (task !== "") {
      fetch(`${apiUrl}/todos/lucas_aguiar`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => {
          return resp.json();
        })
        .then((resp) => {
          setList((prevList) => [...prevList, resp]);
          event.target.value = "";
        })
        .catch((error) => {
          alert("Ocurrio un error y no se pudo agregar la mueva tarea");
        });
    } else {
      alert("No se puede agregar una tarea vacía");
    }
  };

  const deleteTaskHandler = (id) => {
    fetch(`${apiUrl}/todos/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          let newList = list.filter((item) => item.id !== id);
          setList(newList);
        }
      })
      .catch((error) => {
        alert("Ocurrio un error al eliminar la tarea, intentelo mas tarde");
      });
  };

  return (
    <div>
      <h1>Lista de tareas</h1>
      <div className="list">
        <ul className="list-group">
          <li className="list-group-item">
            <input
              className="inputTarea"
              type="text"
              placeholder="Agregar Tarea"
              onKeyDownCapture={(e) =>
                e.key === "Enter" ? handleAddTask(e) : null
              }
            ></input>
          </li>

          {list &&
            list.map((item, index) => {
              return (
                <div key={item.id}>
                  <li className="d-flex align-items-center text-start list-group-item tarea">
                    {item.label}
                    <i
                      onClick={() => deleteTaskHandler(item.id)}
                      className="bi bi-x"
                    ></i>
                  </li>
                </div>
              );
            })}
          {list.length === 0 ? (
            <li className="list-group-item">No hay tareas</li>
          ) : (
            <li className="list-group-item">{list.length} Tareas Pendientes</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default List;
