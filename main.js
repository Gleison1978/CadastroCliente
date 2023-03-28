Parse.initialize("bzLGc4fofExp1Y7EXeeN3U9HveSHOAV7QVLB07wL", "naCCg1KKQpFhwGkwvuMlOQbaLDqDeJzDZcAKTs36");
Parse.serverURL = "https://parseapi.back4app.com/";

const Cliente = Parse.Object.extend("Cliente");
let clienteSelecionado;

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const endereco = document.getElementById("endereco").value;
  const telefone = document.getElementById("telefone").value;

  if (clienteSelecionado) {
    clienteSelecionado.set("nome", nome);
    clienteSelecionado.set("endereco", endereco);
    clienteSelecionado.set("telefone", telefone);

    clienteSelecionado.save().then((cliente) => {
      alert(`Cliente com ID ${cliente.id} atualizado com sucesso`);
      clienteSelecionado = null;
    }, (error) => {
      alert(`Erro ao atualizar cliente: ${error.message}`);
    });
  } else {
    const cliente = new Cliente();
    cliente.set("nome", nome);
    cliente.set("endereco", endereco);
    cliente.set("telefone", telefone);

    cliente.save().then((cliente) => {
      alert(`Cliente cadastrado com sucesso com o ID ${cliente.id}`);
      document.getElementById("nome").value = "";
      document.getElementById("endereco").value = "";
      document.getElementById("telefone").value = "";
    }, (error) => {
      alert(`Erro ao cadastrar cliente: ${error.message}`);
    });
  }
});

function excluirCliente(id) {
  const cliente = new Cliente();
  cliente.set("id", id);
  cliente.destroy().then(() => {
    alert(`Cliente com ID ${id} excluído com sucesso`);
  }, (error) => {
    alert(`Erro ao excluir cliente: ${error.message}`);
  });
}

document.getElementById("listar").addEventListener("click", () => {
  // Remove a lista anterior, se existir
  const listaAnterior = document.querySelector("ul");
  if (listaAnterior) {
    listaAnterior.remove();
  }
  const query = new Parse.Query(Cliente);
  query.find().then((resultados) => {
    const lista = document.createElement("ul");
    resultados.forEach((cliente) => {
      const item = document.createElement("li");
      item.innerText = `${cliente.get("nome")} - ${cliente.get("endereco")} - ${cliente.get("telefone")}`;

      const botaoExcluir = document.createElement("button");
      botaoExcluir.type = "button";
      botaoExcluir.innerText = "Excluir";
      botaoExcluir.addEventListener("click", () => {
        excluirCliente(cliente.id);
        item.remove();
      });
      
      const botaoAlterar = document.createElement("button");
      botaoAlterar.type = "button";
      botaoAlterar.innerText = "Alterar";
      botaoAlterar.addEventListener("click", () => {
        document.getElementById("nome").value = cliente.get("nome");
        document.getElementById("endereco").value = cliente.get("endereco");
        document.getElementById("telefone").value = cliente.get("telefone");
        clienteSelecionado = cliente;
      });

      item.appendChild(botaoExcluir);
      item.appendChild(botaoAlterar);
      lista.appendChild(item);
    });
    document.body.appendChild(lista);
  }, (error) => {
    alert(`Erro ao buscar clientes: ${error.message}`);
  });
});

document.querySelector("#excluir form").addEventListener("submit", (event) => {event.preventDefault();
const id = document.getElementById("id").value;
excluirCliente(id);
document.getElementById("id").value = "";
});