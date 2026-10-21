
const formulario = document.getElementById("formulario");
const campoCep = document.getElementById("cep");
const mensagem = document.getElementById("mensagem");
const resultado = document.getElementById("resultado");

async function buscarCEP(cep) {
    mensagem.textContent = "";
    resultado.hidden = true;

    try {
        if (cep.length !== 8) {
            throw new Error("CEP inválido");
        }

        const resposta = await fetch(
            `https://viacep.com.br/ws/${cep}/json/`
        );

        if (!resposta.ok) {
            throw new Error("Erro na requisição");
        }

        const dados = await resposta.json();

        if (dados.erro) {
            throw new Error("CEP não encontrado");
        }

        document.getElementById("rua").textContent =
            dados.logradouro || "Não informado";

        document.getElementById("bairro").textContent =
            dados.bairro || "Não informado";

        document.getElementById("cidade").textContent =
            dados.localidade || "Não informado";

        document.getElementById("estado").textContent =
            dados.uf || "Não informado";

        resultado.hidden = false;
        mensagem.textContent = "Endereço encontrado com sucesso!";
    } catch (erro) {
        mensagem.textContent =
            "Não foi possível buscar o CEP. Confira o número e tente novamente.";
    }
}

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const cep = campoCep.value.replace(/\D/g, "");

    buscarCEP(cep);
});
