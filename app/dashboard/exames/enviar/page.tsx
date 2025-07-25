import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FileUp, Upload } from "lucide-react";

export default function EnviarExamesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Enviar Exames</h1>
        <p className="text-sm text-muted-foreground">
          Envie seus resultados de exames para análise médica
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <form className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="tipo-exame" className="text-sm font-medium">
                  Tipo de Exame
                </label>
                <Select>
                  <SelectTrigger id="tipo-exame" className="w-full">
                    <SelectValue placeholder="Selecione o tipo de exame" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sangue">Análises de Sangue</SelectItem>
                    <SelectItem value="raio-x">Raio-X</SelectItem>
                    <SelectItem value="tomografia">Tomografia</SelectItem>
                    <SelectItem value="ultrassom">Ultrassom</SelectItem>
                    <SelectItem value="ressonancia">
                      Ressonância Magnética
                    </SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="data-exame" className="text-sm font-medium">
                  Data do Exame
                </label>
                <Input id="data-exame" type="date" className="w-full" />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="medico" className="text-sm font-medium">
                  Médico Solicitante
                </label>
                <Select>
                  <SelectTrigger id="medico" className="w-full">
                    <SelectValue placeholder="Selecione o médico" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dr-antonio">
                      Dr. António Silva
                    </SelectItem>
                    <SelectItem value="dra-maria">Dra. Maria Costa</SelectItem>
                    <SelectItem value="dr-jose">Dr. José Santos</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="local" className="text-sm font-medium">
                  Local de Realização
                </label>
                <Input
                  id="local"
                  placeholder="Ex: Hospital São João"
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="descricao" className="text-sm font-medium">
                Descrição ou Observações
              </label>
              <Textarea
                id="descricao"
                placeholder="Adicione informações relevantes sobre o exame..."
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium">Arquivos do Exame</label>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="arquivo-exame"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/40 hover:bg-muted/60"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FileUp className="w-8 h-8 mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Clique para enviar ou arraste arquivos
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PDF, JPG, PNG (max. 10MB)
                      </p>
                    </div>
                    <Input id="arquivo-exame" type="file" className="hidden" />
                  </label>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-sm font-medium mb-2">
                    Arquivos Enviados
                  </h4>
                  <div className="text-sm text-muted-foreground italic">
                    Nenhum arquivo enviado
                  </div>
                  {/* Simulação de como ficariam os arquivos após upload */}
                  {/* 
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2">
                        <FileUp className="w-4 h-4" />
                        <span>resultado.pdf</span>
                      </div>
                      <Button variant="ghost" size="sm">X</Button>
                    </div>
                  </div>
                  */}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancelar</Button>
              <Button type="submit" className="gap-1">
                <Upload className="w-4 h-4" />
                Enviar Exame
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
