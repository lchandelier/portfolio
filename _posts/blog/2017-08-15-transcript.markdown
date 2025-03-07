---
layout: post
title:  "De l’accessibilité vite fait, bien fait - Transcript"
ref: transcript
date:   2017-09-28 10:24:00 +0100
category: "blog"
permalink: /blog/transcript.html
lang: fr
thumbnail: /assets/img/blog/paris-web-medium.webp
alt_thumb: 
---

Bonjour à tous,

Je m’appelle Lena Chandelier, je suis développeuse front-end et je vais vous parler d’accessibilité vite fait, bien fait.

Avant de commencer, pour les personnes qui le souhaitent, le transcript de cette conf est disponible à l’url affichée ou en scannant le QR Code.

De l’accessibilité vite fait, bien fait donc. Alors vous pourriez me dire "Comment ça vite fait, bien fait" ?
C’est vrai qu’il faut un minimum de connaissances, ça ne se fait pas n’importe comment.
Ce que je veux mettre en avant par ce titre, c’est un certain nombre de critères qui sont très rapides à mettre en place même si l’accessibilité n’est pas dans le scope du projet.  
Ca c’est pour le côté "vite fait".

Et parce qu’avec des petites choses simples on peut enlever beaucoup de barrières. 
Vous allez voir que ces critères sont très faciles à implémenter et ont un impact vraiment important pour le peu d’efforts qu’ils requièrent.  
Ca c’est pour le côté "bien fait".

Vous verrez que ça ne demande pas d’expertise particulière, simplement d’appliquer quelques bonnes pratiques.

Entrons tout de suite dans le vif du sujet avec le premier point : **mettre un attribut lang**.

Cet attribut permet aux lecteurs d’écrans de prononcer correctement le contenu du site.
Il se place sur la balise HTML puis partout où il y a un changement de langue sauf s’il s’agit de mots employés couramment comme newsletter par exemple.
Il arrive que certains sites n’aient pas cet attribut et, pour vous montrer ce que cela donne dans ce cas de figure, je vais vous présenter une démonstration faite avec <abbr title="NonVisual Desktop Access">NVDA</abbr>, qui est un des lecteurs d’écrans les plus utilisés.

Vous imaginez à quel point ça peut être déroutant, on ne comprend absolument rien simplement pour un attribut <abbr title="HyperText Markup Language">HTML</abbr> manquant.

Voyons à présent comment le texte est lu une fois l’attribut lang ajouté.

Voilà, maintenant vous savez ce qu’il vous reste à faire pour que vos contenus soient bien restitués :) 


Second point, **ne pas utiliser maximum-scale=1.0**.  
Cet attribut empêche tout bonnement de zoomer le site sur mobile.  
Pour une personne qui a besoin 
d’afficher des gros caractères, votre site est inutilisable si vous avez mis cela. C’est la même chose pour quelqu’un qui a une bonne vue mais qui trouve que le texte est écrit un peu petit, il peut vouloir zoomer mais ne 
pourra pas. Du coup, il y a de fortes chances pour qu’il quitte votre site.


Ensuite, **ne pas supprimer l’outline**.  
Tout simplement parce que cela aide à se repérer dans la page, notamment dans le cas d’une navigation clavier. 
Je vais vous faire une démonstration très rapide sur un [site d’informations](http://www.20min.ch/ro "20 minutes Romandie (nouvelle fenêtre)"){:target="_blank"}{:rel="noopener noreferrer"}  
Si je tabule, vous pouvez constater qu’on ne sait pas où on se trouve. 
Si je veux aller dans la section sport par exemple, à moins de lire l’URL en bas de page, je ne sais pas où je suis.  

Alors vous pourriez me dire que l’outline, c’est moche. C’est un argument qu’on entend souvent. 
Mais on peut le styler de plusieurs manières. Par exemple, sur le [blog accessibilité du gouvernement Anglais](https://accessibility.blog.gov.uk/ "(nouvelle fenêtre)"){:target="_blank"}{:rel="noopener noreferrer"}{:hreflang="en"}, on utilise outline et background-color. Demandez à vos collègues designers qu’ils vous fassent un effet sympa là-dessus :)

Si vous voulez plus d’informations sur l’outline, je vous recommande le site [outline none](http://www.outlinenone.com/ "(nouvelle fenêtre)"){:target="_blank"}{:rel="noopener noreferrer"}{:hreflang="en"}.


Le point suivant est relatif aux **liens d’évitement ou liens d’accès rapide**.

Ce sont tout simplement des ancres à placer dans vos pages, les plus courantes étant :

* Aller au menu 
* Aller à la recherche 
* Aller au contenu 
* Aller au pied de page 


Une fois en place, il vous reste à mettre une liste de liens pointant vers ces ancres tout au début de votre page et le tour est joué !

Parce qu’une démonstration vaut mieux qu’un long discours, voici un exemple de liens d’évitements sur le site
[service-public.fr](https://www.service-public.fr/ "(nouvelle fenêtre)"){:target="_blank"}{:rel="noopener noreferrer"}

Si vous voulez masquer cette liste, il faut le faire de manière accessible, c’est-à-dire sans utiliser <code>display: none;</code>  ou <code>visibility: hidden;</code>.
Pour ce faire, je vous invite à lire l’excellent article de Gaël Poupard sur le sujet:
[Cache-cache <abbr title="Cascading Style Sheets">CSS</abbr>](http://www.ffoodd.fr/cache-cache-css "(nouvelle fenêtre)"){:target="_blank"}{:rel="noopener noreferrer"}.


Cinquième point, la sémantique et, plus exactement **utiliser une sémantique cohérente**.  
Quand je vois un bout de code comme ça, voilà la tête que je fais.
Pourquoi on s’embête à faire ça alors qu’il existe une balise <code>&lt;button&gt;</code> qui est là pour ça ?
C’est pas une balise récente pourtant !

Alors, c’est un exemple parmi tant d’autres mais il faut bien penser à utiliser la sémantique.

Utilisez des listes, ordonnées ou non, plutôt que des paragraphes avec des sauts de lignes quand vous voulez faire une liste, des boutons pour faire des actions, des liens pour faire des redirections etc...
Cela aide vos utilisateurs à mieux comprendre l’information que vous voulez leur faire passer.


Ensuite, **<abbr title="Accessible Rich Internet Applications">ARIA</abbr> est votre ami**.  
C’est un vaste sujet mais pour résumer, on peut dire qu’ARIA permet d’ajouter du sens à nos pages.
C’est une spécification qui permet de fournir une meilleure sémantique en ajoutant des attributs aux balises HTML.
Nous avons à notre disposition des attributs ARIA et l’attribut <code>role</code>.  

Il existe une multitude de <code>role</code>. Parmi eux, les landmarks (comme banner, main, navigation, ...) permettent aux utilisateurs de lecteur d’écrans, de naviguer d’un rôle à l’autre en appuyant sur une touche, c’est un peu comme les liens d’évitement.  

Dans notre exemple du span utilisé à des fins de bouton, on pourrait utiliser le rôle "button" pour que ce span soit restitué en tant que tel.
Mais, **la première règle d’ARIA étant de ne pas utiliser ARIA**, on va faire un peu de sémantique et mettre un <code>&lt;button&gt;</code> ;)

Concernant les attributs ARIA, ils sont très utiles pour l’utilisation de javaScript ou d’Ajax. Par exemple pour valider un formulaire,
définir quels champs sont obligatoires, notifier l’utilisateur en cas d’erreur. 
Pour un menu de navigation, ARIA peut aider à savoir quel sous-menu est ouvert. 
Ou encore, dans une navigation par onglets, ARIA permet de savoir quel onglet est actif et quel contenu est lié à cet onglet.

En gros, **dès que vous avez du contenu dynamique, pensez à ARIA.**


Ensuite, **bien organiser les niveaux de titres**.  
Comme les landmarks ARIA, les utilisateurs de lecteur d’écrans peuvent utiliser la navigation par titres.
C’est pourquoi le respect des niveaux de titres est primordial pour garder une navigation cohérente. 
Après un <code>&lt;h1&gt;</code> on a forcément un <code>&lt;h2&gt;</code> et non un <code>&lt;h3&gt;</code>. 
Si l’argument pour faire ce genre de saut entre les niveaux de titres est purement esthétique, 
on peut ajouter une classe et utiliser CSS pour avoir le rendu souhaité. Mais les sauts de niveaux de titres sont à proscrire.


Abordons maintenant un point un peu moins évident de prime abord mais qui deviendra un automatisme avec le temps : **l’attribut alt sur les images**.  

Il y a **toujours** un attribut alt sur une image. La question est de savoir s’il faut le renseigner ou non et comment.

* Si l’image est décorative, ce qui représente la majorité des cas, on laisse le alt vide.
* Si l’image contient du texte, alors on reprend ce texte dans le alt.
* Si l’image représente une action, par exemple un bouton avec un picto de panier, on met le texte de cette action dans le alt. Ici, "Ajouter au panier"
* Si l’image à un caratère informatif, par exemple un picto de localisation à côté d’une adresse, on mettra "Emplacement" dans le alt.

[Un article sur bits of code (en anglais)](https://bitsofco.de/alternative-text-and-images "(nouvelle fenêtre)"){:target="_blank"}{:rel="noopener noreferrer"}{:hreflang="en"} détaille très bien la gestion de cet attribut et 
offre une illustration des différents cas possibles, c’est de cet article que viennent les exemples que je viens de vous présenter.


Enfin, dernier point, **utiliser des vrais <code>&lt;label&gt;</code>**.  
Dans beaucoup de design on voit le label directement dans l’input. Du coup, on a tendance à utiliser un placeholder en guise de label.  
C’est vite fait, ça gagne de la place et... c’est inutilisable pour pas mal de monde. Au-delà de l’<abbr title="User eXperience">UX</abbr> horrible à ce niveau, un placeholder n’est pas fait pour ça.

Un placeholder sert à donner une suggestion de saisie. En aucun cas il ne sert à véhiculer une information importante, comme un format de saisie attendu par exemple.


Une technique pour concilier design et (presque) usabilité est celle des 
[labels flottants](http://allthingssmitty.com/2016/09/25/accessible-floating-labels "(nouvelle fenêtre)"){:target="_blank"}{:rel="noopener noreferrer"}{:hreflang="en"}.
Avec elle, on garde un HTML sémantique et, surtout, on garde l’information présente en permanence !
Attention tout de même, cette technique n’est pas parfaite et n’est à utiliser que si vraiment il n’est pas possible d’avoir le label toujours visible. Adam Silver en parle très bien dans [son article (en anglais)](https://medium.com/simple-human/floating-labels-are-a-bad-idea-82edb64220f6 "(nouvelle fenêtre)"){:target="_blank"}{:rel="noopener noreferrer"}{:hreflang="en"}.


Alors c’est bien beau tout ça mais comment tester que tous ces points sont bien en place et fonctionnent correctement ?


Un premier test rapide et efficace, c’est la touche Tab. Parcourez votre site juste avec cette touche et vous verrez si vos styles de focus sont bien visibles, si l’ordre de navigation est logique.  

Ensuite, désactivez les CSS et javaScripts. Est-ce-que tout votre contenu reste compréhensible, cohérent et fonctionnel après ça ? Si oui, c’est bon !  
Passez votre code au validateur w3c et faites les corrections nécessaires le cas échant, un des critères à respecter est la validité du code HTML.  
Enfin, utilisez un lecteur d’écrans pour entendre comment le contenu est restitué, si vos textes alternatifs sont pertinents et permettent une bonne compréhension du contenu. Les plus utilisés sont Jaws qui est payant et NVDA qui est gratuit ainsi que VoiceOver, nativement présent sur macOS et iOS.



**Attention toutefois**, les points que je viens de vous présenter sont ceux que j’applique sur tous les projets sur lesquels je travaille même si l’accessibilité est hors scope, ce qui est malheureusement la majorité du temps. 
C’est tellement devenu automatique que ça ne me prend pas plus de temps que ça pour le faire et ça permet de lever quelques barrières.

**Mais en aucun cas cela suffit à rendre un site complètement accessible**.  
 Il reste beaucoup à faire et il ne faut pas hésiter à se former sur le sujet, que ce soit en auto-formation ou avec un 
organisme de formation, certains aspects sont assez complexes à appréhender.


Et ça me donne la transition parfaite pour vous donner quelques ressources d’auto-formation et d’outils de développement.  
En premier lieu, [les notices AcceDe Web (pour designers, développeurs, contributeurs)](http://www.accede-web.com/notices "(nouvelle fenêtre)"){:target="_blank"}{:rel="noopener noreferrer"}  
Ce sont des notices qui reprennent les critères de conformité à respecter et qui les expliquent de manière très simple avec des exemples à la clé, c’est vraiment une documentation à mettre entre toutes les mains des gens qui font du web.    

Ensuite le [plugin pour Chrome et Firefox aXe](https://www.deque.com/products/axe "(nouvelle fenêtre)"){:target="_blank"}{:rel="noopener noreferrer"}{:hreflang="en"}.   
Il permet d’auditer votre site pour voir si certains critères sont respectés ou non. Attention, là aussi, 
ce n’est pas parce que le plugin vous dira que votre site est accessible qu’il l’est à 100% ! 
Tous les critères ne peuvent être audités de manière automatique. Par exemple, la pertinence des alternatives textuelles ne peut être vérifiée que manuellement.    

Après nous avons une 
[liste de ressources sur ARIA, JavaScript, CSS, iOS/Android... par la société Atalan](https://github.com/atalan/a11y-resources/blob/master/list-of-a11y-resources.md "(nouvelle fenêtre)"){:target="_blank"}{:rel="noopener noreferrer"}{:hreflang="en"} 
Une énorme liste de liens vers des outils, de la documentation, du code... c’est un peu la caverne d’Ali Baba qui fait de l’accessibilité.    

Et puis, parce que sans eux, rien ne serait possible : les critères internationaux d’accessibilité, les 
<abbr title="Web Content Accessibility Guidelines">[WCAG 2.0](http://code.viget.com/interactive-wcag/#responsibility=&level=aa "(nouvelle fenêtre)"){:target="_blank"}{:rel="noopener noreferrer"}{:hreflang="en"}</abbr> filtrés par métiers (en anglais)

Et leurs équivalents Français, le 
<abbr title="Référentiel Général d’Accessibilité pour les Administrations">[RGAA](http://references.modernisation.gouv.fr/referentiel/criteres.html "(nouvelle fenêtre)"){:target="_blank"}{:rel="noopener noreferrer"}</abbr> et [Accessiweb](http://www.accessiweb.org/index.php/accessiweb-html5aria-liste-deployee.html "(nouvelle fenêtre)"){:target="_blank"}{:rel="noopener noreferrer"}

Pour récapituler tout ça : on utilise l’attribut lang, on ne met pas d’attribut maximum-scale= 1.0, on garde l’outline CSS (demandez à votre designer de
 vous faire un style sympa), on ajoute des liens d’évitement, on utilise une sémantique correcte, on utilise ARIA quand il faut, on fait 
 attention à l’ordre des titres, on utilise l’attribut alt de la balise img de la bonne manière, on utilise des labels avec des placeholder et 
 non des placeholder à la place des labels et enfin, on teste, on teste, on teste. Avec le plugin Axe, le validateur w3c, la touche tab...
 Et avec ça, on a une bonne base !
  
 Je tiens à remercier mes collègues pour leurs précieux conseils et leur aide et merci à vous, pour ce moment.