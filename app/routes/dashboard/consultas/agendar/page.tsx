import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, Clock, MoveRight } from "lucide-react"

export default function AgendarConsultaPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Agendar Consulta</h1>
        <p className="text-sm text-muted-foreground">
          Marque uma consulta com um dos nossos especialistas
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <form className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="especialidade" className="text-sm font-medium">
                  Especialidade
                </label>
                <Select>
                  <SelectTrigger id="especialidade">
                    <SelectValue placeholder="Selecione uma especialidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clinica-geral">Clínica Geral</SelectItem>
                    <SelectItem value="cardiologia">Cardiologia</SelectItem>
                    <SelectItem value="dermatologia">Dermatologia</SelectItem>
                    <SelectItem value="neurologia">Neurologia</SelectItem>
                    <SelectItem value="ortopedia">Ortopedia</SelectItem>
                    <SelectItem value="pediatria">Pediatria</SelectItem>
                    <SelectItem value="psiquiatria">Psiquiatria</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="medico" className="text-sm font-medium">
                  Médico
                </label>
                <Select>
                  <SelectTrigger id="medico">
                    <SelectValue placeholder="Selecione um médico" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dr-antonio">Dr. António Silva</SelectItem>
                    <SelectItem value="dra-maria">Dra. Maria Costa</SelectItem>
                    <SelectItem value="dr-jose">Dr. José Santos</SelectItem>
                    <SelectItem value="dra-ana">Dra. Ana Ferreira</SelectItem>
                    <SelectItem value="dr-carlos">Dr. Carlos Oliveira</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="data" className="text-sm font-medium">
                  Data da Consulta
                </label>
                <div className="relative">
                  <Input
                    id="data"
                    type="date"
                    className="w-full"
                  />
                  <CalendarIcon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="hora" className="text-sm font-medium">
                  Hora da Consulta
                </label>
                <div className="relative">
                  <Select>
                    <SelectTrigger id="hora">
                      <SelectValue placeholder="Selecione um horário" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="09:00">09:00</SelectItem>
                      <SelectItem value="09:30">09:30</SelectItem>
                      <SelectItem value="10:00">10:00</SelectItem>
                      <SelectItem value="10:30">10:30</SelectItem>
                      <SelectItem value="11:00">11:00</SelectItem>
                      <SelectItem value="11:30">11:30</SelectItem>
                      <SelectItem value="14:00">14:00</SelectItem>
                      <SelectItem value="14:30">14:30</SelectItem>
                      <SelectItem value="15:00">15:00</SelectItem>
                      <SelectItem value="15:30">15:30</SelectItem>
                      <SelectItem value="16:00">16:00</SelectItem>
                      <SelectItem value="16:30">16:30</SelectItem>
                    </SelectContent>
                  </Select>
                  <Clock className="absolute right-8 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="tipo-consulta" className="text-sm font-medium">
                Tipo de Consulta
              </label>
              <Select>
                <SelectTrigger id="tipo-consulta">
                  <SelectValue placeholder="Selecione o tipo de consulta" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="primeira">Primeira Consulta</SelectItem>
                  <SelectItem value="retorno">Consulta de Retorno</SelectItem>
                  <SelectItem value="urgencia">Consulta de Urgência</SelectItem>
                  <SelectItem value="exame">Avaliação de Exames</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="motivo" className="text-sm font-medium">
                Motivo da Consulta
              </label>
              <Textarea 
                id="motivo"
                placeholder="Descreva brevemente o motivo da consulta e seus sintomas..."
                className="min-h-[100px]"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Preferência de Contato
              </label>
              <div className="grid gap-2 grid-cols-2">
                <label className="flex items-center space-x-2">
                  <Input type="radio" name="contacto" value="telefone" />
                  <span className="text-sm">Telefone</span>
                </label>
                <label className="flex items-center space-x-2">
                  <Input type="radio" name="contacto" value="email" />
                  <span className="text-sm">Email</span>
                </label>
                <label className="flex items-center space-x-2">
                  <Input type="radio" name="contacto" value="sms" />
                  <span className="text-sm">SMS</span>
                </label>
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancelar</Button>
              <Button type="submit" className="gap-2">
                Agendar Consulta
                <MoveRight className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}