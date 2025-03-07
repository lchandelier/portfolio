---
layout: post
title:  "L’accessibilité c’est comme la pâtisserie, il faut savoir doser !"
ref: accessibilite-patisserie
date:   2022-12-22 18:48:00 +0100
category: "blog"
permalink: /blog/accessibilite-comme-patisserie-savoir-doser.html
lang: fr
thumbnail: /assets/img/blog/access-medium.webp
alt_thumb: 
---

<img src="{{ site.baseurl }}/assets/img/blog/access.webp" alt="" 
             srcset="{{ site.baseurl }}/assets/img/blog/access-medium.webp 670w,
          {{ site.baseurl }}/assets/img/blog/access.webp 1024w"
          sizes="(min-width:671px) 1024px"/>

**Quand j’ai débuté dans l’accessibilité numérique, je voulais être sûre que le contenu présenté était lisible par tout le monde.
Comme toute personne apprenant un nouveau domaine, j’étais maladroite dans ma façon de faire. Au lieu de rendre simplement l’information, je la rendais trop verbeuse, trop complexe, en la doublant ou en utilisant des attributs non nécessaires. D’où mon analogie avec la pâtisserie, car, comme vous le savez, trop ou pas assez d’un ingrédient et votre gâteau devient immangeable.**


## Donnée redondante

### Avec des liens

Je commence par une erreur que je faisais quand j’ai travaillé sur mon premier projet d’accessibilité : doubler l’information d’un lien avec l’attribut title. Double combo gagnant : je précisais aussi dans le title qu’il s’agissait d’un lien, on ne sait jamais.

Imaginez-vous dans un site avec un méga menu de six catégories avec dix à vingt liens sous chacune d’entre-elles. C’est utile sur n’importe quel site ayant beaucoup de contenus à proposer et ce n’est pas un problème en soi. Mais dans mon cas, tous les liens étaient construits comme ceci:

{% highlight html %}
{% raw %}
<a href="monlien.html" title="Lien vers top 10 des choses à faire en accessibilité">Top 10 des choses à faire en accessibilité</a>
{% endraw %}
{% endhighlight %}

La restitution (sur NVDA) donne le résultat suivant : « Top 10 des choses à faire en accessibilité lien, lien vers top 10 des choses à faire en accessibilité ».

Et voilà tout le problème, c’est inutile et très pénible pour les personnes utilisant un lecteur d’écran. Comme le fait de mettre trop de beurre ou trop de crème dans sa recette, c’est lourd.

En simplifiant comme ceci :

{% highlight html %}
{% raw %}
<a href="monlien.html">Top 10 des choses à faire en accessibilité</a>
{% endraw %}
{% endhighlight %}

NVDA va lire « Top 10 des choses à faire en accessibilité lien ». Cela remis dans le contexte de notre méga menu, c’est un peu plus digeste.

### Avec des images

C’est la même chose pour les images; lorsque vous remplissez l’attribut alt (uniquement pour les images porteuses d’information, attention) il est inutile de repréciser qu’il s’agit d’une image, le lecteur d’écran le sait et l’indique.
Voici un exemple à ne pas reproduire chez vous :

{% highlight html %}
{% raw %}
<img src="tournoi.webp" alt="image de la 2ème édition du tournoi des sorciers du 3 au 7 octobre 2023" />
{% endraw %}
{% endhighlight %}

Et voici un bon exemple :

{% highlight html %}
{% raw %}
<img src="tournoi.webp" alt="2ème édition du tournoi des sorciers du 3 au 7 octobre 2023" />
{% endraw %}
{% endhighlight %}

### Exceptions

Il y a quelques contextes dans lesquels on peut préciser la nature d’une image, par exemple dans le monde artistique : « Photographie en noir et blanc de la tour Eiffel », « Portrait de Frida Kahlo portant une robe marron avec une couronne de fleur sur la tête ». Ici, la précision enrichit le sens de l’image, c’est un peu comme une pincée de sel dans votre préparation pour en rehausser le goût.

## Aria

Qu’est-ce que ceci ? Ce sont des attributs et des rôles HTML qui permettent d’ajouter du sens, de la sémantique aux différents composants que l’on code. Par exemple, ARIA va permettre de savoir si un menu est ouvert ou fermé, si un onglet est sélectionné, etc. Voici [une excellente définition donnée par Mozilla](https://developer.mozilla.org/fr/docs/Web/Accessibility/ARIA "(nouvelle fenêtre)"){:target="_blank"}{:rel="noopener noreferrer"}.

Rappel de la première règle d’ARIA : [ne pas s’en servir](https://www.w3.org/TR/using-aria/#firstrule "(nouvelle fenêtre)"){:target="_blank"}{:rel="noopener noreferrer"}.
<br/>Il est très facile de faire n’importe quoi avec ARIA. Même si on pense bien faire, le mieux est souvent de s’en passer.

## Utilisation des mauvais rôles

Une erreur que je rencontre assez régulièrement est l’utilisation des rôles `menu` et `menuitem`.
C’est vrai que le nom comme ça donne envie de s’en servir, pour l’appliquer sur un menu principal par exemple. Eh bien n’en faites rien !<br/>
Ces rôles sont réservés **exclusivement** à des menus applicatifs. Si vous recodez un logiciel Word en ligne, ce sera tout à fait indiqué mais pour n’importe quel site web, utilisez simplement `<nav><ul><li></li></ul></nav>`, cela suffira amplement.<br/>
C’est un peu comme le sucre, vous pouvez en enlever un peu, ça restera mangeable pour tout le monde et ce sera meilleur pour quelqu’un qui doit faire attention.

Un exemple d’utilisation pertinente de ces rôles est disponible sur [le site d’ARIA Authoring Practices Guide (en anglais)](https://www.w3.org/WAI/ARIA/apg/example-index/menubar/menubar-editor.html "(nouvelle fenêtre)"){:hreflang="en"}{:target="_blank"}{:rel="noopener noreferrer"}.

### Redondances ou surinformation inutile

La balise button a nativement un rôle de bouton. Il est inutile de repréciser celui-ci. Pareil pour les liens, listes, titres et bien d’autres.

Voici un exemple de code à éviter :

{% highlight html %}
{% raw %}
<button type="button" role="button">Mon bouton</button>
<a href="monlien.html" role="link">Mon lien</a>
<ul role="list"><li role="listitem">Mon item de liste</li></ul>
{% endraw %}
{% endhighlight %}

Préférer le code suivant :

{% highlight html %}
{% raw %}
<button type="button">Mon bouton</button>
<a href="monlien.html">Mon lien</a>
<ul><li>Mon item de liste</li></ul>
{% endraw %}
{% endhighlight %}

### Exceptions

Parce que le monde de l’accessibilité et des technologies d’assistance est plein de surprises, dans certaines versions de VoiceOver (le lecteur d’écran par défaut sur macOS et iOS) avec le navigateur Safari, les images au format SVG ne sont pas détectées mais considérées comme un groupe (et restituées avec le rôle groupe au lieu d’image).<br/>Dans des versions plus anciennes, l’attribut alt n’est pas du tout restitué. Pour pallier à ce comportement, il faut ajouter la redondance suivante :

{% highlight html %}
{% raw %}
<img src="logo.svg" alt="24 jours de web" role="img" />
{% endraw %}
{% endhighlight %}

**Cette technique est à appliquer uniquement sur les images SVG ayant besoin d’un attribut alt renseigné.**

Une autre exception, sur les listes.<br/>
Pour des raisons de design, on peut vouloir utiliser une liste sans en afficher les puces. Dans ce cas, vous allez appliquer le style `list-style:none;`. En faisant ainsi, la liste perd sa valeur sémantique et n’est pas correctement restituée dans certaines versions de VoiceOver, toujours avec Safari. <br/>Deux solutions s’offrent à vous : mettre un rôle `list` sur la balise `<ul>` ou mettre des puces transparentes avec un PNG via CSS. Personnellement, j’applique la deuxième méthode car je préfère gérer cela en CSS que de contourner ce problème avec ARIA. C’est une question de goût, libre à vous d’appliquer la technique que vous préférez.

## tabindex

J’ai aussi fait cette erreur au début : mettre des valeurs positives à l’attribut tabindex pour m’assurer que l’ordre de navigation serait cohérent.

**On ne met jamais de valeur positive à un tabindex.** 
<br/>Ce serait un peu comme mettre d’abord les œufs puis la farine puis le beurre et enfin la levure au lieu de mettre œuf, beurre, mélanger puis farine, levure, cela donnerait n’importe quoi. <br/>Si votre code est structuré de manière logique, il n’y en a pas besoin. Les deux seules valeurs à utiliser sur l’attribut `tabindex` sont `0` et `-1`.
<br/>`tabindex="0"` permet de rendre focusable un élément qui ne le serait pas nativement (une `<div>` par exemple). Le focus sera intégré dans l’ordre logique de navigation (de haut en bas et de gauche à droite dans notre partie du monde).<br/>
`tabindex="-1"` permet de donner le focus à un élément via programmation. Par exemple :

{% highlight html %}
{% raw %}
<div id="message" tabindex="-1">
    <p>Mon message</p>
</div>
<button type="submit" id="submitBtn">Envoyer mon commentaire</button>
{% endraw %}
{% endhighlight %}

En JavaScript nous allons pouvoir positionner le focus sur cette div comme ceci :

{% highlight javascript %}
{% raw %}
<script>
    document.getElementById('submitBtn').addEventListener('click', () => {
        document.getElementById('message').focus();
    })
</script>
{% endraw %}
{% endhighlight %}

## Déséquilibre de contenu selon le public

Il est clair que le déséquilibre est, pour la majorité du temps, au préjudice des personnes handicapées.
Et, pourtant, un autre piège dans lequel je tombe encore parfois, c’est de donner plus d’informations aux personnes utilisant un lecteur d’écran qu’aux personnes n’en ayant pas besoin.<br/>
L’information ou le manque d’information **doit être égal pour tous les publics**. Si une information est présente, elle doit être visible par tout le monde.

Prenons une image affichant un numéro surtaxé :

<img src="{{ site.baseurl }}/assets/img/blog/numero-surtaxe.webp" alt="0811 123 456 (service 0.05€ / min + prix de l’appel)"/>

{% highlight html %}
{% raw %}
<img src="numero-surtaxe.webp" alt="0811 123 456 (service 0.05€ / min + prix de l’appel)">
{% endraw %}
{% endhighlight %}

Ici, une personne utilisant un lecteur d’écran saura que le numéro est surtaxé ainsi que son coût.
Dans le [RGAA](https://www.numerique.gouv.fr/publications/rgaa-accessibilite/ "(nouvelle fenêtre)"){:target="_blank"}{:rel="noopener noreferrer"} et les [WCAG (en anglais)](https://www.w3.org/WAI/WCAG21/quickref/ "(nouvelle fenêtre)"){:hreflang="en"}{:target="_blank"}{:rel="noopener noreferrer"}, il s’agit d’une non-conformité.

Une bonne implémentation serait de mettre l’image avec l’ensemble des informations tarifaires :

<img src="{{ site.baseurl }}/assets/img/blog/numero-surtaxe-ok.webp" alt="0811 123 456 (service 0.05€ / min + prix de l’appel)"/>

{% highlight html %}
{% raw %}
<img src="numero-surtaxe.webp-ok" alt="0811 123 456 (service 0.05€ / min + prix de l’appel)">
{% endraw %}
{% endhighlight %}

L’image contient les informations relatives au coût de l’appel. Tout le monde y a accès.

### Exception

Vous me voyez venir, encore une exception ! Si vous concevez un composant complexe en JavaScript qui sort un peu des sentiers battus, disons un système de glisser-déposer ; il peut être utile de préciser à une personne se servant d’un lecteur d’écran comment interagir avec. Dans ce cas, une description uniquement accessible via un lecteur d’écran est tout à fait indiquée.<br/>
Par exemple : « Utilisez la barre d’espace pour sélectionner un élément puis les flèches directionnelles haut/bas pour le déplacer. Enfin, appuyez sur espace pour déposer l’élément. »

## Conclusion

Vous l’aurez constaté : il faut aller à l’essentiel ! Tout est une question de dosage la plupart du temps. Il y a certes des exceptions dues à des bugs de lecteurs d’écran mais ce sont des cas à la marge.

Aujourd’hui encore, j’ai tendance à vouloir ajouter plus de détails à restituer par un lecteur d’écran.<br/> Mais maintenant que j’en ai conscience, je suis plus attentive et je prends du recul.

**L’important est de ne pas parasiter la restitution avec des informations inutiles ou redondantes.**
<br/>
En dehors de la conception accessible de base qui permet aux personnes handicapées d’avoir le même accès au contenu que n’importe qui, l’ajout d’indications doit se faire dans des cas spécifiques : pour aider à la navigation dans un composant d’interface complexe ou pour palier à des problèmes de support de technologie d’assistance.

Puisque vous êtes encore là, je vous donne une recette que j’affectionne tout particulièrement qui marche avec pas mal de fruits selon la saison :

Pour 6 personnes :

- 160 grammes de farine
- 150 grammes de sucre (vous pouvez en mettre moins)
- 130 grammes de beurre
- 1 sachet de levure chimique
- 3 œufs
- 3 poires

Préchauffez le four à 180° et pendant ce temps, coupez les poires en petits morceaux, ensuite, mélangez le sucre et les œufs puis ajoutez la farine et la levure. Faites fondre le beurre puis mélangez-le à la préparation. Enfin, ajoutez les morceaux de poires et mélangez le tout.
À votre goût, vous pouvez ajouter une pincée de sel, un petit peu de rhum pour avoir un petit parfum intéressant.

Versez dans un plat à gâteaux et laissez cuire pendant 40 minutes à 180°.

**L’accessibilité, c’est bon, mangez-en !**

Merci à l’équipe de relecture ainsi qu’à Romain Gervois pour ses retours toujours riches !

Vous pouvez retrouver cet article et plein d'autres articles très intéressants sur [24 jours de web](https://www.24joursdeweb.fr/2022/ "24 jours de web édition 2022 (nouvelle fenêtre)"){:target="_blank"}{:rel="noopener noreferrer"}