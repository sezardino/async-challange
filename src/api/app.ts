import { faker } from "@faker-js/faker";

export const saveFile = (): Promise<string> =>
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
