import React, { useEffect, useState } from "react";

const List = () => {
  const [list, setList] = useState([]);

  const handleAddTask = (event) => {
    let task = event.target.value;
    if (list.includes(task)) {
      alert("La tarea ya existe");
    } else if (task !== "") {
      setList([...list, task]);
      event.target.value = "";
    } else {
      alert("No se puede agregar una tarea vacía");
    }
  };

  const deleteTaskHandler = (index) => {
    let newList = list.filter((item, i) => i !== index);
    setList(newList);
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
                <div>
                  <li
                    className="d-flex align-items-center text-start list-group-item tarea"
                    key={index}
                  >
                    {list[index]}
                    <i
                      onClick={() => deleteTaskHandler(index)}
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
