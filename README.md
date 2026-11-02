# 🐾 Puppy AI — Nutrição Clínica WSAVA & Inteligência Canina

Aplicação completa de inteligência nutricional canina e gestão de cuidados para filhotes, desenvolvida com base nas diretrizes globais da **WSAVA** (World Small Animal Veterinary Association) e **FEDIAF**.

---

## 🌟 Funcionalidades Principais

1. **Tela de Boas-Vindas & Onboarding Ágil:**
   - Cadastro completo do filhote: Nome, raça, idade em semanas, peso atual (kg), peso adulto estimado e gênero (macho/fêmea).
   - Perfis de demonstração inclusos (Golden Retriever, Bulldog Francês, Vira-Lata/SRD).
   - Feedback festivo com celebração em confetti.

2. **Suporte Bilíngue Instantâneo (🇧🇷 Português / 🇺🇸 Inglês):**
   - Seletor destacado no cabeçalho com troca de idioma em tempo real sem recarregar a página.

3. **Design Responsivo & Mobile First:**
   - Interface adaptada para celulares, tablets e desktops com navegação por abas e menu retrátil.

4. **Planilha Interativa de Refeições (WSAVA):**
   - Distribuição de porções e calorias dividida nos períodos: **Manhã**, **Tarde** e **Noite**.
   - Cálculo automático do número de refeições diárias e gramatura com base na idade e densidade calórica da ração.
   - **Botão de Exportação em CSV** formatado para Excel e Google Planilhas.
   - **Botão "Imprimir Folha de Geladeira"** com formatação CSS específica para impressão e fixação na cozinha.

5. **Scanner de Rótulo de Ração (AI Food Label Scanner):**
   - Análise centesimal dos níveis de garantia (Proteína Bruta, Gordura, Fibra, Umidade).
   - **Cálculo da Relação Cálcio : Fósforo** com semáforo clínico da WSAVA (Faixa ideal: 1.1:1 a 1.45:1).
   - Auditoria de primeiros ingredientes com badges de qualidade.
   - Detecção de conservantes sintéticos (BHA/BHT) vs. antioxidantes naturais.
   - Botão para sincronizar e aplicar a ração escaneada diretamente à planilha de refeições.

6. **Detector de Raças Caninas:**
   - Identificação fenotípica por foto ou banco de raças pré-cadastradas.
   - Guia de temperamento, peso adulto esperado, demanda de exercícios, tosa e predisposições clínicas.
   - Atualização direta da raça e meta de peso adulto no prontuário do cãozinho.

7. **Tradutor de Latidos & Vocalizações:**
   - Gravador bioacústico com visualizador de onda sonora.
   - Decodificação de emoções (brincadeira, alerta territorial, fome/choro, ansiedade de separação, etc.).
   - Orientações de ação imediata para o tutor e sinais de linguagem corporal correspondentes.

8. **Passaporte Vacinal Completo:**
   - Protocolo WSAVA com distinção de vacinas Essenciais (*Core*) e Complementares (*Non-Core*).
   - Alertas dinâmicos de doses pendentes, atrasadas e concluídas.
   - Registro de data, médico veterinário e número de lote.
   - Impressão de carteira de vacinação.

9. **Calculadora Nutricional WSAVA Clínica:**
   - Cálculo do **RER** (*Resting Energy Requirement*): $RER = 70 \times (\text{Peso kg})^{0.75}$
   - Cálculo do **MER** (*Maintenance Energy Requirement*) com multiplicadores de fase de crescimento.
   - Cálculo de consumo hídrico diário recomendado ($70\text{ ml/kg}$).

10. **Puppy AI Copilot:**
    - Assistente flutuante interativo 24/7 para tirar dúvidas de adestramento, xixi no lugar certo e alimentos tóxicos proibidos.

---

## 🚀 Como Executar

No terminal:

```bash
# Navegar até a pasta do projeto
cd "C:\Users\Acer\.gemini\antigravity\scratch\puppy-ai"

# 1. Instalar dependências (caso não tenham sido instaladas)
npm install

# 2. Iniciar o servidor em desenvolvimento
npm run dev
# ou
npm run start
```

Abra seu navegador em: **[http://localhost:3000](http://localhost:3000)**
