---
title: "Stop Using with in Delphi"
date: 2025-10-31T22:00:00
draft: false
tags: ["Delphi", "Delphi Roughneck"]
author: "Delphi Roughneck"
description: "A Roughneck manifesto: why with is the devil dressed as a shortcut."
lang: "en"
translationKey: "pare-de-usar-with-no-delphi"
aliases:
  - /en/stop-using-with-in-delphi/
---

{{< bruto intro="**WITH is a tool for lazy programmers**" >}}

{{< bruto/bronca >}}
⚠️ *Public service announcement:*  
This text is **opinionated**, **grumpy**, and **full of painful truth**.  
If you love `with` and think it’s beautiful, go ahead and hit **Ctrl+W** and close this tab.  
I won’t lose sleep, won’t skip a meal, and sure as hell won’t send you roses.  
But if you want to **understand why this thing is pure trouble in Delphi** — sit down and listen.  
Or, if you prefer, watch the [video version](https://www.youtube.com/watch?v=9DQPkzb1hiw)
{{< /bruto/bronca >}}

---

## **What the heck is `with` and why people use it**

`with` is that “magic shortcut” that promises to save you **a couple of keystrokes**.  
The fella looks at it and thinks:  
> “Wow! I don’t need to type `Memo1.Lines` all the time!”

Yeah… and then wonders why **his code looks like a barnyard accident**.

`with` is used to:
- Shorten calls (like `Memo1.Lines.Add`).
- Fill collections (like `ACBrNFe1.NotasFiscais.Add`).

And it also **messes up your code**, **confuses the debugger**,  
and **makes you look lazy**.  
Beautiful, right?

---

{{< bruto intro="Problem #1 — `with` wrecks your code readability" >}}

You know that pretty code you read and understand right away?  
Yeah, `with` grabs that code, wipes its behind with it, and throws it in the trash.

### **Classic example of pure laziness:**

```pascal
with Memo1.Lines do
begin
  Clear;
  Add('Chapter 1: ...');
  Add('Paragraph 2: ...');
  Add('Paragraph 3: ...');
end;
```

The guy who wrote this thinks he saved time.  
He saved nothing — he just **ruined maintenance** for whoever comes next.

{{< bruto/bronca >}}
Here every line screams who owns the action.  
No riddles, no guessing games.  
The code is **honest** — a rare thing these days.
{{< /bruto/bronca >}}

```pascal
Memo1.Lines.Clear;
Memo1.Lines.Add('Chapter 1: ...');
Memo1.Lines.Add('Paragraph 2: ...');
Memo1.Lines.Add('Paragraph 3: ...');
```

---

{{< bruto intro="Problem #2 — Debugging with `with` is like finding a needle in a haystack… while the haystack is on fire" >}}

Try debugging a piece of code that uses `with`.  
Good luck, cowboy. The debugger looks at your code and thinks:  
> “Buddy, I have no clue what object this is.”

### **Look at this mess:**

```pascal
with ACBrNFe1.NotasFiscais.Add.NFe do
begin
  ide.cNF := '12345678';
end;
```

When you try to inspect `ide.cNF`, the compiler looks back and says:  
> “I don’t know who `ide` is, and honestly, I don’t wanna know.”

Then you must **rebuild the entire chain** just to inspect one tiny value.  
All because you wanted to “type less”.  
Congratulations, Ctrl+C Ctrl+V warrior.

---

{{< bruto intro="Problem #3 — You don’t even know what you’re modifying anymore" >}}

With `with`, you *think* you’re touching one object, but you’re actually **hitting another completely different one**.  
It’s a syntactical version of a stampede.

### **Pure chaos:**

```pascal
with Nota do
begin
  with Det.Add do
  begin
    with Imposto do
    begin
      with ICMS do
      begin
        // At this point nobody knows who's who in this darn mess
      end;
    end;
  end;
end;
```

**Anyone who reads this code deserves a raise… or a psychiatric evaluation.**

{{< bruto/bronca >}}
Here every line knows **who owns the trouble**.  
And if something breaks, the debugger knows too.
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

{{< bruto intro="How to quit the `with` addiction (step-by-step detox)" >}}

1. Figure out the return type (Ctrl+Click, you slacker).  
   Example: `NotasFiscais.Add.NFe : TNFe`
2. Create a proper variable:
   ```pascal
   var Nota: TNFe;
   Nota := ACBrNFe1.NotasFiscais.Add.NFe;
   ```
3. Did an `.Add`? Capture the item:
   ```pascal
   var Det: TDetCollectionItem;
   Det := Nota.Det.Add;
   ```
4. Give variables **real names**.  
   None of that `a`, `b`, `obj`, `aux` nonsense.
5. Split the code. Good code is the kind **even the marketing intern understands**.

---

## **Full example (without laziness)**

```pascal
uses
  ACBrNFe, ACBrNFeNotasFiscais;

procedure TForm1.GenerateClearNFe;
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
  Det.Prod.xProd  := 'Example Product';
  Det.Prod.qCom   := 1.0000;
  Det.Prod.vUnCom := 100.00;

  Det.Imposto.ICMS.CST  := cst00;
  Det.Imposto.ICMS.orig := oeNacional;
end;
```

{{< bruto/bronca >}}
More work? Yep.  
But at least **you understand what you wrote** — and it doesn’t look like a drunken intern coded it.
{{< /bruto/bronca >}}

---

{{< bruto intro="Roughneck’s checklist to ban `with`" >}}

- [x] Declare decent variables.  
- [x] Break long chains.  
- [x] Name things properly.  
- [x] Let the debugger work without prayer rituals.  
- [x] And if someone uses `with` in your project… **refactor it mercilessly and fire the culprit**.

---

{{< bruto intro="“But Roughneck, I type less with `with`...”" >}}

And I type even less if I delete your whole codebase.  
Typing less is not a developer’s goal.  
**Understanding what you wrote is.**

---

{{< bruto intro="Conclusion" >}}

`with` is the **crutch of the lazy**.  
It’s the programming version of the *“quick fix mentality”*.  
Want to be good? Write it properly. Want to be fast? Use snippets.

{{< bruto/bronca >}}
But if you insist on defending `with`, **don’t call me to maintain your code**,  
because I’ll rip that thing out of there even if I have to do it with a tractor.  
If you’re on the `with` team, great — **just don’t call me for maintenance.**  
If you do, I’ll go there and **tear that habit out of your code without mercy.**
{{< /bruto/bronca >}}

> And if you think all this is nonsense…  
> That’s fine too.  
> I’ll keep sleeping well and `with` will keep being garbage. 😎
