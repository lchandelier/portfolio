---
layout: post
title:  "Intégrer facilement de l’accessibilité dans votre projet front-end"
ref: a11y-front
date:   2016-11-20 13:22:16 +0100
category: "blog"
permalink: /blog/integrer-accessibilite-front.html
lang: fr
thumbnail: /assets/img/blog/access-medium.webp
alt_thumb: 
---

<img src="{{ site.baseurl }}/assets/img/blog/access.webp" alt="" 
             srcset="{{ site.baseurl }}/assets/img/blog/access-medium.webp 670w,
          {{ site.baseurl }}/assets/img/blog/access.webp 1024w"
          sizes="(min-width:671px) 1024px"/> 

**Nous travaillons assez rarement sur des projets qui doivent être accessibles. Nos clients, comme nous-mêmes ne sommes pas assez sensibilisés à cette question et nous avons tendance à aborder ce thème avec certains apriori :**

 * **C’est compliqué**
 * **Les sites accessibles sont moches**
 * **C’est pour 3 aveugles et 2 sourds**
 * **C’est cher**

**Dans ce billet, je vais m’attaquer au premier apriori de cette liste, et montrer comment on peut apporter de l’accessibilité dans nos projets de manière rapide et assez facilement. Le résultat ne sera pas parfait car l’accessibilité ne concerne pas que le développement front mais toute l’équipe projet (UX, Designer, Rédacteurs de contenus, Développeurs back,…). Mais vous allez voir que des petites choses très simples peuvent avoir un impact très important sur l’accessibilité.**


## Mettre un attribut lang
Cela peut couler de source et pourtant, je vois passer régulièrement des sites qui n’en ont pas.
L’utilité de cet attribut est qu’il permet aux lecteurs d’écran de restituer le contenu avec la bonne prononciation et, lorsque précisé, le bon accent (Français Canadien par exemple). Faites le test avec <abbr title="Non Visual Desktop Access" lang="en">NVDA</abbr> ou VoiceOver de faire lire de l’anglais à votre synthèse vocale configurée en français et plus jamais vous n’oublierez de mettre cet attribut !

## Ne pas utiliser maximum-scale= 1.0 dans la meta viewport
Le problème de cette propriété est qu’elle empêche les utilisateurs de zoomer. Imaginez que le texte écrit est un peu petit, même pour vous qui avez une bonne vue ; votre réflexe va être de zoomer dessus, sauf que cette propriété est présente. Dommage...

## Ne pas supprimer l’outline
Cela représente 1 ligne de CSS à ne pas écrire, ou à supprimer si vous utilisez un framework.
Je ne peux que vous inviter à aller sur [ce site (en anglais)](http://www.outlinenone.com/ "Outline none (nouvelle fenêtre)"){:target="_blank"}{:rel="noopener noreferrer"} qui dit tout.

Pour résumer, l’outline est indispensable lorsque vous utilisez la navigation au clavier. Pour faire un test rapide, allez sur le site de [20 minutes](http://www.20min.ch/ro/ "20 minutes Suisse (nouvelle fenêtre)"){:target="_blank"}{:rel="noopener noreferrer"} et allez dans la rubrique Cinéma qui se trouve dans le menu principal en n’utilisant que la touche de tabulation (et sans regarder l’URL en bas de page ;) ). Pas évident n’est-ce pas ?  Si le style outline avait été présent lors de la prise de focus, vous auriez tout de suite vu où vous étiez.

## Mettre des liens d’évitement
Cela se résume à mettre au tout début de votre code des liens vers les zones principales de votre site. Ils peuvent être masqués par défaut mais doivent apparaître au focus. Les liens les plus courants sont « Aller au menu »  « Aller au contenu » et « Aller au pied de page ».  Il s’agit ensuite de mettre une ancre sur la zone à cibler. Cela permet aux personnes utilisant la navigation au clavier (ou autre technologie d’assistance) de passer directement à la zone qui les intéresse, sans avoir à tabuler à travers tout un menu par exemple.  Il faut très peu de temps pour les intégrer et cela en fait gagner beaucoup à vos utilisateurs, en plus du confort.
Voici un exemple de mise en place de ces liens :

{% highlight html %}
{% raw %}
<ul class="skip_links">
    <li>
        <a href="#nav" class="a11y_hidden">Aller à la navigation</a>
    </li>
    <li>
        <a href="#page" class="a11y_hidden">Aller au contenu</a>
    </li>
</ul>

<nav role="navigation" id="nav" tabindex="-1">
    <ol>
        <li>
            <a href="/">Qui sommes-nous?</a>
        </li>
    </ol>
</nav>

<main role="main" id="page" tabindex="-1">
    <p>
        Début du contenu auquel on accède plus rapidement grâce aux liens d’évitement.
    </p>
</main>
{% endraw %}
{% endhighlight %}

## Utiliser une sémantique cohérente
{% highlight html %}
{% raw %}
<span onclick="btnFunction();" class="btn btn-primary">Cliquez ici</span>
{% endraw %}
{% endhighlight %}
Pourquoi faire ça alors qu’il existe un élément <abbr title="HyperText Markup Language" lang="en">HTML</abbr> <code>&lt;button&gt;</code> ?

Cela est valable aussi pour les liens, il est très courant de voir des liens qui sont utilisés comme des boutons. Pourtant il est plus logique d’utiliser un lien pour rediriger quelque part et un bouton pour faire une action autre.  
On peut aussi penser à utiliser les listes ordonnées, non ordonnées et de définitions pour bien structurer l’information, les balises HTML5 de structure comme <code>&lt;header&gt;, &lt;footer&gt;, &lt;main&gt;, &lt;section&gt;</code>, ... qui donnent du sens contrairement à des <code>&lt;div&gt;</code> ou des <code>&lt;span&gt;</code> qui n’ont aucune valeur sémantique.

## <abbr title="Accessible Rich Internet Applications" lang="en">ARIA</abbr> est votre ami
Utilisez les rôles ARIA pour aider les utilisateurs de lecteurs d’écrans à se repérer dans vos pages.
<code>&lt;header role="banner"&gt;</code> <code>&lt;footer role="contentinfo"&gt;</code> etc... ce ne sont que des attributs à ajouter sur des éléments qui sont utilisés très couramment maintenant.  
Si vous utilisez des évènements en JavaScript, les attributs ARIA peuvent aider vos utilisateurs sur de nombreux aspects (menu déplié ou non, champs obligatoires dans un formulaire, onglet actif dans une navigation et bien d’autres).

## Bien organiser les niveaux de titres
La navigation par lecteur d’écran peut se faire par les titres. Ainsi, il est important d’avoir un ordre logique dans ceux-ci. Si, pour des raisons esthétiques, vous avez besoin d’un <code>&lt;h3&gt;</code> après un <code>&lt;h1&gt;</code>, utilisez CSS pour avoir le rendu souhaité, et utilisez un <code>&lt;h2&gt;</code> pour respecter cet ordre.

## Mettre un attribut alt sur les images
L’alternative textuelle est utile pour les personnes utilisant un lecteur d’écran. Mais il faut la renseigner selon certains critères. S’il s’agit d’une image décorative, c’est-à-dire qu’elle n’est pas essentielle à la compréhension du contenu, vous devez mettre un <code>alt=""</code>.  
En revanche, si l’image est essentielle à la compréhension (Texte dans l’image, bouton image…) il faut renseigner ce alt de manière pertinente, en reprenant par exemple le texte contenu dans l’image.

Ce n’est pas un critère toujours simple à aborder. Pour cela, vous pouvez vous fier à la ressource suivante qui schématise parfaitement le cheminement de réflexion à avoir.


<img src="{{ site.baseurl }}/assets/img/blog/the-alt-cheatsheet.png" alt="Schéma de réflexion pour le renseignement de l’attribut alt" aria-labelledby="description"/>
<ol id="description" class="a11y_hidden">  
    <li><strong>Est-ce que l’image est du texte ?</strong> Si oui, répétez le même texte de l’image dans l’attribut alt. Par exemple, <code> alt="Même texte que dans image"</code>.</li>
    <li><strong>Est-ce que l’image est purement décorative ou stylistique ?</strong> Si oui, définissez le texte alternatif à vide, afin qu’il soit ignoré par les lecteurs d’écran. Par exemple, <code>alt=""</code>.</li>
    <li><strong>L’image représente-t-elle une action que l’utilisateur peut faire ?</strong> Si oui, notez l’action qui sera effectuée lorsque l’utilisateur interagit avec l’élément. Par exemple, <code>alt="Ajouter au panier"</code>.</li>
    <li><strong>L’image est-elle purement informative ?</strong> Si oui, le texte alternatif doit transmettre les mêmes informations que l’image. Par exemple, <code>alt="Emplacement"</code>.</li>
    <li>Enfin, <strong>l’image transmet-elle des informations non représentées sur la page en tant que texte ?</strong> Si oui, le texte alternatif doit transmettre les mêmes informations que l’image. Si non, définissez le texte alternatif à vide, afin qu’il soit ignoré par les lecteurs d’écran.</li> 
</ol>
Voici [l’article complet](https://bitsofco.de/alternative-text-and-images/ "Bits of code (nouvelle fenêtre)"){:target="_blank"}{:rel="noopener noreferrer"} (en anglais).


## Un peu de test
Essayez de naviguer sur votre page en utilisant uniquement le clavier, cela vous permettra de lever très rapidement des problèmes d’accessibilité. Le outline est-il masqué ? L’ordre de navigation est-il logique par rapport à ce qu’il devrait ? Les liens d’évitement sont-ils présents et fonctionnels ? Si ces points sont vérifiés, c’est un bon début !

Un autre test consiste à désactiver votre CSS. Cela permet de voir rapidement si votre contenu s’affiche de manière logique ou si vous avez des alternatives textuelles sur des images renseignées en CSS.  
Par exemple, si vous utilisez un sprite CSS pour mettre une liste de boutons de réseaux sociaux, vous devez avoir un texte masqué qui permet aux lecteurs d’écran de savoir à quoi correspondent ces images. Si vous n’avez pas renseigné ce texte, vous le verrez vite avec cette astuce.

## Conclusion
Voici les méthodes que je mets en place sur tous les nouveaux projets sur lesquels je travaille même si l’accessibilité n’est pas dans le scope. Comme vous pouvez le constater, c’est rapide à mettre en place et ne demande pas de se plonger dans des référentiels ou d’avoir une connaissance approfondie sur le sujet. Cela n’a pas non plus d’impact sur le design (à part pour l’outline mais c’est très mineur) et cela aide les personnes utilisant des technologies d’assistance, même s’il reste beaucoup à faire.

## Quelques outils pour aller plus loin
Une [liste de ressources](https://github.com/atalan/a11y-resources/blob/master/list-of-a11y-resources.md "Github d’Atalan (nouvelle fenêtre)"){:target="_blank"}{:rel="noopener noreferrer"} très diverses sur l’accessibilité (articles, bonnes pratiques, plugins JavaScript,...)