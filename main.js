/*
 * ---
 * Projeto: Gerador de Boilerplate Web Básico (CLI)
 * Descrição: Uma ferramenta de linha de comando que cria uma estrutura de pastas e 
 *            arquivos inicial para um projeto web simples (HTML, CSS, JS).
 *            Ele cria uma pasta com o nome do projeto e dentro dela os arquivos:
 *            - index.html (com estrutura básica)
 *            - style.css (com um reset simples)
 *            - script.js (com um console.log inicial)
 *
 * Bibliotecas necessárias: Nenhuma. Utiliza apenas os módulos nativos do Node.js ('fs' e 'path').
 * Como executar: node main.js <nome-do-projeto>
 * Exemplo: node main.js meu-novo-site
 * ---
 */

const fs = require('fs');
const path = require('path');

/**
 * Conteúdo boilerplate para o arquivo index.html.
 * @param {string} projectName - O nome do projeto para usar no título.
 * @returns {string} - O conteúdo HTML.
 */
const getHtmlContent = (projectName) => `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectName}</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Olá, mundo! Bem-vindo ao projeto ${projectName}.</h1>
    
    <script src="script.js"></script>
</body>
</html>`;

/**
 * Conteúdo boilerplate para o arquivo style.css.
 * Inclui um mini CSS reset.
 * @returns {string} - O conteúdo CSS.
 */
const getCssContent = () => `/* CSS Reset Básico */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    line-height: 1.6;
    background-color: #f4f4f4;
    color: #333;
    padding: 20px;
}

h1 {
    color: #0056b3;
}`;

/**
 * Conteúdo boilerplate para o arquivo script.js.
 * @returns {string} - O conteúdo JavaScript.
 */
const getJsContent = () => `console.log("JavaScript carregado com sucesso!");

// Comece a codificar sua mágica aqui!
`;

/**
 * Função principal que orquestra a criação do projeto.
 * @param {string} projectName - O nome do projeto a ser criado.
 */
function createProject(projectName) {
    // Define o caminho do diretório do projeto
    const projectPath = path.join(process.cwd(), projectName);

    // 1. Verifica se o diretório já existe
    if (fs.existsSync(projectPath)) {
        console.error(`\x1b[31mErro: O diretório "${projectName}" já existe.\x1b[0m`);
        process.exit(1);
    }

    try {
        // 2. Cria o diretório do projeto
        fs.mkdirSync(projectPath);
        console.log(`\x1b[32m✔ Diretório "${projectName}" criado.\x1b[0m`);

        // 3. Define os arquivos a serem criados com seu respectivo conteúdo
        const filesToCreate = {
            'index.html': getHtmlContent(projectName),
            'style.css': getCssContent(),
            'script.js': getJsContent()
        };

        // 4. Itera e cria cada arquivo
        for (const [fileName, content] of Object.entries(filesToCreate)) {
            const filePath = path.join(projectPath, fileName);
            fs.writeFileSync(filePath, content);
            console.log(`\x1b[32m✔ Arquivo "${fileName}" criado.\x1b[0m`);
        }

        // 5. Exibe mensagem final de sucesso
        console.log(`\n\x1b[1m\x1b[34m🚀 Projeto "${projectName}" gerado com sucesso!\x1b[0m`);
        console.log(`\nPara começar, execute:`);
        console.log(`  cd ${projectName}`);

    } catch (error) {
        console.error(`\x1b[31mOcorreu um erro ao criar o projeto: ${error.message}\x1b[0m`);
        process.exit(1);
    }
}

// ---- Ponto de Entrada do Script ----
// Verifica se o script está sendo executado diretamente
if (require.main === module) {
    // Pega os argumentos da linha de comando, ignorando 'node' e o nome do arquivo
    const args = process.argv.slice(2);

    if (args.length !== 1) {
        console.log("\x1b[33mUso incorreto.\x1b[0m");
        console.log("Por favor, forneça o nome do projeto.");
        console.log("Exemplo: \x1b[36mnode main.js meu-novo-site\x1b[0m");
        process.exit(1);
    }

    const projectName = args[0];
    createProject(projectName);
}
