import { useEffect, useMemo, useState, type FormEvent } from "react";
import { MainLayout } from "@/presentation/layouts/MainLayout";
import { FormField, formInputClass } from "@/presentation/components/ui/FormField";
import { SectionHeading } from "@/presentation/components/common/SectionHeading";
import type { City } from "@/domain/entities/City";
import type { Contribution, ContributionType } from "@/domain/entities/Contribution";
import type { ContentCategory } from "@/domain/entities/ContentCategory";
import { CONTRIBUTION_TYPE_LABELS } from "@/shared/constants/contributionLabels";
import { CONTENT_CATEGORY_LABELS } from "@/shared/constants/contentCategoryLabels";
import { cityRepository, contributionRepository } from "@/infrastructure/config/repositories";
import { wikimediaImage } from "@/shared/utils/wikimedia";
import { useAuth } from "@/presentation/contexts/AuthContext";
import { getFullName } from "@/shared/utils/userDisplay";

const OTHER_PLACE_ID = "autre";

const HOW_IT_WORKS = [
  {
    title: "Partagez votre contenu",
    description:
      "Texte, photo, vidéo, audio ou témoignage : racontez ce que vous savez.",
  },
  {
    title: "Nos modérateurs vérifient",
    description:
      "Chaque contribution est relue avant publication pour garantir sa fiabilité.",
  },
  {
    title: "Publication publique",
    description:
      "Une fois validée, votre contribution rejoint les collections de Culture+ Bénin.",
  },
];

interface SelectedFile {
  name: string;
  previewUrl: string | null;
}

export function ContributePage() {
  const { user, openLogin } = useAuth();
  const [cities, setCities] = useState<City[]>([]);

  const [authorName, setAuthorName] = useState(user ? getFullName(user) : "");
  const [contentType, setContentType] = useState<ContributionType>("historical_text");
  const [cityId, setCityId] = useState<string>("");
  const [category, setCategory] = useState<ContentCategory>("history_kingdoms");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<SelectedFile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [submittedTitle, setSubmittedTitle] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    cityRepository.getAll().then((result) => {
      if (!cancelled) {
        setCities(result);
        setCityId(result[0]?.id ?? "");
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const cityOptions = useMemo(
    () => [...cities.map((c) => ({ id: c.id, name: c.name })), { id: OTHER_PLACE_ID, name: "Autre lieu au Bénin" }],
    [cities],
  );

  const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files ?? []);
    setFiles(
      selected.map((file) => ({
        name: file.name,
        previewUrl: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
      })),
    );
  };

  const resetForm = () => {
    setAuthorName(user ? getFullName(user) : "");
    setContentType("historical_text");
    setCityId(cities[0]?.id ?? "");
    setCategory("history_kingdoms");
    setTitle("");
    setDescription("");
    setFiles([]);
    setError(null);
    setSubmittedTitle(null);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!authorName.trim() || !title.trim() || !description.trim()) {
      setError("Merci de renseigner au moins l'auteur, un titre et une description.");
      return;
    }
    setError(null);

    const contribution: Omit<Contribution, "id" | "status" | "submittedAt"> = {
      authorId: user?.id ?? "anonyme",
      authorName: authorName.trim(),
      type: contentType,
      cityId,
      category,
      title: title.trim(),
      description: description.trim(),
      attachmentUrls: files.map((f) => f.previewUrl).filter((url): url is string => Boolean(url)),
    };

    await contributionRepository.create(contribution);
    setSubmittedTitle(title.trim());
  };

  return (
    <MainLayout>
      <main className="animate-[fadeUp_0.4s_ease_both]">
        <div className="mx-auto max-w-7xl px-4 py-10 pb-[72px] sm:px-6">
          <SectionHeading kicker="Transmission du savoir" title="Contribuer au patrimoine" />

          {!user && (
            <div className="mt-8 max-w-[560px] overflow-hidden rounded-[18px] border border-gray-200 bg-white">
              <img
                src={wikimediaImage("Vodoun party in Benin.jpg", 1600)}
                alt="Cérémonie vodoun"
                className="h-[140px] w-full object-cover sm:h-[180px]"
              />
              <div className="flex flex-col gap-3 p-6 sm:p-8">
                <span className="font-display text-2xl font-semibold text-culture-ink">
                  Connectez-vous pour contribuer
                </span>
                <span className="text-[14px] leading-relaxed text-gray-500">
                  Textes historiques, images, vidéos, audios, témoignages —
                  chaque contribution est relue par nos modérateurs avant
                  publication.
                </span>
                <button
                  type="button"
                  onClick={openLogin}
                  className="mt-2 self-start rounded-full bg-culture-green px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-culture-green-dark"
                >
                  Se connecter
                </button>
              </div>
            </div>
          )}

          {user && submittedTitle && (
            <div className="mt-8 flex max-w-[560px] flex-col items-center gap-3 rounded-[18px] border border-gray-200 bg-white p-6 text-center sm:p-10">
              <span className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-culture-green text-[22px] text-white">
                ✓
              </span>
              <span className="font-display text-[26px] font-semibold text-culture-green">
                Merci pour votre contribution
              </span>
              <span className="max-w-[400px] text-[14.5px] leading-relaxed text-gray-500">
                « {submittedTitle} » est en cours de modération. Retrouvez son
                statut dans votre profil.
              </span>
              <button
                type="button"
                onClick={resetForm}
                className="mt-2 rounded-full border border-gray-300 px-6 py-2.5 text-[13.5px] font-semibold text-culture-green transition-colors duration-200 hover:bg-gray-50"
              >
                Nouvelle contribution
              </button>
            </div>
          )}

          {user && !submittedTitle && (
            <div className="mt-8 grid grid-cols-1 gap-[22px] lg:grid-cols-[1.2fr_0.8fr]">
              <form
                onSubmit={handleSubmit}
                noValidate
                className="order-2 flex flex-col gap-5 rounded-[18px] border border-gray-200 bg-white p-5 sm:p-8 lg:order-none"
              >
                <FormField label="Auteur">
                  <input
                    value={authorName}
                    onChange={(event) => setAuthorName(event.target.value)}
                    placeholder="Ex. Aïcha Dossou"
                    className={formInputClass}
                  />
                </FormField>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField label="Type de contenu">
                    <select
                      value={contentType}
                      onChange={(event) => setContentType(event.target.value as ContributionType)}
                      className={formInputClass}
                    >
                      {Object.entries(CONTRIBUTION_TYPE_LABELS).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </FormField>
                  <FormField label="Lieu concerné">
                    <select
                      value={cityId}
                      onChange={(event) => setCityId(event.target.value)}
                      className={formInputClass}
                    >
                      {cityOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </FormField>
                </div>

                <FormField label="Catégorie culturelle">
                  <select
                    value={category}
                    onChange={(event) => setCategory(event.target.value as ContentCategory)}
                    className={formInputClass}
                  >
                    {Object.entries(CONTENT_CATEGORY_LABELS).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField label="Titre">
                  <input
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Ex. Chant traditionnel de la pêche acadja"
                    className={formInputClass}
                  />
                </FormField>

                <FormField label="Description / récit">
                  <textarea
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    rows={5}
                    placeholder="Racontez l'histoire, le contexte, la source…"
                    className={`${formInputClass} resize-y leading-relaxed`}
                  />
                </FormField>

                <label className="flex cursor-pointer flex-col items-center gap-1 rounded-xl border-[1.5px] border-dashed border-gray-300 bg-gray-50 p-6 text-center transition-colors hover:border-culture-green">
                  <span className="text-sm font-semibold text-culture-green">
                    Glissez vos fichiers multimédias ici
                  </span>
                  <span className="text-[12.5px] text-gray-500">
                    Images, vidéos, audios ou documents · 50 Mo max
                  </span>
                  <input
                    type="file"
                    multiple
                    onChange={handleFilesChange}
                    className="hidden"
                  />
                </label>

                {files.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {files.map((file) => (
                      <span
                        key={file.name}
                        className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-[12.5px] text-gray-600"
                      >
                        {file.previewUrl && (
                          <img
                            src={file.previewUrl}
                            alt=""
                            className="h-5 w-5 rounded-full object-cover"
                          />
                        )}
                        {file.name}
                      </span>
                    ))}
                  </div>
                )}

                {error && <p className="text-[13px] text-culture-terracotta">{error}</p>}

                <button
                  type="submit"
                  className="w-full rounded-full bg-culture-green py-3.5 text-center text-[14.5px] font-semibold text-white transition-colors duration-200 hover:bg-culture-green-dark"
                >
                  Soumettre pour modération
                </button>
              </form>

              <div className="order-1 flex flex-col gap-4 lg:order-none lg:h-full">
                <div className="relative h-[200px] overflow-hidden rounded-[18px] sm:h-[280px]">
                  <img
                    src={wikimediaImage("Arène de Ouidah Photo.jpg", 1600)}
                    alt="Arène de Ouidah"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
                  <div className="absolute bottom-[14px] left-[18px] font-display text-[17px] font-medium leading-tight text-white">
                    Chaque témoignage enrichit
                    <br />
                    la mémoire collective.
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-5 rounded-[18px] border border-gray-200 bg-gray-50 p-5 sm:p-7">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">
                    Comment ça marche
                  </span>
                  {HOW_IT_WORKS.map((step, index) => (
                    <div key={step.title} className="flex items-start gap-3.5">
                      <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-culture-green text-[13px] font-bold text-white">
                        {index + 1}
                      </span>
                      <span className="flex flex-col gap-0.5">
                        <span className="text-sm font-semibold text-culture-ink">
                          {step.title}
                        </span>
                        <span className="text-[13px] leading-relaxed text-gray-500">
                          {step.description}
                        </span>
                      </span>
                    </div>
                  ))}
                  <p className="border-t border-gray-200 pt-4 text-[12.5px] leading-relaxed text-gray-500">
                    Les contenus validés sont publiés avec le nom du
                    contributeur et rejoignent les collections publiques de
                    Culture+ Bénin.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </MainLayout>
  );
}
