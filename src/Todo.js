import "./index.css"

function Todo() {
  return (
    <div >
        <form className="form1">
            <label>Title:
                <input type="text" />
            </label>
        </form>
        <form className="form2">
            <label>Description:
                <input type="text" />
            </label>
        </form>
      </div>
  );
}

export default Todo;