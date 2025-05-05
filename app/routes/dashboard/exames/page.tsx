import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function ExamesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Exames Médicos</h1>
        <p className="text-sm text-muted-foreground">
          Visualize e gerencie seus exames médicos
        </p>
      </div>
      
      <Tabs defaultValue="pendentes" className="w-full">
        <TabsList>
          <TabsTrigger value="pendentes">Pendentes</TabsTrigger>
          <TabsTrigger value="realizados">Realizados</TabsTrigger>
          <TabsTrigger value="todos">Todos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pendentes" className="space-y-4">
          <ScrollArea className="h-[calc(100vh-250px)]">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <Card key={`pending-${i}`}>
                  <CardHeader>
                    <CardTitle>Exame de Sangue</CardTitle>
                    <CardDescription>Pendente • Agendado para 15/05/2025</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Laboratório: Hospital São João
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Médico: Dr. António Silva
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">Ver Detalhes</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="realizados" className="space-y-4">
          <ScrollArea className="h-[calc(100vh-250px)]">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(5)].map((_, i) => (
                <Card key={`completed-${i}`}>
                  <CardHeader>
                    <CardTitle>{i % 2 === 0 ? "Raio-X Tórax" : "Análises Clínicas"}</CardTitle>
                    <CardDescription>Realizado • {i % 2 === 0 ? "10/03/2025" : "22/02/2025"}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Laboratório: {i % 2 === 0 ? "Hospital Central" : "Clínica Saúde"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Médico: {i % 2 === 0 ? "Dra. Maria Costa" : "Dr. José Santos"}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Ver Resultados</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="todos" className="space-y-4">
          <ScrollArea className="h-[calc(100vh-250px)]">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(8)].map((_, i) => (
                <Card key={`all-${i}`}>
                  <CardHeader>
                    <CardTitle>
                      {i % 4 === 0 ? "Raio-X Tórax" : 
                       i % 3 === 0 ? "Exame de Sangue" : 
                       i % 2 === 0 ? "Tomografia" : "Análises Clínicas"}
                    </CardTitle>
                    <CardDescription>
                      {i < 3 ? "Pendente • Agendado" : "Realizado"} • 
                      {i < 3 ? ` ${15+i}/05/2025` : ` ${10-i}/03/2025`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Laboratório: {i % 3 === 0 ? "Hospital São João" : 
                                    i % 2 === 0 ? "Hospital Central" : "Clínica Saúde"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Médico: {i % 3 === 0 ? "Dra. Maria Costa" : 
                               i % 2 === 0 ? "Dr. António Silva" : "Dr. José Santos"}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant={i < 3 ? "outline" : "default"}
                      className="w-full"
                    >
                      {i < 3 ? "Ver Detalhes" : "Ver Resultados"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}