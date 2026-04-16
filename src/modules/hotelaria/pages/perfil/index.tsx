import { useMemo, useState } from "react";
import { Camera, Plus, Save, X } from "lucide-react";
import { HotelariaDashboardShell } from "@/modules/hotelaria/layout/HotelariaDashboardShell";
import { Badge, Card, Input, SectionHeader, Select } from "@/shared/ui";
import { hotelariaPerfilMock, type HotelariaProfileModel } from "@/modules/hotelaria/mocks/perfil";
import * as S from "./styles";

export const HotelariaPerfilPage = () => {
  const [profile, setProfile] = useState<HotelariaProfileModel>(hotelariaPerfilMock.profile);
  const [draft, setDraft] = useState<HotelariaProfileModel>(hotelariaPerfilMock.profile);
  const [isEditing, setIsEditing] = useState(false);
  const [specialtyDraft, setSpecialtyDraft] = useState(hotelariaPerfilMock.specialtyOptions[0]);

  const bioWordCount = useMemo(() => {
    const content = draft.bio.trim();
    return content ? content.split(/\s+/).length : 0;
  }, [draft.bio]);

  const startEdit = () => {
    setDraft(profile);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setDraft(profile);
    setIsEditing(false);
  };

  const saveEdit = () => {
    setProfile(draft);
    setIsEditing(false);
  };

  const updateField = <Key extends keyof HotelariaProfileModel>(field: Key, value: HotelariaProfileModel[Key]) => {
    setDraft((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const addSpecialty = () => {
    if (!specialtyDraft) {
      return;
    }

    if (draft.specialties.includes(specialtyDraft)) {
      return;
    }

    updateField("specialties", [...draft.specialties, specialtyDraft]);
  };

  const removeSpecialty = (specialty: string) => {
    updateField(
      "specialties",
      draft.specialties.filter((item) => item !== specialty),
    );
  };

  return (
    <HotelariaDashboardShell
      userName={hotelariaPerfilMock.userName}
      pageTitle={hotelariaPerfilMock.title}
      pageDescription={hotelariaPerfilMock.description}
      stats={hotelariaPerfilMock.stats}
    >
      <S.Wrapper>
        <S.HeaderCard>
          <S.HeaderMain>
            <S.AvatarArea>
              <S.AvatarCircle>{profile.fullName.slice(0, 2).toUpperCase()}</S.AvatarCircle>
              <S.AvatarMeta>
                <strong>{profile.fullName}</strong>
                <p>{profile.role}</p>
                <small>{profile.profilePhotoHint}</small>
              </S.AvatarMeta>
            </S.AvatarArea>

            <S.ActionGroup>
              {isEditing ? (
                <>
                  <S.SecondaryButton type="button" onClick={cancelEdit}>
                    <X size={14} />
                    Cancelar
                  </S.SecondaryButton>
                  <S.PrimaryButton type="button" onClick={saveEdit}>
                    <Save size={14} />
                    Salvar
                  </S.PrimaryButton>
                </>
              ) : (
                <>
                  <S.SecondaryButton type="button">
                    <Camera size={14} />
                    Atualizar foto
                  </S.SecondaryButton>
                  <S.PrimaryButton type="button" onClick={startEdit}>
                    Editar perfil
                  </S.PrimaryButton>
                </>
              )}
            </S.ActionGroup>
          </S.HeaderMain>

          <S.HeaderBadges>
            <Badge tone="brand">{profile.hotelName}</Badge>
            <Badge tone="neutral">
              {profile.city} - {profile.state}
            </Badge>
            <Badge tone="success">{profile.experience} de experiência</Badge>
          </S.HeaderBadges>
        </S.HeaderCard>

        <SectionHeader
          title="Dados profissionais"
          subtitle="Estrutura em blocos para dados principais, contato, bio, especialidades e certificações."
        />

        <S.Grid>
          <Card title="Identificação" subtitle="Nome, cargo e hotel de atuação">
            <S.FieldGrid>
              <Input
                label="Nome completo"
                value={draft.fullName}
                disabled={!isEditing}
                onChange={(event) => updateField("fullName", event.target.value)}
              />
              <Input
                label="Cargo"
                value={draft.role}
                disabled={!isEditing}
                onChange={(event) => updateField("role", event.target.value)}
              />
              <Input
                label="Hotel"
                value={draft.hotelName}
                disabled={!isEditing}
                onChange={(event) => updateField("hotelName", event.target.value)}
              />
            </S.FieldGrid>
          </Card>

          <Card title="Localização e experiência" subtitle="Cidade, estado e tempo de experiência">
            <S.FieldGrid>
              <Input
                label="Cidade"
                value={draft.city}
                disabled={!isEditing}
                onChange={(event) => updateField("city", event.target.value)}
              />
              <Select
                label="Estado"
                value={draft.state}
                disabled={!isEditing}
                onChange={(event) => updateField("state", event.target.value)}
                options={[
                  { value: "SP", label: "SP" },
                  { value: "RJ", label: "RJ" },
                  { value: "MG", label: "MG" },
                  { value: "BA", label: "BA" },
                  { value: "PR", label: "PR" },
                  { value: "SC", label: "SC" },
                ]}
              />
              <Input
                label="Tempo de experiência"
                value={draft.experience}
                disabled={!isEditing}
                onChange={(event) => updateField("experience", event.target.value)}
              />
            </S.FieldGrid>
          </Card>

          <Card title="Contato" subtitle="Canais oficiais da contratante">
            <S.FieldGrid>
              <Input
                label="Email"
                value={draft.email}
                disabled={!isEditing}
                onChange={(event) => updateField("email", event.target.value)}
              />
              <Input
                label="Telefone"
                value={draft.phone}
                disabled={!isEditing}
                onChange={(event) => updateField("phone", event.target.value)}
              />
              <Input
                label="Website"
                value={draft.website}
                disabled={!isEditing}
                onChange={(event) => updateField("website", event.target.value)}
              />
            </S.FieldGrid>
          </Card>

          <Card title="Resumo profissional" subtitle="Bio principal e posicionamento da operação">
            <S.BioField>
              <textarea
                value={draft.bio}
                disabled={!isEditing}
                onChange={(event) => updateField("bio", event.target.value)}
              />
              <small>{bioWordCount} palavras</small>
            </S.BioField>
          </Card>
        </S.Grid>

        <Card title="Especialidades" subtitle="Etiquetas para busca rápida e matching operacional">
          <S.SpecialtyPanel>
            <S.SpecialtyRow>
              {draft.specialties.map((specialty) => (
                <S.SpecialtyChip key={specialty}>
                  {specialty}
                  {isEditing ? (
                    <button type="button" aria-label={`Remover ${specialty}`} onClick={() => removeSpecialty(specialty)}>
                      <X size={11} />
                    </button>
                  ) : null}
                </S.SpecialtyChip>
              ))}
            </S.SpecialtyRow>

            {isEditing ? (
              <S.AddSpecialtyRow>
                <Select
                  value={specialtyDraft}
                  onChange={(event) => setSpecialtyDraft(event.target.value)}
                  options={hotelariaPerfilMock.specialtyOptions.map((item) => ({ value: item, label: item }))}
                />
                <S.SecondaryButton type="button" onClick={addSpecialty}>
                  <Plus size={14} />
                  Adicionar
                </S.SecondaryButton>
              </S.AddSpecialtyRow>
            ) : null}
          </S.SpecialtyPanel>
        </Card>

        <Card title="Certificações" subtitle="Formações relevantes para a liderança da área">
          <S.CertificationList>
            {draft.certifications.map((certification) => (
              <S.CertificationItem key={`${certification.title}-${certification.date}`}>
                <div>
                  <strong>{certification.title}</strong>
                  <p>{certification.issuer}</p>
                </div>
                <Badge tone="brand">{certification.date}</Badge>
              </S.CertificationItem>
            ))}
          </S.CertificationList>
        </Card>

        <Card title="Recado fixo" subtitle="Mensagem oficial para toda a equipe da hotelaria">
          <S.Notice>{hotelariaPerfilMock.fixedNotice}</S.Notice>
        </Card>
      </S.Wrapper>
    </HotelariaDashboardShell>
  );
};