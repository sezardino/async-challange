import { faker } from "@faker-js/faker";

const saveFile = () =>
  new Promise((res, rej) => {
    const timeToResolve = faker.number.int({ min: 1000, max: 3000 });
    const isSuccess = Math.random() > 0.5;
    const message = isSuccess
      ? `Success: ${faker.system.commonFileName()} saved`
      : `Error: ${faker.system.commonFileName()} not saved`;

    setTimeout(() => {
      if (isSuccess) res(message);
      else rej(message);
    }, timeToResolve);
  });

function App() {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-screen w-screen">
      <h1>Async Challange</h1>
      <button className="bg-blue-400" onClick={() => saveFile()}>
        Save File
      </button>
    </div>
  );
}

export default App;
