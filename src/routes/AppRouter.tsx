import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import type { ReactElement } from "react";
import { HomePage } from "@/modules/institutional/pages/home/index";
import { LoginPage } from "@/modules/access/pages/entrar/index";
import { RegisterPage } from "@/modules/access/pages/cadastro/index";
import { ForgotPasswordPage } from "@/modules/access/pages/recuperar-senha/index";
import { ChooseProfilePage } from "@/modules/access/pages/escolher-perfil/index";
import { RecreadorDashboardPage } from "@/modules/recreador/pages/dashboard/index";
import { RecreadorSupportPage } from "@/modules/recreador/pages/suporte/index";
import { RecreadorConfiguracoesPage } from "@/modules/recreador/pages/configuracoes/index";
import { RecreadorPerfilPage } from "@/modules/recreador/pages/perfil/index";
import { RecreadorPerfilPublicoPage } from "@/modules/recreador/pages/perfil-publico/index";
import { RecreadorDisponibilidadePage } from "@/modules/recreador/pages/disponibilidade/index";
import { RecreadorOportunidadesPage } from "@/modules/recreador/pages/oportunidades/index";
import { RecreadorConvitesPage } from "@/modules/recreador/pages/convites/index";
import { RecreadorChecklistPage } from "@/modules/recreador/pages/checklist/index";
import { HotelariaDashboardPage } from "@/modules/hotelaria/pages/dashboard/index";
import { HotelariaPerfilPage } from "@/modules/hotelaria/pages/perfil/index";
import { HotelariaHotelPage } from "@/modules/hotelaria/pages/hotel/index";
import { HotelariaEscalasPage } from "@/modules/hotelaria/pages/escalas/index";
import { HotelariaRecreadoresPage } from "@/modules/hotelaria/pages/recreadores/index";
import { HotelariaVagasPage } from "@/modules/hotelaria/pages/vagas/index";
import { HotelariaProgramacoesPage } from "@/modules/hotelaria/pages/programacoes/index";
import { HotelariaFeedbackPage } from "@/modules/hotelaria/pages/feedback/index";
import { HotelariaIndicadoresPage } from "@/modules/hotelaria/pages/indicadores/index";
import { HotelariaRelatoriosPage } from "@/modules/hotelaria/pages/relatorios/index";
import { HotelariaOrcamentoPage } from "@/modules/hotelaria/pages/orcamento/index";
import { HotelariaOcorrenciasPage } from "@/modules/hotelaria/pages/ocorrencias/index";
import { HotelariaConfiguracoesPage } from "@/modules/hotelaria/pages/configuracoes/index";
import { EmpresarioDashboardPage } from "@/modules/empresa/pages/dashboard/index";
import { EmpresarioEmpresaPage } from "@/modules/empresa/pages/perfil-empresa/index";
import { EmpresarioOrcamentosPage } from "@/modules/empresa/pages/orcamentos/index";
import { EmpresarioAgendaPage } from "@/modules/empresa/pages/agenda/index";
import { EmpresarioEquipePage } from "@/modules/empresa/pages/equipe/index";
import { EmpresarioVagasPage } from "@/modules/empresa/pages/vagas/index";
import { EmpresarioServicosPage } from "@/modules/empresa/pages/servicos/index";
import { EmpresarioGaleriaPage } from "@/modules/empresa/pages/galeria/index";
import { EmpresarioDepoimentosPage } from "@/modules/empresa/pages/depoimentos/index";
import { EmpresarioFinancasPage } from "@/modules/empresa/pages/financas/index";
import { EmpresarioRecreadorPage } from "@/modules/empresa/pages/perfil-recreador/index";
import { EmpresarioSettingsPage } from "@/modules/empresa/pages/configuracoes/index";
import { PaisDashboardPage } from "@/modules/pais/pages/dashboard/index";
import { PaisEmpresasPage } from "@/modules/pais/pages/empresas/index";
import { PaisFavoritosPage } from "@/modules/pais/pages/favoritos/index";
import { PaisMapaPage } from "@/modules/pais/pages/mapa/index";
import { PaisAgendaPage } from "@/modules/pais/pages/agenda/index";
import { PaisHistoricoPage } from "@/modules/pais/pages/historico/index";
import { PaisAvaliacoesPage } from "@/modules/pais/pages/avaliacoes/index";
import { PaisPerfilPage } from "@/modules/pais/pages/perfil/index";
import { PaisSettingsPage } from "@/modules/pais/pages/configuracoes/index";
import { UnifiedChatPage } from "@/shared/pages/UnifiedChatPage";
import { UnifiedNotificationsPage } from "@/shared/pages/UnifiedNotificationsPage";
import { UnifiedCommunityPage } from "@/shared/pages/UnifiedCommunityPage";
import { useAppSelector } from "@/app/store/hooks";
import * as S from "./AppRouter.styles";

const NotFoundPage = () => (
	<S.NotFoundWrapper>
		<h1>404</h1>
		<p>Página não encontrada.</p>
		<a href="/">Voltar para início</a>
	</S.NotFoundWrapper>
);

const AccessProfileGuard = ({ children }: { children: ReactElement }) => {
	const selectedAccessProfile = useAppSelector((state) => state.profile.selectedAccessProfile);

	if (!selectedAccessProfile) {
		return <Navigate to="/acesso/escolher-perfil" replace />;
	}

	return children;
};

export const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/auth" element={<Navigate to="/acesso/escolher-perfil" replace />} />
				<Route path="/acesso" element={<Navigate to="/acesso/escolher-perfil" replace />} />

				<Route
					path="/acesso/entrar"
					element={
						<AccessProfileGuard>
							<LoginPage />
						</AccessProfileGuard>
					}
				/>
				<Route
					path="/acesso/cadastro"
					element={
						<AccessProfileGuard>
							<RegisterPage />
						</AccessProfileGuard>
					}
				/>
				<Route
					path="/acesso/recuperar-senha"
					element={
						<AccessProfileGuard>
							<ForgotPasswordPage />
						</AccessProfileGuard>
					}
				/>
				<Route path="/acesso/escolher-perfil" element={<ChooseProfilePage />} />

				<Route path="/app/recreador" element={<RecreadorDashboardPage />} />
				<Route path="/app/recreador/dashboard" element={<Navigate to="/app/recreador" replace />} />
				<Route path="/app/recreador/perfil" element={<RecreadorPerfilPage />} />
				<Route path="/app/recreador/perfil-publico" element={<RecreadorPerfilPublicoPage />} />
				<Route path="/app/recreador/disponibilidade" element={<RecreadorDisponibilidadePage />} />
				<Route path="/app/recreador/oportunidades" element={<RecreadorOportunidadesPage />} />
				<Route path="/app/recreador/convites" element={<RecreadorConvitesPage />} />
				<Route path="/app/recreador/checklist" element={<RecreadorChecklistPage />} />
				<Route path="/app/recreador/suporte" element={<RecreadorSupportPage />} />
		
				<Route path="/app/recreador/comunidade" element={<UnifiedCommunityPage moduleKey="recreador" />} />
				<Route path="/app/recreador/community" element={<Navigate to="/app/recreador/comunidade" replace />} />
				<Route path="/app/recreador/chat" element={<UnifiedChatPage moduleKey="recreador" />} />
				<Route path="/app/recreador/notificacoes" element={<UnifiedNotificationsPage moduleKey="recreador" />} />
				<Route path="/app/recreador/notifications" element={<Navigate to="/app/recreador/notificacoes" replace />} />
				<Route path="/app/recreador/configuracoes" element={<RecreadorConfiguracoesPage />} />
				<Route path="/app/recreador/settings" element={<Navigate to="/app/recreador/configuracoes" replace />} />


				<Route path="/app/hotelaria" element={<HotelariaDashboardPage />} />
				<Route path="/app/hotelaria/dashboard" element={<Navigate to="/app/hotelaria" replace />} />
				<Route path="/app/hotelaria/perfil" element={<HotelariaPerfilPage />} />
				<Route path="/app/hotelaria/hotel" element={<HotelariaHotelPage />} />
				<Route path="/app/hotelaria/meu-hotel" element={<Navigate to="/app/hotelaria/hotel" replace />} />
				<Route path="/app/hotelaria/escalas" element={<HotelariaEscalasPage />} />
				<Route path="/app/hotelaria/recreadores" element={<HotelariaRecreadoresPage />} />
				<Route path="/app/hotelaria/vagas" element={<HotelariaVagasPage />} />
				<Route path="/app/hotelaria/programacoes" element={<HotelariaProgramacoesPage />} />
				<Route path="/app/hotelaria/feedback" element={<HotelariaFeedbackPage />} />
				<Route path="/app/hotelaria/feedback-recreadores" element={<Navigate to="/app/hotelaria/feedback" replace />} />
				<Route path="/app/hotelaria/indicadores" element={<HotelariaIndicadoresPage />} />
				<Route path="/app/hotelaria/relatorios" element={<HotelariaRelatoriosPage />} />
				<Route path="/app/hotelaria/orcamento" element={<HotelariaOrcamentoPage />} />
				<Route path="/app/hotelaria/ocorrencias" element={<HotelariaOcorrenciasPage />} />
				<Route path="/app/hotelaria/comunidade" element={<UnifiedCommunityPage moduleKey="hotelaria" />} />
				<Route path="/app/hotelaria/community" element={<Navigate to="/app/hotelaria/comunidade" replace />} />
				<Route path="/app/hotelaria/chat" element={<UnifiedChatPage moduleKey="hotelaria" />} />
				<Route path="/app/hotelaria/notificacoes" element={<UnifiedNotificationsPage moduleKey="hotelaria" />} />
				<Route path="/app/hotelaria/notifications" element={<Navigate to="/app/hotelaria/notificacoes" replace />} />
				<Route path="/app/hotelaria/configuracoes" element={<HotelariaConfiguracoesPage />} />
				<Route path="/app/hotelaria/settings" element={<Navigate to="/app/hotelaria/configuracoes" replace />} />

				<Route path="/app/empresa" element={<EmpresarioDashboardPage />} />
				<Route path="/app/empresa/dashboard" element={<Navigate to="/app/empresa" replace />} />
				<Route path="/app/empresa/empresa" element={<Navigate to="/app/empresa/perfil" replace />} />
				<Route path="/app/empresa/perfil-empresa" element={<Navigate to="/app/empresa/perfil" replace />} />
				<Route path="/app/empresa/perfil" element={<EmpresarioEmpresaPage />} />
				<Route path="/app/empresa/orcamentos" element={<EmpresarioOrcamentosPage />} />
				<Route path="/app/empresa/agenda" element={<EmpresarioAgendaPage />} />
				<Route path="/app/empresa/equipe" element={<EmpresarioEquipePage />} />
				<Route path="/app/empresa/vagas" element={<EmpresarioVagasPage />} />
				<Route path="/app/empresa/servicos" element={<EmpresarioServicosPage />} />
				<Route path="/app/empresa/galeria" element={<EmpresarioGaleriaPage />} />
				<Route path="/app/empresa/depoimentos" element={<EmpresarioDepoimentosPage />} />
				<Route path="/app/empresa/financas" element={<EmpresarioFinancasPage />} />
				<Route path="/app/empresa/recreador" element={<EmpresarioRecreadorPage />} />
				<Route path="/app/empresa/comunidade" element={<UnifiedCommunityPage moduleKey="empresa" />} />
				<Route path="/app/empresa/community" element={<Navigate to="/app/empresa/comunidade" replace />} />
				<Route path="/app/empresa/chat" element={<UnifiedChatPage moduleKey="empresa" />} />
				<Route path="/app/empresa/notificacoes" element={<UnifiedNotificationsPage moduleKey="empresa" />} />
				<Route path="/app/empresa/notifications" element={<Navigate to="/app/empresa/notificacoes" replace />} />
				<Route path="/app/empresa/configuracoes" element={<EmpresarioSettingsPage />} />
				<Route path="/app/empresa/settings" element={<Navigate to="/app/empresa/configuracoes" replace />} />

				<Route path="/app/pais" element={<PaisDashboardPage />} />
				<Route path="/app/pais/dashboard" element={<Navigate to="/app/pais" replace />} />
				<Route path="/app/pais/empresas" element={<PaisEmpresasPage />} />
				<Route path="/app/pais/favoritos" element={<PaisFavoritosPage />} />
				<Route path="/app/pais/mapa" element={<PaisMapaPage />} />
				<Route path="/app/pais/agenda" element={<PaisAgendaPage />} />
				<Route path="/app/pais/historico" element={<PaisHistoricoPage />} />
				<Route path="/app/pais/avaliacoes" element={<PaisAvaliacoesPage />} />
				<Route path="/app/pais/perfil" element={<PaisPerfilPage />} />
				<Route path="/app/pais/comunidade" element={<UnifiedCommunityPage moduleKey="pais" />} />
				<Route path="/app/pais/community" element={<Navigate to="/app/pais/comunidade" replace />} />
				<Route path="/app/pais/chat" element={<UnifiedChatPage moduleKey="pais" />} />
				<Route path="/app/pais/notificacoes" element={<UnifiedNotificationsPage moduleKey="pais" />} />
				<Route path="/app/pais/notifications" element={<Navigate to="/app/pais/notificacoes" replace />} />
				<Route path="/app/pais/configuracoes" element={<PaisSettingsPage />} />
				<Route path="/app/pais/settings" element={<Navigate to="/app/pais/configuracoes" replace />} />



				<Route path="/404" element={<NotFoundPage />} />
				<Route path="*" element={<Navigate to="/404" replace />} />
			</Routes>
		</BrowserRouter>
	);
};
