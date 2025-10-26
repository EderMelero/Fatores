import React, { useState } from "react";
// Importe seus componentes de UI (shadcn)
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card.jsx";
import { Input } from "@/components/ui/Input.jsx";
import { Label } from "@/components/ui/Label.jsx";
import { Button } from "@/components/ui/Button.jsx";
// Importe os ícones
import { Calculator, Bird } from "lucide-react";
// Importações do gráfico (recharts) foram removidas

export default function CalculadoraPeso() {
  const [pesoInicial, setPesoInicial] = useState("");
  
  // Os fatores padrão continuam aqui, funcionando "escondidos"
  const fatoresMacho = {
    dia4: 2.5,
    dia7: 4.84,
    dia14: 2.57,
    dia21: 1.94,
    dia28: 1.62,
    dia35: 1.44,
    dia42: 1.32
  };

  const fatoresFemea = {
    dia4: 2.5, 
    dia7: 4.86,
    dia14: 2.48,
    dia21: 1.87,
    dia28: 1.57,
    dia35: 1.40,
    dia42: 1.29
  };

  // O estado de resultados agora guarda ambos
  const [resultados, setResultados] = useState({ macho: null, femea: null });

  const calcularPesos = () => {
    if (!pesoInicial || pesoInicial <= 0) {
      return;
    }

    const peso = parseFloat(pesoInicial);
    
    // --- Cálculo para Machos ---
    const pesosMacho = {};
    pesosMacho.dia0 = peso;
    pesosMacho.dia4 = peso * fatoresMacho.dia4;
    pesosMacho.dia7 = peso * fatoresMacho.dia7;
    pesosMacho.dia14 = pesosMacho.dia7 * fatoresMacho.dia14;
    pesosMacho.dia21 = pesosMacho.dia14 * fatoresMacho.dia21;
    pesosMacho.dia28 = pesosMacho.dia21 * fatoresMacho.dia28;
    pesosMacho.dia35 = pesosMacho.dia28 * fatoresMacho.dia35;
    pesosMacho.dia42 = pesosMacho.dia35 * fatoresMacho.dia42;
    
    // --- Cálculo para Fêmeas ---
    const pesosFemea = {};
    pesosFemea.dia0 = peso;
    pesosFemea.dia4 = peso * fatoresFemea.dia4;
    pesosFemea.dia7 = peso * fatoresFemea.dia7;
    pesosFemea.dia14 = pesosFemea.dia7 * fatoresFemea.dia14;
    pesosFemea.dia21 = pesosFemea.dia14 * fatoresFemea.dia21;
    pesosFemea.dia28 = pesosFemea.dia21 * fatoresFemea.dia28;
    pesosFemea.dia35 = pesosFemea.dia28 * fatoresFemea.dia35;
    pesosFemea.dia42 = pesosFemea.dia35 * fatoresFemea.dia42;

    // Salva ambos os resultados no estado
    setResultados({ macho: pesosMacho, femea: pesosFemea });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Bird className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Calculadora de Crescimento
          </h1>
          <p className="text-gray-600 text-lg">
            Calcule o peso esperado dos pintinhos ao longo das semanas
          </p>
        </div>

        {/* Layout principal (vertical) */}
        <div className="space-y-6">
          
          {/* Card de Entrada (Fica no topo) */}
          <Card className="shadow-xl border-none bg-white/80 backdrop-blur">
            <CardHeader className="border-b bg-gradient-to-r from-amber-500 to-orange-500 text-white">
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Dados de Entrada
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              
              <div>
                <Label htmlFor="peso-inicial" className="text-base font-semibold text-gray-700">
                  Peso Inicial do Pintinho (gramas)
                </Label>
                <Input
                  id="peso-inicial"
                  type="number"
                  min="0"
                  step="0.1"
                  value={pesoInicial}
                  onChange={(e) => setPesoInicial(e.target.value)}
                  placeholder="Ex: 45"
                  className="mt-2 text-lg h-12"
                />
              </div>
              
              <Button
                onClick={calcularPesos}
                className="w-full h-12 text-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg"
                disabled={!pesoInicial || pesoInicial <= 0}
              >
                <span className="flex items-center">
                  <Calculator className="w-5 h-5 mr-2" />
                  Calcular Pesos
                </span>
              </Button>
            </CardContent>
          </Card>

          {/* Seção de Resultados (só aparece após calcular) */}
          {resultados.macho ? (
            // Grid para os dois cards de resultado (lado a lado)
            <div className="grid lg:grid-cols-2 gap-6">
              
              {/* Card de Resultados - MACHO */}
              <Card className="shadow-xl border-none bg-white/80 backdrop-blur">
                <CardHeader className="border-b bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Bird className="w-5 h-5" />
                    Resultados - Macho
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {[
                      { label: "Peso Inicial", valor: resultados.macho.dia0, dias: 0 },
                      { label: "4 dias", valor: resultados.macho.dia4, dias: 4 },
                      { label: "7 dias", valor: resultados.macho.dia7, dias: 7 },
                      { label: "14 dias", valor: resultados.macho.dia14, dias: 14 },
                      { label: "21 dias", valor: resultados.macho.dia21, dias: 21 },
                      { label: "28 dias", valor: resultados.macho.dia28, dias: 28 },
                      { label: "35 dias", valor: resultados.macho.dia35, dias: 35 },
                      { label: "42 dias", valor: resultados.macho.dia42, dias: 42 }
                    ].map(({ label, valor, dias }) => (
                      <div
                        key={dias}
                        className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-amber-50 hover:to-orange-50 transition-all duration-200 border border-gray-200"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                            dias === 0 ? "bg-gray-500" : "bg-gradient-to-br from-amber-400 to-orange-500"
                          }`}>
                            {dias}
                          </div>
                          <span className="font-semibold text-gray-700">{label}</span>
                        </div>
                        <div className="text-right">
                          
                          <div className="text-2xl font-bold text-gray-900">
                            {Math.ceil(valor)}g
                          </div>

                          {dias > 0 && (
                            <div className="text-xs text-gray-500">
                              +{((valor / resultados.macho.dia0 - 1) * 100).toFixed(0)}%
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Card de Resultados - FÊMEA */}
              <Card className="shadow-xl border-none bg-white/80 backdrop-blur">
                <CardHeader className="border-b bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Bird className="w-5 h-5" />
                    Resultados - Fêmea
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {[
                      { label: "Peso Inicial", valor: resultados.femea.dia0, dias: 0 },
                      { label: "4 dias", valor: resultados.femea.dia4, dias: 4 },
                      { label: "7 dias", valor: resultados.femea.dia7, dias: 7 },
                      { label: "14 dias", valor: resultados.femea.dia14, dias: 14 },
                      { label: "21 dias", valor: resultados.femea.dia21, dias: 21 },
                      { label: "28 dias", valor: resultados.femea.dia28, dias: 28 },
                      { label: "35 dias", valor: resultados.femea.dia35, dias: 35 },
                      { label: "42 dias", valor: resultados.femea.dia42, dias: 42 }
                    ].map(({ label, valor, dias }) => (
                      <div
                        key={dias}
                        className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-amber-50 hover:to-orange-50 transition-all duration-200 border border-gray-200"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                            dias === 0 ? "bg-gray-500" : "bg-gradient-to-br from-pink-400 to-fuchsia-500"
                          }`}>
                            {dias}
                          </div>
                          <span className="font-semibold text-gray-700">{label}</span>
                        </div>
                        <div className="text-right">
                          
                          <div className="text-2xl font-bold text-gray-900">
                            {Math.ceil(valor)}g
                          </div>
                          
                          {dias > 0 && (
                            <div className="text-xs text-gray-500">
                              +{((valor / resultados.femea.dia0 - 1) * 100).toFixed(0)}%
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            // Placeholder (se nenhum resultado foi calculado ainda)
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <Bird className="w-16 h-16 mb-4 opacity-30" />
              <p className="text-center">
                Insira o peso inicial e clique em<br />
                "Calcular Pesos" para ver os resultados
              </p>
            </div>
          )}
        </div>
        
        {/* --- INÍCIO DO RODAPÉ COM MARCA REGISTRADA --- */}
        <footer className="text-center mt-12 pb-8">
          <p className="text-sm text-gray-500">
            &reg; Éder Melero Júnior
          </p>
        </footer>
        {/* --- FIM DO RODAPÉ --- */}

      </div>
    </div>
  );
}