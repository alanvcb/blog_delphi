---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: true
tags: ["delphi"]
categories: ["bruto"]
author: "Bruto do Delphi"
summary: ""
bruto:
  xingamento: true        # permite tom mais “duro”
  humor: true             # sarcasmo permitidíssimo
  quebras: ["coice"]      # coice, bronca, sermão
---

{{< bruto
  intro="Seguinte: se teu código tem `with`, já começa pedindo desculpa."
>}}

## O problema
Explique o cenário real...

## A solução sem frescura
Passo a passo direto...

{{< bruto.bronca >}}Não inventa moda. Refatora, testa, e só então abre cerveja.{{< /bruto.bronca >}}

## Código
```pascal
// Exemplo Delphi limpinho aqui