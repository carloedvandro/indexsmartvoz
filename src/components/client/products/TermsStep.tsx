export function TermsStep() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Termos e condições</h2>
        <p className="text-gray-600">
          Leia e aceite os termos antes de finalizar seu pedido
        </p>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-600 space-y-4">
          <p>
            Ao prosseguir, você concorda com os termos de uso e política de privacidade.
          </p>
          <p>
            A ativação das linhas está sujeita à análise e aprovação.
          </p>
        </div>
      </div>
    </div>
  );
}