---
title: "Pare de Usar With no Delphi"
date: 2025-10-31T22:00:00
draft: false
tags: ["delphi", "clean-code"]
categories: ["bruto"]
author: "Bruto do Delphi"
cover:
  image: "/images/cover-default.jpg"
  alt: "Código Delphi limpo, sem with"
summary: "Um manifesto do Bruto do Delphi: por que o `with` é o capeta disfarçado de atalho."
---

{{< bruto intro="**WITH é coisa de programador preguiçoso**" >}}

{{< bruto/bronca >}}
⚠️ *Aviso de utilidade pública:*  
Este texto é **opinativo**, **mal humorado** e **cheio de verdade**.  
Se você ama o `with` e acha que ele é lindo, já pode apertar **Ctrl+W** e fechar essa aba.  
Eu não vou dormir menos, não vou comer menos e não vou te mandar flores.  
Agora, se você quer **entender de verdade** por que esse treco é uma desgraça no Delphi — senta aí e presta atenção.  
Ou então, veja esse artigo em [vídeo](https://www.youtube.com/watch?v=9DQPkzb1hiw)
{{< /bruto/bronca >}}

---

## **O que é esse tal de `with` e por que o povo usa**

O `with` é aquele “atalho mágico” que promete te poupar **meia dúzia de teclas**.  
O sujeito olha praquilo e pensa:  
> “Nossa, que lindo! Não preciso digitar `Memo1.Lines` toda hora!”

Pois é… e depois não entende **por que o código dele parece uma merda**.

O `with` serve pra:
- “Encurtar” chamadas (tipo `Memo1.Lines.Add`).
- Preencher coleções (tipo `ACBrNFe1.NotasFiscais.Add`).

E serve também pra **bagunçar seu código**, **confundir o depurador** e **te fazer parecer um preguiçoso**.  
Bonito, né?

---

{{< bruto intro="Problema #1 — O `with` fode a leitura do seu código" >}}

Sabe aquele código bonito que você lê e entende de primeira?  
Pois é, o `with` pega esse código, limpa a bunda com ele e joga no lixo.

### **Exemplo clássico de preguiça:**

```pascal
with Memo1.Lines do
begin
  Clear;
  Add('Capítulo 1: ...');
  Add('Parágrafo 2: ...');
  Add('Parágrafo 3: ...');
end;
```

O sujeito que escreveu isso acha que economizou tempo.  
Economizou nada, **só fodeu** quem vai dar manutenção.

{{< bruto/bronca >}}
Aqui cada linha grita quem é o dono da ação.  
Não tem charada, não tem adivinhação.  
O código é **honesto** — coisa rara hoje em dia.
{{< /bruto/bronca >}}

```pascal
Memo1.Lines.Clear;
Memo1.Lines.Add('Capítulo 1: ...');
Memo1.Lines.Add('Parágrafo 2: ...');
Memo1.Lines.Add('Parágrafo 3: ...');
```

---

{{< bruto intro="Problema #2 — Debug com `with` é a mesma coisa que tentar achar agulha num palheiro... só que o palheiro tá pegando fogo" >}}

Quer depurar um trecho que usa `with`?  
Boa sorte, babaca. O depurador olha pro seu código e pensa:  
> “Amigo, eu não faço ideia de quem é esse objeto aí.”

### **Olha essa desgraça:**

```pascal
with ACBrNFe1.NotasFiscais.Add.NFe do
begin
  ide.cNF := '12345678';
end;
```

Na hora de inspecionar `ide.cNF`, o compilador olha pra você e diz:  
> “Não sei quem é `ide`, e sinceramente, também não quero saber.”

Aí o cara tem que **reconstruir toda a cadeia** só pra ver um valorzinho.  
Tudo isso porque quis “digitar menos”.  
Parabéns, guerreiro do Ctrl+C Ctrl+V.

---

{{< bruto intro="Problema #3 — Você nem sabe mais o que está alterando" >}}

No `with`, você acha que está mexendo em um objeto, mas na verdade está **atacando outro completamente diferente**.  
É o inferno em forma de sintaxe.

### **O caos em pessoa:**

```pascal
with Nota do
begin
  with Det.Add do
  begin
    with Imposto do
    begin
      with ICMS do
      begin
        // Aqui ninguém sabe mais quem é quem nesse caralho
      end;
    end;
  end;
end;
```

**Quem lê um código desses merece um aumento… ou uma internação.**

{{< bruto/bronca >}}
Aqui cada linha sabe **quem é o dono da bronca**.  
E se der pau, o depurador sabe também.
{{< /bruto/bronca >}}

```pascal
var
  Nota: TNFe;
  Det: TDetCollectionItem;
begin
  Nota := ACBrNFe1.NotasFiscais.Add.NFe;
  Det  := Nota.Det.Add;

  Det.Imposto.ICMS.CST  := cst00;
  Det.Imposto.ICMS.orig := oeNacional;
end;
```

---

{{< bruto intro="Como largar o vício do `with` (passo a passo de desintoxicação)" >}}

1. Descubra o tipo de retorno (Ctrl+Clique, preguiçoso).  
   Exemplo: `NotasFiscais.Add.NFe : TNFe`.
2. Crie uma variável decente:
   ```pascal
   var Nota: TNFe;
   Nota := ACBrNFe1.NotasFiscais.Add.NFe;
   ```
3. Fez um `.Add`? Guarda o item:
   ```pascal
   var Det: TDetCollectionItem;
   Det := Nota.Det.Add;
   ```
4. Dê **nomes de gente** pras variáveis.  
   Nada de `a`, `b`, `obj`, `aux`. Nomeie direito.
5. Quebre o código. Código bom é **aquele que até o estagiário de marketing entende**.

---

## **Exemplo completo (sem preguiça)**

```pascal
uses
  ACBrNFe, ACBrNFeNotasFiscais;

procedure TForm1.GerarNFeClara;
var
  Nota: TNFe;
  Det: TDetCollectionItem;
begin
  Nota := ACBrNFe1.NotasFiscais.Add.NFe;

  Nota.Ide.cNF    := '12345678';
  Nota.Ide.nNF    := 2;
  Nota.Ide.tpAmb  := taHomologacao;
  Nota.Ide.finNFe := fnNormal;

  Det := Nota.Det.Add;
  Det.nItem       := 1;
  Det.Prod.cProd  := 'ABC123';
  Det.Prod.xProd  := 'Produto Exemplo';
  Det.Prod.qCom   := 1.0000;
  Det.Prod.vUnCom := 100.00;

  Det.Imposto.ICMS.CST  := cst00;
  Det.Imposto.ICMS.orig := oeNacional;
end;
```

{{< bruto/bronca >}}
Dá mais trabalho? Dá.  
Mas pelo menos **você entende o que escreveu** — e não parece que um estagiário bêbado codou isso.
{{< /bruto/bronca >}}

---

{{< bruto intro="Checklist do Bruto para banir o `with`" >}}

- [x] Declare variáveis decentes.  
- [x] Quebre cadeias longas.  
- [x] Nomeie as coisas direito.  
- [x] Faça o debug funcionar sem reza brava.  
- [x] E se alguém usar `with` no seu projeto... **refatora sem dó e demita o responsável**.

---

{{< bruto intro="“Mas Bruto, eu digito menos com `with`...”" >}}

E eu digito menos ainda se eu deletar seu código inteiro.  
Digitar menos não é meta de programador.  
**Entender o que escreveu é.**

---

{{< bruto intro="Conclusão" >}}

O `with` é a **muleta dos preguiçosos**.  
É o *“jeitinho brasileiro”* aplicado à programação.  
Quer ser bom? Escreve direito. Quer ser rápido? Usa snippet.  

{{< bruto/bronca >}}
Mas se continuar defendendo `with`, **não me chama pra dar manutenção** no seu código, porque eu vou arrancar esse negócio de lá nem que seja na marra.  
Se você é do time `with`, ótimo — **só não me chame pra manutenção.** Se me chamar, eu vou lá e **arranco esse vício do seu código sem dó.**
{{< /bruto/bronca >}}

> E se achou tudo isso uma besteira...  
> Tá bom também.  
> Eu continuo dormindo bem e o `with` continua sendo uma bosta. 😎
