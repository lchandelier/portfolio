---
layout: post
title:  "Les noms accessibles dans tous leurs états"
ref: accessible-names
date:   2019-12-01 18:56:09 +0100
category: "blog"
permalink: /blog/noms-accessibles-dans-tous-leurs-etats.html
lang: fr
thumbnail: /assets/img/blog/code-medium.webp
alt_thumb: 
---

<img src="{{ site.baseurl }}/assets/img/blog/code.webp" alt="" 
             srcset="{{ site.baseurl }}/assets/img/blog/code-medium.webp 670w,
          {{ site.baseurl }}/assets/img/blog/code.webp 1024w"
          sizes="(min-width:671px) 1024px"/> 


Lorsque l’on développe une interface de manière accessible, on doit penser à renseigner des noms accessibles (« _accessible name_ » en anglais) **pertinents**.

Outre les images avec l’attribut `alt` et les champs de formulaires grâce aux balises `label`, les éléments qui en ont besoin sont les liens/boutons icônes (loupe pour lancer une recherche, icônes de réseaux sociaux), des boutons avec des intitulés réduits comme Envoyer, Continuer, etc.

Il existe plusieurs méthodes pour ajouter du sens à ces éléments.

Dans cet article, je vais en lister quelques-unes, donner leurs avantages, inconvénients et leur compatibilité au niveau des lecteurs d’écran.

## Qu’est-ce qu’un nom accessible ?

Un nom accessible est un texte qui est restitué par une technologie d’assistance, par exemple, un lecteur d’écran.  
Cela peut être le `label` d’un champ de formulaire, l’attribut `alt` d’une image, le texte d’un bouton et bien d’autres.  
Commençons par la première méthode.

## Le texte invisible

Le texte invisible est souvent intégré avec la classe CSS `sr-only` ou `visually-hidden`.  
La particularité de cette class CSS fait que le texte est invisible à l’écran, mais reste perceptible par les lecteurs d’écrans.  
Ici, nous n’utilisons pas de `display: none;` ou de `visibility: hidden;` car cela aurait pour effet de rendre le texte impossible à restituer par un lecteur d’écran.

Je vous invite à lire [l’article de Gaël Poupard](https://www.ffoodd.fr/cache-cache-css/ "site de Gaël Poupard (nouvelle fenêtre)"){:target="_blank"}{:rel="noopener noreferrer"} pour voir l’anatomie de cette classe en détail.

Avantages du texte invisible :

*   Particulièrement robuste, il bénéficie d’une excellente (rétro)compatibilité avec les technologies d’assistance
*   Si le CSS est désactivé, le texte invisible s’affiche
*   Un utilisateur se servant de styles personnalisés peut choisir d’afficher le texte masqué
*   Il se traduit via des outils de traduction en ligne (comme Google Translate par exemple)

Inconvénient : Cette méthode nécessite plus de code que l’ajout d’un attribut ARIA ou `title`, ce qui n’est pas forcément évident selon le développement.

Exemple d’utilisation :

{% highlight html %}
{% raw %}
<a href="https://www.facebook.com/terrapotager/" class="facebook">
    <span class="sr-only">Terra potager sur Facebook</span>
</a>
{% endraw %}
{% endhighlight %}

<img src="{{ site.baseurl }}/assets/img/blog/icon-css.webp" alt="CSS est activé, seule l’icône Facebook est visible"/>

CSS est activé, seule l’icône Facebook est visible

<img src="{{ site.baseurl }}/assets/img/blog/icon-text.webp" alt="CSS est désactivé, le texte de l’icône apparaît : Terra potager sur Facebook"/>

CSS est désactivé, le texte de l’icône apparaît

Je préconise l’utilisation de cette technique car c’est celle qui offre la meilleure compatibilité.

Veillez à n’appliquer cette classe que sur du texte masqué. En effet, si elle est ajoutée sur un élément positionné en absolute, [il peut y avoir des surprises](https://www.ffoodd.fr/cache-cache-css/#8919 "site de Gaël Poupard (nouvelle fenêtre)"){:target="_blank"}{:rel="noopener noreferrer"}.

## Aria-label

Une autre technique consiste à utiliser l’attribut `aria-label`.  
Cette technique a pour avantages :

*   D’être plus simple à ajouter qu’un texte masqué via `sr-only` ou `visually-hidden`
*   A un très bon support par les lecteurs d’écran

Mais a les inconvénients suivants :

*   Casse la [première règle d’ARIA (en anglais)](https://www.w3.org/TR/using-aria/#rule1 "W3C (nouvelle fenêtre)"){:target="_blank"}{:rel="noopener noreferrer"}
*   A peu d’impact sur le référencement
*   `aria-label` fait partie [des éléments traduisibles (en anglais)](https://w3c.github.io/aria/#translatable-states-and-properties "W3C (nouvelle fenêtre)"){:target="_blank"}{:rel="noopener noreferrer"} par des outils comme Google Translate, mais [c’est encore mal supporté (en anglais)](https://adrianroselli.com/2019/11/aria-label-does-not-translate.html "article d'Adrian Roselli (nouvelle fenêtre)"){:target="_blank"}{:rel="noopener noreferrer"}.

Exemple d’utilisation :

{% highlight html %}
{% raw %}
<button aria-label="Ajouter au panier Final Fantasy 7 Remake">
    Ajouter au panier
</button>
{% endraw %}
{% endhighlight %}    

**Note importante** : un nouveau critère WCAG, [2.5.3 – Label in name (en anglais)](https://www.w3.org/TR/WCAG21/#label-in-name "W3C (nouvelle fenêtre)"){:target="_blank"}{:rel="noopener noreferrer"}, précise que si un élément d’interface (lien, bouton, etc.) contient du texte ou une image texte, le nom accessible doit contenir ce texte. Ainsi, l’`aria-label` ci-dessus doit contenir les mots Ajouter au panier.

Ce critère permet aux utilisateurs de logiciels de commandes vocales d’indiquer sur quel bouton cliquer.

Dans l’exemple ci-dessus, on peut imaginer qu’il y a plusieurs boutons Ajouter au panier et leur `aria-label` permet de distinguer sur lequel on veut cliquer.

## Aria-labelledby / aria-describedby

La [spécification ARIA (en anglais)](https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby "W3C (nouvelle fenêtre)"){:target="_blank"}{:rel="noopener noreferrer"} précise que If the label text is visible on screen, authors SHOULD use `aria-labelledby` and SHOULD NOT use `aria-label`. (« Si le texte du libellé est visible à l’écran, les auteurs devraient utiliser `aria-labelledby` et ne devraient pas utiliser `aria-label`. »)

Cette alternative devrait donc être utilisée pour faire le lien entre un élément et un **texte visible à l’écran**.

Par exemple, sur une fenêtre modale :

{% highlight html %}
{% raw %}
<dialog role="dialog" aria-labelledby="modalTitle">
    <h1 id="modalTitle">Titre de ma modale</h1>
    ...
</dialog>
{% endraw %}
{% endhighlight %}      

ou sur un élément graphique, ici un point rouge qui indique un retard de paiement :

![Tableau de bord utilisateur. L’onglet actif est Mon compte. Un point rouge à côté du label indique qu’il y a un retard de paiement.](https://media.24joursdeweb.fr/2019/11/aria-labelledby.webp)

{% highlight html %}
{% raw %}
<button id="myAccount" aria-describedby="accountLabel dotTitle">
    <span id="accountLabel">Mon compte</span>
</button>
    
<h2 id="dotTitle" class="error">Retard de paiement</h2>
{% endraw %}
{% endhighlight %}   

On peut lier plusieurs textes à un élément. `aria-labelledby` (comme `aria-describedby`), prennent une liste d’identifiants comme valeurs.

La restitution de l’exemple ci-dessus se fera **dans l’ordre d’appel des identifiants** ; ici, Mon compte retard de paiement.

À noter qu’`aria-labelledby` peut s’accompagner d’`aria-describedby` pour donner une explication plus fournie qu’un titre.

On le rencontre aussi sur les icônes SVG :

{% highlight html %}
{% raw %}
<svg role="img" aria-labelledby="fb" version="1.1" 
        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
        x="0px" y="0px" viewBox="0 0 48 48" xml:space="preserve">
    <title id="fb">Facebook</title>
        ...
</svg>
{% endraw %}
{% endhighlight %}

Ses avantages sont :

*   La simplicité à ajouter (plus qu’un texte en `.sr-only`)
*   Cette technique a un bon support par les technologies d’assistance
*   Les références aux textes (identifiants) peuvent être placées n’importe où dans la page
*   S’agissant d’identifiants pointant vers du texte visible, la traduction est possible via des outils de traduction en ligne.

Si on peut parler d’inconvénient, c’est l’attribut qui a la plus haute priorité dans le calcul du nom accessible. Il faut bien tester sa restitution pour éviter des erreurs.

## Title

Le principal avantage de l’attribut `title` est qu’il affiche une information complémentaire au survol. Ainsi, une personne naviguant à la souris peut avoir cette information si elle en a besoin.  
Il se traduit aussi via des outils de traduction en ligne.

{% highlight html %}
{% raw %}
<button id="showPassword">
    <span title="Afficher le mot de passe">
        <svg role="img" aria-label="Afficher le mot de passe">
            <use xlink:href="#show-password"></use>
        </svg>
    </span>
</button>
{% endraw %}
{% endhighlight %}

Le `title` est placé sur un conteneur enfant sans sémantique pour éviter une double restitution.

En revanche, cette technique a de nombreux inconvénients :

*   L’information est invisible quand on navigue au clavier ou sur mobile
*   Elle n’est pas ou peu visible par les utilisateurs de loupe d’écran
*   La compatibilité avec les technologies d’assistance est limitée
*   Elle [n’a pas d’impact sur le référencement](https://blog.axe-net.fr/attribut-title-lien-referencement/ "blog de la société axe-net (nouvelle fenêtre)"){:target="_blank"}{:rel="noopener noreferrer"}

Il est préférable d’utiliser `title` avec parcimonie et accompagné d’une alternative plus accessible comme `aria-label` ou un texte masqué.

## Ordre de restitution par les lecteurs d’écran

J’ai évoqué plusieurs fois une notion de priorité ou de calcul de nom accessible.

En effet, les navigateurs font un calcul pour savoir quel est le nom accessible d’un élément. Il faut donc être vigilant·e quant à l’utilisation des différentes techniques que je viens de lister.

Pour résumer la [méthode de calcul (en anglais)](https://www.w3.org/TR/2018/REC-accname-1.1-20181218/#mapping_additional_nd_te "W3C (nouvelle fenêtre)"){:target="_blank"}{:rel="noopener noreferrer"}, `aria-labelledby` est prioritaire sur `aria-label`, qui lui-même est prioritaire sur du texte directement inséré dans un élément.

Par exemple :

{% highlight html %}
{% raw %}
<button class="error-dot" aria-labelledby="dotTitle" aria-label="Attention"> mon bouton </button>

<h2 id="dotTitle" class="error">Retard de paiement </h2>
{% endraw %}
{% endhighlight %}

Ici `aria-labelledby` est présent, le résultat restitué sera Retard de paiement

Dans l’exemple suivant, le texte Continuer sera complètement ignoré, au bénéfice de Continuer vers l’étape de paiement

{% highlight html %}
{% raw %}
<button aria-label="continuer vers l’étape de paiement">
    Continuer
</button>
{% endraw %}
{% endhighlight %}

## Conclusion

La première règle d’ARIA est de se passer d’ARIA autant que possible et de privilégier les éléments natifs.

En effet, HTML est un langage riche et ARIA ne doit être utilisé qu’en dernier recours.  
Son support n’est pas le même selon [l’élément sur lequel il est utilisé (en anglais)](https://developer.paciellogroup.com/blog/2017/07/short-note-on-aria-label-aria-labelledby-and-aria-describedby/ "Paciello Group (nouvelle fenêtre)"){:target="_blank"}{:rel="noopener noreferrer"}.

C’est pourquoi, si vous devez vraiment utiliser une de ces techniques, je recommande celle du texte masqué pour la majorité des cas et de **respecter la sémantique** ; par exemple, d’utiliser des vrais `label` pour les champs de formulaires et d’utiliser l’attribut `alt` de la balise `img`.

Encore mieux, lors de la conception UX et/ou design, vérifiez s’il est possible d’intégrer directement les textes de manière visible. Ce sera toujours la meilleure solution.

## Pour aller plus loin :

[Compatibilité des lecteurs d’écran avec les attributs ARIA (en anglais)](https://www.powermapper.com/tests/screen-readers/wcag/ "Powermapper (nouvelle fenêtre)"){:target="_blank"}{:rel="noopener noreferrer"}

Merci à Romain Gervois pour sa relecture bienveillante et pleine de bons conseils ainsi qu’à Nicolas Hoffmann et aux relecteurs et relectrices :)

Vous pouvez retrouver cet article et plein d'autres articles très intéressants sur [24 jours de web](https://www.24joursdeweb.fr/2019/ "24 jours de web édition 2019 (nouvelle fenêtre)"){:target="_blank"}{:rel="noopener noreferrer"}