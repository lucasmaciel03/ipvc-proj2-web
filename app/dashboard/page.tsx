export default function DashboardPage() {
  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        {/* Card de próxima consulta */}
        <div className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 p-6 shadow-sm transition-all hover:shadow-md dark:from-blue-950 dark:to-blue-900">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300">Próxima Consulta</h3>
            <span className="rounded-full bg-blue-200 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-700 dark:text-blue-100">Agendada</span>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </svg>
              <span>30 de Abril, 2025 - 10:30</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>Dr. Marta Santos - Cardiologia</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Hospital Central, Piso 2 - Sala 208</span>
            </div>
          </div>
          <button className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600">
            Ver Detalhes
          </button>
        </div>

        {/* Card de medicamentos */}
        <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 shadow-sm transition-all hover:shadow-md dark:from-emerald-950 dark:to-emerald-900">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-emerald-800 dark:text-emerald-300">Guia Terapêutica</h3>
            <span className="rounded-full bg-emerald-200 px-2 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-700 dark:text-emerald-100">3 em uso</span>
          </div>
          <div className="mt-4 space-y-3">
            <div className="flex flex-col rounded-lg bg-white/70 p-3 shadow-sm dark:bg-black/20">
              <div className="flex justify-between">
                <span className="font-medium">Atorvastatina</span>
                <span className="text-xs text-gray-600 dark:text-gray-300">20mg</span>
              </div>
              <div className="mt-1 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20Z" />
                  <path d="M12 6v6l4 2" />
                </svg>
                1x ao dia - Noite
              </div>
            </div>
            <div className="flex flex-col rounded-lg bg-white/70 p-3 shadow-sm dark:bg-black/20">
              <div className="flex justify-between">
                <span className="font-medium">Losartan</span>
                <span className="text-xs text-gray-600 dark:text-gray-300">50mg</span>
              </div>
              <div className="mt-1 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20Z" />
                  <path d="M12 6v6l4 2" />
                </svg>
                1x ao dia - Manhã
              </div>
            </div>
          </div>
          <button className="mt-4 w-full rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600">
            Ver Todos
          </button>
        </div>

        {/* Card de exames */}
        <div className="rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 p-6 shadow-sm transition-all hover:shadow-md dark:from-purple-950 dark:to-purple-900">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-purple-800 dark:text-purple-300">Exames Recentes</h3>
            <span className="rounded-full bg-purple-200 px-2 py-1 text-xs font-medium text-purple-800 dark:bg-purple-700 dark:text-purple-100">2 novos</span>
          </div>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between rounded-lg bg-white/70 p-3 shadow-sm dark:bg-black/20">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-800">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 dark:text-purple-300">
                    <path d="M14 11h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1" />
                    <path d="M9 12v6" />
                    <path d="M10 9.5a2.5 2.5 0 0 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                    <path d="M3 3h4m14 0h-4" />
                    <path d="M10 20v.01" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Hemograma Completo</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    15/04/2025
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900 dark:text-green-300">
                Disponível
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-white/70 p-3 shadow-sm dark:bg-black/20">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-800">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 dark:text-purple-300">
                    <path d="M2 4v16a2 2 0 0 0 2 2h16" />
                    <path d="m5 12 5 3 5-6 5 9" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Eletrocardiograma</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    20/04/2025
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">
                Pendente
              </span>
            </div>
          </div>
          <button className="mt-4 w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600">
            Ver Histórico
          </button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        {/* Histórico de consultas */}
        <div className="col-span-2 rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
          <h3 className="mb-4 text-lg font-medium">Histórico de Consultas</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 rounded-lg border border-gray-100 p-4 dark:border-gray-700">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="font-medium">Consulta de Cardiologia</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">15/03/2025</p>
                </div>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Dr. João Cardoso</p>
              </div>
              <button className="rounded-md bg-gray-100 px-3 py-1 text-sm hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600">
                Detalhes
              </button>
            </div>

            <div className="flex items-center gap-4 rounded-lg border border-gray-100 p-4 dark:border-gray-700">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m8 2 1.5 1.5" />
                  <path d="M14.5 3.5 16 2" />
                  <path d="M8 22v-7h8v7" />
                  <path d="M12 11V8" />
                  <path d="m7 5.5 5 3 5-3" />
                  <path d="M16 5.5a4 4 0 0 1-8 0" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="font-medium">Check-up Anual</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">20/02/2025</p>
                </div>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Dra. Ana Silva</p>
              </div>
              <button className="rounded-md bg-gray-100 px-3 py-1 text-sm hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600">
                Detalhes
              </button>
            </div>

            <div className="flex items-center gap-4 rounded-lg border border-gray-100 p-4 dark:border-gray-700">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
                  <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
                  <path d="M22 10a4 4 0 0 0-4-4" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="font-medium">Consulta de Otorrino</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">05/01/2025</p>
                </div>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Dr. Paulo Mendes</p>
              </div>
              <button className="rounded-md bg-gray-100 px-3 py-1 text-sm hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600">
                Detalhes
              </button>
            </div>
          </div>
          <button className="mt-4 w-full rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
            Ver Todas as Consultas
          </button>
        </div>

        {/* Informações de saúde */}
        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
          <h3 className="mb-4 text-lg font-medium">Dados Vitais</h3>
          <div className="space-y-4">
            <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Pressão Arterial</span>
                <span className="font-medium">120/80 mmHg</span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-600">
                <div className="h-2 rounded-full bg-green-500 dark:bg-green-400" style={{ width: '70%' }}></div>
              </div>
              <div className="mt-1 flex justify-between text-xs">
                <span className="text-gray-500 dark:text-gray-400">Última medição: 25/04/2025</span>
                <span className="text-green-600 dark:text-green-400">Normal</span>
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Glicemia</span>
                <span className="font-medium">110 mg/dL</span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-600">
                <div className="h-2 rounded-full bg-yellow-500 dark:bg-yellow-400" style={{ width: '60%' }}></div>
              </div>
              <div className="mt-1 flex justify-between text-xs">
                <span className="text-gray-500 dark:text-gray-400">Última medição: 27/04/2025</span>
                <span className="text-yellow-600 dark:text-yellow-400">Atenção</span>
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Colesterol Total</span>
                <span className="font-medium">180 mg/dL</span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-600">
                <div className="h-2 rounded-full bg-blue-500 dark:bg-blue-400" style={{ width: '50%' }}></div>
              </div>
              <div className="mt-1 flex justify-between text-xs">
                <span className="text-gray-500 dark:text-gray-400">Última medição: 15/03/2025</span>
                <span className="text-blue-600 dark:text-blue-400">Bom</span>
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">IMC</span>
                <span className="font-medium">24.5 kg/m²</span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-600">
                <div className="h-2 rounded-full bg-green-500 dark:bg-green-400" style={{ width: '75%' }}></div>
              </div>
              <div className="mt-1 flex justify-between text-xs">
                <span className="text-gray-500 dark:text-gray-400">Última medição: 20/02/2025</span>
                <span className="text-green-600 dark:text-green-400">Normal</span>
              </div>
            </div>

            <button className="mt-2 w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600">
              Registrar Nova Medição
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
