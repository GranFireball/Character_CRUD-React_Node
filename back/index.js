const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const app = express();

function Ordenar(vetor, n) {
    let aux;
    for (let i = 0; i <= n - 1; i++) {
        for (let j = 0; j <= n - 2; j++) {
            if (parseInt(vetor[j].poderTot) < parseInt(vetor[j + 1].poderTot)) {
                aux = vetor[j + 1];
                vetor[j + 1] = vetor[j];
                vetor[j] = aux;
            }
        }
    }
    return vetor;
}

app.use(bodyParser.urlencoded({ 'extended': false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/classe/tanque", (request, response) => {
    const filePath = path.join(__dirname, "data.json");
    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
            response.json(`Erro ${err}`);
            return;
        }
        const personagens = JSON.parse(data);
        const encontrados = personagens.filter((personagem) => personagem.classe === "Tanque");
        if (encontrados.length > 0) {
            const encontradosOrd = Ordenar(encontrados, encontrados.length);
            response.json(encontradosOrd);
            return;
        }
        response.json({ "erro": "(Não Existe Tanque)" });
    })

});
app.get("/classe/guer", (request, response) => {
    const filePath = path.join(__dirname, "data.json");
    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
            response.json(`Erro ${err}`);
            return;
        }
        const personagens = JSON.parse(data);
        const encontrados = personagens.filter((personagem) => personagem.classe === "Guerreiro");
        if (encontrados.length > 0) {
            const encontradosOrd = Ordenar(encontrados, encontrados.length);
            response.json(encontradosOrd);
            return;
        }
        response.json({ "erro": "(Não Existe Guerreiro)" });
    })

});
app.get("/classe/mago", (request, response) => {
    const filePath = path.join(__dirname, "data.json");
    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
            response.json(`Erro ${err}`);
            return;
        }
        const personagens = JSON.parse(data);
        const encontrados = personagens.filter((personagem) => personagem.classe === "Mago");
        if (encontrados.length > 0) {
            const encontradosOrd = Ordenar(encontrados, encontrados.length);
            response.json(encontradosOrd);
            return;
        }
        response.json({ "erro": "(Não Existe Mago)" });
    })

});

app.post("/getpersonagem", (request, response) => {
    const { nome } = request.body;
    const filePath = path.join(__dirname, "data.json");
    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
            response.json(`Erro ${err}`);
            return;
        }
        const personagens = JSON.parse(data);
        const encontrado = personagens.find((personagem) => personagem.nome === nome);
        if (encontrado) {
            response.json(encontrado);
            return;
        }
        response.json({ "erro": "Esse Personagem Não Existe" });
    })

});

app.post("/createpersonagem", (req, res) => {
    const { nome } = req.body;
    const filePath = path.join(__dirname, "data.json");
    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
            res.json(`Erro ${err}`);
            return;
        }
        const personagens = JSON.parse(data);

        if (personagens.find((personagem) => personagem.nome === nome)) {
            res.json({ "erro": "ERRO ao Criar Personagem: Esse Personagem Já Existe" });
            return;
        }
        personagens.push(req.body);

        fs.writeFile('./data.json', JSON.stringify(personagens), (err, result) => {
            if (err) {
                res.json(`Erro ${err}`);
            }
            else {
                res.json("Personagem Criado");
            }
        });


    })
});

app.post("/editpersonagem", (req, res) => {
    const { nome, classe, ataque, defesa, magia, agil, poderTot } = req.body;
    const filePath = path.join(__dirname, "data.json");
    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
            res.json(`Erro ${err}`);
            return;
        }
        const personagens = JSON.parse(data);

        personagens.map((personagem) => {
            if (personagem.nome === nome) {
                personagem.classe = classe;
                personagem.ataque = ataque;
                personagem.defesa = defesa;
                personagem.magia = magia;
                personagem.agil = agil;
                personagem.poderTot = poderTot;
            }

        })

        fs.writeFile('./data.json', JSON.stringify(personagens), (err, result) => {
            if (err) {
                res.json(`Erro ${err}`);
            }
            else {
                res.json("Personagem Editado");
            }
        });


    })
});

app.post("/deletepersonagem", (request, response) => {
    const { nome } = request.body;
    const filePath = path.join(__dirname, "data.json");
    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
            response.json(`Erro ${err}`);
            return;
        }
        const personagens = JSON.parse(data);
        const encontrado = personagens.find((personagem) => personagem.nome === nome);
        if (encontrado) {
            const newPersonagens = personagens.filter((personagem) => personagem.nome !== encontrado.nome);
            fs.writeFile('./data.json', JSON.stringify(newPersonagens), (err, result) => {
                if (err) {
                    response.json(`Erro ${err}`);
                }
                else {
                    response.json("Personagem Deletado");
                }
            });
            return;
        }
        response.json({ "erro": "Esse Personagem Não Existe" });
    })

});

app.listen(3001, () => {
    console.log("Servidor online na porta 3001");
});