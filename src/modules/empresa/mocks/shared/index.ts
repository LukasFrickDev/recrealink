import { stageMessages } from "@/shared/constants/stageMessages";

export interface EmpresaBaseIdentity {
  areaLabel: string;
  userName: string;
}

export interface EmpresaPageStatItem {
  title: string;
  value: string;
  helper: string;
}

export interface EmpresaUnderConstructionPageMock extends EmpresaBaseIdentity {
  title: string;
  description: string;
  stats: EmpresaPageStatItem[];
  subtitle: string;
  message: string;
}

export const empresaBaseIdentity: EmpresaBaseIdentity = {
  areaLabel: "Empresário",
  userName: "Marina Costa",
};

export const empresaProfileIdentity: EmpresaBaseIdentity = {
  areaLabel: "Área da empresa",
  userName: "Marina Costa",
};

const buildEmpresaStageStat = (value: string): EmpresaPageStatItem => ({
  title: "Etapa",
  value,
  helper: stageMessages.noBackend,
});

export const buildEmpresaUnderConstructionPageMock = (
  payload: Omit<EmpresaUnderConstructionPageMock, "areaLabel" | "userName" | "stats"> & {
    stats: EmpresaPageStatItem[];
    stageValue?: string;
  },
): EmpresaUnderConstructionPageMock => {
  const { stageValue = "Navegação", stats, ...rest } = payload;

  return {
    ...empresaBaseIdentity,
    ...rest,
    stats: [...stats, buildEmpresaStageStat(stageValue)],
  };
};
