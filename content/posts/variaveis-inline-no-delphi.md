---
title: "Variáveis inline – paraíso ou zona?"
date: 2025-11-03
draft: false
tags: ["Delphi", "Bruto do Delphi", "variáveis inline"]
description: "O Bruto do Delphi explica o que são as variáveis inline — e por que podem transformar seu código num inferno."
---

Lá por 2018, no **Delphi 10.3 Rio**, os engenheiros da Embarcadero resolveram “modernizar” o negócio e inventaram as **variáveis inline**.  
A ideia parece genial: declarar a variável ali, no exato ponto onde vai usar.  
No papel é bonito. Na prática, é tipo botar farol de LED num fusca — chama atenção, mas não resolve o problema.  

Neste post, eu te explico o que são essas benditas variáveis inline, quando elas até fazem sentido, e por que, na minha opinião, **qualquer coisa fora de um `for` é receita de bagunça.**

---

## O que é variável inline

Desde os **primórdios do Pascal**, lá da época que a gente ainda usava disquete e o compilador cabia num disquete e meio, toda variável local era declarada no topo do método, **antes do `begin`**.  
Esse era o padrão: bonito, previsível e lógico.  

Aí veio o **Delphi 10.3 Rio** e resolveu permitir isso aqui:

```pascal
procedure Test;
begin
  var i: Integer := 10;
  ShowMessage(i.ToString);
end;
```

Parece prático, né? E é mesmo… até o momento em que o código começa a crescer.  
Aí você vai caçar onde está a variável, e descobre que alguém teve a brilhante ideia de declarar um `var` no meio de um `if`, outro dentro de um `try`, e outro lá no fim do `begin`.  
Pronto, virou merda.

---

## Os prós (pra não dizer que eu só reclamo)

- O escopo fica mais curto: terminou o bloco, a variável morre.  
- Dá pra declarar no ponto de uso, beleza.  
- O compilador infere o tipo, então o código fica menor.  
- Evita variáveis zumbis que seguem vivas sem necessidade.  

{{< bruto intro="Ok, tem sua utilidade. <br> Mas a turma começou a achar que isso é desculpa pra jogar `var` em qualquer canto do código." >}}

---

## Os contras (e aqui começa a bronca)

{{< bruto/bronca >}}
Fora do `for`, **vira bagunça generalizada**.  
Você abre um método e tem `var` em cada esquina.  
O padrão do Delphi sempre foi simples: **quer saber as variáveis? sobe lá pro topo, antes do `begin`.**  
Agora tem que sair caçando `var` no meio do inferno.  
{{< /bruto/bronca >}}

- Às vezes nem tipo tem: `var x := AlgumaFuncao();` — aí você precisa abrir a função pra saber o que é `x`.  
- Manutenção? Virou caça ao tesouro.  
- Código grande com inline é tipo novela ruim: parece que vai melhorar, mas só piora.  

**Resumo:** quem quer economizar três teclas acaba gastando meia hora pra entender o que o próprio código faz.

---

## Opinião do Bruto

Variável inline só faz sentido **em dois lugares**:  

1. Dentro de um `for`, tipo `for var i := 0 to 10 do`.  
2. Em blocos pequenos, de preferência com menos de meia tela.  

Fora disso, é firula.  
Quer declarar no meio do método? Faz um favor pra humanidade e vai vender pamonha.  
Quem for dar manutenção vai te xingar em três línguas diferentes, e com razão.  

{{< bruto/bronca >}}
No meu código, **variável é tudo antes do `begin`**.  
Se você precisar achar uma, vai lá e tá tudo ali, arrumadinho.  
Isso é padrão, é clareza, é paz de espírito.
{{< /bruto/bronca >}}

---

## Exemplo bom (aceitável)

```pascal
for var Item in Lista do
begin
  var Dobrado := Item * 2;
  ShowMessage(Dobrado.ToString);
end;
```

Curto, direto, limpo. Morreu dentro do loop, não incomoda ninguém.

---

## Exemplo ruim (zona total)

```pascal
procedure Calcula;
begin
  var Total := 0;

  if Condicao then
  begin
    var Aux := SomaFuncao();
    Total := Total + Aux;
  end;

  var Outro := OutraFuncao();
  ShowMessage(Total.ToString + Outro.ToString);
end;
```

Onde foi declarada “Outro”? Qual o tipo dela? O que ela come?  
Pra descobrir, só debugando.  
E o coitado que abrir isso daqui seis meses vai querer pular da janela.

---

## Exemplo da desgraça suprema (mesmo nome, tipos diferentes)

```pascal
procedure Teste;
begin
  var Valor: Integer := 10;
  ShowMessage('Valor inteiro: ' + Valor.ToString);

  begin
    var Valor: String := 'dez';
    ShowMessage('Valor string: ' + Valor);
  end;

  ShowMessage('Valor ainda é inteiro: ' + Valor.ToString);
end;
```

Olha que maravilha: duas variáveis com o mesmo nome, tipos diferentes, vivas em blocos diferentes.  
Compila feliz, mas quem ler isso vai pensar que o compilador enlouqueceu.  
Você acha que é um `Integer`, mas dentro de um bloco virou `String`.  
Depois volta a ser `Integer`.  
Isso não é clareza — isso é **transtorno de identidade de variável**.

---

## Conclusão

{{< bruto/bronca >}}
Variáveis inline é igual makita na mão de criança: pode até funcionar, mas você sabe que vai dar merda e alguem vai sair chorando (e quem sabe com um dedo a menos).  
Use no `for`, use em bloco pequeno, mas **não espalha `var` pelo código que nem confete no carnaval**.  

O padrão do Delphi é simples, bonito e testado há décadas:  
**`var` tudo antes do `begin`.**  
Foge disso e o código vira um bingo de escopo.  

E se eu abrir seu código e encontrar variável inline espalhada, já aviso:  
**eu vou arrancar tudo e botar o `var` lá em cima, onde sempre deveria estar.**  
Na marra, se for preciso.
{{< /bruto/bronca >}}
