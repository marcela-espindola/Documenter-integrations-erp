import { ERPIntegration } from "@/data/erpIntegrations";
import {
  CheckCircle2, AlertTriangle, Info, Mail, Phone,
  MessageCircle, ArrowRight, ExternalLink
} from "lucide-react";

interface DocContentProps {
  erp: ERPIntegration;
  activeSection: string;
}

export const DocContent = ({ erp, activeSection }: DocContentProps) => {
  return (
    <div className="animate-in fade-in duration-300">
      {activeSection === "introduction" && <IntroSection erp={erp} />}
      {activeSection === "benefits" && <BenefitsSection erp={erp} />}
      {activeSection === "getting-started" && <GettingStartedSection erp={erp} />}
      {activeSection === "how-it-works" && <HowItWorksSection erp={erp} />}
      {activeSection === "fields" && <FieldsSection erp={erp} />}
      {activeSection === "erp-config" && <ErpConfigSection erp={erp} />}
      {activeSection === "idea-config" && <IdeaConfigSection erp={erp} />}
      {activeSection === "usage" && <UsageSection erp={erp} />}
      {activeSection === "create-products" && <CreateProductsSection erp={erp} />}
      {activeSection === "visualization" && <VisualizationSection erp={erp} />}
    </div>
  );
};

const IntroSection = ({ erp }: { erp: ERPIntegration }) => (
  <div className="doc-section">
    <div className="flex items-center gap-3 mb-2">
      <span className="doc-erp-badge">{erp.version}</span>
    </div>
    <h1 className="doc-heading-1">Integração Audaces IDEA e {erp.name}</h1>
    <p className="doc-paragraph text-lg">{erp.description}</p>
    <div className="h-px bg-border my-8" />
    <h2 className="doc-heading-2">1. Introdução</h2>
    <p className="doc-paragraph">{erp.introduction}</p>
    <p className="doc-paragraph">Com esta solução, sua empresa poderá:</p>
    <ul className="doc-list">
      <li>Acelerar o desenvolvimento de produtos.</li>
      <li>Reduzir erros de comunicação entre áreas.</li>
      <li>Melhorar a precisão no controle de custos e processos.</li>
    </ul>
  </div>
);

const BenefitsSection = ({ erp }: { erp: ERPIntegration }) => (
  <div className="doc-section">
    <h1 className="doc-heading-1">2. Benefícios comerciais da integração</h1>

    <div className="grid gap-6 md:grid-cols-2 mt-6">
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="doc-heading-3 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle2 size={14} className="text-primary" />
          </span>
          Para sua equipe
        </h3>
        <ul className="space-y-3 mt-4">
          {erp.benefits.team.map((b, i) => (
            <li key={i} className="flex gap-2 text-sm text-muted-foreground">
              <ArrowRight size={16} className="text-primary shrink-0 mt-0.5" />
              {b}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="doc-heading-3 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle2 size={14} className="text-primary" />
          </span>
          Para sua empresa
        </h3>
        <ul className="space-y-3 mt-4">
          {erp.benefits.company.map((b, i) => (
            <li key={i} className="flex gap-2 text-sm text-muted-foreground">
              <ArrowRight size={16} className="text-primary shrink-0 mt-0.5" />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const GettingStartedSection = ({ erp }: { erp: ERPIntegration }) => (
  <div className="doc-section">
    <h1 className="doc-heading-1">3. Iniciando a integração</h1>

    <div className="grid gap-6 md:grid-cols-2 mt-6">
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="doc-heading-3">Contato {erp.name}</h3>
        <p className="doc-paragraph text-sm mb-4">
          Entre em contato com a {erp.name} para realizar o orçamento da liberação do serviço de integração.
        </p>
        <div className="space-y-2">
          {erp.contact.erp.name && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ExternalLink size={14} /> {erp.contact.erp.name}
            </div>
          )}
          {erp.contact.erp.email && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail size={14} /> {erp.contact.erp.email}
            </div>
          )}
          {erp.contact.erp.phone && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone size={14} /> {erp.contact.erp.phone}
            </div>
          )}
          {erp.contact.erp.whatsapp && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MessageCircle size={14} /> {erp.contact.erp.whatsapp}
            </div>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="doc-heading-3">Contato Audaces</h3>
        <p className="doc-paragraph text-sm mb-4">
          Para sanar dúvidas sobre como funciona a integração por parte da Audaces:
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ExternalLink size={14} /> {erp.contact.audaces.name}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail size={14} /> {erp.contact.audaces.email}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const HowItWorksSection = ({ erp }: { erp: ERPIntegration }) => (
  <div className="doc-section">
    <h1 className="doc-heading-1">4. Funcionamento da integração</h1>
    <p className="doc-paragraph">
      Aqui você encontrará todos os detalhes sobre a integração, incluindo uma visão completa das propriedades de cada item integrado.
    </p>

    <h2 className="doc-heading-2 mt-8">4.1. Detalhes da integração</h2>

    <div className="rounded-xl border border-border bg-card p-6 mb-6">
      <h3 className="doc-heading-3 flex items-center gap-2 mb-4">
        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-primary/10 text-primary">IMPORTAÇÃO</span>
        ERP → Audaces IDEA
      </h3>
      <p className="doc-paragraph text-sm">{erp.integrationDetails.description}</p>
      <ul className="space-y-2">
        {erp.integrationDetails.importFeatures.map((f, i) => (
          <li key={i} className="flex gap-2 text-sm text-muted-foreground">
            <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
            {f}
          </li>
        ))}
      </ul>
    </div>

    <div className="rounded-xl border border-border bg-card p-6 mb-6">
      <h3 className="doc-heading-3 flex items-center gap-2 mb-4">
        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-primary/10 text-primary">EXPORTAÇÃO</span>
        Audaces IDEA → ERP
      </h3>
      <p className="doc-paragraph text-sm">{erp.integrationDetails.exportDescription}</p>
      <ul className="space-y-2">
        {erp.integrationDetails.exportFeatures.map((f, i) => (
          <li key={i} className="flex gap-2 text-sm text-muted-foreground">
            <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
            {f}
          </li>
        ))}
      </ul>
    </div>

    <div className="doc-callout-warning">
      <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
        <AlertTriangle size={16} /> Notas Importantes
      </h4>
      <ul className="space-y-2">
        {erp.integrationDetails.notes.map((n, i) => (
          <li key={i} className="text-sm">{n}</li>
        ))}
      </ul>
    </div>
  </div>
);

const FieldsSection = ({ erp }: { erp: ERPIntegration }) => (
  <div className="doc-section">
    <h1 className="doc-heading-1">4.2. Campos integrados</h1>
    <p className="doc-paragraph">
      A seguir, serão exibidas as propriedades que serão integradas entre as plataformas Audaces IDEA e o {erp.name}.
    </p>

    <div className="overflow-x-auto">
      <table className="doc-table">
        <thead>
          <tr>
            {erp.integratedFields.columns.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: Math.max(...erp.integratedFields.columns.map(col => (erp.integratedFields.data[col] || []).length)) }).map((_, rowIdx) => (
            <tr key={rowIdx}>
              {erp.integratedFields.columns.map((col) => (
                <td key={col}>
                  {(erp.integratedFields.data[col] || [])[rowIdx] || ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="doc-callout-info">
      <div className="flex items-start gap-2">
        <Info size={16} className="shrink-0 mt-0.5" />
        <p className="text-sm">{erp.integratedFields.note}</p>
      </div>
    </div>
  </div>
);

const ErpConfigSection = ({ erp }: { erp: ERPIntegration }) => {
  if (!erp.erpConfiguration) return null;

  return (
    <div className="doc-section">
      <h1 className="doc-heading-1">{erp.erpConfiguration.title}</h1>
      <p className="doc-paragraph">
        Para que a integração seja bem-sucedida, é necessário configurar tanto o seu servidor ERP quanto o Audaces IDEA.
      </p>

      {erp.erpConfiguration.steps.map((step, i) => (
        <div key={i} className="mb-8">
          <div className="flex items-start gap-3 mb-4">
            <div className="doc-step-number">{i + 1}</div>
            <div>
              <h3 className="doc-heading-3">{step.title}</h3>
              <p className="doc-paragraph text-sm">{step.content}</p>
            </div>
          </div>

          {step.substeps && (
            <div className="ml-11 space-y-2">
              {step.substeps.map((sub, j) => (
                <div key={j} className="flex gap-2 text-sm text-muted-foreground">
                  <span className="text-primary font-mono text-xs mt-1">{j + 1}.</span>
                  <span className={sub.includes('/api/') || sub.includes(':\\') ? 'doc-code-block my-0 py-2 px-3 flex-1' : ''}>
                    {sub}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <div className="doc-callout-warning">
        <div className="flex items-start gap-2">
          <AlertTriangle size={16} className="shrink-0 mt-0.5" />
          <p className="text-sm">
            É fundamental que todas as configurações sejam realizadas corretamente. A ausência de qualquer configuração pode impactar diretamente o funcionamento da integração.
          </p>
        </div>
      </div>
    </div>
  );
};

const IdeaConfigSection = ({ erp }: { erp: ERPIntegration }) => (
  <div className="doc-section">
    <h1 className="doc-heading-1">Configurando o Audaces IDEA</h1>
    <p className="doc-paragraph">
      Com o servidor devidamente configurado, agora é o momento de ajustar o Audaces IDEA e ativar a integração!
    </p>

    <h2 className="doc-heading-2 mt-6">Configurar endereço e porta</h2>
    <p className="doc-paragraph">
      Para usar a integração, é preciso configurar o endereço e a porta da API fornecida pelo seu ERP.
    </p>

    <div className="space-y-4 mt-6">
      {erp.ideaConfiguration.steps.map((step, i) => (
        <div key={i} className="doc-step">
          <div className="doc-step-number">{i + 1}</div>
          <div>
            <h4 className="font-semibold text-foreground text-sm mb-1">{step.title}</h4>
            <p className="text-sm text-muted-foreground">{step.content}</p>
          </div>
        </div>
      ))}
    </div>

    <div className="doc-callout-success mt-6">
      <div className="flex items-start gap-2">
        <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
        <p className="text-sm">
          Pronto! O Audaces IDEA está configurado para promover a integração com o seu sistema ERP.
        </p>
      </div>
    </div>

    <div className="doc-callout-info mt-4">
      <div className="flex items-start gap-2">
        <Info size={16} className="shrink-0 mt-0.5" />
        <p className="text-sm">
          Caso o menu "ERP" não seja exibido, execute o aplicativo Audaces 360 como "Administrador" e reinicie o Audaces IDEA.
        </p>
      </div>
    </div>
  </div>
);

const UsageSection = ({ erp }: { erp: ERPIntegration }) => (
  <div className="doc-section">
    <h1 className="doc-heading-1">Iniciando o uso da integração</h1>
    <p className="doc-paragraph">
      Após realizar todas as configurações entre o Audaces Idea e o seu ERP, você pode buscar informações dele para compor a sua ficha técnica.
    </p>

    {/* Insert Model */}
    <h2 className="doc-heading-2 mt-8">Inserir modelo base</h2>
    <p className="doc-paragraph text-sm">
      O Audaces Idea permite importar uma referência de um modelo do seu ERP para usar junto com a Ficha Modelo. O sistema vai mesclar as informações, preenchendo os campos no Editor de Propriedades com os dados do modelo importado.
    </p>
    <div className="space-y-3 mt-4">
      {erp.usage.insertModel.map((step, i) => (
        <div key={i} className="doc-step">
          <div className="doc-step-number text-xs">{i + 1}</div>
          <p className="text-sm text-muted-foreground">{step}</p>
        </div>
      ))}
    </div>

    <div className="doc-callout-warning mt-6">
      <div className="flex items-start gap-2">
        <AlertTriangle size={16} className="shrink-0 mt-0.5" />
        <p className="text-sm">
          Se você adicionar um outro modelo com "inserir como modelo principal", o sistema alertará que o novo modelo irá sobrescrever o que já está na ficha.
        </p>
      </div>
    </div>

    {/* Configure Variant */}
    <h2 className="doc-heading-2 mt-8">Configurando variante</h2>
    <p className="doc-paragraph text-sm">{erp.usage.configureVariant}</p>

    {/* Insert Variant */}
    <h2 className="doc-heading-2 mt-8">Inserir variante</h2>
    <div className="space-y-3 mt-4">
      {erp.usage.insertVariant.map((step, i) => (
        <div key={i} className="doc-step">
          <div className="doc-step-number text-xs">{i + 1}</div>
          <p className="text-sm text-muted-foreground">{step}</p>
        </div>
      ))}
    </div>

    {/* Insert Reference */}
    <h2 className="doc-heading-2 mt-8">Inserir referência</h2>
    <p className="doc-paragraph text-sm">{erp.usage.insertReference.description}</p>
    <p className="doc-paragraph text-sm">
      O Login deverá ser feito toda primeira vez ao dia que acessar o ERP ou quando a conexão for interrompida.
    </p>

    <h3 className="doc-heading-3 mt-4">Categorias disponíveis</h3>
    <div className="overflow-x-auto mb-4">
      <table className="doc-table">
        <thead>
          <tr>
            <th>Categoria</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {erp.usage.insertReference.categories.map((cat) => (
            <tr key={cat.key}>
              <td className="font-medium">{cat.key}</td>
              <td>{cat.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <h3 className="doc-heading-3 mt-4">Passos para inserir referência</h3>
    <div className="space-y-3 mt-4">
      {erp.usage.insertReference.steps.map((step, i) => (
        <div key={i} className="doc-step">
          <div className="doc-step-number text-xs">{i + 1}</div>
          <p className="text-sm text-muted-foreground">{step}</p>
        </div>
      ))}
    </div>

    <div className="doc-callout-info mt-4">
      <div className="flex items-start gap-2">
        <Info size={16} className="shrink-0 mt-0.5" />
        <div className="text-sm space-y-1">
          {erp.usage.insertReference.searchInstructions.map((inst, i) => (
            <p key={i}>{inst}</p>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const CreateProductsSection = ({ erp }: { erp: ERPIntegration }) => (
  <div className="doc-section">
    <h1 className="doc-heading-1">Criar e atualizar produtos</h1>
    <p className="doc-paragraph">
      Após importar os dados de consumo para o Audaces IDEA, siga os passos abaixo para cadastrar um novo produto no {erp.name} diretamente do Audaces IDEA.
    </p>

    <h2 className="doc-heading-2 mt-6">Criar ficha</h2>
    <div className="space-y-3 mt-4">
      {erp.createProducts.create.map((step, i) => (
        <div key={i} className="doc-step">
          <div className="doc-step-number text-xs">{i + 1}</div>
          <p className="text-sm text-muted-foreground">{step}</p>
        </div>
      ))}
    </div>

    <div className="doc-callout-warning mt-4">
      <div className="flex items-start gap-2">
        <AlertTriangle size={16} className="shrink-0 mt-0.5" />
        <p className="text-sm">
          É importante salvar o arquivo .ideax localmente em sua pasta de trabalho para que ele seja alterado ou reutilizado. Referências locais não serão enviadas para o ERP.
        </p>
      </div>
    </div>

    {erp.createProducts.update && (
      <>
        <h2 className="doc-heading-2 mt-8">Atualizar ficha</h2>
        <div className="space-y-3 mt-4">
          {erp.createProducts.update.map((step, i) => (
            <div key={i} className="doc-step">
              <div className="doc-step-number text-xs">{i + 1}</div>
              <p className="text-sm text-muted-foreground">{step}</p>
            </div>
          ))}
        </div>

        <div className="doc-callout-warning mt-4">
          <div className="flex items-start gap-2">
            <AlertTriangle size={16} className="shrink-0 mt-0.5" />
            <p className="text-sm">
              Sempre que realizar uma atualização, o modelo e a ficha técnica no ERP serão atualizados por completo. Finalize todo o desenvolvimento antes de enviar ao ERP.
            </p>
          </div>
        </div>
      </>
    )}
  </div>
);

const VisualizationSection = ({ erp }: { erp: ERPIntegration }) => (
  <div className="doc-section">
    <h1 className="doc-heading-1">{erp.visualization.title}</h1>
    <p className="doc-paragraph">
      Agora que sua ficha técnica do Audaces Idea foi enviada para o ERP, descubra como acessar e visualizar os dados diretamente no {erp.name} de forma rápida e prática!
    </p>

    <div className="space-y-4 mt-6">
      {erp.visualization.sections.map((section, i) => (
        <div key={i} className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-semibold text-foreground text-sm mb-2 flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
              {i + 1}
            </span>
            {section.title}
          </h3>
          <p className="text-sm text-muted-foreground pl-8">{section.description}</p>
        </div>
      ))}
    </div>
  </div>
);
