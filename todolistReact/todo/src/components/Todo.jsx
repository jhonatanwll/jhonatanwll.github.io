const Todo = ({ todo }) => {
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      <div className="content">
        <p>{todo.text}</p>
        <p className="category">({todo.category})</p>
      </div>
      <div>
        <button className="complete">Completar</button>
        <button className="remove">x</button>
      </div>
    </div>
  );
};
export default Todo;
