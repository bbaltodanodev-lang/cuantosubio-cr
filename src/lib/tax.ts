export type TaxScenarioId = "general" | "cbt" | "exempt";

export type TaxScenario = {
  id: TaxScenarioId;
  label: string;
  shortLabel: string;
  rate: number;
  note: string;
};

export const TAX_SCENARIOS: TaxScenario[] = [
  {
    id: "general",
    label: "IVA general",
    shortLabel: "13%",
    rate: 0.13,
    note: "Escenario general para una comparación matemática.",
  },
  {
    id: "cbt",
    label: "Canasta tributaria (si aplica)",
    shortLabel: "1%",
    rate: 0.01,
    note: "Solo aplica si el bien y su presentación están en la lista oficial.",
  },
  {
    id: "exempt",
    label: "Exento de IVA",
    shortLabel: "0%",
    rate: 0,
    note: "Escenario para bienes legalmente exentos.",
  },
];

export const TAX_SOURCE_LINKS = {
  hacienda: "https://www.hacienda.go.cr/docs/TarifasdelIVA.pdf",
  legalList: "https://www.pgrweb.go.cr/DOCS/NORMAS/1/VIGENTE/S/2020-2029/2020-2024/2024/18CE0/1672DD.HTML",
  inecBasket: "https://admin.inec.cr/node/57477",
  inecMethodology: "https://solicitudesinfo.inec.cr/portal/es/kb/articles/06-tema-canasta-b-sica-alimentaria",
} as const;

export function getTaxScenario(id: TaxScenarioId): TaxScenario {
  return TAX_SCENARIOS.find((scenario) => scenario.id === id) ?? TAX_SCENARIOS[0];
}

/**
 * Splits a published, tax-included amount into an estimated base and tax.
 * CRC prices are displayed as whole colones, so the rounded base absorbs the
 * rounding difference and the three values always add up to the published price.
 */
export function splitTaxIncludedPrice(gross: number, scenarioId: TaxScenarioId) {
  const scenario = getTaxScenario(scenarioId);
  const net = scenario.rate === 0 ? Math.round(gross) : Math.round(gross / (1 + scenario.rate));
  const tax = Math.max(0, Math.round(gross) - net);
  return { gross: Math.round(gross), net, tax, scenario };
}
