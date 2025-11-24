---
title: "Inline Variables – paradise or pure chaos?"
date: 2025-11-03
draft: false
tags: ["Delphi", "Delphi Roughneck", "inline variables"]
description: "The Delphi Roughneck explains what inline variables really are — and why they can turn your code into a full-blown disaster."
lang: "en"
translationKey: "variaveis-inline-no-delphi"
aliases:
  - /en/inline-variables-delphi/
---

Back in 2018, with **Delphi 10.3 Rio**, Embarcadero’s engineers decided to “modernize” things and introduced **inline variables**.  
The idea sounds brilliant: declare the variable right there, exactly where it will be used.  
On paper it looks cute. In practice, it’s like putting LED headlights on a ’68 Beetle — draws attention, sure, but doesn’t solve a darn thing.

In this post, I explain what these blessed inline variables are, when they *kind of* make sense, and why — in my Roughneck opinion — **anything outside of a `for` loop is a recipe for chaos.**

---

## What is an inline variable?

Since the **ancient days of Pascal**, back when we used floppy disks and the compiler fit on one and a half of them, every local variable had to be declared at the top of the method, **before the `begin`**.  
It was the standard: pretty, predictable, logical.

Then **Delphi 10.3 Rio** came along and allowed this:

```pascal
procedure Test;
begin
  var i: Integer := 10;
  ShowMessage(i.ToString);
end;
```

Looks handy, right? And it is… right up to the moment your code starts growing.  
Then you start hunting for where the variable was declared… and discover someone had the “brilliant” idea of sticking a `var` inside an `if`, another inside a `try`, another at the bottom of the method.  
Boom — chaos.

---

## The pros (so you don’t say I only complain)

- Scope gets shorter: once the block ends, the variable dies.  
- You can declare it right where you use it.  
- The compiler infers the type, making code shorter.  
- Helps avoid zombie variables lingering around for no reason.  

{{< bruto intro="Okay, it does have its uses.<br>But folks started thinking this is an excuse to sprinkle `var` everywhere in their code." >}}

---

## The cons (and here comes the Roughneck rant)

{{< bruto/bronca >}}
Outside of a `for`, it turns into full-blown disorder.  
You open a method and there’s `var` lurking behind every corner.  
Delphi’s tradition was always simple: **want to see the variables? scroll up before the `begin`.**  
Now you gotta go treasure hunting for `var` inside the mess.
{{< /bruto/bronca >}}

- Sometimes there’s not even a type: `var x := SomeFunction();` — and now you have to open the function to figure out what `x` is.  
- Maintenance? Becomes a scavenger hunt.  
- Big codebases with inline variables are like bad soap operas: feels like it’ll get better, but only gets worse.  

**Summary:** people trying to save three keystrokes end up wasting half an hour trying to understand their own code.

---

## Roughneck’s Opinion

Inline variables make sense in **only two situations**:

1. Inside a `for`, like `for var i := 0 to 10 do`.  
2. In very small blocks — preferably less than half a screen.

Outside that, it's just fancy nonsense.  
Want to declare stuff in the middle of a method? Do humanity a favor and go sell snacks at the fair.  
Anyone maintaining your code will curse you in three different languages — and they’ll be right.

{{< bruto/bronca >}}
In my code, **every variable goes before the `begin`**.  
If you need to find one, go up there — everything’s tidy, civilized, peaceful.  
That’s order. That’s clarity. That’s sanity.
{{< /bruto/bronca >}}

---

## Good example (acceptable)

```pascal
for var Item in Lista do
begin
  var Doubled := Item * 2;
  ShowMessage(Doubled.ToString);
end;
```

Short, direct, harmless. Dies inside the loop, troubles no one.

---

## Bad example (total mess)

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

Where was “Outro” declared? What type is it? What does it eat?  
To find out, only debugging will save you.  
And the poor soul who opens this six months later will want to jump out the window.

---

## Supreme disaster example (same name, different types)

```pascal
procedure Teste;
begin
  var Valor: Integer := 10;
  ShowMessage('Integer value: ' + Valor.ToString);

  begin
    var Valor: String := 'ten';
    ShowMessage('String value: ' + Valor);
  end;

  ShowMessage('Still integer: ' + Valor.ToString);
end;
```

Look at this masterpiece: two variables with the same name, different types, living in separate scopes.  
Compiles happily, but anyone reading this will think the compiler had a stroke.  
You think it's an `Integer`, but inside the block it magically becomes a `String`.  
Then goes back to being an `Integer`.  
This isn’t clarity — this is **variable identity disorder**.

---

## Conclusion

{{< bruto/bronca >}}
Inline variables are like a power tool in a kid’s hands: it might work, but everybody knows trouble is coming, and someone’s gonna cry (maybe even lose a finger).  
Use them in `for` loops, use them in very small blocks, but **don’t throw `var` around your code like confetti at Carnival**.

Delphi’s standard is simple, beautiful, and tested for decades:  
**put every `var` before the `begin`.**  
Deviate from that and your code becomes a scope bingo.

And if I open your code and find inline variables scattered around, I’m telling you right now:  
**I’ll rip them all out and move the `var` declarations back up where they always belonged.**  
By force, if necessary.
{{< /bruto/bronca >}}
