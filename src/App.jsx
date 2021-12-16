import "./App.css";

const App = () => {
  const screenToShow = () => {
    return (
      <div className="landing h-full">
        <h1>Welcome to 🍪DAO</h1>
      </div>
    );
  };

  return <div>{screenToShow()}</div>;
};

export default App;
