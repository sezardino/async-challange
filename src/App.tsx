import { ReactNode } from "react";
import { saveFile } from "./api/app";
import { SolutionWithTanstack } from "./components/solutions/level-one/with-tanstack";
import { SolutionWithToast } from "./components/solutions/level-one/with-toast";
import { SolutionWithUI } from "./components/solutions/level-one/with-ui";
import { LevelTwoSolution } from "./components/solutions/level-two/solution";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { cn } from "./lib/utils";

type Solution = {
  id: string;
  label: string;
  description?: string;
  children: ReactNode;
};

const levelOneSolutions: Solution[] = [
  {
    id: "ui",
    label: "With UI",
    description:
      "Simple solution with usage of use state and extra jsx for statuses",
    children: <SolutionWithUI onSave={saveFile} />,
  },
  {
    id: "toast",
    label: "With Toast",
    description:
      "Like previous, but for status used toast (looks better, no ui shift)",
    children: <SolutionWithToast onSave={saveFile} />,
  },
  {
    id: "tanstack",
    label: "With Tanstack",
    description: "Lib like tanstack can do everything for us",
    children: <SolutionWithTanstack />,
  },
];

function App() {
  return (
    <main className="container h-dvh py-4">
      <h1 className="text-xl">Async Challenge</h1>

      <div className="mt-10">
        <h2>Level 1</h2>
        <Tabs defaultValue={levelOneSolutions[0].id}>
          <TabsList className={cn(`grid w-full grid-cols-3 gap-2`)}>
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

      <Card className="mt-10">
        <CardHeader>
          <CardTitle>Level 2</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <LevelTwoSolution />
        </CardContent>
      </Card>
    </main>
  );
}

export default App;
