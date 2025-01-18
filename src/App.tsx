import { faker } from "@faker-js/faker";
import { ReactNode } from "react";
import { SolutionWithToast } from "./components/solutions/with-toast";
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
  {
    id: "with-ui",
    label: "With UI",
    description:
      "Simple solution with usage of use state and extra jsx for statuses",
    children: <SolutionWithUI onSave={saveFile} />,
  },
  {
    id: "with-toast",
    label: "With Toast",
    description:
      "Like previous, but for status used toast (looks better, no ui shift)",
    children: <SolutionWithToast onSave={saveFile} />,
  },
];

function App() {
  return (
    <main className="container h-dvh py-4">
      <h1 className="text-xl">Async Challenge</h1>

      <div>
        <h2>Level 1</h2>
        <Tabs defaultValue={levelOneSolutions[0].id} className="w-[500px]">
          <TabsList className="grid w-full grid-cols-2 gap-2">
            {levelOneSolutions.map((solution) => (
              <TabsTrigger key={solution.id} value={solution.id}>
                {solution.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {levelOneSolutions.map((solution) => (
            <TabsContent asChild key={solution.id} value={solution.id}>
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
