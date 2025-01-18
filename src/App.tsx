import { faker } from "@faker-js/faker";
import { ReactNode } from "react";
import { SolutionWithUI } from "./components/solutions/with-ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";

const saveFile = (): Promise<string> =>
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

type Solution = {
  id: string;
  label: string;
  description?: string;
  children: ReactNode;
};

const levelOneSolutions: Solution[] = [
];

function App() {
  return (
    <main className="container h-dvh py-4">
      <h1 className="text-xl">Async Challenge</h1>

      <div>
        <h2>Level 1</h2>
        <Tabs defaultValue={levelOneSolutions[0].id} className="w-[500px]">
          <TabsList className="grid w-full grid-cols-2">
            {levelOneSolutions.map((solution) => (
              <TabsTrigger key={solution.id} value="with-ui">
                With UI
              </TabsTrigger>
            ))}
          </TabsList>
          {levelOneSolutions.map((solution) => (
            <TabsContent value={solution.id}>
              <Card>
                <CardHeader>
                  <CardTitle>{solution.label}</CardTitle>
                  <CardDescription>{solution.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {solution.children}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </main>
  );
}

export default App;
